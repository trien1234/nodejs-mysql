const db = require('../Models/index');
const ApartmentStatusHistory = db.ApartmentStatusHistory;
const Sequelize = require('sequelize');
const i18n = require("i18n");

class ApartmentStatusHistoryHandler {
    constructor(){
    }

    createApartmentStatusHistory(req, res) {
        try {
            let apartmentHistory = req.body.ApartmentHistory;
            ApartmentStatusHistory.create(apartmentHistory).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
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
    async updateApartmentStatusHistory(req, res){
        try {
            let apartmentHistory = await ApartmentStatusHistory.findByPk(req.body.ApartmentHistory.Id);
            if(!apartmentHistory){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{           
                ApartmentStatusHistory.update(req.body.ApartmentHistory , {where: {Id : req.body.ApartmentHistory.Id}}).then(() => {
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

    async deleteApartmentStatusHistory(req, res){
        try {
            let apartmentHistory = await ApartmentStatusHistory.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!apartmentHistory){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                apartmentHistory.IsDeleted = 1;
                ApartmentStatusHistory.update(apartmentHistory, {where: {Id : req.body.Id}}).then(() => {
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
    getApartmentStatusHistoryById(req, res){
        try {
            ApartmentStatusHistory.findByPk(req.body.Id).then( (apartmentHistory) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        ApartmentStatusHistory: apartmentHistory,
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

module.exports = ApartmentStatusHistoryHandler;