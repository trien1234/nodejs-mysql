const NotifyHandler = require('../Handlers/notifyHandler');

class NotifyController{
    constructor(){
        this.notifyHandler = new NotifyHandler();
    }

    updateNotify(req,res){
        this.notifyHandler.updateNotify(req,res);
    }
    listNotify(req,res){
        this.notifyHandler.listNotify(req,res);
    }
    // viewNews(req,res){
    //     this.notifyHandler.viewNews(req,res);
    // }
}

module.exports = NotifyController;