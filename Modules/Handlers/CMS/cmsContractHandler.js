const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Incident = db.Incident;
const House = db.House;
const i18n = require("i18n");
const Contract = db.Contract;
const Building = db.Building;
const Billing = db.Billing;
const User = db.User;
const ApartmentStatusHistory = db.ApartmentStatusHistory;
class ContractHandler{
    constructor(){}
    async contractCreate(req,res,next){
        try {
            let house = await House.findAll()
            res.json({house:house})          
        } catch (error) {
            console.log(error)
        }
    }
    
    async getAttribute(req,res,next){
        try {
            let house = await House.findOne({
                where : {id: req.params.id},
                attributes : ['Id','Name','RentalFee'],
                include: [
                {
                    model: Building, as : 'Building'
                }
            ]

            })
            res.json({house:house})
            
        } catch (error) {
            console.log(error)
        }
    }

    async createContract(req,res,next){
        try {
            let {HouseId,RepresentativeName,RepresentativeTel} = req.body
            if(!HouseId){return res.json({data:null,Message:"Vui lòng nhập nhà"})}
            if(!RepresentativeTel){return res.json({data:null,Message:"Vui lòng nhập số điện thoại"})}
            if(!RepresentativeName){return res.json({data:null,Message:"Vui lòng nhập tên đại diện"})}
            let checkExitsHouse = await Contract.findOne({
                where : {HouseId:HouseId,IsDeleted : 0}
            })
            if(checkExitsHouse){return res.json({data:null,Message:"Căn hộ có hợp đồng còn thời hạn"})}
            let data = Contract.create(req.body)
            if(!data){return res.json({data:null,Message:"Error create"})}
            res.json({data:data,Message: "Success create"}) 
            
        } catch (error) {
            console.log(error)
        }
    }

    async contractList(req,res,next){
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
                        RepresentativeName:keyword,
                    }
                }
            }
            try{
                let { rows, count } = await Contract.findAndCountAll({
                    limit:length,
                    offset:start,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:cond,
                    include : [{
                        model: House, as : 'House',
                        attributes : ['Id','Name']
                    }]
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

    async deleteContract (req,res,next){
        try {
            let data = await Contract.update(
                {IsDeleted: true},
                {where: {Id:req.body.id}}
            )
            let idBill = req.body.houseId
            let updateBill = await Billing.update(
                {IsDeleted: true},
                {where: {Type : 1,HouseId:idBill}}
            )

            let updateUser = await User.update(
                {HouseId: null},
                {where: {HouseId:idBill}}
            )
            if(!data){return res.json({data:null,Message:"Xóa không thành công"})}
            res.json({data,Message:"Xóa thành công"})
        } catch (error) {
            console.log(error)
        }
    }


    async editContract(req,res,next){
        let { HouseId, RepresentativeName,RepresentativeTel,CarParkPrice,MotobikeParkPrice,BikeParkPrice,ServicePrice,ElectricBill,WaterPriceType,BillDateRange,Id } = req.body
		try{
			let check = await Contract.findOne({
				where: {
					Id: Id
				}
			})
			if (!check) return res.json({data:null, Message: i18n.__('General.Fail.NotFound')})
			if(!RepresentativeName) return res.json({data:null, Message: 'Tên người đại diện không được trống'})
			let newData = {}
			Object.assign(
				newData,
				{
					RepresentativeName:RepresentativeName,
                    RepresentativeTel:RepresentativeTel,
                    CarParkPrice:CarParkPrice,
                    MotobikeParkPrice:MotobikeParkPrice,
                    BikeParkPrice:BikeParkPrice,
                    ServicePrice:ServicePrice,
                    ElectricBill:ElectricBill,                      
                    WaterPriceType:WaterPriceType,
                    BillDateRange:BillDateRange,
				}
			)
			let data = await Contract.update(newData,{where:{Id:Id}})
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

}
module.exports = ContractHandler