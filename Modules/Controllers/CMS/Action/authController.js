const AuthHandler = require('../../../Handlers/CMS/authHandler');

class AuthController{
    constructor(){
        this.authHandler = new AuthHandler();
    }

    adminLogin(req,res){
        this.authHandler.adminLogin(req,res);
    }
    logOut(req,res){
        this.authHandler.logOut(req,res);
    }
}

module.exports = AuthController;