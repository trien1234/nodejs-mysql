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
const DeviceToken = db.DeviceToken;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const multiparty = require('multiparty');
const uuidv4 = require('uuid/v4');
const fs = require("fs");
const moment = require('moment');
const INCIDENT_STATUS = require("../../Config/constant.js");
const Paging = require('paginate-info');
const NotifyHelpers = require('../Helpers/NotifyHelper.js')

class ManagerIncidentHandler {
    constructor(){}

    async createIncident(req, res){
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
                            let HouseId = incidentInfo.HouseId.join();
                            let incidentType = incidentInfo.IncidentTypeId.join();
                            let ContactNumber = incidentInfo.ContactNumber?incidentInfo.ContactNumber.join():null;
                            let ContactName = incidentInfo.ContactName?incidentInfo.ContactName.join():null;
                            let code = await IncidentType.findOne({
                                where: {
                                    Id:incidentType
                                },
                                attributes: ['Code']
                            })

                            let user = await User.findOne({
                                where: {
                                    HouseId: HouseId
                                },
                                attributes: ['Tel','FullName','Email']
                            })
                            const random = Math.floor(10000 + Math.random() * 90000);

                            Object.assign(
                                incident,
                                {
                                    Code: code.Code+'-'+random,
                                    BuildingId: incidentInfo.BuildingId.join(),
                                    HouseId: HouseId,
                                    IncidentArea: incidentInfo.IncidentArea.join(),
                                    IncidentTypeId: incidentType,                                                                
                                    NeedFixerPrice: incidentInfo.NeedFixerPrice.join(),
                                    ContactNumber:ContactNumber?ContactNumber:user.Tel,
                                    Status: INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED,
                                    ContactName:ContactName?ContactName:(user.FullName?user.FullName:user.Email),
                                    Description: incidentInfo.Description?incidentInfo.Description.join(): null,
                                    Images: Images?Images.join():null,
                                    CreatedBy: UserId,
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
                //Neu can tho thi gui bao gia cho tho
                if(result.NeedFixerPrice==INCIDENT_STATUS.NeedFixer.YES){
                    let user = await User.findAll({
                        where: {
                            FixerGroupId: incident.IncidentTypeId
                        },
                        include: [
                            {
                                model: DeviceToken,
                                as: 'DeviceToken',
                                attributes: ['PlayerId','UserId']
                            }
                        ]
                    })
                    user.forEach(u=>{
                        let player = []
                        u.DeviceToken.forEach(d=>{
                            player.push(
                                d.PlayerId
                            )
                        })
                        NotifyHelpers.toManyFixers(result.Id, u, incident, result.CreatedBy, player)
                    })
                }
            });
        } catch (error) {
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async searchIncidentByBuilding(req, res){
        let UserId =  {[Op.like] :'%' + (req.query.userId ? req.query.userId : "") + '%' };
        let buildingId =  {[Op.like] :'%' + (req.query.building ? req.query.building : "") + '%' };
        let startDate = req.query.startDate ? req.query.startDate : "";
        let endDate = req.query.endDate ? req.query.endDate : moment(Date.now()).format("YYYY-MM-DD H:mm:ss");
        let status =  {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' };
        let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
        let type = {[Op.like] :'%' + (req.query.type ? req.query.type : "") + '%'};
        const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:5;
        try {
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);
            let { rows, count } = await Incident.findAndCountAll({
                offset, limit, 
                order: [
                    ['Id', 'DESC']
                ],
                where:{
                    IsDeleted: 0,
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
                include:[
                    {
                        model: Building,
                        as: 'Building',
                        where: {
                            IsDeleted: 0,
                            ManagerId: UserId,
                            [Op.and]:{
                                Id: buildingId
                            }
                        },
                        attributes: ['Id','Code'],
                    },
                    {
                        model: House,
                        where: {
                            IsDeleted: 0                     
                        },
                        as: "House",
                        attributes: [
                            'Id',
                            'Code',
                            'BuildingId'
                        ],
                    },
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
                rows.forEach(i=>{
                    incident.push({
                        Id: i.Id,
                        Name: i.Type.Name+'-'+i.Code,
                        Status: i.Status,
                        Building: i.Building.Code+'-'+i.House.Code,
                        Images: i.Images?i.Images.split(','):"",
                        CreatedDate: moment(i.CreatedDate).format('DD/MM/YYYY')
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

    async detailIncident(req, res){
        let Id = req.params.id;
        try{
            Incident.findAll({
                where: {
                    Id :Id,
                    IsDeleted: 0
                },
                attributes: [
                    'Id', 
                    'IncidentArea',
                    'Description',
                    'CreatedDate',
                    'NeedFixerPrice',
                    'Code',
                    'Images',
                    'ContactName',
                    'ContactNumber'
                ],
                include : [
                    {
                        model: IncidentStatus,
                        as: "IncidentStatus",
                        attributes: ['Name','CreatedDate']
                    },
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
                        model: House,
                        as: "House",
                        attributes: ['Id', 'Code']
                    },
                    {
                        model: Building,
                        as: "Building",
                        attributes: ['Id', 'Code']
                    },
                    {
                        model: IncidentNote,
                        as: "IncidentNote",
                        attributes: ['Content','Images','createdAt'],
                        include: [
                            {
                                model: User,
                                as: "User",
                                attributes:['RoleId','FullName','Avatar'],
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
                        where: {
                            [Op.or]: [{IncidentId: Id}]
                        },
                        require: false,
                        attributes: ['Id','Price','FixDate','AcceptedBy'],
                        separate: true,
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
                    }
                ]
            }).then( (incident)=>{
                let data = [];
                incident.forEach(e=>{
                    let sta = [];
                    e.IncidentStatus.forEach(s=>{                        
                        sta.push({
                            StatusType: s.Name,
                            Date: moment(s.CreatedDate).format("DD/MM/YYYY - H:mm")
                        })
                    });
                    let note = [];
                    e.IncidentNote.forEach(n=>{
                        note.push({
                            Content: n.Content,
                            Images:n.Images?n.Images.split(','):"",
                            CreatedDate: moment(n.createdAt).format("H:mm - DD/MM/YYYY"),
                            UserName: n.User.FullName,
                            UserAvatar: n.User.Avatar,
                            UserRole: n.User.Role.Name
                        })
                    });
                    let fixer = [];
                    let userChose = [];
                    e.FixerPrice.forEach(f=>{
                        if(f.AcceptedBy==null){
                            fixer.push({
                                Id:f.get('Id'),
                                Price:f.Price,
                                AcceptedBy:f.AcceptedBy,
                                FixDate:moment(f.FixDate).format("H:mm DD/MM/YYYY"),
                                User:f.User
                            })
                        }else{
                            userChose.push({
                                Id:f.get('Id'),
                                Price:f.Price,
                                AcceptedBy:f.AcceptedBy,
                                FixDate:moment(f.FixDate).format("H:mm DD/MM/YYYY"),
                                User:f.User
                            })
                        }
                        
                    });
                    data.push({
                        Id: e.Id,
                        Name: e.Type.Name+'-'+e.Code,                                             
                        Status: sta,
                        IncidentArea: e.IncidentArea,
                        Description: e.Description,
                        NeedFixerPrice: e.NeedFixerPrice,
                        Note: note,
                        FixerPrice: fixer,
                        Type: e.Type.Name,
                        UserChose: userChose,
                        CreatedBy: e.User,
                        Building:e.Building.Code+'-'+e.House.Code,
                        ContactName:e.ContactName,
                        ContactNumber:e.ContactNumber,
                        Images: e.Images?e.Images.split(','):[]
                    })
                })
                res.status(200).json({
                    Success: true,
                    Data: {
                        Incident: data,
                    }
                });
            })
        }catch(error){
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    //Tiếp nhận sự cố và chọn có cần thợ báo giá hay không
    async receiveAndChoseFixerPriceOrNot(req, res){
        let isNeedFixer = req.body.Params;
        try {
            let check = await Incident.findOne({
                where:{
                    Id: isNeedFixer.Id
                }
            })
            if(!check || check == ""){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound')
                });
            }
            await Incident.update(
            {
                NeedFixerPrice : isNeedFixer.IsNeedFixer,
                Status: INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED
            },
            {
                where:{
                    Id: isNeedFixer.Id
                }
            });
            // neu can tho thi gui thong bao cho tho
            if(isNeedFixer.IsNeedFixer==INCIDENT_STATUS.NeedFixer.YES){
                await Incident.update(
                {
                    Status: INCIDENT_STATUS.IncidentStatus.PRICING
                },
                {
                    where:{
                        Id: isNeedFixer.Id
                    }
                });
                let checkStatus = await IncidentStatus.findOne({
                    where: {
                        Name: INCIDENT_STATUS.IncidentStatus.PRICING,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    },
                    attributes: ['Id']
                })
                if(checkStatus){
                    await IncidentStatus.update({CreatedDate: Date.now()},{where:{Id:checkStatus.Id}})
                }else{
                    await IncidentStatus.create({
                        Name: INCIDENT_STATUS.IncidentStatus.PRICING,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    });
                }

                let checkStatus2 = await IncidentStatus.findOne({
                    where: {
                        Name: INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    },
                    attributes: ['Id']
                })
                if(checkStatus2){
                    await IncidentStatus.update({CreatedDate: Date.now()},{where:{Id:checkStatus2.Id}})
                }else{
                    await IncidentStatus.create({
                        Name: INCIDENT_STATUS.IncidentStatus.MANAGERRECEIVED,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    });
                }
                let user = await User.findAll({
                    where: {
                        FixerGroupId: check.IncidentTypeId
                    },
                    include: [
                        {
                            model: DeviceToken,
                            as: 'DeviceToken',
                            attributes: ['PlayerId','UserId']
                        }
                    ]
                })
                user.forEach(u=>{
                    let player = []
                    u.DeviceToken.forEach(d=>{
                        player.push(
                            d.PlayerId
                        )
                    })
                    NotifyHelpers.toManyFixers(isNeedFixer.Id, u, check, isNeedFixer.UserId, player)
                })
            }else{
                await Incident.update(
                {
                    Status: INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING
                },
                {
                    where:{
                        Id: isNeedFixer.Id
                    }
                });
                let checkStatus = await IncidentStatus.findOne({
                    where: {
                        Name: INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    },
                    attributes: ['Id']
                })
                if(checkStatus){
                    await IncidentStatus.update({CreatedDate: Date.now()},{where:{Id:checkStatus.Id}})
                }else{
                    await IncidentStatus.create({
                        Name: INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING,
                        IncidentId: isNeedFixer.Id,
                        UserId: isNeedFixer.UserId
                    });
                } 
            }     
            res.status(200).json({
                Success: true,
                Message: i18n.__('General.Success.Update'),
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
        // QLN tiếp nhận thông báo sự cố từ thợ và xử lý
    async managerReceiverStatusFromFixer(req, res){
        let incident = req.body.Incident
        try{
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
            if(incident.Status == INCIDENT_STATUS.IncidentStatus.FINISH){ //Ok
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
                let message = 'Sự cố của bạn đã được khắc phục';
                let contentNotify = `Xin chào ${user.FullName}. ${message}.`
                NotifyHelpers.toResident(incident.Id, incident.UserId, user.Id, contentNotify, player) 
            }else if(incident.Status == INCIDENT_STATUS.IncidentStatus.TROUBLESHOOTING){
                //gui thong bao cho tho
                let fixer = await User.findOne({
                    where: {
                        Id: check.FixedBy
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
                fixer.DeviceToken.forEach(p=>{
                    player.push(p.PlayerId)
                })
                let title = 'Thông báo về việc sự cố chưa được khắc phục';
                let contentNotify = `Xin chào ${fixer.FullName}. Tình trạng sự cố ${check.Code} chưa được khắc phục.`
                NotifyHelpers.toOneFixer(incident.Id, incident.UserId, fixer.Id, contentNotify, player, title)

                await Incident.update(
                {
                    Status : incident.Status,
                    FixedBy: null
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
            }
        }catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}

module.exports = ManagerIncidentHandler;