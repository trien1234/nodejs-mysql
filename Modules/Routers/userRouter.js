const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/userController');
const authMiddleware = require('../Middlewares/authMiddleware');

let userController = new UserController();

router.post('/login', function(req,res){
    userController.login(req,res);
});

router.post('/createUser', function(req,res){
    userController.createUser(req,res);
});

router.post('/updateUser',authMiddleware.isAuth, function(req,res){
    userController.updateUser(req,res);
});
router.post('/deleteUser',authMiddleware.isAuth, function(req,res){
    userController.deleteUser(req,res);
});
router.post('/getUserById',authMiddleware.isAuth, function(req,res){
    userController.getUserById(req,res);
});
router.post('/searchUser',authMiddleware.isAuth, function(req,res){
    userController.searchUser(req,res);
});
router.post('/changePassword',authMiddleware.isAuth, function(req,res){
    userController.changePassword(req,res);
});
router.post('/getProfile',authMiddleware.isAuth, function(req,res){
    userController.getProfile(req,res);
});
router.post('/updateEvaluate',authMiddleware.isAuth, function(req,res){
    userController.updateEvaluate(req,res);
});
router.post('/getEvaluateByType',authMiddleware.isAuth, function(req,res){
    userController.getEvaluateByType(req,res);
});
router.post('/refreshToken', function(req,res){
    userController.refreshToken(req,res);
});
router.post('/forgotPassword', function(req,res){
    userController.forgotPassword(req,res);
});
router.post('/logout', function(req,res){
    userController.logout(req,res);
});
router.post('/updateDeviceToken', function(req,res){
    userController.updateDeviceToken(req,res);
});
module.exports = router;