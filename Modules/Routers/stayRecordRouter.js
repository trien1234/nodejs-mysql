const express = require('express');
const router = express.Router();

const StayRecordController = require('../Controllers/stayRecordController');
const authMiddleware = require('../Middlewares/authMiddleware');

let stayRecordController = new StayRecordController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    stayRecordController.createStayRecord(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    stayRecordController.updateStayRecord(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    stayRecordController.deleteStayRecord(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    stayRecordController.getStayRecordById(req,res);
});

module.exports = router;