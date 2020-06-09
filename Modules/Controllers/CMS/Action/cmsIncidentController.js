const IncidentHandler = require('../../../Handlers/CMS/cmsIncidentHandler');

class IncidentController{
	constructor(){
		this.incidentHandler = new IncidentHandler();
	}
    async incidentList(req,res,next){
        this.incidentHandler.incidentList(req,res)
    }
    async getBuiLding_House_Incident(req,res,next){
        this.incidentHandler.getBuiLding_House_Incident(req,res)
    }
    async deleteIncident(req,res,next){
        this.incidentHandler.deleteIncident(req,res)
    }
    async getHousebyBuildingId(req,res,next){
        this.incidentHandler.getHousebyBuildingId(req,res)
    }
}
module.exports = IncidentController