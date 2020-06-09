const HouseHandler = require('../../../Handlers/CMS/cmsHouseHandler');

class HouseController{
    constructor(){
        this.houseHandler = new HouseHandler()
    }
    async createHouseGet(req,res,next){
        this.houseHandler.createHouseGet(req,res)
    }

    async createHousePost(req,res,next){
        this.houseHandler.createHousePost(req,res)
    }

    async houseList(req,res,next){
        this.houseHandler.houseList(req,res)
    }

    async deleteHouse(req,res,next){
        this.houseHandler.deleteHouse(req,res)
    }

    async updateHouse(req,res,next){
        this.houseHandler.updateHouse(req,res)
    }

    async createHouseGetManager(req,res,next){
        this.houseHandler.createHouseGetManager(req,res)
    }

    async modalGetStatus(req,res,next){
        this.houseHandler.modalGetStatus(req,res)
    }

    async updateStatusApartmentstatusHis(req,res,next){
        this.houseHandler.updateStatusApartmentstatusHis(req,res)
    }

    /**
        For Manager
    **/
    async managerHouse(req,res){
        this.houseHandler.managerHouse(req,res)
    }
    /**
        End
    **/

    /**
        For Accounting
    **/
    async accountingHouse(req,res){
        this.houseHandler.accountingHouse(req,res)
    }
}

module.exports = HouseController;