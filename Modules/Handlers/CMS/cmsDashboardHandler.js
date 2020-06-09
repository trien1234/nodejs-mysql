const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Incident = db.Incident;
const House = db.House;
const i18n = require("i18n");
const Contract = db.Contract;
const Building = db.Building;
const Billing = db.Billing;
var moment = require('moment');
const ApartmentStatusHistory = db.ApartmentStatusHistory;
var sequelize = require('sequelize');
class DashboardHandler{
    constructor(){}
//thống kê sự cố tròn
    async countIncidentByType(req,res,next){
        try {
            let startDate = req.query.startDate ? moment(req.query.startDate).format("YYYY-MM-DD H:mm:ss") : "";
            let endDate = req.query.endDate ? req.query.endDate : moment().format("YYYY-MM-DD H:mm:ss");

            let dataIncident = await Incident.findAll({
                attributes: ['IncidentTypeId', [sequelize.fn('count', sequelize.col('IncidentTypeId')), 'CountIncidentTypeId']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                },
                group: ['IncidentTypeId']
            })
            res.json({dataIncident:dataIncident})          
        } catch (error) {
            console.log(error)
        }
    }
    async countIncidentByStatus(req,res,next){
        try {
            let startDate = req.query.startDate ? moment(req.query.startDate).format("YYYY-MM-DD H:mm:ss") : "";
            let endDate = req.query.endDate ? req.query.endDate : moment().format("YYYY-MM-DD H:mm:ss");
            let dataIncidentStatus = await Incident.findAll({
                attributes: ['Status', [sequelize.fn('count', sequelize.col('Status')), 'CountIncidentStatus']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                },
                group: ['Status']
            })
            res.json({dataIncidentStatus:dataIncidentStatus})          
        } catch (error) {
            console.log(error)
        }
    }

    async countIncidentByTimeAvg(req,res,next){
        try {
            let startDate = req.query.startDate ? moment(req.query.startDate).format("YYYY-MM-DD") : "";
            let endDate = req.query.endDate ? req.query.endDate : moment().format("YYYY-MM-DD");
            let dataIncident = await Incident.findAll({
                attributes: ['IncidentTypeId', 
                [sequelize.fn('sum',sequelize.col('SumTimeFix')), 'CountTimeAvg']
            ],
                where: {IsDeleted: 0,
                    SumTimeFix: {
                        [Op.ne]: null
                    },
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                },
                group: ['IncidentTypeId']
            })
            res.json({dataIncident:dataIncident})          
        } catch (error) {
            console.log(error)
        }
    }
    //get các năm có sự cố
    async getCountIncidentByYear(req,res,next){
        try {
            let year = await db.sequelize.query(`SELECT YEAR(CreatedDate) Year FROM Incident GROUP BY YEAR(CreatedDate)
            `,{
                type: db.sequelize.QueryTypes.SELECT
              });
            res.json({year:year})          
        } catch (error) {
            console.log(error)
        }
    }
    //thống kê sự cố tháng (cột)
    async countIncidentByMonth(req,res,next){
        try {
            let year = req.query.year
            let dataByYear =await db.sequelize.query(`
                SELECT MONTH(CreatedDate) MONTH, COUNT(*) COUNT
                FROM Incident
                WHERE YEAR(CreatedDate)= ${year}
                GROUP BY MONTH(CreatedDate);
            `,{
                type: db.sequelize.QueryTypes.SELECT             
            })
            let listData = [0,0,0,0,0,0,0,0,0,0,0,0]
            dataByYear.forEach(value=>{
                if(value.MONTH == 1){
                    listData[0] = value.COUNT
                }
                if(value.MONTH == 2){
                    listData[1] = value.COUNT
                }
                if(value.MONTH == 3){
                    listData[2] = value.COUNT
                }
                if(value.MONTH == 4){
                    listData[3] = value.COUNT
                }
                if(value.MONTH == 5){
                    listData[4] = value.COUNT
                }
                if(value.MONTH == 6){
                    listData[5] = value.COUNT
                }
                if(value.MONTH == 7){
                    listData[6] = value.COUNT
                }
                if(value.MONTH == 8){
                    listData[7] = value.COUNT
                }
                if(value.MONTH == 9){
                    listData[8] = value.COUNT
                }
                if(value.MONTH == 10){
                    listData[9] = value.COUNT
                }
                if(value.MONTH == 11){
                    listData[10] = value.COUNT
                }
                if(value.MONTH == 12){
                    listData[11] = value.COUNT
                }
            })
            res.json({listData:listData})          
        } catch (error) {
            console.log(error)
        }
    }



//thống kê hóa đơn (tròn)
    async countBillByStatus(req,res,next){
        try {
            let startDate = req.query.startDate ? moment(req.query.startDate).format("YYYY-MM-DD") : "";
            let endDate = req.query.endDate ? req.query.endDate : moment().format("YYYY-MM-DD");
            //số hóa đơn theo trạng thái
            let dataBill = await Billing.findAll({
                attributes: ['Status', [sequelize.fn('count', sequelize.col('Status')), 'CountStatus']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                },
                group: ['Status'],
                having: Sequelize.literal(`Status IN (2,3,6)`),
            })
            //tổng tiền đã thu
            let SumResiMoney = await Billing.findAll({
                attributes: [[sequelize.fn('sum', sequelize.col('ResiMoney')), 'SumResiMoney']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                }
            })
            //tổng tiền chưa thu chưa tính thu thiếu
            let notMoney = await Billing.findAll({
                attributes : [[sequelize.fn('sum',sequelize.col('TotalFee')),'sumNotMoney']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    },
                    ResiMoney: {
                        [Op.eq]: null
                    },
                    InDebtMoney: {
                        [Op.eq]: null
                    },
                    RedunMoney: {
                        [Op.eq]: null
                    },
                }
            })
            //tổng tiền thu thiếu
            let sumMoneyInDeb = await Billing.findAll({
                attributes : [[sequelize.fn('sum',sequelize.col('InDebtMoney')),'InDebtMoney']],
                where : {IsDeleted : 0,
                    CreatedDate: {
                    [Op.between]: [startDate,endDate]
                }}
            })
            let sumNotMoney = 0
            if(notMoney[0].dataValues.sumNotMoney){
                sumNotMoney += parseFloat(notMoney[0].dataValues.sumNotMoney)
            }
            if(sumMoneyInDeb[0].dataValues.InDebtMoney){
                sumNotMoney+= parseFloat(sumMoneyInDeb[0].dataValues.InDebtMoney)
            }
            let dataMoney = []
            if(sumNotMoney){
                dataMoney.push({"value":sumNotMoney,"name":"Tiền chưa thu"})
            }
            if(SumResiMoney[0].dataValues.SumResiMoney){
                dataMoney.push({"value":parseFloat(SumResiMoney[0].dataValues.SumResiMoney),"name":"Tiền đã thu"})
            }           
            res.json({dataBill:dataBill,dataMoney:dataMoney})          
        } catch (error) {
            console.log(error)
        }
    }

    //thống kê hóa đơn tháng (cột)
    async getCountBillByYear(req,res,next){
        try {
            let year = await db.sequelize.query(`SELECT YEAR(CreatedDate) Year FROM Billings GROUP BY YEAR(CreatedDate)
            `,{
                type: db.sequelize.QueryTypes.SELECT
            });
            res.json({year:year})          
        } catch (error) {
            console.log(error)
        }
    }

    getDataCountBillByMonth(status,year) { 
        
        let dataByYear = db.sequelize.query(`
            SELECT MONTH(CreatedDate) MONTH, COUNT(*) COUNT
            FROM Billings
            WHERE YEAR(CreatedDate)= ${year} AND Status = ${status}
            GROUP BY MONTH(CreatedDate);
        `,{
            type: db.sequelize.QueryTypes.SELECT             
        })
        return dataByYear
    }
    getListCountBillByMonth(list) { 
        let listData = [0,0,0,0,0,0,0,0,0,0,0,0]
        list.forEach(value=>{
            if(value.MONTH == 1){
                listData[0] = value.COUNT
            }
            if(value.MONTH == 2){
                listData[1] = value.COUNT
            }
            if(value.MONTH == 3){
                listData[2] = value.COUNT
            }
            if(value.MONTH == 4){
                listData[3] = value.COUNT
            }
            if(value.MONTH == 5){
                listData[4] = value.COUNT
            }
            if(value.MONTH == 6){
                listData[5] = value.COUNT
            }
            if(value.MONTH == 7){
                listData[6] = value.COUNT
            }
            if(value.MONTH == 8){
                listData[7] = value.COUNT
            }
            if(value.MONTH == 9){
                listData[8] = value.COUNT
            }
            if(value.MONTH == 10){
                listData[9] = value.COUNT
            }
            if(value.MONTH == 11){
                listData[10] = value.COUNT
            }
            if(value.MONTH == 12){
                listData[11] = value.COUNT
            }
        })
        return listData
    }

    async countBillByMonth(req,res,next){
        try {    
            let year = req.query.year        
            let dataExpried = await this.getDataCountBillByMonth(2,year)
            let dataPaid = await this.getDataCountBillByMonth(3,year)
            let dataRevoke = await this.getDataCountBillByMonth(6,year)

            let list_dataExpried = this.getListCountBillByMonth(dataExpried)
            let list_dataPaid = this.getListCountBillByMonth(dataPaid)
            let list_dataRevoke = this.getListCountBillByMonth(dataRevoke)
            res.json({list_dataExpried:list_dataExpried,list_dataPaid:list_dataPaid,list_dataRevoke:list_dataRevoke})          
        } catch (error) {
            console.log(error)
        }
    }

//thống kê căn hộ

    async getListBuilding(req,res,next){
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

    async getListFloor(req,res,next){
        let BuildingId = req.query.BuildingId
        try {
            let listFloor= await House.findAll({
                where:{
                    IsDeleted: 0,
                    BuildingId: BuildingId
                },
                attributes : ['Id','Floor']
            })
            res.json({listFloor:listFloor})
            
        } catch (error) {
            console.log(error)
        }
    }
    async countHouseByStatus(req,res,next){
        try {
            let startDate = req.query.startDate ? moment(req.query.startDate).format("YYYY-MM-DD") : "";
            let endDate = req.query.endDate ? req.query.endDate : moment().format("YYYY-MM-DD");
            let buildingId = req.query.buildingId
            let floor = req.query.floor
//biểu đồ tròn
            let cond_getHouseId = {
                CreatedDate: {
                    [Op.between]: [startDate,endDate]
                    }
            }
            if(buildingId != 'undefined'){
                cond_getHouseId.BuildingId = buildingId
            }
            if(floor != 'undefined'){
                cond_getHouseId.Floor = floor
            }
            let getHouseId = await House.findAll({
                attributes : ['Id'],
                where :cond_getHouseId
            })
            let cond_dataHouse = {
                CreatedDate: {
                [Op.between]: [startDate,endDate]
                }
            }
            let listHouseId = []
            if(getHouseId.length > 0){
                getHouseId.forEach(val=>{
                    listHouseId.push(val.dataValues.Id)
                })
                cond_dataHouse.HouseId = {
                        [Op.in]: listHouseId
                    }
            }            
            let dataHouse = await ApartmentStatusHistory.findAll({
                attributes: ['StatusId', [sequelize.fn('count', sequelize.col('StatusId')), 'CountStatus']],
                where: cond_dataHouse,
                group: ['StatusId'],
                having: Sequelize.literal(`StatusId IN (8,12,13)`),
            })
            let dataHouseRevoke = await Billing.findAll({
                attributes: ['Status', [sequelize.fn('count', sequelize.col('Status')), 'CountStatusRevoke']],
                where: {IsDeleted: 0,
                    CreatedDate: {
                        [Op.between]: [startDate,endDate]
                    }
                },
                group: ['Status'],
                having: Sequelize.literal(`Status IN (6)`),
            })

//tổng số căn hộ
            let sumHouse = await House.findAll({
                attributes: [[sequelize.fn('count', sequelize.col('Id')), 'sumHouse']],
                where: cond_getHouseId
            })

//thời gian ở trung bình trong mỗi lần ở
            let sumTimeRentHouse= await Contract.findAll({
                attributes: [[Sequelize.fn('TIMESTAMPDIFF',sequelize.literal('day'), sequelize.col('CheckinDate'),sequelize.col('CheckoutDate')),'sumTime']],
                where : cond_dataHouse,
                
            })
            let sumAvgTimeRentHouse = 0
            if(sumTimeRentHouse.length > 0){
                sumTimeRentHouse.forEach(val=>{
                    sumAvgTimeRentHouse += val.dataValues.sumTime
                })
                sumAvgTimeRentHouse = Math.ceil(sumAvgTimeRentHouse/sumTimeRentHouse.length)
            }
//thời gian trống trung bình mỗi lần trống
            let sumTimeEmpty = await ApartmentStatusHistory.findAll({
                where : {
                    HouseId:{
                    [Op.in] : listHouseId
                },
                StatusId :{
                    [Op.in] : [8,9]
                }            
                }
          })
            res.json({dataHouse:dataHouse,dataHouseRevoke:dataHouseRevoke,
                sumHouse:sumHouse,sumAvgTimeRentHouse:sumAvgTimeRentHouse,sumTimeEmpty:sumTimeEmpty})          
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = DashboardHandler