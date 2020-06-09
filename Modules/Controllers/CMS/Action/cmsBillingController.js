const BillingHandler = require('../../../Handlers/CMS/cmsBillingHandler');

class CmsBillingController{
    constructor(){
        this.billingHandler = new BillingHandler();
    }
    async saveBillAsDraft(req,res,next){
        this.billingHandler.saveBillAsDraft(req,res)
    }

    async saveBill(req,res,next){
        this.billingHandler.saveBill(req,res)
    }

    async checkBeforeSave(req,res){
        this.billingHandler.checkBeforeSave(req,res)
    }
}

module.exports = CmsBillingController;