const RoomHandler = require('../Handlers/roomHandler');

class RoomController{
    constructor(){
        this.roomHandler = new RoomHandler();
    }
    
    createRoom(req,res){
        this.roomHandler.createRoom(req,res);
    }
    updateRoom(req,res){
        this.roomHandler.updateRoom(req,res);
    }
    deleteRoom(req,res){
        this.roomHandler.deleteRoom(req,res);
    }
    getRoomById(req,res){
        this.roomHandler.getRoomById(req,res);
    }
    searchRoom(req,res){
        this.roomHandler.searchRoom(req,res);
    }
    getAllByHouseId(req, res) {
        this.roomHandler.getAllByHouseId(req, res);
    }
    getManagingRoomById(req, res) {
        this.roomHandler.getManagingRoomById(req, res);
    }
}

module.exports = RoomController;