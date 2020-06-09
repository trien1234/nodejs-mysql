const UserHandle = require('../Handlers/userHandler');

class UserController{
    constructor(){
        this.userHandler = new UserHandle();
    }

    login (req,res){
        this.userHandler.login(req,res);
    }
    createUser(req,res){
        this.userHandler.createUser(req,res);
    }
    updateUser(req,res){
        this.userHandler.updateUser(req,res);
    }
    deleteUser(req,res){
        this.userHandler.deleteUser(req,res);
    }
    getUserById(req,res){
        this.userHandler.getUserById(req,res);
    }
    searchUser(req,res){
        this.userHandler.searchUser(req,res);
    }
    changePassword(req,res){
        this.userHandler.changePassword(req,res);
    }
    getProfile(req,res){
        this.userHandler.getProfile(req,res);
    }
    updateEvaluate(req,res){
        this.userHandler.updateEvaluate(req,res);
    }
    getEvaluateByType(req,res){
        this.userHandler.getEvaluateByType(req,res);
    }
    refreshToken(req,res){
        this.userHandler.refreshToken(req,res);
    }  
    forgotPassword(req,res){
        this.userHandler.forgotPassword(req,res);
    }   
    logout(req,res){
        this.userHandler.logout(req,res);
    }
    updateDeviceToken(req,res){
        this.userHandler.updateDeviceToken(req,res);
    }
}

module.exports = UserController;