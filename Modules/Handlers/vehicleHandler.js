const db = require('../Models/index');
const Vehicle = db.Vehicle;
const User= db.User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");

class VehicleHandler {
    constructor(){}

    async createVehicle(req, res){
        try {
            const vehicle = req.body.Vehicle;

            await Vehicle.create(vehicle).then(() => {
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

    async updateVehicle(req, res){
        try {
            let vehicle = await Vehicle.findByPk(req.body.Vehicle.Id);
            if(!vehicle){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const vehicle = req.body.Vehicle;

                Vehicle.update(vehicle , {where: {Id : req.body.Vehicle.Id}}).then(() => {
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

    async deleteVehicle(req, res){
        try {
            let vehicle = await Vehicle.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!vehicle){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                vehicle.IsDeleted = 1;
                Vehicle.update(vehicle , {where: {Id : req.body.Id}}).then(() => {
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

    async getVehicleById(req, res){
        try {
            await Vehicle.findByPk(req.body.Id).then((vehicle) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Vehicle: vehicle,
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

    searchVehicle(req, res){
        try {
            let options = {
                Plate : {[Op.like] :'%' + (req.body.Plate ? req.body.Plate : "") + '%' }
            };
            options.IsDeleted = 0;         
            Vehicle.findAll(
                {
                    where: {[Op.or] : [options],},
                    include:[
                        {
                            model : User,
                            as: 'Owner',
                            required: false,
                            attributes: ['Id','FullName']
                        }
                    ],
                    attributes: ['Id', 'Plate', 'Type']
            }).then((vehicles)=> {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Vehicles: vehicles
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

module.exports = VehicleHandler;