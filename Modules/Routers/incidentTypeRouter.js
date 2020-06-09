const express = require('express');
const router = express.Router();

const IncidentTypeController = require('../Controllers/incidentTypeController');
const authMiddleware = require('../Middlewares/authMiddleware');

let incidentTypeController = new IncidentTypeController();

router.post('/group/create',authMiddleware.isAuth, function(req,res){
    incidentTypeController.create(req,res);
});
router.post('/group/update',authMiddleware.isAuth, function(req,res){
    incidentTypeController.update(req,res);
});
router.get('/group/view',authMiddleware.isAuth, function(req,res){
    incidentTypeController.getincidentById(req,res);
});
router.get('/group/list',authMiddleware.isAuth, function(req,res){
    incidentTypeController.list(req,res);
});
router.post('/group/delete',authMiddleware.isAuth, function(req,res){
    incidentTypeController.delete(req,res);
});

module.exports = router;