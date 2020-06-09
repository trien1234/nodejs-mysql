const FixerGroupHandle = require('../Handlers/fixerGroupHandler');

class FixerGroupController{
    constructor(){
        this.fixerGroupHandler = new FixerGroupHandle();
    }

    createFixerGroup(req,res){
        this.fixerGroupHandler.createFixerGroup(req,res);
    }
    updateFixerGroup(req,res){
        this.fixerGroupHandler.updateFixerGroup(req,res);
    }
    deleteFixerGroup(req,res){
        this.fixerGroupHandler.deleteFixerGroup(req,res);
    }
    getFixerGroupById(req,res){
        this.fixerGroupHandler.getFixerGroupById(req,res);
    }
    getFixerGroups(req,res){
        this.fixerGroupHandler.getFixerGroups(req,res);
    }
}

module.exports = FixerGroupController;