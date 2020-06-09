const express = require('express');
const router = express.Router();

const HouseController = require('../Controllers/houseController');
const authMiddleware = require('../Middlewares/authMiddleware');

let houseController = new HouseController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    houseController.createHouse(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    houseController.updateHouse(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    houseController.deleteHouse(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    houseController.getHouseById(req,res);
});
router.post('/search',authMiddleware.isAuth, function(req,res){
    houseController.searchHouse(req,res);
});
router.post('/getAllManaging',authMiddleware.isAuth, function(req,res){
    houseController.getAllManagingHouses(req,res);
});
router.post('/getManagingById', authMiddleware.isAuth, function (req, res) {
    houseController.getManagingHouseById(req, res);
});
router.post('/updateManagingById', authMiddleware.isAuth, function (req, res) {
    houseController.updateManagingHouseById(req, res);
});
router.get('/getAllByBuildingId', authMiddleware.isAuth, function (req, res) {
    houseController.getAllByBuildingId(req, res);
});
router.post('/addTenant', authMiddleware.isAuth, function (req, res) {
    houseController.addTenant(req, res);
});
router.post('/createAndAddTenant', authMiddleware.isAuth, function (req, res) {
    houseController.createAndAddTenant(req, res);
});
router.post('/updateTenant', authMiddleware.isAuth, function (req, res) {
    houseController.updateTenant(req, res);
});
router.post('/deleteTenant', authMiddleware.isAuth, function (req, res) {
    houseController.deleteTenant(req, res);
});
router.post('/addVehicle', authMiddleware.isAuth, function (req, res) {
    houseController.addVehicle(req, res);
});
router.post('/createAndAddVehicle', authMiddleware.isAuth, function (req, res) {
    houseController.createAndAddVehicle(req, res);
});
router.post('/updateVehicle', authMiddleware.isAuth, function (req, res) {
    houseController.updateVehicle(req, res);
});
router.post('/deleteVehicle', authMiddleware.isAuth, function (req, res) {
    houseController.deleteVehicle(req, res);
});
router.post('/updateContract', authMiddleware.isAuth, function (req, res) {
    houseController.updateContract(req, res);
});

module.exports = router;