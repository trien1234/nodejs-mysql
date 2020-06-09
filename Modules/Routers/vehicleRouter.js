const express = require('express');
const router = express.Router();

const VehicleController = require('../Controllers/vehicleController');
const authMiddleware = require('../Middlewares/authMiddleware');

let vehicleController = new VehicleController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    vehicleController.createVehicle(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    vehicleController.updateVehicle(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    vehicleController.deleteVehicle(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    vehicleController.getVehicleById(req,res);
});
router.post('/search',authMiddleware.isAuth, function(req,res){
    vehicleController.searchVehicle(req,res);
});

module.exports = router;