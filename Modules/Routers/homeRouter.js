const express = require('express');
const router = express.Router();

const HomeForAppController = require('../Controllers/homeForAppController');
const authMiddleware = require('../Middlewares/authMiddleware');

let homeForAppController = new HomeForAppController();

router.get('/managerSearching',authMiddleware.isAuth, function(req,res){
    homeForAppController.managerSearching(req,res);
});

router.get('/fixerSearching',authMiddleware.isAuth, function(req,res){
    homeForAppController.fixerSearching(req,res);
});

router.post('/managerSchedule',authMiddleware.isAuth, function(req,res){
    homeForAppController.managerSchedule(req,res);
});

router.get('/listManagerSchedule',authMiddleware.isAuth, function(req,res){
    homeForAppController.listManagerSchedule(req,res);
});

module.exports = router;