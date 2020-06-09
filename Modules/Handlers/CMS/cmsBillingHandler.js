const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Billing = db.Billing;
const User = db.User;
const Contract = db.Contract;
const BillPaymentStatus = db.BillPaymentStatus;
const CONSTANT = require("../../../Config/constant");
const i18n = require("i18n");
const moment = require("moment-timezone");
const NotifyHelpers = require('../../Helpers/NotifyHelper')

moment().tz('Asia/Ho_Chi_Minh').format();
class CmsBillingHandler {
    constructor(){}
    async checkBeforeSave(req,res){
        let Id = req.body.Id //HouseId
        let type = req.body.type
        try{
            let contract = await Contract.findOne({
                where: {
                    HouseId: Id,
                    IsDeleted:0
                }
            })
            if(!contract){
                return res.json({data:null, Message: 'Không thể tạo hoá đơn trước khi tạo hợp đồng!'})
            }else{
                if(type == CONSTANT.BILL_TYPE.NEW){
                    let oldNewBill = await Billing.findOne({
                        where: {
                            HouseId: Id,
                            IsDeleted:0,
                            IsDraft: 0,
                            Type:CONSTANT.BILL_TYPE.NEW
                        }
                    })
                    if(oldNewBill) {
                        return res.json({data:null, Message: 'Đã tồn tại một hoá đơn Hợp đồng mới cho căn hộ này'})
                    }else{
                        res.json({data:oldNewBill, Message:'Đang chuyển hướng tới trang tạo hoá đơn'})
                    }
                }
                if(type == CONSTANT.BILL_TYPE.MONTHY){
                    let oldNewBill = await Billing.findOne({
                        where: {
                            HouseId: Id,
                            IsDeleted:0,
                            IsDraft: 0,
                            Type:CONSTANT.BILL_TYPE.NEW
                        }
                    })
                    if(!oldNewBill) {
                        return res.json({data:null, Message: 'Bạn chưa tạo hoá đơn Hợp đồng mới cho căn hộ này'})
                    }else{
                        
                        let oldBill = await Billing.findAll({
                            limit: 1,
                            where: {
                                HouseId: Id,
                                IsDeleted:0,
                                IsDraft: 0,
                                Type:CONSTANT.BILL_TYPE.MONTHY
                            },
                            order: [[ 'CreatedDate', 'DESC' ]],
                            attributes: ['CreatedDate']
                        })
                        if(oldBill.length == 0){
                            res.json({data:oldBill, Message:'Đang chuyển hướng tới trang tạo hoá đơn'})
                        }else{
                            const thisMonth = moment().format('YYYY-MM-DD');
                            let billMonth = moment(oldBill[0].CreatedDate).format("YYYY-MM-DD");
                            let endMonth = moment(thisMonth, "YYYY-MM-DD");
                            let result = endMonth.diff(billMonth, 'months');
                            if(result == 0) {
                                return res.json({data:null, Message: 'Bạn đã tạo hoá đơn tháng này cho căn hộ này'})
                            }else{
                                res.json({data:oldBill, Message:'Đang chuyển hướng tới trang tạo hoá đơn'})
                            }
                        }
                    }
                }
                if(type == CONSTANT.BILL_TYPE.END){
                    let oldEndBill = await Billing.findOne({
                        where: {
                            HouseId: Id,
                            IsDeleted:0,
                            IsDraft: 0,
                            Type:CONSTANT.BILL_TYPE.END
                        }
                    })
                    if(oldEndBill) {
                        return res.json({data:null, Message: 'Đã tồn tại một hoá đơn thanh lý cho căn hộ này'})
                    }else{
                        res.json({data:1, Message:'Đang chuyển hướng tới trang tạo hoá đơn'})
                    }
                } 
            }          
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }
    async saveBillAsDraft(req, res){
    	try{
    		let { BuildingId, 
                HouseId, 
                ResidentId, 
                DateRange, 
                DepositMoney, 
                ResiMoney, 
                HouseFee, 
                FromDate, 
                ToDate, 
                RoomBlance, 
                Type, 
                CreatedBy, 
                IsDeleted,
                IsDraft,
                Note,
                WarFirstNum,
                WarLastNum,
                WarPrice,
                ElFirstNum,
                ElLastNum,
                ElPrice,
                ParkingPrice,
                SerCompo,
                InDebtMoney,
                RedunMoney,
                SalePrice,
                OtherFee
            } = req.body
            const random = Math.floor(100000 + Math.random() * 900000);
            let Code = `3SHĐ-${random}`;
            if(Type != CONSTANT.BILL_TYPE.END){
                ToDate = await moment(ToDate).format('DD/MM/YYYY')
                FromDate = await moment(FromDate).format('DD/MM/YYYY')
            }else{
                ToDate = ToDate
                FromDate = await moment(FromDate).format('DD/MM/YYYY')
            }
            if(!ToDate) return res.json({data:null, Message: "Vui lòng chọn ngày thanh lý"})
    		if(!DepositMoney) return res.json({data:null, Message: "Tiền cọc không được để trống"})
            if(!ResidentId) return res.json({data:null, Message: "Căn hộ này chưa có cư dân ở"})
    		if(!HouseFee) return res.json({data:null, Message: "Tiền nhà không được để trống"})
            if(WarLastNum){
                if(parseInt(WarLastNum)<parseInt(WarFirstNum)){
                    return res.json({data:null, Message: "Số nước cuối phải lớn hơn số nước đầu"})
                }
            } 
            if(ElLastNum){
                if(parseInt(ElLastNum)<parseInt(ElFirstNum)){
                    return res.json({data:null, Message: "Số điện cuối phải lớn hơn số điện đầu"})
                }
            }
    		let data = await Billing.create({
                BuildingId, 
                HouseId, 
                ResidentId, 
                DateRange, 
                DepositMoney, 
                ResiMoney,
                HouseFee, 
                FromDate, 
                RoomBlance, 
                ToDate, 
                Type, 
                CreatedBy, 
                IsDeleted,
                IsDraft,
                Note,
                WarFirstNum,
                WarLastNum,
                WarPrice,
                ElFirstNum,
                ElLastNum,
                ElPrice,
                ParkingPrice,
                SerCompo,
                InDebtMoney,
                RedunMoney,
                SalePrice,
                OtherFee,
                Code
            })
    		if(!data) return res.json({data:null, Message: i18n.__('General.Fail.Opps')})
    		res.json({data:data, Message: "Tạo mới thành công"})	
    	}catch(error){
    		console.log(error)
    		res.status(500).json({
                data:null,
    			Success:false,
    			Message: i18n.__('General.Fail.Opps'),
    			Error: error
    		})
    	}
    }
    async saveBill(req, res){
        try{
            let { Id, IsDeleted, TotalFee, IsDraft} = req.body
            let userId = req.session.admin.Id
            let check = await Billing.findOne({
                where: {
                    Id:Id
                }
            })
            if(!check) return res.json({data:null, Message: i18n.__('General.Fail.NotFound')})
            let data = await Billing.update({
                IsDeleted:IsDeleted,
                IsDraft:IsDraft, 
                TotalFee:TotalFee, 
                Status: CONSTANT.BILL_STATUS.NEW, 
                UpdatedDate:Date.now()
            },{where:{Id:Id}})
            if(!data) return res.json({data:null, Message: i18n.__('General.Fail.Opps')})
            await BillPaymentStatus.create({BillId: Id,UserId:userId, Name: CONSTANT.BILL_STATUS.NEW,CreatedDate:Date.now()})
            //Gửi thông báo cho cư dân
            let user = await User.findOne({
                where: {
                    Id: check.ResidentId
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
            let contentNotify = `Xin chào ${user.FullName}. 3SHomes gửi bạn hoá đơn tiền nhà tháng ${moment(check.FromDate).format('MM/YYYY')}.`
            NotifyHelpers.newBillToResident(Id, userId, check.ResidentId, contentNotify, player)
            res.json({data:data, Message: 'Lưu hoá đơn thành công'})
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

module.exports = CmsBillingHandler    