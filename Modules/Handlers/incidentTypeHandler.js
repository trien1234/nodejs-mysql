const db = require('../Models/index');
const IncidentType = db.IncidentType;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");

class IncidentTypeHandler {
    constructor(){}

    async create(req, res){
        try {
            let incidentType = req.body.IncidentType;

            let check = await IncidentType.findOne({where:{Name:incidentType.Name}});
            if(check){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('Resident.Fail.Exist'),
                })
            }else{
                IncidentType.create(incidentType).then(() => {
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Create'),
                    });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    async update(req, res){
        try {
            let incidentType = await IncidentType.findByPk(req.body.IncidentType.Id);
            if(!incidentType){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{         
                IncidentType.update(req.body.IncidentType , {where: {Id : req.body.IncidentType.Id}}).then(() => {
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Update'),
                    });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async delete(req, res){
        try {
            let incidentType = await IncidentType.findOne({                
                where: {
                    Id: req.body.Id
                }
            });
            // console.log(incidentType.IsDeleted)
            if(!incidentType){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                await IncidentType.update({"IsDeleted": 1}, {where: {Id : req.body.Id}}).then(() => {
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Delete'),
                    });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
    async getincidentById(req, res){
        try {
            IncidentType.findAll({
                where: {Id : req.body.Id,IsDeleted: 0},
                attributes: ['Id', 'Name', 'IsDeleted']
            }).then( (resident) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Resident: resident,
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
    async list(req, res){
        try {
            IncidentType.findAll({
                where: {IsDeleted: 0},
                attributes: ['Id', 'Name', 'IsDeleted']
            }).then( (resident) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Resident: resident,
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

module.exports = IncidentTypeHandler;