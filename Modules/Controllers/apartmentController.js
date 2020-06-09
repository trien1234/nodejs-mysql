const ApartmentHandler = require('../Handlers/apartmentHandler');

class ApartmentController{
    constructor(){
        this.apartmentHandler = new ApartmentHandler();
    }

    createApartmentIncident(req,res){
        this.apartmentHandler.createApartmentIncident(req,res);
    }
    updateIncident(req,res){
        this.apartmentHandler.updateIncident(req,res);
    }
    addNoteApartmentIncident(req,res){
        this.apartmentHandler.addNoteApartmentIncident(req,res);
    }
    updateApartmentIncident(req,res){
        this.apartmentHandler.updateApartmentIncident(req,res);
    }
    deleteApartmentIncident(req,res){
        this.apartmentHandler.deleteApartmentIncident(req,res);
    }
    getApartmentIncidentById(req,res){
        this.apartmentHandler.getApartmentIncidentById(req,res);
    }
    searchApartmentIncidentByStatus(req,res){
        this.apartmentHandler.searchApartmentIncidentByStatus(req,res);
    }
    detailApartmentIncidentAppFixer(req, res){
        this.apartmentHandler.detailApartmentIncidentAppFixer(req,res);
    }
    detailApartmentIncidentAndStatus(req, res){
        this.apartmentHandler.detailApartmentIncidentAndStatus(req, res)
    }
    listNewApartmentIncidentAppFixer(req, res){
        this.apartmentHandler.listNewApartmentIncidentAppFixer(req, res)
    }
    addRating(req, res){
        this.apartmentHandler.addRating(req, res)
    }
    scheduleFixer(req, res){
        this.apartmentHandler.scheduleFixer(req, res)
    }
    reMindFixer(req, res){
        this.apartmentHandler.reMindFixer(req, res)
    }
    fixerSendFinishStatusToManager(req, res){
        this.apartmentHandler.fixerSendFinishStatusToManager(req, res)
    }
}

module.exports = ApartmentController;