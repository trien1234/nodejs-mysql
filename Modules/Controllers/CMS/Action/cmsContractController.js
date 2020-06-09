const ContractHandler = require('../../../Handlers/CMS/cmsContractHandler');

class ContractController{
    constructor(){
        this.contractHandler = new ContractHandler();
    }
    async contractCreate(req,res,next){
        this.contractHandler.contractCreate(req,res)
    }
    async createContract(req,res,next){
        this.contractHandler.createContract(req,res)
    }
    async getAttribute(req,res,next){
        this.contractHandler.getAttribute(req,res)
    }
    async contractList(req,res,next){
        this.contractHandler.contractList(req,res)
    }
    async deleteContract(req,res,next){
        this.contractHandler.deleteContract(req,res)
    }
    async editContract(req,res,next){
        this.contractHandler.editContract(req,res)
    }
}
module.exports = ContractController