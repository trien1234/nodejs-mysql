const db = require('../../Models/index');
const User = db.User;
const House = db.House;
const Building = db.Building;
const FixerGroup = db.FixerGroup;
const Role = db.Role;
const i18n = require("i18n");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class CmsUserHandler{
	constructor(){}
	async addUser(req, res){
		try{
			let {FullName, Email, RoleId, FixerGroupId, HouseId, Tel, Password} = req.body;
			if(!FullName) return res.json({data:null, Message: "Vui lòng nhập họ tên"})
			if(!Email) return res.json({data:null, Message: "Vui lòng nhập Email"})
			if(!Tel) return res.json({data:null, Message: "Vui lòng nhập Số điện thoại"})
			if(!Password) return res.json({data:null, Message: "Vui lòng nhập mật khẩu"})
			if(!RoleId) return res.json({data:null, Message: "Vui lòng chọn chức vụ"})
			let checkEmail = await User.findOne({
				where: {
					Email:Email
				}
			})
			let checkTel = await User.findOne({
				where: {
					Tel: Tel
				}
			})
			if(checkTel) return res.json({data:null, Message: "Số điện thoại đã tồn tại"})	
			if(checkEmail) return res.json({data:null, Message: "Email đã tồn tại"})
			let data = await User.create({
				FullName: FullName,
				Email: Email,
				RoleId: RoleId,
				FixerGroupId: FixerGroupId?FixerGroupId:null,
				HouseId: HouseId?HouseId:null,
				Active: "AC",
				Tel: Tel,
				Password: Password
			})
			if(!data) return res.json({data:null, Message: i18n.__('General.Fail.Opps')})
			res.json({data:data, Message: i18n.__('General.Success.Create')})
		}catch(error){
			console.log(error)
			res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
		}	
	}

	//lay tat ca DS user theo Role
	async listUser(req, res){
		let role = req.query.role
		let BuildingId = req.query.BuildingId			
		let {draw, order, length, search, start } = req.query
	    start = parseInt(start)
	    draw = parseInt(draw)
	    length = parseInt(length)
		let cond = {IsDeleted: 0,}
		if(BuildingId){
			let listHouse = await House.findAll({
				where : {BuildingId:BuildingId},
				attributes : ['Id']
			})
			let listHouseId = []
			listHouse.forEach(value=>{
				listHouseId.push(value.dataValues.Id)
			})
			cond = {
				IsDeleted: 0,
				HouseId: {[Op.in]: listHouseId}
			}
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            if(search.value !== ""){
                cond = {
                    IsDeleted: 0,
                    [Op.or]:{
                        FullName:keyword,
						Email:keyword,
						Tel:keyword
						
					},
					HouseId: {
						[Op.in]: listHouseId
					  }
                }
            }
        }
	    else{
			let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
			if (search.value !== ""){
				cond = {
					IsDeleted: 0,
					[Op.or]:{
						FullName:keyword,
						Email:keyword,
						Tel:keyword,
					}
				}
			}

		}
		try{
			let { rows, count } = await User.findAndCountAll({
				limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond,
                include: [
                	{
                		model: FixerGroup,
                		as: 'FixerGroup',
                		attributes: ['Name']
					},
					{
						model: Role,
						as: 'Role',
						where: {
							Type: role
						}
					}
                ]
			})
			let dataHouse = await House.findAll({
				attributes : ['Id','Name']
			})
			//lấy user ở trong căn hộ nào
			rows.forEach(value=>{ 
				dataHouse.forEach(valueHoues=>{		
					if(value.dataValues.HouseId == valueHoues.dataValues.Id){
						value.dataValues.House = valueHoues.dataValues.Name
						value.dataValues.HouseId = valueHoues.dataValues.Id
					}
				})
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

	async editUsers(req, res){
		let {FullName, Address, Id} = req.body
		try{
			let check = await User.findOne({
				where: {
					Id: Id
				}
			})
			if (!check) return res.json({data:null, Message: i18n.__('General.Fail.NotFound')})
			if(!FullName) return res.json({data:null, Message: 'Họ tên không được trống'})
			let newData = {}
			Object.assign(
				newData,
				{
					FullName:FullName,
					Address:Address
				}
			)
			let data = await User.update(newData,{where:{Id:Id}})
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
module.exports = CmsUserHandler;