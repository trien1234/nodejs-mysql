const ContractHandler = require('../Handlers/contractHandler');

class ContractController{
    constructor(){
        this.contractHandler = new ContractHandler();
    }
    
    createContract(req,res){
        this.contractHandler.createContract(req,res);
    }
    updateContract(req,res){
        this.contractHandler.updateContract(req,res);
    }
    deleteContract(req,res){
        this.contractHandler.deleteContract(req,res);
    }
    getContractById(req,res){
        this.contractHandler.getContractById(req,res);
    }
    searchContract(req,res){
        this.contractHandler.searchContract(req,res);
    }
    extendContract(req,res){
        this.contractHandler.extendContract(req,res);
    }
}

module.exports = ContractController;