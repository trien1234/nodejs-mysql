const i18n = require("i18n");
const db = require('../Models/index');
const FixerGroup = db.FixerGroup;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class FixerHandler {
    constructor(){

    }

    createFixerGroup(req, res){
        try {
            let fixerGroup = req.body.FixerGroup;
            FixerGroup.create(fixerGroup).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                });
            }).catch(Sequelize.ValidationError, function (error) {
                // respond with validation errors
                res.status(500).json({
                    Success: false,
                    Message: error.errors[0].message
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
    async updateFixerGroup(req, res){
        try {
            let fixerGroup = await FixerGroup.findByPk(req.body.FixerGroup.Id);
            if(!fixerGroup){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{           
                FixerGroup.update(req.body.FixerGroup , {where: {Id : req.body.FixerGroup.Id}}).then(() => {
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

    async deleteFixerGroup(req, res){
        try {
            let fixerGroup = await FixerGroup.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!fixerGroup){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                fixerGroup.IsDeleted = 1;
                FixerGroup.update(fixerGroup, {where: {Id : req.body.Id}}).then(() => {
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
    getFixerGroupById(req, res){
        try {
            FixerGroup.findByPk(req.body.Id, {
                attributes: ['Id', 'Name','Description']
            }).then( (fixerGroup) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        FixerGroup: fixerGroup,
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
    getFixerGroups(req, res){
        try {
            FixerGroup.findAll({where:{IsDeleted : 0}}).then( (fixerGroups) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        FixerGroups: fixerGroups
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

module.exports = FixerHandler;