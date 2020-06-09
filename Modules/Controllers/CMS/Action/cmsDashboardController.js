const DashboardHandler = require('../../../Handlers/CMS/cmsDashboardHandler');

class DashboardController{
    constructor(){
        this.dashboarHandler = new DashboardHandler();
    }
    async countIncidentByType(req,res,next){
        this.dashboarHandler.countIncidentByType(req,res)
    }
    async countIncidentByStatus(req,res,next){
        this.dashboarHandler.countIncidentByStatus(req,res)
    }

    async countIncidentByTimeAvg(req,res,next){
        this.dashboarHandler.countIncidentByTimeAvg(req,res)
    }

    async countIncidentByMonth(req,res,next){
        this.dashboarHandler.countIncidentByMonth(req,res)
    }

    async getCountIncidentByYear(req,res,next){
        this.dashboarHandler.getCountIncidentByYear(req,res)
    }

    async countBillByStatus(req,res,next){
        this.dashboarHandler.countBillByStatus(req,res)
    }

    async getCountBillByYear(req,res,next){
        this.dashboarHandler.getCountBillByYear(req,res)
    }

    async countBillByMonth(req,res,next){
        this.dashboarHandler.countBillByMonth(req,res)
    }

    async getListBuilding(req,res,next){
        this.dashboarHandler.getListBuilding(req,res)
    }
    async getListFloor(req,res,next){
        this.dashboarHandler.getListFloor(req,res)
    }
    async countHouseByStatus(req,res,next){
        this.dashboarHandler.countHouseByStatus(req,res)
    }
}
module.exports = DashboardController