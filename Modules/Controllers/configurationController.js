const ConfigurationHandler = require('../Handlers/configurationHandle');

class ConfigurationController{
    constructor(){
        this.configurationHandler = new ConfigurationHandler();
    }
    
    getPermissionByType(req,res){
        this.configurationHandler.getPermissionByType(req,res);
    }
    uploadFile(req,res){
        this.configurationHandler.uploadFile(req,res);
    }
    getRolesByType(req,res){
        this.configurationHandler.getRolesByType(req,res);
    }
}

module.exports = ConfigurationController;