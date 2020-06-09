const HomeForAppHandler = require('../Handlers/homeForAppHandler');

class HomeForAppController{
    constructor(){
        this.homeForAppHandler = new HomeForAppHandler();
    }

    managerSearching(req,res){
        this.homeForAppHandler.managerSearching(req,res);
    }
    fixerSearching(req,res){
        this.homeForAppHandler.fixerSearching(req,res);
    }
    managerSchedule(req,res){
        this.homeForAppHandler.managerSchedule(req,res);
    }
    listManagerSchedule(req,res){
        this.homeForAppHandler.listManagerSchedule(req,res);
    }
}

module.exports = HomeForAppController;