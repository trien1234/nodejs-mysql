const IncidentTypeHandler = require('../Handlers/incidentTypeHandler');

class IncidentTypeController{
    constructor(){
        this.incidentTypeHandler = new IncidentTypeHandler();
    }

    create(req,res){
        this.incidentTypeHandler.create(req,res);
    }
    update(req,res){
        this.incidentTypeHandler.update(req,res);
    }
    getincidentById(req,res){
        this.incidentTypeHandler.getincidentById(req,res);
    }
    list(req,res){
        this.incidentTypeHandler.list(req,res);
    }
    delete(req,res){
        this.incidentTypeHandler.delete(req,res);
    }
}

module.exports = IncidentTypeHandler;