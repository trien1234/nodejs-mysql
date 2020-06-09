const express = require('express');
const router = express.Router();

const BuildingController = require('../Controllers/buildingController');
const authMiddleware = require('../Middlewares/authMiddleware');

let buildingController = new BuildingController();

router.post('/createBuilding',authMiddleware.isAuth, function(req,res){
    buildingController.createBuilding(req,res);
});

router.post('/updateBuilding',authMiddleware.isAuth, function(req,res){
    buildingController.updateBuilding(req,res);
});
router.post('/deleteBuilding',authMiddleware.isAuth, function(req,res){
    buildingController.deleteBuilding(req,res);
});
router.post('/getBuildingById',authMiddleware.isAuth, function(req,res){
    buildingController.getBuildingById(req,res);
});
router.post('/searchBuilding',authMiddleware.isAuth, function(req,res){
    buildingController.searchBuilding(req,res);
});
router.post('/getAllManaging',authMiddleware.isAuth, function(req,res){
    buildingController.getAllManagingBuildings(req, res);
});

module.exports = router;