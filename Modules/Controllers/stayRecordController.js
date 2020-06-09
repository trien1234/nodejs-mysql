const StayRecordHandler = require('../Handlers/stayRecordHandler');

class StayRecordController{
    constructor(){
        this.stayRecordHandler = new StayRecordHandler();
    }
    
    createStayRecord(req,res){
        this.stayRecordHandler.createStayRecord(req,res);
    }
    updateStayRecord(req,res){
        this.stayRecordHandler.updateStayRecord(req,res);
    }
    deleteStayRecord(req,res){
        this.stayRecordHandler.deleteStayRecord(req,res);
    }
    getStayRecordById(req,res){
        this.stayRecordHandler.getStayRecordById(req,res);
    }
}

module.exports = StayRecordController;