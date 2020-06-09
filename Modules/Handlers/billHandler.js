const db = require('../Models/index');
const Billing = db.Billing;
const Building = db.Building;
const House = db.House;
const User = db.User;
const Role = db.Role;
const Contract = db.Contract;
const WaterPriceType = db.WaterPriceType;
const BillPaymentStatus = db.BillPaymentStatus;
const BillPaymentMethod = db.BillPaymentMethod;
const BillPaymentNote = db.BillPaymentNote;
const BillExpriedCalendar = db.BillExpriedCalendar;
const Setting = db.Setting;
const Vehicle = db.Vehicle;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require('moment');
const CONSTANT = require("../../Config/constant");
const Paging = require('paginate-info');
const NotifyHelpers = require('../Helpers/NotifyHelper.js')

class BillHandler{
	constructor(){}

	async getAllBillByBuildingId(req,res){
		let buildingId =  {[Op.like] :'%' + (req.query.buildingId ? req.query.buildingId : "") + '%' };
		let userId =  {[Op.like] :'%' + (req.query.userId ? req.query.userId : "") + '%' };
		const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:15;
        let startDate = req.query.startDate ? req.query.startDate : "";
        let endDate = req.query.endDate ? req.query.endDate : moment(Date.now()).format("YYYY-MM-DD H:mm:ss");
        let status =  {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' };
        let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
        let type = {[Op.like] :'%' + (req.query.type ? req.query.type : "") + '%'};
		try{
			const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);
			let {rows, count} = await Billing.findAndCountAll({
				limit,
				offset,
				order: [
                    ['Id', 'DESC']
                ],
				where:{
                    IsDeleted: 0,
                    IsDraft: 0,
                    Status: status,
                    Type: type,
                    Code: keyword,
                    [Op.and]: {
                        CreatedDate: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                },
                include: [
                	{
                		model: Building,
                        as: 'Building',
                        where: {
                            IsDeleted: 0,
                            ManagerId: userId,
                            [Op.and]:{
                                Id: buildingId
                            }
                        },
                        attributes: ['Id','Code'],
                	},
                	{
                		model: House,
                		as: 'House',
                		where: {
                			IsDeleted: 0
                		},
                		attributes: ['Id', 'Code']
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
            	let bill = [];
            	rows.forEach(b => {
            		bill.push({
            			Id: b.Id,
            			Code: b.Code,
            			CreatedDate: moment(b.CreatedDate).format('DD.MM.YYYY - H:mm'),
            			Status: b.Status,
            			Money: (b.HouseFee+b.SerCompo+b.WarPrice+
            				b.ElPrice+b.ParkingPrice+b.OtherFee+
            				b.InDebtMoney+b.DepositMoney)-
            				b.SalePrice-b.RedunMoney-b.ResiMoney,
            			House: b.House.Code,
            			Building:b.Building.Code
            		})
            	})
            	return res.status(200).json({
                    Success: true,
                    Data: {bill, meta},
                });
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
	CountCar(houseId){
		let countCar = Vehicle.count({
			where:{
				Type: CONSTANT.VIHICLE_TYPE.CAR,
				HouseId: houseId,
				Active:1
			}
		})
		return countCar
	}
	CountMotor(houseId){
		let countMotor = Vehicle.count({
			where:{
				Type: CONSTANT.VIHICLE_TYPE.MOTOR,
				HouseId: houseId,
				Active:1
			}
		})
		return countMotor
	}
	CountBike(houseId){
		let countBike = Vehicle.count({
			where:{
				Type: CONSTANT.VIHICLE_TYPE.BIKE,
				HouseId: houseId,
				Active:1
			}
		})
		return countBike
	}
	async detail(req, res){
		let Id = req.params.id
		let method = req.query.method
		try{
			await Billing.findOne({
				where: {
					Id: Id,
					IsDeleted: 0,
					IsDraft: 0
				},
				include: [
					{
						model: Building,
						as: 'Building',
						attributes: ['Id', 'Code'],
						include: [
							{
								model: User,
								as: "Manager",
								attributes: ['FullName', 'Id'],
								include: [
									{
										model: Role,
										as: "Role",
										attributes: ['Name']
									}
								]
							}
						]
					},
					{
						model: House,
						as: 'House',
						attributes: ['Id', 'Code']
					},
					{
						model: User,
						as: 'Resident',
						attributes: ['Id', 'FullName', 'Address', 'Tel']
					},
					{
						model: BillPaymentStatus,
						as: 'LifeStatus',
						separate: true,
						attributes: ['Name','CreatedDate']
					},
					{
						model: BillPaymentMethod,
						separate: true,
						as: 'PaymentMethod',
						attributes: ['Method','Money']
					},
					{
						model: BillPaymentNote,
						separate: true,
						as: 'BillNote',
						attributes: ['Id','Content','CreatedDate'],
						include: [
							{
								model: User,
								as: 'User',
								attributes: ['Id', 'FullName', 'Avatar', 'RoleId'],
								include:[
									{
										model: Role,
										as: 'Role',
										attributes: ['Name']
									}	
								]
							}
						]
					},
					{
						model: BillExpriedCalendar,
						as: 'BillExpriedCalendar',
						separate: true,
						attributes: ['PayDay','ExpriedMoney','Reason']
					}
				]
			}).then(async bill => {
				let data = {}
				let feeBill = await Contract.findOne({
					where: {
						HouseId: bill.House.Id,
						IsDeleted: 0
					},
					attributes: ['ElectricBill','WaterPriceType','BikeParkPrice','CarParkPrice','MotobikeParkPrice','RentalFee']
				})
				let waterPriceType = feeBill.WaterPriceType
				let Water = {}
				if(waterPriceType ==CONSTANT.WATERPRICE_TYPE.M3){
					let waterBill = await WaterPriceType.findOne({
						where: {
							Id: CONSTANT.WATERPRICE_TYPE.M3
						},
						attributes: ['Price']
					})
					Water = {
						FirstNum: bill.WarFirstNum,
						LastNum: bill.WarLastNum,
						Spent: bill.WarLastNum-bill.WarFirstNum,
						Bill: waterBill.Price,
						Price: bill.WarPrice
					}
				}else if(waterPriceType ==CONSTANT.WATERPRICE_TYPE.PERSON){
					let waterBill = await WaterPriceType.findOne({
						where: {
							Id: CONSTANT.WATERPRICE_TYPE.PERSON
						},
						attributes: ['Price']
					})
					let countResident = await User.count({
						where:{
							HouseId: bill.House.Id,
							IsDeleted: 0
						},
						include: [
							{
								model: Role,
								as: 'Role',
								where: {
									Type: CONSTANT.RoleType.Resident
								}
							}
						]
					})
					Water = {
						User: countResident,
						Bill: waterBill.Price,
						Price: bill.WarPrice
					}
				}
				let countCar = await this.CountCar(bill.House.Id)
				let countMotor = await this.CountMotor(bill.House.Id)
				let countBike = await this.CountBike(bill.House.Id)
				let billNote = [];
				bill.BillNote.forEach(bn=>{
					billNote.push({
						Id: bn.Id,
						Content: bn.Content,
						CreatedDate: moment(bn.CreatedDate).format('DD/MM/YYYY - H:mm'),
						ByUser: {
							FullName: `${bn.User.Role.Name}: ${bn.User.FullName}`,
							Avatar: bn.User.Avatar
						}
					})
				})
				let totalFee = bill.TotalFee
				let billStatus = []
				bill.LifeStatus.forEach(bs=>{
					billStatus.push({
						Name:bs.Name,
						CreatedDate:moment(bs.CreatedDate).format("DD.MM.YYYY - H:mm")
					})
				})
				let billexpriedCalendar = {}
				bill.BillExpriedCalendar.forEach(bec=>{
					Object.assign(billexpriedCalendar,{
						PayDay:moment(bec.PayDay).format('DD.MM.YYYY - H:mm'),
						ExpriedMoney: bec.ExpriedMoney,
						Reason:bec.Reason
					})
				})
				let payMethod  = {};
				if(method == CONSTANT.PAYMENT_METHOD.CASHIER){
					payMethod = {
						PayTime: moment(bill.ToDate).format('DD.MM.YYYY')
					}
				}else if(method == CONSTANT.PAYMENT_METHOD.CARD){
					let setting = await Setting.findAll({
						limt:1,
						attributes: ['BankName','BankAccount','BankNum']
					})
					payMethod = {
						Content: `TIEN PHONG ${bill.Building.Code}-${bill.House.Code} ${bill.Code}`,
						Infor: `${setting[0].BankAccount} - ${setting[0].BankName}`,
						Number: setting[0].BankNum
					}
				}
				Object.assign(data,{
					Id:bill.Id,
					Type: bill.Type,
					Code: bill.Code,
					House: `${bill.Building.Code}-${bill.House.Code}`,
					Resident: bill.Resident,
					Manager: `${bill.Building.Manager.Role.Name}: ${bill.Building.Manager.FullName}`,
					Month: moment(bill.FromDate).format('MM'),
					FromDate: moment(bill.FromDate).format('DD.MM.YYYY'),
					ToDate: moment(bill.ToDate).format('DD.MM.YYYY'),
					CreatedDate: moment(bill.CreatedDate).format('DD.MM.YYYY - H:mm'),
					DateRange: bill.DateRange,
					RentalFee: feeBill.RentalFee,
					HouseFee: bill.HouseFee,
					Electric: {
						FirstNum: bill.ElFirstNum,
						LastNum: bill.ElLastNum,
						Spent: bill.ElLastNum-bill.ElFirstNum,
						Bill: feeBill.ElectricBill,
						Price: bill.ElPrice
					},
					Water:{
						Type:waterPriceType,
						Stats:Water 
					},
					ParkingPrice: {
						Car: countCar,
						Motor: countMotor,
						Bike: countBike,
						Bill:{
							Car: feeBill.CarParkPrice,
							Motor:feeBill.MotobikeParkPrice,
							Bike: feeBill.BikeParkPrice
						},
						Price: bill.ParkingPrice
					},
					ComboService: bill.SerCompo,
					InDebtMoney: bill.InDebtMoney,
					RedunMoney: bill.RedunMoney,
					SalePrice: bill.SalePrice,
					OtherFee: bill.OtherFee,
					Note:bill.Note,
					Total: totalFee,
					ResiMoney: bill.ResiMoney?bill.ResiMoney:0,
					BillStatus:billStatus,
					PaymentMethod: {
						Method:bill.PaymentMethod,
						Remain: parseInt(totalFee-parseInt(bill.ResiMoney))
					},
					PayMethod:payMethod,
					BillNote: billNote,
					ExpriedCalendar: billexpriedCalendar				
				})
				res.status(200).json({
					Success: true,
					Data: data
				})
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

	async managerReceiveMoney(req,res){
		let {billId, userId, method, money} = req.body
		try{
			let bill = await Billing.findOne({
				where: {
					Id: billId,
					IsDraft: 0,
					IsDeleted: 0
				}
			})
			let oldBillMoney = bill.ResiMoney ? parseInt(bill.ResiMoney):0
			let totalFee = parseInt(bill.TotalFee)

			if(!bill) return res.status(200).json({data:null, Message: i18n.__('General.Fail.NotFound')})
			await BillPaymentMethod.create({BillId: billId, UserId: userId, Method: method, Money: money}).then(async result=>{
				let redunMoney = '' //Tien thua
				let status = ''
				if((parseInt(result.Money)+oldBillMoney) > totalFee){ // Nếu tiền nộp lớn hơn tiền phí
					redunMoney =(parseInt(result.Money)+oldBillMoney)-parseInt(totalFee) //Thì tiền thừa sẽ bằng tổng tiền nộp trừ tiền phí
					status = CONSTANT.BILL_STATUS.PAID_REDUN
				}else if (parseInt(result.Money) < (parseInt(totalFee)-oldBillMoney)){
					redunMoney = 0
					status = CONSTANT.BILL_STATUS.PAID_INDEPT
				}else if (parseInt(result.Money) == (parseInt(totalFee)-oldBillMoney)){
					redunMoney = 0
					status = CONSTANT.BILL_STATUS.PAID
				}
				await Billing.update({
					Status:status,
					ResiMoney: parseInt(oldBillMoney)+parseInt(result.Money),
					RedunMoney: redunMoney,
					ManagerReceiveMoneyDate: Date.now()
				},
				{
					where:{
						Id: billId
					}
				})
				await BillPaymentStatus.create({
					BillId: billId,
					UserId: userId,
					Name: status,
				})
				res.status(200).json({
					Success: true,
					Message: i18n.__('General.Success.Create'),
					Data: result
				})
			})
			
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps'),
				Error: error
			})

		}
	}

	async addNote(req,res){
		try{
			let {billId, userId, content} = req.body
			let bill = await Billing.findOne({
				where: {
					Id: billId,
					IsDraft: 0,
					IsDeleted:0
				}
			})
			if(!bill) return res.status(200).json({data:null, Message: i18n.__('General.Fail.NotFound')})
			await BillPaymentNote.create({
				BillId:billId,
				CreatedBy:userId,
				Content: content
			}).then(result=>{
				res.status(200).json({
					Success: true,
					Message: i18n.__('General.Success.Create'),
					Data: result
				})
			})
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps'),
				Error: error
			})
		}
	}

	async residentGetAllBill(req, res){
		// let userId =  {[Op.like] :'%' + (req.query.userId ? req.query.userId : "") + '%' };
		const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:15;
        let status =  {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' };
        let type = {[Op.like] :'%' + (req.query.type ? req.query.type : "") + '%'};
		try{			
	        const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);
	        let {rows, count} = await Billing.findAndCountAll({
	        	limit,
	        	offset,
	        	order: [
                    ['Id', 'DESC']
                ],
				where:{
                    IsDeleted: 0,
                    Status: status,
                    ResidentId: req.query.userId
                },
                include: [
                	{
                		model: BillPaymentMethod,
                		as: "PaymentMethod",
                		separate:true,
                		where: {
                			[Op.and]:{
                                Method: type
                            }
                		}
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
            	let bill = [];
            	rows.forEach(b=>{
            		bill.push({
            			Id: b.Id,
            			Month: moment(b.FromDate).format("MM"),
            			CreatedDate: moment(b.CreatedDate).format('DD.MM.YYYY H:mm'),
            			Code: b.Code,
            			TotalFee: b.TotalFee,
            			Status: b.Status
            		})
            	})
            	res.status(200).json({
            		Success: true,
            		Data:{bill,meta}
            	})
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

	async setPayingSchedule(req, res){
		try{
			let {BillId, CreatedBy, Reason, PayDay, ExpriedMoney} = req.body.Schedule
			let schedule = {}
			Object.assign(schedule,{
				BillId: BillId,
				CreatedBy: CreatedBy,
				Reason: Reason,
				PayDay: moment(PayDay,"DD.MM.YYYY hh:mm").format('YYYY-MM-DD hh:mm:ss'),
				ExpriedMoney: ExpriedMoney
			})
			let oldSchedule = await BillExpriedCalendar.findOne({
				where: {
					BillId: BillId
				}
			})
			if(oldSchedule){
				await BillExpriedCalendar.update(schedule,{where:{BillId:BillId}}).then(result=>{
					res.status(200).json({
						Success: true,
						Message: i18n.__('General.Success.Create'),
						Data: result
					})
				})
			}else{
				await BillExpriedCalendar.create(schedule).then(result=>{
					res.status(200).json({
						Success: true,
						Message: i18n.__('General.Success.Create'),
						Data: result
					})
				})
			}
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
module.exports = BillHandler