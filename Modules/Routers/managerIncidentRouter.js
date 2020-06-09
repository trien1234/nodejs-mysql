const express = require('express');
const router = express.Router();

const ManagerIncidentController = require('../Controllers/managerIncidentController');
const authMiddleware = require('../Middlewares/authMiddleware');

let managerIncidentController = new ManagerIncidentController();

router.post('/incident/create',authMiddleware.isAuth, function(req,res){
    managerIncidentController.createIncident(req,res);
});
router.get('/incident',authMiddleware.isAuth, function(req,res){
    managerIncidentController.searchIncidentByBuilding(req,res);
});
router.get('/incident/detail/:id',authMiddleware.isAuth, function(req,res){
    managerIncidentController.detailIncident(req,res);
});
router.post('/incident/receiveAndChoseFixerPriceOrNot',authMiddleware.isAuth, function(req,res){
    managerIncidentController.receiveAndChoseFixerPriceOrNot(req,res);
});
router.post('/incident/managerReceiverStatusFromFixer', authMiddleware.isAuth, function(req, res){
	managerIncidentController.managerReceiverStatusFromFixer(req, res);
});
module.exports = router;