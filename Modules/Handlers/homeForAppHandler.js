const db = require('../Models/index');
const Billing = db.Billing;
const Building = db.Building;
const House = db.House;
const User = db.User;
const Role = db.Role;
const Incident = db.Incident;
const Contract = db.Contract;
const IncidentType = db.IncidentType;
const BillExpriedCalendar = db.BillExpriedCalendar;
const Setting= db.Setting;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require("moment-timezone");
const CONSTANT = require("../../Config/constant");
const Promise = require("bluebird");

moment().tz('Asia/Ho_Chi_Minh').format();

class HomeForAppHandler{
	constructor(){}

	async managerSearching(req, res){
		let type = req.query.type;
		let userId= req.query.userId;
		let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
		try{
			switch(parseInt(type)){
				case CONSTANT.SEARCHING_TYPE.HOUSE:
					let house = await House.findAll({
						order: [
		                    ['Id', 'DESC']
		                ],
		                where: {
		                	IsDeleted: 0,
		                	ManagerId: userId,
		                	[Op.or]: [
		                		{
		                			Code: keyword
		                		},
		                		{
		                			Name: keyword
		                		}
		                	]
		                },
		                attributes: ['Id','Code','Name']
					})
					let houseData =[]
					house.forEach(h=>{
						houseData.push({
							Id: h.Id,
							Content: `${h.Code} ${h.Name}`
						})
					})
					res.status(200).json({
						Success:true,
						Data:houseData
					})
					break;
				case CONSTANT.SEARCHING_TYPE.BILL:
					let bill = await Billing.findAll({
						order: [
		                    ['Id', 'DESC']
		                ],
		                where: {
		                	IsDeleted: 0,
		                	IsDraft: 0,
		                	Code:keyword
		                },
		                attributes: ['Id', 'Code'],
		                include: [
		                	{
		                		model: Building,
		                        as: 'Building',
		                        where: {
		                            IsDeleted: 0,
		                            ManagerId: userId                       
		                        },
		                        attributes: ['Id','Code','Name']
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
					let data =[]
					bill.forEach(b=>{
						data.push({
							Id: b.Id,
							Content: `${b.Code} ${b.House.Code} ${b.Building.Name}`
						})
					})
					res.status(200).json({
						Success:true,
						Data:data
					})
					break;
				case CONSTANT.SEARCHING_TYPE.INCIDENT:
					let incident = await Incident.findAll({
						order: [
		                    ['Id', 'DESC']
		                ],
		                where: {
		                	IsDeleted: 0,		                	
		                	[Op.or]: [
		                		{
		                			Code:keyword
		                		},
		                		{
		                			Description:keyword
		                		}
		                	]		      
		                },
		                attributes: ['Id','Code'],
	                	include:[
	                		{
		                		model: Building,
		                        as: 'Building',
		                        where: {
		                            IsDeleted: 0,
		                            ManagerId: userId                       
		                        },
		                        attributes: ['Id','Code','Name']
		                	},
		                	{
		                		model: IncidentType,
		                		as: 'Type',
		                		where: {
		                			IsDeleted:0
		                		},
		                		attributes: ['Id','Name']
		                	}
	                	]
					})
					let incidentData = []
					incident.forEach(i=>{
						incidentData.push({
							Id: i.Id,
							Content: `${i.Code} ${i.Type.Name} ${i.Building.Name}`
						})
					})
					res.status(200).json({
						Success:true,
						Data:incidentData
					})
					break;
				case CONSTANT.SEARCHING_TYPE.RESIDENT:
					let findHouse = await House.findAll({
						where: {
							ManagerId: userId
						},
						attributes: ['Id', 'Name', 'Code']
					})
					let userData = []
					await Promise.map(findHouse,async h=> {
					    userData =await User.findAll({
							order: [
			                    ['Id', 'DESC']
			                ],
							where: {
								IsDeleted: 0,
								HouseId: h.Id,
								[Op.or]: [
			                		{
			                			FullName:keyword
			                		},
			                		{
			                			Email:keyword
			                		},
			                		{
			                			Tel:keyword
			                		},
			                		{
			                			IdCard:keyword
			                		}
			                	]
							},
							attributes:['Id','FullName'],
							include: [
								{
									model: Role,
									as: 'Role',
									where: {
										Type: CONSTANT.RoleType.Resident
									},
									attributes: ['Name']
								}					
							]
						})
					});
					let user = []
					userData.forEach(u=>{
						user.push({
							Id:u.Id,
							Content:`${u.FullName}`
						})
					})
					res.status(200).json({
						Success:true,
						Data:user
					})
					break;			
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

	async fixerSearching(req,res){
		let userId= req.query.userId;
		let keyword = {[Op.like] :'%' + (req.query.keyword ? req.query.keyword : "") + '%' };
		try{
			let Fixer = await User.findOne({
	            where: {
	                Id: userId
	            },
	            attributes: ['FixerGroupId']
	        })
			let incident = await Incident.findAll({
				order: [
                    ['Id', 'DESC']
                ],
                where: {
                	IsDeleted: 0,
                	NeedFixerPrice: 1,
                    IncidentTypeId: Fixer.FixerGroupId,
                    Code: keyword,
                    [Op.or]:[
                    	{
                    		Status: CONSTANT.IncidentStatus.MANAGERRECEIVED
                    	},
                    	{
                    		FixedBy: userId
                    	}
                    ]
                },
                include: [
                	{
                		model: IncidentType,
                		as: 'Type',
                		where: {
                			IsDeleted:0
                		},
                		attributes: ['Id','Name']
                	}
                ],
                attributes: ['Id','Code']
			})
			let incidentData = []
			incident.forEach(i=>{
				incidentData.push({
					Id:i.Id,
					Content: `${i.Type.Name} ${i.Code}`
				})
			})
			res.status(200).json({
				Success:true,
				Data:incidentData
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

	async managerSchedule(req,res){
		const now = moment().format('YYYY-MM-DD hh:mm');
		let timeSetting = await Setting.findOne();
		const yesterday = moment().subtract(timeSetting.IncidentReceiveTime, 'hours').format('YYYY-MM-DD hh:mm');
		const thisMonth = moment().format('YYYY-MM-DD');
		const nextMonth = moment().add(timeSetting.ExpriedContractTime,'month').format('YYYY-MM-DD');
		try{
			let data = []
			let bill = await BillExpriedCalendar.findAll({
				limit:1,
				where: {
					IsDeleted: 0,
					[Op.or]: [
                        {
                            PayDay: now
                        },
                        {
                            PayDay: {
                                [Op.gt]: now
                            }
                        },
                        {
                            PayDay: {
                                [Op.is]: null
                            }
                        }
                    ]
				},
				attributes: ['Id', 'PayDay'],
				include: [
					{
						model: Billing,
						order: [
		                    ['Id', 'DESC']
		                ],
						as: 'Billing',
						where: {
							IsDeleted: 0,
							IsDraft: 0
						},
						attributes: ['Id','Code'],
						include:[
							{
								model: House,
								as: 'House',
								attributes: ['Code'],
								where: {
									IsDeleted: 0,
									ManagerId: req.body.UserId
								},
								include: [
									{
										model: Building,
										as: 'Building',
										where: {
											IsDeleted: 0,
											ManagerId: req.body.UserId
										},
										attributes: ['Code'],
									}
								]
							}
						]
					}					
				]
			})
			let billing = []
			if(bill.length>0){		
				bill.forEach(b=>{
					billing.push({
						Id: b.Billing.Id,
						House: `${b.Billing.House.Building.Code} ${b.Billing.House.Code}`,
						ScheduleDate: moment(b.PayDay).format('DD.MM.YYYY - hh:mm'),
						Status: `Khách hẹn đóng tiền`,
						Type: 1
					})
				})
			}
			let incident = []
			//Tìm sự cố đã qúa hạn 1 ngày mà chưa tiếp nhận
			let expriedIncident = await Incident.findAll({
				limit:1,
				order: [
                    ['Id', 'DESC']
                ],
				where: {
					IsDeleted:0,
					Status: CONSTANT.IncidentStatus.SENT,
					[Op.or]: [
                        {
                            CreatedDate: yesterday
                        },
                        {
                            CreatedDate: {
                                [Op.lt]: yesterday
                            }
                        },
                        {
                            CreatedDate: {
                                [Op.is]: null
                            }
                        }
                    ]
				},
				attributes: ['Id', 'CreatedDate'],
				include: [
					{
						model: House,
						as: 'House',
						attributes: ['Code'],
						where: {
							IsDeleted: 0,
							ManagerId: req.body.UserId
						},
						include: [
							{
								model: Building,
								as: 'Building',
								where: {
									IsDeleted: 0,
									ManagerId: req.body.UserId
								},
								attributes: ['Code'],
							}
						]

					}
				]
			})
			if(expriedIncident.length>0){
				expriedIncident.forEach(ei=>{
					incident.push({
						Id:ei.Id,
						House:`${ei.House.Building.Code} ${ei.House.Code}`,
						ScheduleDate: moment(ei.CreatedDate).format('DD.MM.YYYY hh:ss'),
						Status: `Đã quá thời gian tiếp nhận`,
						Type: 2
					})
				})
			}
			//Tìm sự cố đang sửa
			let fixingIncident = await Incident.findAll({
				limit:1,
				order: [
                    ['Id', 'DESC']
                ],
				where: {
					IsDeleted:0,
					Status: CONSTANT.IncidentStatus.TROUBLESHOOTING
				},
				attributes: ['Id', 'CreatedDate'],
				include: [
					{
						model: House,
						as: 'House',
						attributes: ['Code'],
						where: {
							IsDeleted: 0,
							ManagerId: req.body.UserId
						},
						include: [
							{
								model: Building,
								as: 'Building',
								where: {
									IsDeleted: 0,
									ManagerId: req.body.UserId
								},
								attributes: ['Code'],
							}
						]

					}
				]
			})
			if(fixingIncident.length>0){
				fixingIncident.forEach(ei=>{
					incident.push({
						Id:ei.Id,
						House:`${ei.House.Building.Code} ${ei.House.Code}`,
						ScheduleDate: moment(ei.CreatedDate).format('DD.MM.YYYY hh:ss'),
						Status: `Thợ đến sửa`,
						Type: 2
					})
				})
			}
			let house = []
			//Trạng thái nhà
			let contract = await Contract.findAll({
				limit:1,
				order: [
                    ['Id', 'DESC']
                ],
                where: {
					IsDeleted: 0,
					CheckoutDate: {
                        [Op.between]: [thisMonth, nextMonth]
                    }
					
				},
				attributes:['Id','CheckoutDate'],
				include:[
					{
						model:House,
						as: 'House',
						where:{
							IsDeleted: 0,
							ManagerId: req.body.UserId 
						},
						attributes: ['Id','Code'],
						include: [
							{
								model: Building,
								as: 'Building',
								where: {
									IsDeleted: 0,
									ManagerId: req.body.UserId
								},
								attributes: ['Code'],
							}
						]
					}
				]	
			})
			contract.forEach(c=>{
				house.push({
					Id:c.House.Id,
					House:`${c.House.Building.Code} ${c.House.Code}`,
					ScheduleDate:moment(c.CheckoutDate).format('DD.MM.YYYY'),
					Status:`Sắp hết hạn hợp đồng`,
					Type: 3
				})
			})
			let readyHouse = await House.findAll({
				limit:1,
				order:[
					['Id','DESC']
				],
				where:{
					IsDeleted: 0,
					ManagerId: req.body.UserId,
					Status: CONSTANT.HOUSE_STATUS.READY 
				},
				attributes:['Id','Code','UpdatedDate'],
				include: [
					{
						model: Building,
						as: 'Building',
						where: {
							IsDeleted: 0,
							ManagerId: req.body.UserId
						},
						attributes: ['Code'],
					}
				]
			})
			readyHouse.forEach(rH=>{
				house.push({
					Id:rH.Id,
					House:`${rH.Building.Code} ${rH.Code}`,
					ScheduleDate:moment(rH.UpdatedDate).format('DD.MM.YYYY'),
					Status:`Đã sẵn sàng ở`,
					Type:3
				})
			})
			data.push({
				Bill:billing,
				Incident:incident,
				House:house
			})
			res.status(200).json({
				Success:true,
				Data:data
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

	async listManagerSchedule(req,res){
		const now = moment().format('YYYY-MM-DD hh:mm');
		const yesterday = moment().subtract(24, 'hours').format('YYYY-MM-DD hh:mm');
		const thisMonth = moment().format('YYYY-MM-DD');
		const nextMonth = moment().add(1,'month').format('YYYY-MM-DD');
		let type = req.query.type;
		let UserId = req.query.userId;
		try{
			let data = []
			switch(parseInt(type)){
				case 1:
					let bill = await BillExpriedCalendar.findAll({
						limit:8,
						where: {
							IsDeleted: 0,
							[Op.or]: [
		                        {
		                            PayDay: now
		                        },
		                        {
		                            PayDay: {
		                                [Op.gt]: now
		                            }
		                        },
		                        {
		                            PayDay: {
		                                [Op.is]: null
		                            }
		                        }
		                    ]
						},
						attributes: ['Id', 'PayDay'],
						include: [
							{
								model: Billing,
								order: [
				                    ['Id', 'DESC']
				                ],
								as: 'Billing',
								where: {
									IsDeleted: 0,
									IsDraft: 0
								},
								attributes: ['Id','Code'],
								include:[
									{
										model: House,
										as: 'House',
										attributes: ['Code'],
										where: {
											IsDeleted: 0,
											ManagerId: UserId
										},
										include: [
											{
												model: Building,
												as: 'Building',
												where: {
													IsDeleted: 0,
													ManagerId: UserId
												},
												attributes: ['Code'],
											}
										]
									}
								]
							}					
						]
					})
					let billing = []
					if(bill.length>0){		
						bill.forEach(b=>{
							billing.push({
								Id: b.Billing.Id,
								House: `${b.Billing.House.Building.Code} ${b.Billing.House.Code}`,
								ScheduleDate: moment(b.PayDay).format('DD.MM.YYYY - hh:mm'),
								Status: `Khách hẹn đóng tiền`,
								Type: 1
							})
						})
					}
					res.status(200).json({
						Success:true,
						Data:billing
					})
				break;
				case 2:
					let incident = []
					//Tìm sự cố đã qúa hạn 1 ngày mà chưa tiếp nhận
					let expriedIncident = await Incident.findAll({
						limit:4,
						order: [
		                    ['Id', 'DESC']
		                ],
						where: {
							IsDeleted:0,
							Status: CONSTANT.IncidentStatus.SENT,
							[Op.or]: [
		                        {
		                            CreatedDate: yesterday
		                        },
		                        {
		                            CreatedDate: {
		                                [Op.lt]: yesterday
		                            }
		                        },
		                        {
		                            CreatedDate: {
		                                [Op.is]: null
		                            }
		                        }
		                    ]
						},
						attributes: ['Id', 'CreatedDate'],
						include: [
							{
								model: House,
								as: 'House',
								attributes: ['Code'],
								where: {
									IsDeleted: 0,
									ManagerId: UserId
								},
								include: [
									{
										model: Building,
										as: 'Building',
										where: {
											IsDeleted: 0,
											ManagerId: UserId
										},
										attributes: ['Code'],
									}
								]

							}
						]
					})
					if(expriedIncident.length>0){
						expriedIncident.forEach(ei=>{
							incident.push({
								Id:ei.Id,
								House:`${ei.House.Building.Code} ${ei.House.Code}`,
								ScheduleDate: moment(ei.CreatedDate).format('DD.MM.YYYY hh:ss'),
								Status: `Đã quá thời gian tiếp nhận`,
								Type: `Sự cố`
							})
						})
					}
					//Tìm sự cố đang sửa
					let fixingIncident = await Incident.findAll({
						limit:4,
						order: [
		                    ['Id', 'DESC']
		                ],
						where: {
							IsDeleted:0,
							Status: CONSTANT.IncidentStatus.TROUBLESHOOTING
						},
						attributes: ['Id', 'CreatedDate'],
						include: [
							{
								model: House,
								as: 'House',
								attributes: ['Code'],
								where: {
									IsDeleted: 0,
									ManagerId: UserId
								},
								include: [
									{
										model: Building,
										as: 'Building',
										where: {
											IsDeleted: 0,
											ManagerId: UserId
										},
										attributes: ['Code'],
									}
								]

							}
						]
					})
					if(fixingIncident.length>0){
						fixingIncident.forEach(ei=>{
							incident.push({
								Id:ei.Id,
								House:`${ei.House.Building.Code} ${ei.House.Code}`,
								ScheduleDate: moment(ei.CreatedDate).format('DD.MM.YYYY hh:ss'),
								Status: `Thợ đến sửa`,
								Type: 2
							})
						})
					}
					res.status(200).json({
						Success:true,
						Data:incident
					})
				break;
				case 3:
					let house = []
					//Trạng thái nhà
					let contract = await Contract.findAll({
						limit:4,
						order: [
		                    ['Id', 'DESC']
		                ],
		                where: {
							IsDeleted: 0,
							CheckoutDate: {
		                        [Op.between]: [thisMonth, nextMonth]
		                    }
							
						},
						attributes:['Id','CheckoutDate'],
						include:[
							{
								model:House,
								as: 'House',
								where:{
									IsDeleted: 0,
									ManagerId: UserId 
								},
								attributes: ['Id','Code'],
								include: [
									{
										model: Building,
										as: 'Building',
										where: {
											IsDeleted: 0,
											ManagerId: UserId
										},
										attributes: ['Code'],
									}
								]
							}
						]	
					})
					contract.forEach(c=>{
						house.push({
							Id:c.House.Id,
							House:`${c.House.Building.Code} ${c.House.Code}`,
							ScheduleDate:moment(c.CheckoutDate).format('DD.MM.YYYY'),
							Status:`Sắp hết hạn hợp đồng`,
							Type:`Phòng`
						})
					})
					let readyHouse = await House.findAll({
						limit:4,
						order:[
							['Id','DESC']
						],
						where:{
							IsDeleted: 0,
							ManagerId: req.body.UserId,
							Status: CONSTANT.HOUSE_STATUS.READY 
						},
						attributes:['Id','Code','UpdatedDate'],
						include: [
							{
								model: Building,
								as: 'Building',
								where: {
									IsDeleted: 0,
									ManagerId: UserId
								},
								attributes: ['Code'],
							}
						]
					})
					readyHouse.forEach(rH=>{
						house.push({
							Id:rH.Id,
							House:`${rH.Building.Code} ${rH.Code}`,
							ScheduleDate:moment(rH.UpdatedDate).format('DD.MM.YYYY'),
							Status:`Đã sẵn sàng ở`,
							Type:`Phòng`
						})
					})
					res.status(200).json({
						Success:true,
						Data:house
					})
				break;
			}
		}catch(error){
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps'),
				Error:error
			})
		}
	}
}

module.exports = HomeForAppHandler