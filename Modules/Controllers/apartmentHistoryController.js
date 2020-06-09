const ApartmentStatusHistoryHandler = require('../Handlers/apartmentHistoryHandler');

class ApartmentStatusHistoryController{
    constructor(){
        this.apartmentHistoryHandler = new ApartmentStatusHistoryHandler();
    }

    createApartmentStatusHistory(req,res){
        this.apartmentHistoryHandler.createApartmentStatusHistory(req,res);
    }
    updateApartmentStatusHistory(req,res){
        this.apartmentHistoryHandler.updateApartmentStatusHistory(req,res);
    }
    deleteApartmentStatusHistory(req,res){
        this.apartmentHistoryHandler.deleteApartmentStatusHistory(req,res);
    }
    getApartmentStatusHistoryById(req,res){
        this.apartmentHistoryHandler.getApartmentStatusHistoryById(req,res);
    }
}

module.exports = ApartmentStatusHistoryController;