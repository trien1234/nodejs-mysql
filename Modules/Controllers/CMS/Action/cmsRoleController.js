const RoleHandler = require('../../../Handlers/CMS/cmsRoleHandler');

class RoleController {
	constructor(){
		this.roleHandler = new RoleHandler();
	}
    async createRole(req,res,next){
        this.roleHandler.createRole(req,res,next)
    }

    async roleList(req,res,next){
        this.roleHandler.roleList(req,res,next)
    }

}
module.exports = RoleController