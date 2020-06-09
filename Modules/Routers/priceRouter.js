const express = require('express');
const router = express.Router();

const PriceController = require('../Controllers/priceController');
const authMiddleware = require('../Middlewares/authMiddleware');

let priceController = new PriceController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    priceController.createPrice(req,res);
});
router.post('/confirm',authMiddleware.isAuth, function(req,res){
    priceController.confirmFixingPrice(req,res);
});

module.exports = router;