const db = require('../../../Models/index');
const Role = db.Role;
const House = db.House;
const FixerGroup = db.FixerGroup;
const User = db.User;
const Setting = db.Setting;
const News = db.News;
const Contract = db.Contract;
const Building = db.Building;
const Billing = db.Billing;
const Incident = db.Incident;
const Vehicle = db.Vehicle;
const WaterPriceType = db.WaterPriceType;
const ApartmentStatus = db.ApartmentStatus;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const CONSTANT = require("../../../../Config/constant");
const moment = require("moment-timezone");
const weather = require('weather-js');

moment().tz('Asia/Ho_Chi_Minh').format();
let hcmWeather = {}
weather.find({search: 'Ho Chi Minh City', degreeType: 'C'}, (err, result) =>{
	hcmWeather=JSON.stringify(result, null, 2)
});
class PagesController {

	async adminLogin(req, res, next){
		res.render('login', {layout:false, title:"Đăng nhập"});
	}
	async index(req, res, next) {
		res.redirect('/cms/dashboard');
	}
	async dashboard(req, res, next) {
		let totalUser = await User.findAndCountAll({where:{IsDeleted:0}})
		let totalResident = await User.findAndCountAll({where:{RoleId:4,IsDeleted:0}})
		let totalManager = await User.findAndCountAll({where:{RoleId:5,IsDeleted:0}})
		let totalFixer = await User.findAndCountAll({where:{RoleId:7,IsDeleted:0}})
		let building = await Building.findAndCountAll({where:{IsDeleted:0}})
		let house = await House.findAndCountAll({where:{IsDeleted:0}})
		let news = await News.findAndCountAll({where:{IsDeleted:0}})
		let newIncident = await Incident.findAndCountAll({where:{IsDeleted:0,FixedBy:{[Op.eq]:null}}})
		let fixedIncident = await Incident.findAndCountAll({where:{IsDeleted:0,FixedBy:{[Op.ne]:null}}})
		let wt = JSON.parse(hcmWeather)
		res.render('dashboard/index',
			{
				title: '3S Home',
				sess:req.session.admin,
				totalUser: totalUser.count,
				totalResident: totalResident.count,
				totalManager: totalManager.count,
				totalFixer: totalFixer.count,
				building:building.count,
				house:house.count,
				news:news.count,
				newIncident:newIncident.count,
				fixedIncident:fixedIncident.count,
				weather:wt[0]
			}
		);
	}
	async incidentDashboard(req, res, next) {
		res.render('dashboard/incidentDashboard',
			{
				title: 'Thống kê sự cố',sess:req.session.admin
			}
		);
	}
	async billDashboard(req, res, next) {
		res.render('dashboard/billDashboard',
			{
				title: 'Thống kê căn hộ',sess:req.session.admin
			}
		);
	}
	async houseDashboard(req, res, next) {
		res.render('dashboard/houseDashboard',
			{
				title: 'Thống kê tình trạng nhà',sess:req.session.admin
			}
		);
	}
	/**
		For Manager
	**/
	async managerDashboard(req,res){
		let wt = JSON.parse(hcmWeather)
		res.render('dashboard/managerDashboard',{
			title: '3S Home',
			sess:req.session.admin,
			weather:wt[0]
		})
	}
	async managerBuilding(req, res){
		let wt = JSON.parse(hcmWeather)
		res.render('buildings/manager/list',{
			title: 'Danh sách toà nhà',
			sess:req.session.admin,
			weather:wt[0]
		})
	}
	async managerHouse(req, res){
		let wt = JSON.parse(hcmWeather)
		res.render('house/manager/list',{
			title: 'Danh sách căn hộ',
			sess:req.session.admin,
			weather:wt[0]
		})
	}
	// async accountingHouse(req, res){
	// 	res.render('house/accounting/list',{
	// 		title: 'Danh sách căn hộ',
	// 		sess:req.session.admin
	// 	})
	// }
	getNumOfDate(checkInDate,d){
		let timeCheckIn = moment(checkInDate).format()

		let nextMonth = moment(timeCheckIn).add(1,'M').startOf('month').format()//Lay tg dau thang truoc
		let targetDate = moment(nextMonth).add(d,'days').format() //Cong voi so ngay tu dau thang

		let a = moment(timeCheckIn)
		let b = moment(targetDate)
		let date = b.diff(a, 'days')
		return date
	}
	getNextMonthDate(checkInDate, d){
		let timeCheckIn = moment(checkInDate).format()

		let nextMonth = moment(timeCheckIn).add(1,'M').startOf('month').format()//Lay tg dau thang truoc
		let targetDate = moment(nextMonth).add(d,'days').format("DD/MM/YYYY") //Cong voi so ngay tu dau thang
		return targetDate;
	}
	getNextDayDate(date, d){
		let targetDate = moment(date).add(d,'days').format("DD/MM/YYYY") //Cong voi so ngay tu dau thang
		return targetDate;
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
	async accountingCreateBilling(req, res){
		let wt = JSON.parse(hcmWeather)
		let Id = req.params.id //HouseId
		try{
			let house = await House.findOne({
				where: {
					Id: Id
				},
				include:[
					{
						model: Building,
						as: 'Building'
					}
				]
			})
			let houseInfo ={}
			let type = '';
			if(house){
				let resident = await User.findAll({
					where: {
						HouseId: house.Id,
						IsDeleted: 0
					},
					limit: 1,
					order: [[ 'CreatedDate', 'ASC' ]]
				})
				let contract = await Contract.findOne({
					where: {
						HouseId: house.Id,
						IsDeleted: 0
					}
				})
				let billDateRange = house.BillDateRange;
				if(req.query.type == CONSTANT.BILL_TYPE.NEW){
					type = 'Hợp Đồng Mới';
					// 2 mốc thời gian: mùng 5 or 10
					//Tính số ngày từ hôm nay đến ngày đó 
					let billDate = '';
					let d ='';
					let nextMonthDate = ''
					let checkInDate = contract.CheckinDate
					if(billDateRange == CONSTANT.BILLDATE_RANGE.FIRST){
						billDate  = this.getNumOfDate(checkInDate,d=3)
						nextMonthDate = this.getNextMonthDate(checkInDate,d=3)
					}else if (billDateRange == CONSTANT.BILLDATE_RANGE.SECOND){
						billDate  = this.getNumOfDate(checkInDate,d=8)
						nextMonthDate = this.getNextMonthDate(checkInDate,d=8)
					}
					
					let rentFee = (contract.RentalFee/30)*billDate
					let ctDetail = {}
					await Object.assign(ctDetail,{
						Id:Id,
						RentalFee: contract.RentalFee,
						HouseFee: rentFee,
						DepositMoney: contract.DepositMoney,
						inDate: contract.CheckinDate,
						// toDate: moment(nextMonthDate,'YYYY-MM-DD').format('YYYY-MM-DD'),
						CheckinDate: moment(contract.CheckinDate).format('DD/MM/YYYY'),
						nextMonthDate: nextMonthDate
					})

					await Object.assign(houseInfo,{
						house: house,
						resident: resident?resident[0]:null,
						type: type,
						billDate:billDate,
						contract:ctDetail,
						billType :CONSTANT.BILL_TYPE.NEW
					})
					
				}else if(req.query.type == CONSTANT.BILL_TYPE.MONTHY){
					type = 'Hàng Tháng'
					let ctDetail = {}
					let oldBill = await Billing.findAll({
						limit: 1,
						where: {
							HouseId: house.Id,
							IsDeleted:0,
							IsDraft:0
						},
						order: [[ 'CreatedDate', 'DESC' ]]
					})					
					let billDate = '';
					let d ='';
					let nextMonthDate = '';
					let checkInDate = oldBill[0].ToDate
					let nextDayDate = this.getNextDayDate(checkInDate, d=1)
					if(billDateRange == CONSTANT.BILLDATE_RANGE.FIRST){
						nextMonthDate = this.getNextMonthDate(checkInDate,d=3)
					}else if (billDateRange == CONSTANT.BILLDATE_RANGE.SECOND){
						nextMonthDate = this.getNextMonthDate(checkInDate,d=8)
					}
					let waterPriceType = await WaterPriceType.findOne({
						where:{
							Id: contract.WaterPriceType
						},
						attributes: ['Id', 'Name', 'Price']
					})
					let waterPrice = '';
					let countResident = '';
					if(waterPriceType.Id == CONSTANT.WATERPRICE_TYPE.PERSON){
						countResident = await User.count({
							where:{
								HouseId: Id,
								RoleId: 4,
								IsDeleted: 0
							}
						})
						waterPrice = countResident ? parseInt(countResident)*parseInt(waterPriceType.Price): 0
					}else if(waterPriceType.Id == CONSTANT.WATERPRICE_TYPE.M3){
						waterPrice = waterPriceType.Price
					}
					let countCar = await this.CountCar(Id)
					let countMotor = await this.CountMotor(Id)
					let countBike = await this.CountBike(Id)
					let carParkPrice = countCar?countCar*contract.CarParkPrice:0
					let motorParkPrice = countMotor?countMotor*contract.MotobikeParkPrice:0
					let bikeParkPrice = countBike?countBike*contract.BikeParkPrice:0
					let parkingPrice = parseInt(carParkPrice)+parseInt(motorParkPrice)+parseInt(bikeParkPrice)
					await Object.assign(ctDetail,{
						Id:Id,
						RentalFee: contract.RentalFee,
						CheckinDate: moment(contract.CheckinDate).format('DD/MM/YYYY'),
						nextDayDate: nextDayDate,
						nextMonthDate: nextMonthDate,
						waterPrice: waterPrice,
						countResident:countResident,
						parkingPrice:parkingPrice,
						countCar:countCar,
						countMotor:countMotor,
						countBike:countBike,
						electricBill: contract.ElectricBill,
						SerCompo: contract.ServicePrice,
						InDebtMoney: oldBill[0].InDebtMoney?oldBill[0].InDebtMoney:0,
						RedunMoney: oldBill[0].RedunMoney?oldBill[0].RedunMoney:0,
						ElFirstNum: oldBill[0].ElLastNum?oldBill[0].ElLastNum:0,
						WarFirstNum: oldBill[0].WarLastNum?oldBill[0].WarLastNum:0
					})
					await Object.assign(houseInfo,{
						house: house,
						resident: resident?resident[0]:null,
						type: type,
						waterPriceType:waterPriceType,
						contract:ctDetail,
						billType :CONSTANT.BILL_TYPE.MONTHY
					})										
				}else if(req.query.type == CONSTANT.BILL_TYPE.END){
					type = 'Thanh Lý'
					let ctDetail = {}
					let oldBill = await Billing.findAll({
						limit: 1,
						where: {
							HouseId: house.Id,
							IsDeleted:0,
							IsDraft:0
						},
						order: [[ 'CreatedDate', 'DESC' ]]
					})
					
					//Tiền phòng từ ToDate tới hôm tạo	
					let d = '';				
					let checkInDate = oldBill[0].ToDate;
					let nextDayDate = this.getNextDayDate(checkInDate, d=1)
					let waterPriceType = await WaterPriceType.findOne({
						where:{
							Id: contract.WaterPriceType
						},
						attributes: ['Id', 'Name', 'Price']
					})
					let waterPrice = '';
					let countResident = '';
					if(waterPriceType.Id == CONSTANT.WATERPRICE_TYPE.PERSON){
						countResident = await User.count({
							where:{
								HouseId: Id,
								RoleId: 4,
								IsDeleted: 0
							}
						})
						waterPrice = countResident ? parseInt(countResident)*parseInt(waterPriceType.Price): 0
					}else if(waterPriceType.Id == CONSTANT.WATERPRICE_TYPE.M3){
						waterPrice = waterPriceType.Price
					}
					let countCar = await this.CountCar(Id)
					let countMotor = await this.CountMotor(Id)
					let countBike = await this.CountBike(Id)
					let carParkPrice = countCar?countCar*contract.CarParkPrice:0
					let motorParkPrice = countMotor?countMotor*contract.MotobikeParkPrice:0
					let bikeParkPrice = countBike?countBike*contract.BikeParkPrice:0
					let parkingPrice = parseInt(carParkPrice)+parseInt(motorParkPrice)+parseInt(bikeParkPrice)
					await Object.assign(ctDetail,{
						Id:Id,
						RentalFee: contract.RentalFee,
						CheckinDate: nextDayDate,
						fromDate: oldBill[0].ToDate,
						waterPrice: waterPrice,
						countResident:countResident,
						parkingPrice:parkingPrice,
						countCar:countCar,
						countMotor:countMotor,
						countBike:countBike,
						DepositMoney: contract.DepositMoney,
						electricBill: contract.ElectricBill,
						SerCompo: contract.ServicePrice,
						InDebtMoney: oldBill[0].InDebtMoney?oldBill[0].InDebtMoney:0,
						RedunMoney: oldBill[0].RedunMoney?oldBill[0].RedunMoney:0,
						ElFirstNum: oldBill[0].ElLastNum?oldBill[0].ElLastNum:0,
						WarFirstNum: oldBill[0].WarLastNum?oldBill[0].WarLastNum:0
					})
					await Object.assign(houseInfo,{
						house: house,
						resident: resident?resident[0]:null,
						type: type,
						waterPriceType:waterPriceType,
						contract:ctDetail,
						billType :CONSTANT.BILL_TYPE.END
					})
				}else {
					type = ''
				}
			}
			
			// res.json(houseInfo)
			res.render('billings/add',{
				title: 'Tạo hoá đơn',
				sess:req.session.admin,
				house:houseInfo,
				weather:wt[0]
			})
		}catch(error){
			console.log(error)
		}
	}
	async viewBillAsDraft(req, res){
		let wt = JSON.parse(hcmWeather)
		let bill = await Billing.findOne({
			where: {
				Id: req.params.id
			},
			include: [
				{
					model: House,
					as: 'House',
					attributes:['Id', 'Code', 'Name'],
					include: [
						{
							model: Building,
							as: 'Building',
							attributes: ['Id', 'Name', 'Address']
						},
						{
							model: Contract,
							as: 'Contract'
						}
					]
				},
				{
					model: User,
					as: 'Resident',
					attributes: ['Id', 'FullName', 'Tel']
				}
			]
		})
		let waterPriceType = await WaterPriceType.findOne({
			where:{
				Id: bill.House.Contract[0].WaterPriceType
			},
			attributes: ['Id', 'Name', 'Price']
		})
		let type = ''
		switch(bill.Type){
			case 1:
				type = "Hợp Đồng Mới";
				break;
			case 2:
				type = "Hàng Tháng";
				break;
			case 3:
				type = "Thanh Lý";
				break;		
		}
		let countCar = await this.CountCar(bill.House.Id)
		let countMotor = await this.CountMotor(bill.House.Id)
		let countBike = await this.CountBike(bill.House.Id)
		let billData = {}
		let contract = {}
		Object.assign(contract,{
			ElectricBill: bill.House.Contract[0].ElectricBill,
			CarParkPrice: bill.House.Contract[0].CarParkPrice,
			MotobikeParkPrice: bill.House.Contract[0].MotobikeParkPrice,
			BikeParkPrice: bill.House.Contract[0].BikeParkPrice,
			ElectricBill: bill.House.Contract[0].ElectricBill,
			ElectricBill: bill.House.Contract[0].ElectricBill,
			WaterPriceType: waterPriceType,
			CountCar:countCar,
			CountMotor:countMotor,
			CountBike:countBike
		})
		let total = ''
		if(bill.Type ==CONSTANT.BILL_TYPE.NEW){
			total = bill.DepositMoney+bill.HouseFee
		}else if(bill.Type ==CONSTANT.BILL_TYPE.MONTHY || bill.Type ==CONSTANT.BILL_TYPE.END){
			total = (
				bill.HouseFee+
				bill.SerCompo+
				bill.WarPrice+
				bill.ElPrice+
				bill.ParkingPrice+
				bill.OtherFee+
				bill.InDebtMoney
				)-bill.SalePrice
				-bill.RedunMoney
		}
		Object.assign(billData,{
			Id:bill.Id,
			Code:bill.Code,
			HouseFee: bill.HouseFee?bill.HouseFee:0,
			FromDate: moment(bill.FromDate).format('DD/MM/YYYY'),
			ToDate: moment(bill.ToDate).format('DD/MM/YYYY'),
			ElFirstNum: bill.ElFirstNum?bill.ElFirstNum:0,
			ElLastNum: bill.ElLastNum?bill.ElLastNum:0,
			SerCompo: bill.SerCompo?bill.SerCompo:0,
			RoomBlance: bill.RoomBlance?bill.RoomBlance:0,
			WarFirstNum: bill.WarFirstNum?bill.WarFirstNum:0,
			WarLastNum: bill.WarLastNum?bill.WarLastNum:0,
			WarPrice: bill.WarPrice?bill.WarPrice:0,
			ElPrice: bill.ElPrice?bill.ElPrice:0,
			ParkingPrice: bill.ParkingPrice?bill.ParkingPrice:0,
			OtherFee: bill.OtherFee?bill.OtherFee:0,
			SalePrice: bill.SalePrice?bill.SalePrice:0,
			InDebtMoney: bill.InDebtMoney?bill.InDebtMoney:0,
			RedunMoney: bill.RedunMoney?bill.RedunMoney:0,
			ResiMoney: bill.ResiMoney?bill.ResiMoney:0,
			DateRange: bill.DateRange,
			Type: bill.Type,
			DepositMoney: bill.DepositMoney?bill.DepositMoney:0,
			Status: bill.Status,
			House: bill.House,
			Resident: bill.Resident,
			type: type,
			total:total,
			Note: bill.Note,
			RentalFee: bill.House.Contract[0].RentalFee?bill.House.Contract[0].RentalFee:0,
			Contract:contract

		})
		// res.json(billData)
		res.render('billings/draft',{
			title: 'Hoá đơn ' + bill.House.Name,
			sess:req.session.admin,
			bill: billData,
			weather:wt[0]
		});
	}
	/**
		End
	**/
	async listUser(req, res, next) {
		let wt = JSON.parse(hcmWeather)
		res.render('users/list',{title: 'Danh sách cư dân',sess:req.session.admin,weather:wt[0]});		
	}

	async listFixer(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('users/listFixer',{title: 'Danh sách thợ',sess:req.session.admin,weather:wt[0]})
	}
	async listManager(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('users/listManager',{title: 'Danh sách manager',sess:req.session.admin,weather:wt[0]})
	}
	async deleteUserPost(req, res, next) {
		try{
			let data = await User.update(
				{IsDeleted:true},
				{where: { Id: req.params.id }}
			)
			res.json({data:data,message: "Xóa thành công"})
			// res.redirect('/cms/user-list');
		}
		catch(error){
			console.log(error)
			res.json({data:null, message: "Xóa không thành công"}) 
		}	
	}
	async addUser(req,res){
		let wt = JSON.parse(hcmWeather)
		let role = await Role.findAll();
		let house = await House.findAll();
		let fixerGroup = await FixerGroup.findAll();
		res.render('users/add',{title:'Thêm mới nhân sự',role:role,house:house,fixerGroup:fixerGroup,sess:req.session.admin,weather:wt[0]})
	}


//building
	async addBuildingGet(req,res,next){
		let wt = JSON.parse(hcmWeather)
		let manager  = await User.findAll({
			where: {
				IsDeleted: 0
			},
			attributes: ['Id','FullName'],
			include: [
				{
					model: Role,
					as: 'Role',
					where: {
						Type: CONSTANT.RoleType.CMSAndManager
					}
				}
			]
		})
		res.render('buildings/addBuilding',{
			title:"Thêm mới toà nhà",
			CONSTANT: CONSTANT.BILLDATE_RANGE,
			sess:req.session.admin,
			manager:manager,
			weather:wt[0]
		});
	}
	async listBuildingGet(req, res, next) {
		let wt = JSON.parse(hcmWeather)
		res.render('buildings/list',{title: 'Danh sách tòa nhà',sess:req.session.admin,weather:wt[0]});		
	}

	async updateBuilding(req, res, next) {
		let wt = JSON.parse(hcmWeather)
		res.render('buildings/updateBuilding',{title: 'Sửa tòa nhà',id:req.params.id,sess:req.session.admin,weather:wt[0]});		
	}
//end building


//house
	async createHouse(req,res,next){
		let status = await ApartmentStatus.findAll({
			attributes: ['Code','Description']
		})
		let wt = JSON.parse(hcmWeather)
		res.render('house/addHouse',{
			title:'Thêm mới căn hộ',
			sess:req.session.admin,
			CONSTANT: CONSTANT.BILLDATE_RANGE,
			houseStatus:status,
			weather:wt[0]
		})
	}
	async listHouse(req,res,next){
		let status = await ApartmentStatus.findAll({
			attributes: ['Code','Description']
		})
		let wt = JSON.parse(hcmWeather)
		res.render('house/listHouse',{
			title:'Danh sách căn hộ',
			houseStatus:status,
			sess:req.session.admin,weather:wt[0]})
	}

//end house

//fixer

	async createFixer(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('fixer/addFixer',{title:"Danh sách thợ sửa",sess:req.session.admin,weather:wt[0]})
	}
//end fixer



//contract
	async createContract(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('contract/addContract',{
			title:'Thêm mới hợp đồng',
			CONSTANT: CONSTANT.BILLDATE_RANGE,
			CONSTANTWATER: CONSTANT.WATERPRICE_TYPE,
			sess:req.session.admin,
			weather:wt[0]
		})
	}
	async listContract(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('contract/listContract',{
			title:'Danh sách hợp đồng',
			CONSTANT: CONSTANT.BILLDATE_RANGE,
			CONSTANTWATER: CONSTANT.WATERPRICE_TYPE,
			sess:req.session.admin,
			weather:wt[0]
		})
	}

	async detailContract(req,res,next){
        let id = req.query.idContract
        let wt = JSON.parse(hcmWeather)
        try {
            let detailContract = await Contract.findOne({
				where : {Id:id},
				include : [{
					model: House, as : 'House',
					attributes : ['Id','Name']
				}]
			})
			let CheckinDate = moment(detailContract.dataValues.CheckinDate).format("DD/MM/YYYY");
			let CheckoutDate = moment(detailContract.dataValues.CheckoutDate).format("DD/MM/YYYY");
			let building = await House.findOne({
				where : {Id:detailContract.dataValues.HouseId},
				include : [{
					model: Building, as : 'Building',
					attributes : ['Id','Name']
				}]
			})

			let setting = await Setting.findOne()
            res.render('contract/detalContract',{
            	detailContract:detailContract,
            	building:building,
            	CheckinDate:CheckinDate,
            	CheckoutDate:CheckoutDate,
            	setting:setting,
            	sess:req.session.admin,
            	weather:wt[0]
            })       
        } catch (error) {
            console.log(error)
        }
    }
//end contract

//news
	async createNews(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('news/addNews',{title:'Thêm mới tin tức',sess:req.session.admin,weather:wt[0]})
	}

	async listNews(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('news/listNews',{title:'Danh sách tin tức',sess:req.session.admin,weather:wt[0]})
	}

//end news

//incident
	async listIncident(req,res,next){
		let wt = JSON.parse(hcmWeather)
		res.render('incidents/listIncidentResident',{
			title:'Danh sách sự cố',
			CONSTANT_INCIDENT: CONSTANT.IncidentStatus,
			sess:req.session.admin,
			weather:wt[0]
		})
	}

//end incident

//role
	async createRole(req,res){
		let wt = JSON.parse(hcmWeather)
		res.render('roles/addRole',{title:'Thêm mới quyền',sess:req.session.admin,weather:wt[0]})
	}
	async listRole(req,res){
		let wt = JSON.parse(hcmWeather)
		res.render('roles/listRole',{title:'Danh sách quyền',sess:req.session.admin,weather:wt[0]})
	}
//end role
//notification

	async listNotification(req,res){
		let wt = JSON.parse(hcmWeather)
		res.render('notifications/listNotification',{title:'Danh sách thông báo',sess:req.session.admin,weather:wt[0]})
	}

//end

	/**
		Setting
	**/
		async setting(req,res){
			let wt = JSON.parse(hcmWeather)
			let setting = await Setting.findOne()
			res.render('settings/index',{title:'Cài đặt 3SHomes',sess:req.session.admin, setting:setting,weather:wt[0]})
		}
	/**
		End Setting
	**/

}
module.exports = PagesController