const db = require('../Models/index');
const Billing = db.Billing;
const Building = db.Building;
const House = db.House;
const Incident = db.Incident;
const ApartmentStatus = db.ApartmentStatus;
const BillPaymentMethod = db.BillPaymentMethod;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require('moment');
const CONSTANT = require("../../Config/constant");
const Paging = require('paginate-info');
const NotifyHelpers = require('../Helpers/NotifyHelper.js')

class StatisticHandler{
	constructor(){}
	async allStatistic(req, res){
		let buildingId =  {[Op.like] :'%' + (req.query.buildingId ? req.query.buildingId : "") + '%' };
        let startDate = req.query.startDate ? req.query.startDate : "";
        let endDate = req.query.endDate ? req.query.endDate : moment(Date.now()).format("YYYY-MM-DD H:mm:ss");
        // let type = {[Op.like] :'%' + (req.query.type ? req.query.type : "") + '%'};
		try{
			let Statistic = {}
			let incident = {}
			let incidentType = {}
			let billStatus = {}
			let paymentMethod = {}
			//About House
			let devokHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.PAY_OFF
				}
			})
			let notReadyHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.NOT_READY
				}
			})
			let readyHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.READY
				}
			})
			let depositHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.DEPOSITED
				}
			})
			let stayingHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.STAYING
				}
			})
			let nearlyExpriedHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.NEARLY_EXPRIED
				}
			})
			let extendHouse = await House.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.HOUSE_STATUS.EXTEND
				}
			})
			//About Incident
			let finishIncident = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.IncidentStatus.FINISH
				}
			})
			let fixingIncident = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.IncidentStatus.TROUBLESHOOTING
				}
			})
			let pricingIncident = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.IncidentStatus.PRICING
				}
			})
			let receivedIncident = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.IncidentStatus.MANAGERRECEIVED
				}
			})
			let sentIncident = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.IncidentStatus.SENT
				}
			})
			//About Incident Type
			let electric = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.DIEN
				}
			})
			let water = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.NUOC
				}
			})
			let refrigeration = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.DL
				}
			})
			let internet = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.INTERNET
				}
			})
			let environment = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.MT
				}
			})
			let equipment = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.TTB
				}
			})
			let human = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.HM
				}
			})
			let other = await Incident.count({
				where: {
					IsDeleted: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    IncidentTypeId: CONSTANT.INCIDENT_TYPE.KHAC
				}
			})
			//About Bill Status
			let newBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.NEW
				}
			})
			let paidBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.PAID
				}
			})
			let paidRedunBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.PAID_REDUN
				}
			})
			let paidIndeptBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.PAID_INDEPT
				}
			})
			let doneBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.DONE
				}
			})
			let expriedBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.EXPRIED
				}
			})
			let revokBill = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId,
					CreatedDate: {
                        [Op.between]: [startDate, endDate]
                    },
                    Status: CONSTANT.BILL_STATUS.REVOKE
				}
			})
			//About Bill Payment Method
			let cashier = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId				
				},
				include: [
					{
						model: BillPaymentMethod,
						as: 'PaymentMethod',
						where: {
							Method: CONSTANT.PAYMENT_METHOD.CASHIER,
							CreatedDate: {
		                        [Op.between]: [startDate, endDate]
		                    }
						}
					}
				]
			})
			let card = await Billing.count({
				where: {
					IsDeleted: 0,
					IsDraft: 0,
					BuildingId: buildingId					
				},
				include: [
					{
						model: BillPaymentMethod,
						as: 'PaymentMethod',
						where: {
							Method: CONSTANT.PAYMENT_METHOD.CARD,
							CreatedDate: {
		                        [Op.between]: [startDate, endDate]
		                    }
						}
					}
				]
			})

			Object.assign(Statistic,{
				House: {
					devokHouse:devokHouse,
					extendHouse:extendHouse,
					nearlyExpriedHouse:nearlyExpriedHouse,
					stayingHouse:stayingHouse,
					depositHouse:depositHouse,
					readyHouse:readyHouse,
					notReadyHouse:notReadyHouse
				},
				Incident: {
					finishIncident:finishIncident,
					fixingIncident:fixingIncident,
					pricingIncident:pricingIncident,
					receivedIncident:receivedIncident,
					sentIncident:sentIncident
				},
				IncidentType: {
					electric:electric,
					water:water,
					refrigeration:refrigeration,
					internet:internet,
					environment:environment,
					equipment:equipment,
					human:human,
					other:other
				},
				BillStatus: {
					newBill:newBill,
					paidBill:paidBill,
					paidRedunBill:paidRedunBill,
					paidIndeptBill:paidIndeptBill,
					doneBill:doneBill,
					expriedBill:expriedBill,
					revokBill:revokBill
				},
				BillPaymentMethod: {
					cashier:cashier,
					card:card
				}
			})
			res.status(200).json({
				Success:true,
				Data:Statistic
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
}


module.exports = StatisticHandler