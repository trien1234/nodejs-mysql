const SettingHandler = require('../../../Handlers/CMS/cmsSettingHandler');

class CmsSettingController{
    constructor(){
        this.settingHandler = new SettingHandler();
    }
    async updateSetting(req,res,next){
        this.settingHandler.updateSetting(req,res)
    }
}

module.exports = CmsSettingController;