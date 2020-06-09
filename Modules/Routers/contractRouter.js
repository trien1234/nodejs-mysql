const express = require('express');
const router = express.Router();

const ContractController = require('../Controllers/contractController');
const authMiddleware = require('../Middlewares/authMiddleware');

let contractController = new ContractController();

router.post('/create',authMiddleware.isAuth, function(req,res){
    contractController.createContract(req,res);
});

router.post('/update',authMiddleware.isAuth, function(req,res){
    contractController.updateContract(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    contractController.deleteContract(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    contractController.getContractById(req,res);
});
router.post('/search',authMiddleware.isAuth, function(req,res){
    contractController.searchContract(req,res);
});
router.post('/extend',authMiddleware.isAuth, function(req,res){
    contractController.extendContract(req, res);
});

module.exports = router;