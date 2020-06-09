const db = require('../Models/index');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');
const Permission = db.Permission;
const Role = db.Role;
const i18n = require("i18n");
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class ConfigurationHandler {
    constructor(){}

    getPermissionByType(req, res){
        try {
            Permission.findAll({where: {Type:req.body.Type }}).then( (data) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Permissions: data,
                    }
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    uploadFile(req, res){
        try {
            const uploadDir = appRoot + "/Utils/Avatar/";
            let form = new formidable.IncomingForm();
            form.multiples = true;
            form.keepExtensions = true;
            form.uploadDir = uploadDir;        
            form.parse(req,async (err, fields, files) =>{
                if (err) throw err;
                let filename =  uuidv4();
                console.log(files.File);
                let tmpPath = files.File.path;
                let newPath = form.uploadDir + (filename+ "-" +files.File.name);
                fs.rename(tmpPath, newPath, (err) => {
                    if (err) throw err;
                    return res.status(200).json({
                        Success: true,
                        Message: i18n.__('User.Success.Avatar'),
                        FileName: filename+ "-" +files.File.name
                    })
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    getRolesByType(req, res){
        try {
            let options = {
                IsDeleted : 0
            };
            if(!req.body.IsEmployee){
                options.Type = Constant.RoleType.Resident;
            }else{
                options.Type = {[Op.in]:[Constant.RoleType.CMS, Constant.RoleType.CMSAndManager, Constant.RoleType.Fixed]}
            }
            Role.findAll({
                where: {[Op.or] : [options]},
                    attributes: ['Id', 'Name', 'Type']

            }).then((roles) =>{
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
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}

module.exports = ConfigurationHandler;