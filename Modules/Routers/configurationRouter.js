const express = require('express');
const router = express.Router();

const ConfigurationController = require('../Controllers/configurationController');
const authMiddleware = require('../Middlewares/authMiddleware');

let configurationController = new ConfigurationController();


router.post('/getPermissionByType',authMiddleware.isAuth, function(req,res){
    configurationController.getPermissionByType(req,res);
});
router.post('/uploadFile',authMiddleware.isAuth, function(req,res){
    configurationController.uploadFile(req,res);
});
router.post('/getRolesByType',authMiddleware.isAuth, function(req,res){
    configurationController.getRolesByType(req,res);
});
module.exports = router;