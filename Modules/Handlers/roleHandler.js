const db = require('../Models/index');
const Role = db.Role;
const RolePermission = db.RolePermission;

class RoleHandler {
    constructor(){}

    createRole(req, res){
        try {
            let role = req.body.Role;
            Role.create(role).then((role) => {
                let list = [];
                req.body.RolePermissions.forEach(function(item){
                    list.push(
                        {
                            RoleId : role.Id,
                            PermissionId: item.PermissionId,
                            IsActive: item.IsActive ? 1 : 0
                        }
                    );
                });
                console.log(list);
                RolePermission.bulkCreate(list).then( () =>{
                    res.status(200).json({
                        Success: true,
                        Message: ""
                    });
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false
            });
        }
    }
    async updateRole(req, res){
        try {
            let role = await Role.findByPk(req.body.Role.Id);
            if(!role){
                res.status(200).json({
                    Success: false,
                    Message: ""
                });
            }else{
                Role.update(req.body.Role , {where: {Id : req.body.Role.Id}}).then(() => {
                    let list = [];
                    req.body.RolePermissions.forEach(function(item){
                    list.push(
                        {
                            Id : item.Id,
                            RoleId : role.Id,
                            PermissionId: item.PermissionId,
                            IsActive: item.IsActive ? 1 : 0
                        }
                    );
                    });
                RolePermission.bulkCreate(list, {updateOnDuplicate: ["RoleId", "PermisionId", "IsActive"]}).then( () =>{
                    res.status(200).json({
                        Success: true,
                        Message: ""
                    });
                });
                });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false
            });
        }
    }
    async deleteRole(req, res){
        try {           
            let role = await Role.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            console.log(role);
            if(!role){
                res.status(200).json({
                    Success: false,
                    Message: ""
                });
            }else{
                role.IsDeleted = 1;
                Role.update(role , {where: {Id : req.body.Id}}).then(() => {
                    res.status(200).json({
                        Success: true,
                        Message: ""
                    });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false
            });
        }
    }
    getRoleById(req, res){
        try {
            Role.findByPk(req.body.Id).then( (role) => {
                let data = role;
                RolePermission.findAll({where : {RoleId : req.body.Id}}).then( (rolePermission) => {
                    res.status(200).json({
                        Success: true,
                        Data: {
                            Role: data,
                            RolePermissions : rolePermission
                        }
                    });
                });
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false
            });
        }
    }
    getRoles(req, res){
        try {
            Role.findAll({where:{IsDeleted : 0}}).then( (roles) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Roles: roles
                    }
                });
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false
            });
        }
    }
}

module.exports = RoleHandler;