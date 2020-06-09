const VehicleHandler = require('../Handlers/vehicleHandler');

class VehicleController{
    constructor(){
        this.vehicleHandler = new VehicleHandler();
    }
    
    createVehicle(req,res){
        this.vehicleHandler.createVehicle(req,res);
    }
    updateVehicle(req,res){
        this.vehicleHandler.updateVehicle(req,res);
    }
    deleteVehicle(req,res){
        this.vehicleHandler.deleteVehicle(req,res);
    }
    getVehicleById(req,res){
        this.vehicleHandler.getVehicleById(req,res);
    }
    searchVehicle(req,res){
        this.vehicleHandler.searchVehicle(req,res);
    }
}

module.exports = VehicleController;