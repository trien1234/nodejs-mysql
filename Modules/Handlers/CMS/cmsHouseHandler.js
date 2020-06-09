const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const House = db.House;
const User = db.User;
const Building = db.Building;
const Contract = db.Contract;
const Billing = db.Billing;
const i18n = require("i18n");
var moment = require('moment');
const ApartmentStatusHistory = db.ApartmentStatusHistory;
const ApartmentStatus = db.ApartmentStatus;
const CONSTANT = require("../../../Config/constant");

class HouseHandler{
    constructor(){}
    async createHouseGet(req,res,next){
        try {
            let listBuiding = await Building.findAll({
                where:{
                    IsDeleted: 0
                },
                attributes : ['Id','Name']
            })
            res.json({listBuiding:listBuiding})
            
        } catch (error) {
            console.log(error)
        }
    }
    async createHouseGetManager(req,res,next){
        try {
            let listManager = await House.findAll({
                attributes : ['Id','Name'],
                include: [
                    {
                        model: User,
                        as: 'User',
                        where:{
                            IsDeleted:0
                        },
                        attributes: ['Id','FullName']
                    }
                ],
                where : {Id:req.params.idBuilding}
            })
            res.json({listManager:listManager})
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateStatusApartmentstatusHis(req,res,next){
        try {
            let { HouseId,StatusId } = req.body
            if(!StatusId) {return res.json({data:null,Message:"Vui lòng chọn trạng thái"})}
            let dataApartmentStatusHistory = await ApartmentStatusHistory.create(req.body)
            let dataHouse = await House.update({Status:StatusId,UpdatedDate:Date.now()},{where : {Id:HouseId}})
            if(!dataApartmentStatusHistory || !dataHouse){return res.json({data:null,Message:"Error create"})}
            res.json({data:dataApartmentStatusHistory,Message: "Success create"})      
        } catch (error) {
            console.log(error)
        }
    }
    async createHousePost(req,res,next){
        try {

            let {BuildingId,ManagerId,Name,Note,Code,Block,Floor,Status,RentalFee,BillDateRange,CheckinDate,CheckoutDate,Funiture} = req.body
            console.log("Name",Name)
            if(!BuildingId) {return res.json({data:null,Message:"Vui lòng chọn tòa nhà"})}
            if (!ManagerId){return res.json({data:null,Message:"Vui lòng chọn người quản lý"})}
            if(!Name){return res.json({data:null,Message:"Vui lòng nhập tên căn hộ"})}
            if(!Code){return res.json({data:null,Message:"Vui lòng nhập mã"})}
            if(!Block){return res.json({data:null,Message:"Vui lòng nhập Block"})}
            if(!Floor){return res.json({data:null,Message:"Vui lòng nhập tầng"})}
            let checkCode= await House.findOne({
                where :{Code:Code}
            })
            let checkName = await House.findOne({
                where:{Name:Name}
            })
            if(checkCode){return res.json({data:null,Message:"Mã căn hộ đã tồn tại"})}
            if(checkName){return res.json({data:null,Message:"Tên căn hộ đã tồn tại"})}
            let data = await House.create(req.body)
            let newId = await House.findOne({
                order: [
                    ['Id', 'DESC']
                ],
                limit: 1 
            })
            let historystatus = await ApartmentStatusHistory.create({HouseId:newId.Id,StatusId:Status})
            if(!data){return res.json({data:null,Message:"Error create"})}
            if(!historystatus){return res.json({data:null,Message:"Error create"})}
            res.json({data:data,Message: "Success create"})      
        } catch (error) {
            console.log(error)
        }
    }

    async houseList(req,res,next){
        let { draw, order, length, search, start } = req.query
        let BuildingId = req.query.BuildingId
        start = parseInt(start)
        draw = parseInt(draw)
        length = parseInt(length)
        let cond = {IsDeleted: 0}
        if(BuildingId){
            cond = {IsDeleted: 0,BuildingId: BuildingId}
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            if(search.value !== ""){
                cond = {
                    IsDeleted: 0,
                    BuildingId: BuildingId,
                    [Op.or]:{
                        Id:keyword,
                        Name:keyword,
                    }
                }
            }
        }
        else{
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
        
            if(search.value !== ""){
                cond = {
                    IsDeleted: 0,
                    [Op.or]:{
                        Id:keyword,
                        Name:keyword,
                    }
                }
            }     
        }     
        try{
            let { rows, count } = await House.findAndCountAll({
                limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond,
                include: [
                    {
                        model: Building, as : 'Building',attributes: ['Name']
                    },
                    {
                        model: User, as: 'User', attributes:['FullName']
                    }
                ]
            })
            res.json({ data:rows, draw: parseInt(draw), recordsTotal:count, recordsFiltered: count })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success:false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }

    async deleteHouse(req,res,next){
        try {
            let user = await User.findAll({
                where: {
                    HouseId: req.body.id
                }
            })
            //Xoá cư dan ra khỏi căn hộ
            if(user.length>0){
               user.forEach(u=>{
                    User.update({IsDeleted:1},{where:{Id:u.Id}})
                }) 
            }           
            //Xoá hợp đồng của căn hộ
            let contract = await Contract.findOne({
                where:{
                    HouseId:req.body.id
                }
            })
            if(contract){
                await Contract.update({IsDeleted:1},{where:{HouseId:req.body.id}})
            }
            
            //Xoá hoá đơn thuê nhà của căn hộ
            let bill = await Billing.findOne({
                where:{
                    HouseId:req.body.id,
                    Type:CONSTANT.BILL_TYPE.NEW
                }
            })
            if(bill){
               await Billing.update({IsDeleted:1},{where:{HouseId:req.body.id,Type:CONSTANT.BILL_TYPE.NEW}}) 
            }
            
            let data = await House.update(
                {IsDeleted: 1},
                {where: {Id:req.body.id}}
            )
            if(!data){return res.json({data:null,Message:"Xóa không thành công"})}
            res.json({data,Message:"Xóa thành công"})
        } catch (error) {
            console.log(error)
        }
    }

    async updateHouse(req,res,next){
        let { BuildingId, ManagerId,Name,Code,Note,Floor,Block,Id } = req.body
		try{
			let check = await House.findOne({
				where: {
					Id: Id
				}
			})
			if (!check) return res.json({data:null, Message: i18n.__('General.Fail.NotFound')})
            if(!Name) return res.json({data:null, Message: 'Họ tên QLN không được trống'})
            
            // let checkName = await House.findOne({
            //     where: {
            //         Name: Name
            //     }
            // })
            // if(checkName) return res.json({data:null, Message: "Tên đã tồn tại"})
			let newData = {}
			Object.assign(
				newData,
				{
					Name:Name,
                    Code:Code,
                    Note:Note,
                    BuildingId:BuildingId,
                    ManagerId:ManagerId,
                    Floor:Floor,
                    Block:Block
				}
            )
			let data = await House.update(newData,{where:{Id:Id}})
			res.status(200).json({data:data,Message:i18n.__('General.Success.Update')})	
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success: false,
				Message: i18n.__('General.Fail.Opps'),
				Error: error
			})
		}
	}

    /**
        For Manager
    **/
    async managerHouse(req,res){
        let {draw, order, length, search, start } = req.query
        let UserId = req.session.admin.Id
        start = parseInt(start)
        draw = parseInt(draw)
        length = parseInt(length)
        let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
        let cond = {ManagerId: UserId}
        if(keyword !== ""){
            cond = {
                ManagerId: UserId,
                IsDeleted: 0,
                [Op.or]:{
                    Name:keyword,
                    Code:keyword
                }
            }
        }
        try{
            let { rows, count } = await House.findAndCountAll({
                limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond,
                include: [
                    {
                        model: Building,
                        as: 'Building',
                        attributes: ['Name']
                    }
                ]
            })
            res.json({ data:rows, draw: parseInt(draw), recordsTotal:count, recordsFiltered: count })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success:false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }
    /**
        End
    **/
    /**
        For Accounting
    **/
    async accountingHouse(req,res){
        let {draw, order, length, search, start } = req.query
        let UserId = req.session.admin.Id
        start = parseInt(start)
        draw = parseInt(draw)
        length = parseInt(length)
        let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
        let cond = {}
        if(keyword !== ""){
            cond = {
                IsDeleted: 0,
                [Op.or]:{
                    Name:keyword,
                    Code:keyword
                }
            }
        }
        try{
            let { rows, count } = await House.findAndCountAll({
                limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond,
                include: [
                    {
                        model: Building,
                        as: 'Building',
                        attributes: ['Name']
                    }
                ]
            })
            res.json({ data:rows, draw: parseInt(draw), recordsTotal:count, recordsFiltered: count })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success:false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }

}
module.exports = HouseHandler