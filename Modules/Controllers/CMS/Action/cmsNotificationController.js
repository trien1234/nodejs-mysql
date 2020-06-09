const NotificationHandler = require('../../../Handlers/CMS/cmsNotificationHandler');
class NotificationController{
    constructor(){
        this.notificationHandler = new NotificationHandler();
    }
    notificationList(req,res,next){
        this.notificationHandler.notificationList(req,res)
    }

    deleteNotification(req,res,next){
        this.notificationHandler.deleteNotification(req,res)
    }
}

module.exports = NotificationController;