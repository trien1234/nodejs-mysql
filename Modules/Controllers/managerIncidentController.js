const ManagerIncidentHandler = require('../Handlers/managerIncidentHandler');

class ManagerIncidentController{
    constructor(){
        this.managerIncidentHandler = new ManagerIncidentHandler();
    }

    createIncident(req,res){
        this.managerIncidentHandler.createIncident(req,res);
    }
    searchIncidentByBuilding(req,res){
        this.managerIncidentHandler.searchIncidentByBuilding(req,res);
    }
    detailIncident(req,res){
        this.managerIncidentHandler.detailIncident(req,res);
    }
    receiveAndChoseFixerPriceOrNot(req,res){
        this.managerIncidentHandler.receiveAndChoseFixerPriceOrNot(req,res);
    }
    managerReceiverStatusFromFixer(req, res){
        this.managerIncidentHandler.managerReceiverStatusFromFixer(req, res)
    }
}

module.exports = ManagerIncidentController;