const db = require('../Models/index');
const StayRecord = db.StayRecord;
const i18n = require("i18n");

class StayRecordHandler {
    constructor(){}

    async createStayRecord(req, res){
        try {
            const stayRecord = req.body.StayRecord;

            await StayRecord.create(stayRecord).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__(error.message) || i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async updateStayRecord(req, res){
        try {
            let stayRecord = await StayRecord.findByPk(req.body.StayRecord.Id);
            if(!stayRecord){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const stayRecord = req.body.StayRecord;

                StayRecord.update(stayRecord , {where: {Id : req.body.StayRecord.Id}}).then(() => {
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
                Message: i18n.__(error.message) || i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async deleteStayRecord(req, res){
        try {
            let stayRecord = await StayRecord.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!stayRecord){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                stayRecord.IsDeleted = 1;
                StayRecord.update(stayRecord , {where: {Id : req.body.Id}}).then(() => {
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

    async getStayRecordById(req, res){
        try {
            await StayRecord.findByPk(req.body.Id).then((stayRecord) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        StayRecord: stayRecord,
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

module.exports = StayRecordHandler;