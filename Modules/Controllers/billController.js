const BillHandler = require('../Handlers/billHandler');

class BillController{
    constructor(){
        this.billHandler = new BillHandler();
    }

    getAllBillByBuildingId(req,res){
        this.billHandler.getAllBillByBuildingId(req,res);
    }
    detail(req,res){
        this.billHandler.detail(req,res);
    }
    managerReceiveMoney(req,res){
        this.billHandler.managerReceiveMoney(req,res);
    }
    addNote(req,res){
        this.billHandler.addNote(req,res);
    }
    residentGetAllBill(req,res){
        this.billHandler.residentGetAllBill(req,res);
    }
    setPayingSchedule(req,res){
        this.billHandler.setPayingSchedule(req,res);
    }
}

module.exports = BillController;