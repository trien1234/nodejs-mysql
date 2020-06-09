const db = require('../Models/index');
const Incident = db.Incident;
const IncidentStatus = db.IncidentStatus;
const IncidentType = db.IncidentType;
const IncidentNote = db.IncidentNote;
const House = db.House;
const User = db.User;
const Role = db.Role;
const Building = db.Building;
const FixerPrice = db.FixerPrice;
const FixerGroup = db.FixerGroup;
const UserFeedBacks = db.UserFeedBacks;
const DeviceToken = db.DeviceToken;
const Setting= db.Setting;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const multiparty = require('multiparty');
const uuidv4 = require('uuid/v4');
const fs = require("fs");
const moment = require('moment');
const INCIDENT_STATUS = require("../../Config/constant.js");
const CONSTANT = require("../../Config/constant.js");
const Paging = require('paginate-info');
const NotifyHelpers = require('../Helpers/NotifyHelper.js')


class ApartmentHandler {
    constructor(){}

    async createApartmentIncident(req, res){
        try {
            const form = new multiparty.Form();
            const incident = await new Promise(function (resolve, reject) {
                form.parse(req, async function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    try {
                        let Images = [];
                        let incident = {};
                        if (files) {
                            let img = files.Images;
                            if(img){
                                img.forEach(e => {
                                    const tempPath = e.path;
                                    const fileExtension = e.originalFilename.split('.').slice(-1)[0];
                                    const fileName = `${uuidv4()}.${fileExtension}`;
                                    const targetPath = appRoot + '/storage/incidents/' + fileName;
                                    fs.copyFile(tempPath, targetPath, err => {
                                        console.log(err)
                                    });
                                    Images.push('/incidents/'+fileName);
                                });
                            }                              
                        }
                        if (fields) {
                            let incidentInf = JSON.stringify(fields);
                            let incidentInfo = JSON.parse(incidentInf);
                            let UserId = incidentInfo.UserId.join();
                            let HouseId = await User.findOne({
                                where: {
                                    Id: UserId
                                },
                                attributes: ['HouseId','Tel','FullName','Email']
                            })
                            let BuildingId = await House.findOne({
                                where: {
                                    Id: HouseId.HouseId
                                },
                                attributes: ['BuildingId','Code']
                            })
                            let building = await Building.findOne({
                                where: {
                                    Id: BuildingId.BuildingId
                                },
                                attributes: ['ManagerId','Code']
                            })
                            let IncidentTypeId = incidentInfo.IncidentTypeId.join();
                            let Code = await IncidentType.findOne({
                                where: {
                                    Id:IncidentTypeId
                                },
                                attributes: ['Code','Name']
                            })
                            const random = Math.floor(10000 + Math.random() * 90000);
                            let playerId = await DeviceToken.findAll({
                                where: {
                                    UserId: building.ManagerId
                                },
                                attributes:['PlayerId']
                            })
                            let player=[];
                            playerId.forEach(p=>{
                                player.push(p.PlayerId)
                            })
                            let contentNotify = i18n.__('Resident.New')+' '+Code.Name+' tại '+BuildingId.Code+'-'+building.Code;
                            Object.assign(
                                incident,
                                {
                                    IncidentTypeId: IncidentTypeId,
                                    Code: Code.Code+'-'+random,
                                    HouseId: HouseId.HouseId,
                                    BuildingId: BuildingId.BuildingId,
                                    IncidentArea: incidentInfo.IncidentArea.join(),
                                    Description: incidentInfo.Description?incidentInfo.Description.join(): null,
                                    ContactNumber:HouseId.Tel,
                                    ContactName:HouseId.FullName?HouseId.FullName:HouseId.Email,
                                    Images: Images?Images.join():null,
                                    CreatedBy: UserId,
                                    contentNotify:contentNotify,
                                    ManagerId:building.ManagerId,
                                    player: player
                                },
                            );
                        }
                        resolve(incident);
                    } catch (err) {
                        reject(err)
                    }
                });
            });
            let data = await Incident.create(incident).then( async(result, error) => {
                if(error) throw error;
                await IncidentStatus.create({Name:result.Status, IncidentId:result.Id, UserId: result.CreatedBy}).then( ()=>{
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Create'),
                    });
                });
                //sent notify to manager
                let title = 'Thông báo sự cố từ cư dân'
                NotifyHelpers.toManager(result.Id, incident.CreatedBy, incident.ManagerId, incident.contentNotify, incident.player, title)
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    //Sửa sự cố 
    async updateIncident(req, res){
        let Id = req.params.id;
        try{
            let findIncident = await Incident.findOne({
                where: {
                    Id: Id
                },
                attributes: ['Id','Images']
            })
            if(!findIncident){
                return res.status(500).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound')
                })
            }else{
                const form = new multiparty.Form();
                const incident = await new Promise(function (resolve, reject) {
                    form.parse(req, async function(parseErr, fields, files){
                        if(parseErr) {
                            reject(parseErr);
                        }
                        try {                           
                            let images = findIncident.Images?findIncident.Images.split(','):[];
                            let keepImages = fields.KeepImages?JSON.parse(fields.KeepImages):[];
                            let newImages = images.filter(function(val) {
                                return keepImages.indexOf(val) != -1;
                            });
                            let removeImages = images.filter(val => !keepImages.includes(val));
                            removeImages.forEach(r=>{
                                if(r){
                                    fs.unlink(appRoot+'/storage' + r, (err)=>{})
                                }
                            })
                            let incident = {};
                            if (files) {
                                let img = files.Images;
                                if(img){
                                    img.forEach(e => {
                                        const tempPath = e.path;
                                        const fileExtension = e.originalFilename.split('.').slice(-1)[0];
                                        const fileName = `${uuidv4()}.${fileExtension}`;
                                        const targetPath = appRoot + '/storage/incidents/' + fileName;
                                        fs.copyFile(tempPath, targetPath, err => {
                                            console.log(err)
                                        });
                                        newImages.push('/incidents/'+fileName);
                                    });
                                }                              
                            }
                            if (fields) {
                                let incidentInf = JSON.stringify(fields);
                                let incidentInfo = JSON.parse(incidentInf);
                                let IncidentTypeId = incidentInfo.IncidentTypeId.join();
                                
                                Object.assign(
                                    incident,
                                    {
                                        IncidentTypeId: IncidentTypeId,
                                        IncidentArea: incidentInfo.IncidentArea.join(),
                                        NeedFixerPrice: incidentInfo.NeedFixerPrice.join(),
                                        Description: incidentInfo.Description?incidentInfo.Description.join(): null,
                                        Images: newImages.join()
                                    },
                                );
                            }
                            resolve(incident);
                        } catch (err) {
                            reject(err)
                        }
                    });
                });

                let data = await Incident.update(incident,{where:{Id:Id}}).then((result, error) => {
                    if(error) throw error;
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Update'),
                    });
                });
            }
        }catch(error){
            console.log(error)
            res.status(500).json({
                Status: false,
                Message: i18n.__('General.Fail.Opps')
            })
        }
    }
    // Them ghi chú sự cố
    async addNoteApartmentIncident(req, res){
        try {
            let form = new multiparty.Form();
            const incidentData = await new Promise(function (resolve, reject) {
                form.parse(req, function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    try {
                        let Images = [];
                        const incidentData = {};
                        if (files) {
                            let img = files.Images;
                            if(img){
                                img.forEach(e => {
                                    let tempPath = e.path;
                                    let fileExtension = e.originalFilename.split('.').slice(-1)[0];
                                    let fileName = `${uuidv4()}.${fileExtension}`;
                                    let targetPath = appRoot + '/storage/incidents/notes/' + fileName;
                                    fs.copyFile(tempPath, targetPath, err => {
                                        console.log(err)
                                    });
                                    Images.push('/incidents/notes/'+fileName);
                                });
                            }                              
                        }
                        if(fields){
                            let fieldDt = JSON.stringify(fields);
                            let fieldData = JSON.parse(fieldDt);
                            Object.assign(
                                incidentData,
                                {                                    
                                    Content: fieldData.Content?fieldData.Content.join(): null,
                                    Images: Images?Images.join():null,
                                    UserId: fieldData.UserId.join(),
                                    IncidentId: fieldData.IncidentId.join(),
                                }
                            );
                        }
                        resolve(incidentData)
                    }
                    catch (err){
                        reject(err)
                    }
                });    
            }) 
            await IncidentNote.create({
                Content: incidentData.Content,
                Images: incidentData.Images,
                IncidentId: incidentData.IncidentId,
                UserId: incidentData.UserId
            });
            res.status(200).json({
                Success: true,
                Message: i18n.__('General.Success.Create'),
            })                    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    // Cập nhật trạng thái sự cố
    async updateApartmentIncident(req, res){
        let incident = req.body.Incident;
        try {
            let check = await Incident.findOne({
                where:{
                    Id: incident.Id
                }
            })
            if(!check || check == ""){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound')
                });
            }
            if(incident.Status==INCIDENT_STATUS.IncidentStatus.FINISH){
                let findFixer = await FixerPrice.findOne({
                    where: {
                        IncidentId: incident.Id,
                        AcceptedBy : {[Op.ne]:null},
                        Status : CONSTANT.FixerPriceStatus.RECEIVED
                    },
                    attributes:['UserId']
                })
                if(findFixer){
                    await Incident.update(
                    {
                        Status : incident.Status,
                        FixedBy: findFixer.UserId
                    },
                    {
                        where:{
                            Id: incident.Id
                        }
                    });
                }else{
                    await Incident.update(
                    {
                        Status : incident.Status,
                        FixedBy: incident.UserId
                    },
                    {
                        where:{
                            Id: incident.Id
                        }
                    });
                }
            }else{
                await Incident.update(
                {
                    Status : incident.Status
                },
                {
                    where:{
                        Id: incident.Id
                    }
                });
            }
            let findStatus = await IncidentStatus.findOne({
                where:{
                    Name: incident.Status,
                    IncidentId: incident.Id,
                    UserId: incident.UserId
                }
            })
            if(findStatus){
                await IncidentStatus.update({CreatedDate: Date.now()},{where:{Id:findStatus.Id}});
            }else{
                await IncidentStatus.create({
                    Name: incident.Status,
                    IncidentId: incident.Id,
                    UserId: incident.UserId
                });
            }                  
            res.status(200).json({
                Success: true,
                Message: i18n.__('General.Success.Update'),
            })

            //Gui thong báo cho cư dân
            let user = await User.findOne({
                where: {
                    Id: check.CreatedBy
                },attributes:['Id','FullName'],
                include: [
                    {
                        model: DeviceToken,
                        as: 'DeviceToken',
                        separate: true,
                        attributes: ['PlayerId']
                    }
                ]
            })
            let player = [];
            user.DeviceToken.forEach(p=>{
                player.push(p.PlayerId)
            })
            let message = '';
            if(incident.Status==INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED){
                message = 'Sự cố của bạn đã được tiếp nhận.';
            }else if(incident.Status==INCIDENT_STATUS.IncidentStatus.PRICING){
                message = 'Sự cố của bạn đang được báo giá';
                // let fixer = await User.findAll({
                //     where: {
                //         FixerGroupId: check.IncidentTypeId
                //     },
                //     include: [
                //         {
                //             model: DeviceToken,
                //             as: 'DeviceToken',
                //             attributes: ['PlayerId','UserId']
                //         }
                //     ]
                // })
                // fixer.forEach(u=>{
                //     let fixerPlayer = []
                //     u.DeviceToken.forEach(d=>{
                //         fixerPlayer.push(
                //             d.PlayerId
                //         )
                //     })
                //     NotifyHelpers.toManyFixers(incident.Id, u, check, incident.UserId, fixerPlayer)
                // })
            }else if(incident.Status==INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING){
                message = 'Sự cố của bạn đang được sửa chữa';
            }else if(incident.Status==INCIDENT_STATUS.IncidentStatus.FINISH){
                message = 'Sự cố của bạn đã được khắc phục';
            }
            let contentNotify = `Xin chào ${user.FullName}. ${message}.`
            NotifyHelpers.toResident(incident.Id, incident.UserId, user.Id, contentNotify, player)                   
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    // Thợ sửa gửi thông báo hoàn thành sự cố cho QLN
    async fixerSendFinishStatusToManager(req, res){
        let incident = req.body.Incident;
        try{
            let check = await Incident.findOne({
                where:{
                    Id: incident.Id
                },
                include: [
                    {
                        model: Building,
                        as: 'Building',
                        attributes: ['ManagerId']
                    }
                ]
            })
            if(!check || check == ""){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound')
                });
            }
            await Incident.update(
            {
                Status : incident.Status,
                FixedBy: incident.UserId
            },
            {
                where:{
                    Id: incident.Id
                }
            });
            res.status(200).json({
                Success: true,
                Message: i18n.__('General.Success.Update'),
            })
            let fromUser = await User.findOne({
                where: {
                    Id: incident.UserId
                },
                attributes: ['Id','FullName']
            })
            let toUser = await User.findOne({
                where: {
                    Id: check.Building.ManagerId
                },attributes:['Id','FullName'],
                include: [
                    {
                        model: DeviceToken,
                        as: 'DeviceToken',
                        separate: true,
                        attributes: ['PlayerId']
                    }
                ]
            })
            let player = [];
            toUser.DeviceToken.forEach(p=>{
                player.push(p.PlayerId)
            })
            //sent notify to manager
            let title = 'Thông báo cập nhật tình hình sự cố'
            let contentNotify = `Đề nghị cập nhật trạng thái sự cố ${check.Code} từ thợ ${fromUser.FullName}`
            NotifyHelpers.toManagerConfirmIncident(incident.Id, fromUser.Id, toUser.Id, contentNotify, player, title) 
        }catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async deleteApartmentIncident(req, res){
        try {
            let incident = await Incident.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            console.log(1)
            if(!incident || incident == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                incident.IsDeleted = 1;
                Incident.update(incident, {where: {Id : req.body.Id}}).then(() => {
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Delete'),
                    });
                });
                let i_status = [];
                i_status = await IncidentStatus.findAll({
                    where: {
                        IncidentId: req.body.Id
                    }
                })
                //Xóa các bản ghi tình trạng sự cố
                i_status.forEach(async result =>{
                    await IncidentStatus.destroy({
                        where: {
                            IncidentId:result.IncidentId
                        }
                    });
                })
                //Xoa bao gia neu co
                let price = [];
                price = await FixerPrice.findAll({
                    where: {
                        IncidentId: req.body.Id
                    }
                })
                if(price){
                    price.forEach(async p=>{
                        await FixerPrice.destroy({
                            where: {
                                IncidentId: p.IncidentId
                            }
                        })
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    // danh sach su co theo can ho app cu dan
    async getApartmentIncidentById(req, res){
        let id = req.params.id;
        const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:5;
        let startDate = req.query.startDate ? req.query.startDate : "";
        let endDate = req.query.endDate ? req.query.endDate : moment(Date.now()).format("YYYY-MM-DD H:mm:ss");
        let status =  {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' };
        let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
        let type = {[Op.like] :'%' + (req.query.type ? req.query.type : "") + '%'};
        try {
            let house = await House.findOne({
                where:{
                    Id: id
                },
                attributes: ['Id', 'Name']
            });
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);
            let { rows, count } = await Incident.findAndCountAll({
                limit,
                offset,
                order: [
                    ['Id', 'DESC']
                ],
                where:{
                    IsDeleted: 0,
                    HouseId: house.Id,
                    Status :status,
                    [Op.and]: {
                        CreatedDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                },
                attributes: [
                    'Id', 
                    'Code',
                    'CreatedDate',
                    'Images',
                    'Status'
                ],
                include: [
                    {
                        model: IncidentType,
                        where: {
                            IsDeleted: 0,
                            [Op.and]:{
                                Name: keyword,
                                Id: type
                            }
                        },
                        as: "Type",
                        required: true,
                        attributes: ['Id', 'Name']                    
                    }
                ]
            })
            const meta = Paging.paginate(currentPage, count, rows, pageSize);
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                let incident = [];
                rows.forEach(n =>{
                    incident.push({
                        Id: n.get('Id'),
                        Name: n.Type.Name+'-'+n.Code,
                        Status: n.Status,
                        Images: n.Images?n.Images.split(","):'',
                        CreatedDate: moment(n.CreatedDate).format("DD/MM/YYYY")  
                    })
                })
                return res.status(200).json({
                    Success: true,
                    Data: {incident, meta},
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    //Thợ sửa chữa quản lý danh sách sự cố theo status
    async searchApartmentIncidentByStatus(req, res){
        try {
            const currentPage = req.query.currentPage?req.query.currentPage:1;
            const pageSize = req.query.pageSize?req.query.pageSize:5;
            let startDate = req.query.startDate ? req.query.startDate : "";
            let endDate = req.query.endDate ? req.query.endDate : moment(Date.now()).format("YYYY-MM-DD H:mm:ss");
            // let Status = {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' }
            let UserId = req.query.userId;
            let Fixer = await User.findOne({
                where: {
                    Id: UserId
                },
                attributes: ['FixerGroupId']
            })
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);   
            if(req.query.status==CONSTANT.FixerIncidentStatus.NEW){
                let { rows, count } = await Incident.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where: {
                        IsDeleted: 0,
                        NeedFixerPrice: 1,
                        IncidentTypeId: Fixer.FixerGroupId,
                        Status :INCIDENT_STATUS.IncidentStatus.PRICING,
                        [Op.and]: {
                            CreatedDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        } 
                    },
                    attributes: [
                        'Id', 
                        'Code',
                        'CreatedDate',
                        'Images',
                        'Status'
                    ],
                    include: [
                        {
                            model: House,
                            as: "House",
                            attributes: ['Code'],
                            include: [
                                {
                                    model: Building,
                                    as: "Building",
                                    attributes: ['Code']
                                }
                            ]                    
                        },
                        {
                            model: IncidentType,
                            as: "Type",
                            attributes: ['Name']                    
                        },
                        {
                            model: FixerPrice,
                            where: {
                                UserId: UserId,
                                '$Incident.Id$' : Sequelize.col('FixerPrice.IncidentId')
                            },
                            as: "FixerPrice",
                            required: true,
                            separate:true,
                            attributes: ['Price','UserId']
                        }
                    ]                   
                })
                const meta = Paging.paginate(currentPage, count, rows, pageSize);
                if(!rows || rows == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    });
                }else {
                    let incident = [];
                    rows.forEach(n =>{
                        if (!(n.FixerPrice.length)) {
                            incident.push({
                                Id: n.get('Id'),
                                Name: n.Type.Name+'-'+n.Code,
                                Status: n.Status,
                                House: n.House.Building.Code+'-'+n.House.Code,
                                FixerPrice: n.FixerPrice,
                                Images: n.Images?n.Images.split(","):'',
                                CreatedDate: moment(n.CreatedDate).format("DD/MM/YYYY")  
                            })
                        }
                    })
                    return res.status(200).json({
                        Success: true,
                        Data: {incident, meta},
                    });
                }
            }else if(req.query.status==CONSTANT.FixerIncidentStatus.PRICING){
                let {rows, count } = await FixerPrice.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:{
                        UserId: UserId,
                        AcceptedBy:{[Op.eq]:null}, 
                        Status:{[Op.eq]:INCIDENT_STATUS.FixerPriceStatus.PENDING}
                    },
                    attributes:['Price','FixDate'],
                    include: [
                        {
                            model: Incident,
                            as: 'Incident',
                            where: {
                                IsDeleted: 0,
                                NeedFixerPrice: 1,
                                IncidentTypeId: Fixer.FixerGroupId,
                                Status :INCIDENT_STATUS.IncidentStatus.PRICING,
                                [Op.and]: {
                                    CreatedDate: {
                                        [Op.between]: [startDate, endDate]
                                    }
                                } 
                            },
                            attributes: [
                                'Id', 
                                'Code',
                                'CreatedDate',
                                'Images',
                                'Status'
                            ],
                            include: [
                                {
                                    model: House,
                                    as: "House",
                                    attributes: ['Code'],
                                    include: [
                                        {
                                            model: Building,
                                            as: "Building",
                                            attributes: ['Code']
                                        }
                                    ]                    
                                },
                                {
                                    model: IncidentType,
                                    as: "Type",
                                    attributes: ['Name']                    
                                }
                            ]
                        }
                    ]
                })
                const meta = Paging.paginate(currentPage, count, rows, pageSize);
                if(!rows || rows == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    });
                }else {
                    let incident = [];
                    rows.forEach(n =>{
                        incident.push({
                            Id: n.Incident.get('Id'),
                            Name: n.Incident.Type.Name+'-'+n.Incident.Code,
                            Status: n.Incident.Status,
                            House: n.Incident.House.Building.Code+'-'+n.Incident.House.Code,
                            Images: n.Incident.Images?n.Incident.Images.split(","):'',
                            CreatedDate: moment(n.Incident.CreatedDate).format("DD/MM/YYYY")  
                        })
                    })
                    return res.status(200).json({
                        Success: true,
                        Data: {incident, meta},
                    });
                }
            }else if(req.query.status==CONSTANT.FixerIncidentStatus.PRICEDACCEPT){
                let {rows, count } = await FixerPrice.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:{
                        UserId: UserId,
                        AcceptedBy:{[Op.ne]:null}, 
                        Status:{[Op.eq]:INCIDENT_STATUS.FixerPriceStatus.RECEIVED}
                    },
                    attributes:['Price','FixDate'],
                    include: [
                        {
                            model: Incident,
                            as: 'Incident',
                            where: {
                                IsDeleted: 0,
                                NeedFixerPrice: 1,
                                IncidentTypeId: Fixer.FixerGroupId,
                                Status :INCIDENT_STATUS.IncidentStatus.PRICING,
                                [Op.and]: {
                                    CreatedDate: {
                                        [Op.between]: [startDate, endDate]
                                    }
                                } 
                            },
                            attributes: [
                                'Id', 
                                'Code',
                                'CreatedDate',
                                'Images',
                                'Status'
                            ],
                            include: [
                                {
                                    model: House,
                                    as: "House",
                                    attributes: ['Code'],
                                    include: [
                                        {
                                            model: Building,
                                            as: "Building",
                                            attributes: ['Code']
                                        }
                                    ]                    
                                },
                                {
                                    model: IncidentType,
                                    as: "Type",
                                    attributes: ['Name']                    
                                }
                            ]
                        }
                    ]
                })
                const meta = Paging.paginate(currentPage, count, rows, pageSize);
                if(!rows || rows == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    });
                }else {
                    let incident = [];
                    rows.forEach(n =>{
                        incident.push({
                            Id: n.Incident.get('Id'),
                            Name: n.Incident.Type.Name+'-'+n.Incident.Code,
                            Status: n.Incident.Status,
                            House: n.Incident.House.Building.Code+'-'+n.Incident.House.Code,
                            Images: n.Incident.Images?n.Incident.Images.split(","):'',
                            CreatedDate: moment(n.Incident.CreatedDate).format("DD/MM/YYYY")  
                        })
                    })
                    return res.status(200).json({
                        Success: true,
                        Data: {incident, meta},
                    });
                }
            }else if(req.query.status==CONSTANT.FixerIncidentStatus.TROUBLESHOOTING){
                let { rows, count } = await Incident.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where: {
                        IsDeleted: 0,
                        NeedFixerPrice: 1,
                        IncidentTypeId: Fixer.FixerGroupId,
                        Status :INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING,
                        [Op.and]: {
                            CreatedDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        } 
                    },
                    attributes: [
                        'Id', 
                        'Code',
                        'CreatedDate',
                        'Images',
                        'Status'
                    ],
                    include: [
                        {
                            model: House,
                            as: "House",
                            attributes: ['Code'],
                            include: [
                                {
                                    model: Building,
                                    as: "Building",
                                    attributes: ['Code']
                                }
                            ]                    
                        },
                        {
                            model: IncidentType,
                            as: "Type",
                            attributes: ['Name']                    
                        },
                        {
                            model: FixerPrice,
                            where: {UserId:UserId,AcceptedBy:{[Op.ne]:null}, Status:{[Op.eq]:INCIDENT_STATUS.FixerPriceStatus.RECEIVED}},
                            as: "FixerPrice",
                            attributes: ['Price','FixDate']                    
                        }
                    ]                   
                })
                const meta = Paging.paginate(currentPage, count, rows, pageSize);
                if(!rows || rows == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    });
                }else {
                    let incident = [];
                    rows.forEach(n =>{
                        incident.push({
                            Id: n.get('Id'),
                            Name: n.Type.Name+'-'+n.Code,
                            Status: n.Status,
                            House: n.House.Building.Code+'-'+n.House.Code,
                            Images: n.Images?n.Images.split(","):'',
                            CreatedDate: moment(n.CreatedDate).format("DD/MM/YYYY")  
                        })
                    })
                    return res.status(200).json({
                        Success: true,
                        Data: {incident, meta},
                    });
                }
            }else if(req.query.status==CONSTANT.FixerIncidentStatus.FINISH){
                let { rows, count } = await Incident.findAndCountAll({
                    limit,
                    offset,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where: {
                        IsDeleted: 0,
                        NeedFixerPrice: 1,
                        IncidentTypeId: Fixer.FixerGroupId,
                        Status :INCIDENT_STATUS.IncidentStatus.FINISH,
                        FixedBy: UserId,
                        [Op.and]: {
                            CreatedDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        } 
                    },
                    attributes: [
                        'Id', 
                        'Code',
                        'CreatedDate',
                        'Images',
                        'Status'
                    ],
                    include: [
                        {
                            model: House,
                            as: "House",
                            attributes: ['Code'],
                            include: [
                                {
                                    model: Building,
                                    as: "Building",
                                    attributes: ['Code']
                                }
                            ]                    
                        },
                        {
                            model: IncidentType,
                            as: "Type",
                            attributes: ['Name']                    
                        },
                        {
                            model: FixerPrice,
                            where: {UserId:UserId,AcceptedBy:{[Op.ne]:null}, Status:{[Op.eq]:INCIDENT_STATUS.FixerPriceStatus.RECEIVED}},
                            as: "FixerPrice",
                            attributes: ['Price','FixDate']                    
                        }
                    ]                   
                })
                const meta = Paging.paginate(currentPage, count, rows, pageSize);
                if(!rows || rows == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    });
                }else {
                    let incident = [];
                    rows.forEach(n =>{
                        incident.push({
                            Id: n.get('Id'),
                            Name: n.Type.Name+'-'+n.Code,
                            Status: n.Status,
                            House: n.House.Building.Code+'-'+n.House.Code,
                            Images: n.Images?n.Images.split(","):'',
                            CreatedDate: moment(n.CreatedDate).format("DD/MM/YYYY")  
                        })
                    })
                    return res.status(200).json({
                        Success: true,
                        Data: {incident, meta},
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    //Lịch hẹn app Thợ
    async scheduleFixer(req, res){
        try{
            const currentPage = req.query.currentPage?req.query.currentPage:1;
            const pageSize = req.query.pageSize?req.query.pageSize:5;
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);   
            let UserId = req.query.userId;
            console.log(UserId)
            let Fixer = await User.findOne({
                where: {
                    Id: UserId
                },
                attributes: ['FixerGroupId']
            })  
            let { rows, count } = await Incident.findAndCountAll({
                limit,
                offset,
                order: [
                    ['Id', 'DESC']
                ],
                where: {
                    IsDeleted: 0,
                    NeedFixerPrice: 1,
                    IncidentTypeId: Fixer.FixerGroupId,
                    Status :INCIDENT_STATUS.FixerIncidentStatus.PRICEDACCEPT,
                },
                attributes: [
                    'Id', 
                    'Code',
                    'CreatedDate',
                    'Images',
                    'Status'
                ],
                include: [
                    {
                        model: House,
                        as: "House",
                        attributes: ['Code'],
                        include: [
                            {
                                model: Building,
                                as: "Building",
                                attributes: ['Code']
                            }
                        ]                    
                    },
                    {
                        model: IncidentType,
                        as: "Type",
                        attributes: ['Name']                    
                    },
                    {
                        model: FixerPrice,
                        where: {UserId:UserId, AcceptedBy: {[Op.ne]: null},Status:{[Op.ne]:INCIDENT_STATUS.FixerPriceStatus.CANCEL}},
                        as: "FixerPrice",
                        attributes: ['Price','FixDate']                    
                    }
                ]
                
            })
            const meta = Paging.paginate(currentPage, count, rows, pageSize);
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else {
                let incident = [];
                rows.forEach(n =>{
                    incident.push({
                        Id: n.get('Id'),
                        Name: n.Type.Name+'-'+n.Code,
                        Status: n.Status,
                        House: n.House.Building.Code+'-'+n.House.Code,
                        Images: n.Images?n.Images.split(","):'',
                        FixDate: moment(n.FixerPrice.FixDate).format("DD/MM/YYYY - H:mm")  
                    })
                })
                return res.status(200).json({
                    Success: true,
                    Data: {incident, meta},
                });
            }
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });

        }
    }
    // Chi tiet su co app cu dan
    async detailApartmentIncidentAndStatus(req, res){
        let Id = req.params.id;
        try {
            Incident.findAll({
                where: {
                    Id :Id,
                    IsDeleted: 0
                },
                attributes: [
                    'Id', 
                    'Code',
                    'IncidentArea',
                    'Description',
                    'CreatedDate',
                    'Images',
                    'NeedFixerPrice'
                ],
                include : [
                    {
                        model: IncidentStatus,
                        as: "IncidentStatus",
                        separate: true,
                        attributes: ['Name','CreatedDate']
                    },
                    {
                        model: IncidentNote,
                        as: "IncidentNote",
                        separate: true,
                        attributes: ['Content','Images','createdAt'],
                        include: [
                            {
                                model: User,
                                as: "User",
                                attributes:['Id','RoleId','FullName','Avatar'],
                                include: [
                                    {
                                        model: Role,
                                        as: "Role",
                                        attributes:['Type','Name']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: FixerPrice,
                        as: "FixerPrice",
                        // where: {
                        //     AcceptedBy: {[Op.ne]: null}
                        // },
                        separate: true,
                        attributes: ['Id','Price','FixDate','AcceptedBy'],
                        include: [
                            {
                                model: User,
                                as: "User",
                                attributes:['Id','FullName','Avatar','Tel','DOB','Address','Stars','RatedTime'],
                                include: [
                                    {
                                        model: FixerGroup,
                                        as: "FixerGroup",
                                        attributes: ['Name']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: IncidentType,
                        as: "Type",
                        attributes: ['Id','Name']                    
                    },
                    {
                        model: House,
                        as: "House",
                        attributes: ['Code']                    
                    },
                    {
                        model: UserFeedBacks,
                        as: 'UserFeedBacks',
                        attributes: ['Id','Content','Star']
                    }
                ]
            }).then( (incident)=>{
                let data = [];
                incident.forEach(e=>{
                    let Sta = [];
                    e.IncidentStatus.forEach(s=>{                        
                        Sta.push({
                            StatusType: s.Name,
                            Date: moment(s.CreatedDate).format("DD/MM/YYYY - H:mm")
                        })
                    });
                    let Note = [];
                    e.IncidentNote.forEach(n=>{
                        Note.push({
                            Content: n.Content,
                            Images:n.Images?n.Images.split(','):"",
                            CreatedDate: moment(n.createdAt).format("H:mm DD/MM/YYYY"),
                            UserName: n.User.FullName,
                            UserAvatar: n.User.Avatar,
                            UserRole: n.User.Role.Name
                        })
                    });
                    let Fixer = [];
                    e.FixerPrice.forEach(f=>{
                        Fixer.push({
                            Id:f.get('Id'),
                            Price:f.Price,
                            IsAccepted: f.AcceptedBy?1:0,
                            FixDate:moment(f.FixDate).format("H:mm DD/MM/YYYY"),
                            User:f.User
                        })
                    })
                    data.push({
                        Id: e.Id,
                        IncidentCode: e.Code,                                             
                        Status: Sta,
                        Note: Note,
                        IncidentArea: e.IncidentArea,
                        NeedFixerPrice: e.NeedFixerPrice,
                        FixerPrice: Fixer,
                        Description: e.Description,
                        HouseCode: e.House.Code,
                        FeedBack: e.UserFeedBacks[0],
                        Type: e.Type.Name,
                        TypeId: e.Type.Id,
                        Images: e.Images?e.Images.split(','):null,
                        Created_Date: moment(e.CreatedDate).format("DD/MM/YYYY - H:mm")
                    })
                })
                res.status(200).json({
                    Success: true,
                    Data: {
                        Incident: data,
                    }
                });
            })
        }catch (error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }

    //Hien thi chi tiet su co app tho
    async detailApartmentIncidentAppFixer(req, res){
        let Id = req.params.id;
        let UserId = req.query.userId;
        let Fixer = await User.findOne({
            where: {
                Id: UserId
            },
            attributes: ['FixerGroupId']
        })
        try {
            Incident.findAll({
                where: {
                    Id :Id,
                    IsDeleted: 0,
                    NeedFixerPrice: 1,
                    IncidentTypeId: Fixer.FixerGroupId
                },
                attributes: [
                    'Id', 
                    'Code',
                    'IncidentArea',
                    'Description',
                    'ContactName',
                    'ContactNumber',
                    'Images',
                    'Status'
                ],
                include : [
                    {
                        model: IncidentType,
                        as: "Type",
                        attributes: ['Name']                    
                    },
                    {
                        model: User,
                        as: "User",
                        attributes: ['FullName','Tel']                    
                    },
                    {
                        model: FixerPrice,
                        where: {IncidentId: Id, UserId:UserId, Status:{[Op.ne]:INCIDENT_STATUS.FixerPriceStatus.CANCEL}},
                        as: "FixerPrice",
                        separate: true,
                        attributes: ['Price','FixDate']                    
                    },
                    {
                        model: UserFeedBacks,
                        as: 'UserFeedBacks',
                        attributes: ['Id','Content','Star']
                    }
                ]
            }).then( (incident)=>{
                let data = [];
                incident.forEach(e=>{
                    let Fixer = [];
                    e.FixerPrice.forEach(f=>{
                        Fixer.push({
                            Price:f.Price,
                            FixHouse: moment(f.FixDate).format("H:mm"),
                            FixDate: moment(f.FixDate).format("DD/MM/YYYY"),
                        })
                    })
                    data.push({
                        Id: e.Id,
                        IncidentCode: e.Code,                                             
                        Status: e.Status,
                        IncidentArea: e.IncidentArea,
                        ContactName:e.ContactName,
                        ContactNumber:e.ContactNumber,
                        Description: e.Description,
                        FeedBack: e.UserFeedBacks[0],
                        CreatedBy: e.User,
                        FixerPrice:Fixer,
                        Type: e.Type.Name,
                        Images: e.Images.split(',')
                    })
                })
                res.status(200).json({
                    Success: true,
                    Data: {
                        Incident: data,
                    }
                });
            })
        }catch (error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }

    //Hien thi cac su co moi o app tho co phan trang, tim kiem
    async listNewApartmentIncidentAppFixer(req, res){
        const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:5;
        let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
        let UserId = req.query.userId;
        let Fixer = await User.findOne({
            where: {
                Id: UserId
            },
            attributes: ['FixerGroupId']
        })
        try{
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);     
            let { rows, count } = await Incident.findAndCountAll({
                limit,
                offset,
                order: [
                    ['Id', 'DESC']
                ],
                where: {
                    IsDeleted: 0,
                    Status: INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED,
                    NeedFixerPrice: 1,
                    IncidentTypeId: Fixer.FixerGroupId
                },
                attributes: ['Id','Status', 'Code', 'CreatedDate', 'Images'],
                include: [
                    {
                        model: House,
                        as: "House",
                        required: true,
                        attributes: ['Code'],
                        include: [
                            {
                                model: Building,
                                as: "Building",
                                required: true,
                                attributes: ['Code']
                            }
                        ]                    
                    },
                    {
                        model: IncidentType,
                        as: "Type",
                        where: {
                            IsDeleted: 0,
                            [Op.and]:{
                                Name: keyword
                            }
                        },
                        attributes: ['Name']                    
                    }
                ]
                
            })
            const meta = Paging.paginate(currentPage, count, rows, pageSize);
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else {
                let incident = [];
                rows.forEach(n =>{
                    incident.push({
                        Id: n.get('Id'),
                        Code: n.Type.Name+'-'+n.Code,
                        Status: n.Status,
                        House: n.House.Building.Code+'-'+n.House.Code,
                        Images: n.Images?n.Images.split(","):'',
                        CreatedDate: moment(n.CreatedDate).format("DD/MM/YYYY")    
                    })
                })
                return res.status(200).json({
                    Success: true,
                    Data: {incident, meta},
                });
            }
        }catch(error){
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async addRating(req, res){
        let rating = req.body.Rating;
        try{
            let check = await UserFeedBacks.findOne({
                where:{
                    IncidentId: rating.Id
                }              
            })
            let incident = await Incident.findOne({
                where: {
                    Id: rating.Id
                },
                attributes: ['FixedBy','CreatedBy']
            })
            let fixer = await User.findOne({
                where: {
                    Id: incident.FixedBy
                },
                attributes: ['Id','Stars','RatedTime','IsDeleted']
            })
            if(check || check != null){
                return res.status(200).json({
                    Success: false,
                    Message: 'Bạn đã đánh giá dịch vụ này trước đó'
                })
            }
            //Them noi dung danh gia cho moi su co
            await UserFeedBacks.create({
                Content: rating.Content,
                Star: rating.Star,
                IncidentId: rating.Id,
                SendFrom: incident.CreatedBy,
                SendTo: incident.FixedBy
            })
            //Kiem tra va update so sao
            if(fixer || fixer.IsDeleted==0){
                await User.update({Stars:fixer.Stars+Number(rating.Star), RatedTime: fixer.RatedTime+1},{where:{Id: fixer.Id}})
            }
            res.status(200).json({
                Success: true,
                Message: i18n.__('General.Success.Create')
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
        
    }

    // Nhắc nhở khi có lịch hẹn sửa chữa
    async reMindFixer(req, res){
        try{
            let timeSetting = await Setting.findOne();
            let hourToMiliSecond = parseInt(timeSetting.IncidentFixingScheduleTime)*3600000;
            let timeFormat = moment(Date.now()).valueOf()+hourToMiliSecond;
            let timeStart = moment(timeFormat).format('YYYY-MM-DD H:mm:ss')
            let timeEnd = moment(timeFormat+270000).format('YYYY-MM-DD H:mm:ss')

            let incident = await FixerPrice.findAll({
                where: {
                    Status :CONSTANT.FixerPriceStatus.RECEIVED,
                    FixDate: {
                        [Op.between]: [timeStart, timeEnd]
                    }                
                }
            })
            incident.forEach(async i=>{
                let user = await User.findOne({
                    where: {
                        Id: i.UserId
                    },attributes:['FullName'],
                    include: [
                        {
                            model: DeviceToken,
                            as: 'DeviceToken',
                            separate: true,
                            attributes: ['PlayerId']
                        }
                    ]
                })
                let player = [];
                user.DeviceToken.forEach(p=>{
                    player.push(p.PlayerId)
                })
                let incident = await Incident.findOne({where:{Id:i.IncidentId},attributes:['Code']})
                let title = 'Thông báo lịch hẹn sửa chữa';
                let contentNotify = `Xin chào ${user.FullName}. Bạn có lịch hẹn sửa chữa sự cố ${incident.Code} sau ${timeSetting.IncidentFixingScheduleTime} tiếng nữa.`
                NotifyHelpers.toOneFixer(i.IncidentId, null, i.UserId, contentNotify, player, title)
            })
            res.status(200).json({
                Success:true,
                Message: 1
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}

module.exports = ApartmentHandler;