const PriceHandler = require('../Handlers/priceHandler');

class PriceController{
    constructor(){
        this.priceHandler = new PriceHandler();
    }

    createPrice(req,res){
        this.priceHandler.createPrice(req,res);
    }
    confirmFixingPrice(req,res){
        this.priceHandler.confirmFixingPrice(req,res);
    }
}

module.exports = PriceController;