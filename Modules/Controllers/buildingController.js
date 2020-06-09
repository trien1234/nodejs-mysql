const BuildingHandler = require('../Handlers/buildingHandler');

class BuildingController{
    constructor(){
        this.buildingHandler = new BuildingHandler();
    }

    createBuilding(req,res){
        this.buildingHandler.createBuilding(req,res);
    }
    updateBuilding(req,res){
        this.buildingHandler.updateBuilding(req,res);
    }
    deleteBuilding(req,res){
        this.buildingHandler.deleteBuilding(req,res);
    }
    getBuildingById(req,res){
        this.buildingHandler.getBuildingById(req,res);
    }
    searchBuilding(req,res){
        this.buildingHandler.searchBuilding(req,res);
    }
    getAllManagingBuildings(req,res){
        this.buildingHandler.getAllManagingBuildings(req,res);
    }
}

module.exports = BuildingController;