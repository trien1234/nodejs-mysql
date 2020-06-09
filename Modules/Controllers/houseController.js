const HouseHandler = require('../Handlers/houseHandler');

class HouseController{
    constructor(){
        this.houseHandler = new HouseHandler();
    }
    
    createHouse(req,res){
        this.houseHandler.createHouse(req,res);
    }
    updateHouse(req,res){
        this.houseHandler.updateHouse(req,res);
    }
    deleteHouse(req,res){
        this.houseHandler.deleteHouse(req,res);
    }
    getHouseById(req,res){
        this.houseHandler.getHouseById(req,res);
    }
    searchHouse(req,res){
        this.houseHandler.searchHouse(req,res);
    }
    getAllByBuildingId(req, res) {
        this.houseHandler.getAllByBuildingId(req, res);
    }
    getManagingHouseById(req, res) {
        this.houseHandler.getManagingHouseById(req, res);
    }
    updateManagingHouseById(req, res) {
        this.houseHandler.updateManagingHouseById(req, res);
    }
    addTenant(req, res) {
        this.houseHandler.addTenant(req, res);
    }
    createAndAddTenant(req, res) {
        this.houseHandler.createAndAddTenant(req, res);
    }
    updateTenant(req, res) {
        this.houseHandler.updateTenant(req, res);
    }
    deleteTenant(req, res) {
        this.houseHandler.deleteTenant(req, res);
    }
    addVehicle(req, res) {
        this.houseHandler.addVehicle(req, res);
    }
    createAndAddVehicle(req, res) {
        this.houseHandler.createAndAddVehicle(req, res);
    }
    updateVehicle(req, res) {
        this.houseHandler.updateVehicle(req, res);
    }
    deleteVehicle(req, res) {
        this.houseHandler.deleteVehicle(req, res);
    }
    updateContract(req, res) {
        this.houseHandler.updateContract(req, res);
    }
}

module.exports = HouseController;