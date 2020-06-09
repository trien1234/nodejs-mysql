const express = require('express');
const router = express.Router();

const BillController = require('../Controllers/billController');
const authMiddleware = require('../Middlewares/authMiddleware');

let billController = new BillController();

router.get('/getAllBillByBuildingId',authMiddleware.isAuth, function(req,res){
    billController.getAllBillByBuildingId(req,res);
});

router.get('/detail/:id',authMiddleware.isAuth, function(req,res){
    billController.detail(req,res);
});
router.post('/managerReceiveMoney',authMiddleware.isAuth, function(req,res){
    billController.managerReceiveMoney(req,res);
});
router.post('/addNote',authMiddleware.isAuth, function(req,res){
    billController.addNote(req,res);
});
router.get('/residentGetAllBill',authMiddleware.isAuth, function(req,res){
    billController.residentGetAllBill(req,res);
});
router.post('/setPayingSchedule',authMiddleware.isAuth, function(req,res){
    billController.setPayingSchedule(req, res);
});

module.exports = router;