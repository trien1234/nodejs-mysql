const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const House = db.House;
const User = db.User;
const Building = db.Building;
const i18n = require("i18n");
const CONSTANT = require("../../../Config/constant");

class CmsBuildingHandler {
    constructor(){}

    async addBuildingPost(req,res,next){
        try {

            let  { Name, Code,ManagerId} = req.body;
            if(!Name) return res.json({data:null, Message: "Vui lòng nhập tên"})
            if(!Code) return res.json({data:null, Message: "Vui lòng nhập Code"})
            if(!ManagerId) return res.json({data:null, Message: "Vui lòng nhập người quản lý"})
            let checkName = await Building.findOne({
                where: {
                    Name: Name
                }
            })
            let checkCode = await Building.findOne({
                where: {
                    Code: Code
                }
            })

            if(checkName) return res.json({data:null, Message: "Tên tòa nhà đã tồn tại"})
            if(checkCode) return res.json({data: null, Message: "Code đã tồn tại"})
            let building = req.body
            // console.log("building",building)
            let data = await Building.create(building)
            if(!data) return res.json({data:null, Message:"Error Create"})
		    res.json({data:data, Message: "Success Create"})     
        } catch (error) {
            console.log(error)
        }
    }

    async buildingListGet(req,res,next){
			let { draw, order, length, search, start } = req.query
			start = parseInt(start)
            draw = parseInt(draw)
            length = parseInt(length)
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            let cond = {IsDeleted: 0}
            if(search.value !== ""){
                cond = {
                    IsDeleted: 0,
                    [Op.or]:{
                        Id:keyword,
                        Name:keyword,
                    }
                }
            }
            try{
                let { rows, count } = await Building.findAndCountAll({
                    limit:length,
                    offset:start,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:cond,
                    include : [
                        {
                            model: User, as: 'Manager' ,attributes: ['Id','FullName']
                        }
                    ]
                })
                console.log("count",count)
                // số căn hộ trong tòa nhà
                let listHouse = await House.findAll({
                    attributes : ['Id','Name','BuildingId']
                })
                rows.forEach(valueBuilding =>{
                    let count_House = 0
                    listHouse.forEach(valueHouse =>{
                        if(valueBuilding.dataValues.Id == valueHouse.dataValues.BuildingId){
                            count_House += 1
                        }
                    })
                    valueBuilding.dataValues.countHouse = count_House

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
    async deleteBuildingPost(req, res, next) {
		try{
			let data = await Building.update(
				{IsDeleted:true},
				{where: { Id: req.params.id }}
			)
			res.json({data:data,message: "Xóa thành công"})
		}
		catch(error){
			console.log(error)
			res.json({data:null, message: "Xóa không thành công"}) 
		}	
    }
    

    async editBuilding(req,res,next){
        let { Name, Code,Note,Address,BillDateRange,ElectricBill,WaterType,WaterPrice,CarParkPrice,MotobikeParkPrice,ServicePrice,BikeParkPrice,Id } = req.body
		try{
			let check = await Building.findOne({
				where: {
					Id: Id
				}
			})
			if (!check) return res.json({data:null, Message: i18n.__('General.Fail.NotFound')})
            if(!Name) return res.json({data:null, Message: 'Họ tên không được trống'})
            
            let checkName = await Building.findOne({
                where: {
                    Name: Name
                }
            })
            if(checkName) return res.json({data:null, Message: "Tên đã tồn tại"})
			let newData = {}
			Object.assign(
				newData,
				{
					Name:Name,
                    Code:Code,
                    Note:Note,
                    Address:Address,
                    BillDateRange:BillDateRange,
                    ElectricBill:ElectricBill,
                    WaterType:WaterType,                     
                    WaterPrice:WaterPrice,
                    CarParkPrice:CarParkPrice,
                    MotobikeParkPrice:MotobikeParkPrice,
                    BikeParkPrice:BikeParkPrice,
                    ServicePrice:ServicePrice
				}
            )
			let data = await Building.update(newData,{where:{Id:Id}})
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
        For manager
    **/
    async listManagerBuilding(req, res, next){
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
                    Code:keyword,
                    Address:keyword,
                }
            }
        }
        try{
            let { rows, count } = await Building.findAndCountAll({
                limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond
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
}
module.exports = CmsBuildingHandler