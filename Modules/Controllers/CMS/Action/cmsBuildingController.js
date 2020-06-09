const BuildingHandler = require('../../../Handlers/CMS/cmsBuildingHandler');

class CmsBuildingController{
    constructor(){
        this.buildingHandler = new BuildingHandler();
    }
    async addBuildingGet(req,res,next){
        this.buildingHandler.addBuildingGet(req,res)
    }

    async addBuildingPost(req,res,next){
        this.buildingHandler.addBuildingPost(req,res)
    }

    async buildingListGet(req,res,next){
        this.buildingHandler.buildingListGet(req,res)
    }

    async deleteBuildingPost(req,res,next){
        this.buildingHandler.deleteBuildingPost(req,res)
    }
    /**
        For Manager
    **/
    async managerBuilding(req,res){
        this.buildingHandler.listManagerBuilding(req,res);
    }
    /**
        End
    **/
}

module.exports = CmsBuildingController;