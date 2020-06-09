const CmsUserHandler = require('../../../Handlers/CMS/cmsUserHandler');

class CmsUserController{
    constructor(){
        this.cmsUserHandler = new CmsUserHandler();
    }

    addUser(req,res){
        this.cmsUserHandler.addUser(req,res);
    }
    listUser(req,res){
        this.cmsUserHandler.listUser(req,res);
    }
    editUsers(req,res){
        this.cmsUserHandler.editUsers(req,res);
    }
}

module.exports = CmsUserController;