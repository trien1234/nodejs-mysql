const RoleHandle = require('../Handlers/roleHandler');

class RoleController{
    constructor(){
        this.roleHandler = new RoleHandle();
    }

    getRoleById(req,res){
        this.roleHandler.getRoleById(req,res);
    }
    getRoles(req,res){
        this.roleHandler.getRoles(req,res);
    }
    updateRole(req,res){
        this.roleHandler.updateRole(req,res);
    }
    deleteRole(req,res){
        this.roleHandler.deleteRole(req,res);
    }
    createRole(req,res){
        this.roleHandler.createRole(req,res);
    }
}

module.exports = RoleController;