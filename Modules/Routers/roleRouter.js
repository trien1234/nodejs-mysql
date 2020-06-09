const express = require('express');
const router = express.Router();

const RoleController = require('../Controllers/roleController');
const authMiddleware = require('../Middlewares/authMiddleware');

let roleController = new RoleController();

router.post('/createRole',authMiddleware.isAuth, function(req,res){
    roleController.createRole(req,res);
});

router.post('/updateRole',authMiddleware.isAuth, function(req,res){
    roleController.updateRole(req,res);
});
router.post('/deleteRole',authMiddleware.isAuth, function(req,res){
    roleController.deleteRole(req,res);
});
router.post('/getRoleById',authMiddleware.isAuth, function(req,res){
    roleController.getRoleById(req,res);
});
router.post('/getRoles',authMiddleware.isAuth, function(req,res){
    roleController.getRoles(req,res);
});

module.exports = router;