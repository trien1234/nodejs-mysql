const db = require('../../Models/index');
const Setting = db.Setting;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const CONSTANT = require("../../../Config/constant");
const i18n = require("i18n");
const moment = require("moment-timezone");

class CmsSettingHandler{
	constructor(){}

	async updateSetting(req,res){
		try{
			let {Name,Slogan,
				Address,Email,
				Phone,Website,
				BankName,BankAccount,
				BankNum,FaceBook,
				Youtube,Twitter,
				LinkedIn,
				OpenTime,CloseTime,
				IncidentReceiveTime,
				IncidentFixingTime,
				ExpriedContractTime,
				IncidentFixingScheduleTime} = req.body
			if(!Name) return res.json({data:null, Message:('Vui lòng nhập tên công ty')})	
			if(!Address) return res.json({data:null, Message:('Vui lòng nhập địa chỉ công ty')})	
			if(!Email) return res.json({data:null, Message:('Vui lòng nhập Email')})	
			if(!Phone) return res.json({data:null, Message:('Vui lòng nhập số điện thoại')})	
			if(!BankName) return res.json({data:null, Message:('Vui lòng nhập tên ngân hàng')})	
			if(!BankAccount) return res.json({data:null, Message:('Vui lòng nhập tên chủ tài khoản')})	
			if(!BankNum) return res.json({data:null, Message:('Vui lòng nhập số tài khoản ngân hàng')})
			let setting = await Setting.findOne();
			IncidentReceiveTime = IncidentReceiveTime?IncidentReceiveTime:setting.IncidentReceiveTime;	
			IncidentFixingTime = IncidentFixingTime?IncidentFixingTime:setting.IncidentFixingTime;	
			ExpriedContractTime = ExpriedContractTime?ExpriedContractTime:setting.ExpriedContractTime;	
			IncidentFixingScheduleTime = IncidentFixingScheduleTime?IncidentFixingScheduleTime:setting.IncidentFixingScheduleTime;
			let FanPage = {}
			Object.assign(FanPage,{
				FaceBook:FaceBook?FaceBook:"",
				Youtube:Youtube?Youtube:"",
				Twitter:Twitter?Twitter:"",
				LinkedIn:LinkedIn?LinkedIn:""
			})
			await Setting.update({
				Name:Name,
				Slogan:Slogan,
				Address:Address,
				Email:Email,
				Phone:Phone,
				Website:Website,
				BankName:BankName,
				BankAccount:BankAccount,
				BankNum:BankNum,
				OpenTime:OpenTime,
				CloseTime:CloseTime,
				IncidentReceiveTime:IncidentReceiveTime,
				IncidentFixingTime:IncidentFixingTime,
				ExpriedContractTime:ExpriedContractTime,
				IncidentFixingScheduleTime:IncidentFixingScheduleTime,
				FanPage:FanPage
			},{
				where:{
					Id:setting.Id
				}
			}).then(result=>{
				res.json({
					data:result,
					Message: 'Cập nhật thành công'
				})
			})	
		}catch(error){
			res.status(500).json({
				data:null,
				Message:error
			})
		}
	}
}

module.exports = CmsSettingHandler