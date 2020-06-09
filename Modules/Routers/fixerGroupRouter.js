const express = require('express');
const router = express.Router();

const FixerGroupController = require('../Controllers/fixerGroupController');
const ApartmentController = require('../Controllers/apartmentController');
const authMiddleware = require('../Middlewares/authMiddleware');

let fixerController = new FixerGroupController();
let apartmentController = new ApartmentController();

router.post('/createGroup', function(req,res){
    fixerController.createFixerGroup(req,res);
});
router.post('/updateGroup',authMiddleware.isAuth, function(req,res){
    fixerController.updateFixerGroup(req,res);
});
router.post('/deleteGroup',authMiddleware.isAuth, function(req,res){
    fixerController.deleteFixerGroup(req,res);
});
router.post('/getGroupById',authMiddleware.isAuth, function(req,res){
    fixerController.getFixerGroupById(req,res);
});
router.post('/getGroups',authMiddleware.isAuth, function(req,res){
    fixerController.getFixerGroups(req,res);
});
router.get('/incident',authMiddleware.isAuth, function(req,res){
    apartmentController.searchApartmentIncidentByStatus(req,res);
});
router.get('/incident/detail/:id',authMiddleware.isAuth, function(req,res){
    apartmentController.detailApartmentIncidentAppFixer(req,res);
});
router.get('/incident/new', authMiddleware.isAuth, function(req, res){
	apartmentController.listNewApartmentIncidentAppFixer(req, res);
});
router.get('/incident/schedule', authMiddleware.isAuth, function(req, res){
	apartmentController.scheduleFixer(req, res);
});
router.get('/incident/reMind', function(req, res){
	apartmentController.reMindFixer(req, res);
});
module.exports = router;