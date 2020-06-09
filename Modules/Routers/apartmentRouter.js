const express = require('express');
const router = express.Router();

const ApartmentController = require('../Controllers/apartmentController');
const authMiddleware = require('../Middlewares/authMiddleware');

let apartmentController = new ApartmentController();

router.post('/incident/create',authMiddleware.isAuth, function(req,res){
    apartmentController.createApartmentIncident(req,res);
});
router.post('/incident/remake/:id',authMiddleware.isAuth, function(req,res){
    apartmentController.updateIncident(req,res);
});
router.post('/incident/note',authMiddleware.isAuth, function(req,res){
    apartmentController.addNoteApartmentIncident(req,res);
});
router.post('/incident/update',authMiddleware.isAuth, function(req,res){
    apartmentController.updateApartmentIncident(req,res);
});
router.post('/incident/delete',authMiddleware.isAuth, function(req,res){
    apartmentController.deleteApartmentIncident(req,res);
});
router.get('/incident/:id',authMiddleware.isAuth, function(req,res){
    apartmentController.getApartmentIncidentById(req,res);
});
router.get('/incident/detail/:id', authMiddleware.isAuth, function(req, res){
	apartmentController.detailApartmentIncidentAndStatus(req, res);
});
router.post('/incident/rating', authMiddleware.isAuth, function(req, res){
	apartmentController.addRating(req, res);
});
router.post('/incident/fixerSendFinishStatusToManager', authMiddleware.isAuth, function(req, res){
	apartmentController.fixerSendFinishStatusToManager(req, res);
});

module.exports = router;