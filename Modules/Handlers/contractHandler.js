const db = require('../Models/index');
const Contract = db.Contract;
const House = db.House;
const User= db.User;
const Building= db.Building;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require('moment');
const _has = require('lodash.has');
var Ajv = require('ajv');

var tenantSchema = require('../Helpers/contractSchema');

class ContractHandler {
    constructor(){}
    
    async validateContract(contract, currentContractId) {
        var ajv = new Ajv();
        var valid = ajv.validate(tenantSchema, [contract]);

        if (!valid) {
            throw new Error(ajv.errorsText());
        }

        const checkinDate = moment(contract.CheckinDate, 'DD/MM/YYYY');
        const checkoutDate = moment(contract.CheckoutDate, 'DD/MM/YYYY');

        if (checkoutDate.diff(checkinDate, 'days') < 0) {
            throw new Error('Contract.Fail.CheckoutBeforeCheckin');
        }

        if (moment().diff(checkoutDate, 'days') > 0) {
            throw new Error('Contract.Fail.ExpiredContract');
        }

        const isoCheckinDate = checkinDate.format('YYYY-MM-DD');
        const isoCheckoutDate = checkoutDate.format('YYYY-MM-DD');
        const overlappingContract = await Contract.findOne({
            where: {
                Id: {
                    [Op.not]: currentContractId || null,
                },
                HouseId: contract.ApartmentId,
                IsDeleted: 0,
                [Op.or]: [
                    {
                        CheckinDate: {
                            [Op.lt]: new Date(isoCheckoutDate),
                            [Op.gt]: new Date(isoCheckinDate),
                        }
                    },
                    {
                        CheckoutDate: {
                            [Op.lt]: new Date(isoCheckoutDate),
                            [Op.gt]: new Date(isoCheckinDate),
                        }
                    },
                    {
                        CheckinDate: new Date(isoCheckinDate),
                        CheckoutDate: new Date(isoCheckoutDate),
                    },
                    {
                        [Op.and]: [
                            {
                                CheckinDate: {
                                    [Op.lt]: new Date(isoCheckinDate)
                                },
                                CheckoutDate: {
                                    [Op.gt]: new Date(isoCheckoutDate)
                                }
                            },
                            {
                                CheckinDate: {
                                    [Op.gt]: new Date(isoCheckinDate)
                                },
                                CheckoutDate: {
                                    [Op.lt]: new Date(isoCheckoutDate)
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (overlappingContract) {
            throw new Error('Contract.Fail.Overlap');
        }
    };

    async getServicePrice(contract) {
        const result = {};
        let buildingServicePrice;

        if (
            !contract.BillDateRange
            || !contract.ElectricBill
            || !contract.WaterPrice
            || !contract.CarParkPrice
            || !contract.MotobikeParkPrice
            || !contract.BikeParkPrice
            || !contract.ServicePrice
        ) {
            buildingServicePrice = await Building.findOne({
                where: {
                    IsDeleted: 0
                },
                attributes: [
                    'BillDateRange',
                    'ElectricBill',
                    'WaterPrice',
                    'CarParkPrice',
                    'MotobikeParkPrice',
                    'BikeParkPrice',
                    'ServicePrice'
                ],
                include: [{
                    model: House,
                    as: 'House',
                    attributes: [],
                    where: {
                        Id: contract.ApartmentId
                    }
                }]
            });
        }

        if (!contract.BillDateRange) {
            result.BillDateRange = buildingServicePrice.BillDateRange;
        }
        
        if (!contract.ElectricBill) {
            result.ElectricBill = buildingServicePrice.ElectricBill;
        }
        
        if (!contract.WaterPrice) {
            result.WaterPrice = buildingServicePrice.WaterPrice;
        }
        
        if (!contract.CarParkPrice) {
            result.CarParkPrice = buildingServicePrice.CarParkPrice;
        }
        
        if (!contract.MotobikeParkPrice) {
            result.MotobikeParkPrice = buildingServicePrice.MotobikeParkPrice;
        }
        
        if (!contract.BikeParkPrice) {
            result.BikeParkPrice = buildingServicePrice.BikeParkPrice;
        }
        
        if (!contract.ServicePrice) {
            result.ServicePrice = buildingServicePrice.ServicePrice;
        }

        return result;
    }

    async formatContractBeforeSaving(contract) {
        const formattedContract = JSON.parse(JSON.stringify(contract));

        formattedContract.CheckinDate = moment(contract.CheckinDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        formattedContract.CheckoutDate = moment(contract.CheckoutDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        formattedContract.HouseId = contract.ApartmentId;
        
        Object.assign(formattedContract, await this.getServicePrice(contract));
        
        return formattedContract;
    };

    formatContractBeforeServing(contract) {
        const formattedContract = JSON.parse(JSON.stringify(contract));

        formattedContract.CheckinDate = moment(contract.CheckinDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
        formattedContract.CheckoutDate = moment(contract.CheckoutDate, 'YYYY-MM-DD').format('DD/MM/YYYY');
        formattedContract.ApartmentId = contract.HouseId;

        delete formattedContract.HouseId;
        
        return formattedContract;
    };

    async createContract(req, res){
        try {
            const contract = req.body.Contract;
            await this.validateContract(contract);

            const formattedContract = await this.formatContractBeforeSaving(contract);

            await Contract.create(formattedContract).then(() => {
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

    async updateContract(req, res){
        try {
            let contract = await Contract.findByPk(req.body.Contract.Id);
            if(!contract){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const contract = req.body.Contract;
                await this.validateContract(contract, contract.Id);

                const formattedContract = await this.formatContractBeforeSaving(contract);

                Contract.update(formattedContract , {where: {Id : req.body.Contract.Id}}).then(() => {
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

    async extendContract(req, res){ // TODO: this function need to be repaired before use
        try {
            if (!_has(req, ['body', 'Contract', 'CheckinDate']) || !_has(req, ['body', 'Contract', 'CheckoutDate'])) {
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('Contract.Fail.ExtendMissingDates'),
                });
            }

            let contract = await Contract.findByPk(req.body.Contract.Id);
            if(!contract){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const contract = req.body.Contract;
                await this.validateContract(contract, req.body.Contract.Id);

                const formattedContract = await this.formatContractBeforeSaving(contract);

                const updatedInfo = {
                    Id: formattedContract.Id,
                    CheckinDate: formattedContract.CheckinDate,
                    CheckoutDate: formattedContract.CheckoutDate
                }

                Contract.update(formattedContract, {
                        where: {
                            Id: req.body.Contract.Id
                        }
                    }).then(() => {
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

    async deleteContract(req, res){
        try {
            let contract = await Contract.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!contract){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                contract.IsDeleted = 1;
                Contract.update(contract , {where: {Id : req.body.Id}}).then(() => {
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

    async getContractById(req, res){
        try {
            await Contract.findByPk(req.body.Id).then((contract) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Contract: this.formatContractBeforeServing(contract),
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

    searchContract(req, res){
        try {
            let options = {
                Name : {[Op.like] :'%' + (req.body.Name ? req.body.Name : "") + '%' }
            };
            if(req.body.BuildingId){
                options.BuildingId = req.body.BuildingId;
            }
            if(req.body.BuildingId){
                options.BuildingId = req.body.BuildingId;
            }
            options.IsDeleted = 0;         
            Contract.findAll(
                {
                    where: {[Op.or] : [options],},
                    attributes: ['Id', 'BuildingId', 'ManagerId','Name','Note','Code', 'Block','Floor','ServicePrice','Status'],
                    include:[
                        {
                            model : Building,
                            as: 'Building',
                            required: false,
                            attributes: ['Id','Name']
                        },
                        {
                            model : User,
                            as: 'User',
                            required: false,
                            attributes: ['Id','FullName']
                        }
                    ]
            }).then((contracts)=> {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Contracts: contracts
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

module.exports = ContractHandler;