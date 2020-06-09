const express = require('express');
const router = express.Router();

const RoomController = require('../Controllers/roomController');
const authMiddleware = require('../Middlewares/authMiddleware');

let roomController = new RoomController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    roomController.createRoom(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    roomController.updateRoom(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    roomController.deleteRoom(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    roomController.getRoomById(req,res);
});
router.post('/search',authMiddleware.isAuth, function(req,res){
    roomController.searchRoom(req,res);
});
router.post('/getAllByHouseId', authMiddleware.isAuth, function (req, res) {
    roomController.getAllByHouseId(req,res);
});
router.post('/getManagingById', authMiddleware.isAuth, function (req, res) {
    roomController.getManagingRoomById(req, res);
});

module.exports = router;