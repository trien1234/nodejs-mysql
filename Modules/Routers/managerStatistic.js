const express = require('express');
const router = express.Router();

const StatisticController = require('../Controllers/statisticController');
const authMiddleware = require('../Middlewares/authMiddleware');

let statisticController = new StatisticController();

router.get('/allStatistic',authMiddleware.isAuth, function(req,res){
    statisticController.allStatistic(req,res);
});

module.exports = router;