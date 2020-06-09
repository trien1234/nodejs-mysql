const db = require('../Models/index');
const User = db.User;
const Building = db.Building;
const House = db.House;
const Contract = db.Contract;
const ApartmentStatusHistory = db.ApartmentStatusHistory;
const ApartmentStatus = db.ApartmentStatus;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require('moment');

class BuildingHandler {
    constructor(){
    }

    format(building, user) {
        const buildings = JSON.parse(JSON.stringify(building));

        buildings.forEach(building => {
            building.ApartmentCount = building.House.length;
            building.Manager = {
                Id: user.Id,
                FullName: user.FullName,
                Tel: user.Tel,
                BankAccount: user.BankAccount
            }

            delete building.House;

        });

        return buildings;
    }

    createBuilding(req, res){
        try {
            let building = req.body.Building;
            Building.create(building).then(() => {
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
    async updateBuilding(req, res){
        try {
            let building = await Building.findByPk(req.body.Building.Id);
            if(!building){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{           
                Building.update(req.body.Building , {where: {Id : req.body.Building.Id}}).then(() => {
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

    async deleteBuilding(req, res){
        try {
            let building = await Building.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!building){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                building.IsDeleted = 1;
                Building.update(building, {where: {Id : req.body.Id}}).then(() => {
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
    getBuildingById(req, res){
        try {
            Building.findByPk(req.body.Id, {
                attributes: ['Id', 'Name','Code','Address', 'Status','Note','BillDateRange','ElectricBill', 'WaterType','WaterPrice','CarParkPrice','MotobikeParkPrice','BikeParkPrice','ServicePrice']
            }).then( (building) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Building: building,
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
    searchBuilding(req, res){
        try {
            let options = {
                Name : {[Op.like] :'%' + (req.body.Name ? req.body.Name : "") + '%' }
            };       
            options.IsDeleted = 0;
            Building.findAll(
                {
                    where: {[Op.or] : [options]},
                    attributes: ['Id', 'Name','Code','Address', 'Status','Note','BillDateRange','ElectricBill', 'WaterType','WaterPrice','CarParkPrice','MotobikeParkPrice','BikeParkPrice','ServicePrice']
                }
            ).then((buildings)=> {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Buildings: buildings
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
    async getAllManagingBuildings(req, res) {
        try {
            const user = await User.findByPk(req.body.UserId);
            const directManagingBuildings = await Building.findAll({ where: { ManagerId: req.body.UserId } });
            const buildingIds = directManagingBuildings.map(building => building.Id);
            
            Building.findAll({
                attributes: ['Id', 'Name', 'Code', 'Address', 'Note', 'BillDateRange', 'ElectricBill', 'WaterType', 'WaterPrice', 'CarParkPrice', 'MotobikeParkPrice', 'BikeParkPrice', 'ServicePrice'],
                include: [
                    {
                        model: House,
                        as: 'House',
                        order: ['Id'],
                        attributes: [
                            'Id',
                            'Name',
                            'Code',
                            'Note',
                            'Furniture',
                            'RentalFee',
                            'CheckinDate',
                            'CheckoutDate'
                        ],
                        where: {
                            [Op.or]: [{
                                ManagerId: req.body.UserId
                            },
                            {
                                BuildingId: {
                                    [Op.in]: buildingIds
                                }
                            }]
                        },
                        include: [
                            {
                                model: Contract,
                                as: 'Contract',
                                order: ['CheckinDate'],
                                limit: 1,
                            },
                            {
                                model: ApartmentStatusHistory,
                                as: 'ApartmentStatusHistory',
                                order: [['CreatedDate', 'DESC']],
                                include: [{
                                    model: ApartmentStatus,
                                    as: 'ApartmentStatus',
                                    attributes: ['Code', 'Description']
                                }]
                            }
                        ]
                    }
                ],
            }).then((building) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        // Building: building,
                        Building: this.format(building, user),
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

module.exports = BuildingHandler;