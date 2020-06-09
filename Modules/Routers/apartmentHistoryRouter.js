const express = require('express');
const router = express.Router();

const ApartmentHistoryController = require('../Controllers/apartmentHistoryController');
const authMiddleware = require('../Middlewares/authMiddleware');

let apartmentHistoryController = new ApartmentHistoryController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    apartmentHistoryController.createApartmentStatusHistory(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    apartmentHistoryController.updateApartmentStatusHistory(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    apartmentHistoryController.deleteApartmentStatusHistory(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    apartmentHistoryController.getApartmentStatusHistoryById(req,res);
});

module.exports = router;