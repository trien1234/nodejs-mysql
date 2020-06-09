const db = require('../Models/index');
const House = db.House;
const Building = db.Building;
const Contract = db.Contract;
const StayRecord = db.StayRecord;
const Vehicle = db.Vehicle;
const ApartmentStatus = db.ApartmentStatus;
const ApartmentStatusHistory = db.ApartmentStatusHistory;
const HouseNote= db.HouseNote;
const UserNote= db.UserNote;
const VehicleNote= db.VehicleNote;
const User= db.User;
const Role= db.Role;
const Setting= db.Setting;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require("moment-timezone");
const _get = require('lodash.get');
const formidable = require('formidable');
const uuidv4 = require('uuid/v4');
const fs = require('fs-extra');
const bcrypt = require("bcryptjs");
const { formatDateBeforeSaving, formatDateBeforeServing } = require('../Helpers/dateFormatter');
const Paging = require('paginate-info');

const StayRecordHandler = require('../Handlers/stayRecordHandler');
const vehicleTypes = require('../Helpers/vehicleTypes.json');

moment().tz('Asia/Ho_Chi_Minh').format();

class HouseHandler {
    constructor(){
        this.stayRecordHandler = new StayRecordHandler();
    }

    mapVehicleType(type) {
        return vehicleTypes[type];
    }

    formatNote(notes) {
        return notes.map(note => ({
            Id: note.Id,
            Content: note.Content,
            CreatedDate: moment(note.CreatedDate).format('DD/MM/YYYY - HH:mm'),
            Creator: {
                Id: note.Creator.Id,
                Avatar: note.Creator.Avatar,
                FullName: note.Creator.FullName,
                Role: note.Creator.Role.Name
            }
        }))
    }

    formatStayRecord(stayRecord) {
        return stayRecord.map(record => ({
            Id: record.Id,
            BuildingCode: record.House.Building.Code,
            ApartmentCode: record.House.Code,
            ActualCheckinDate: formatDateBeforeServing(record.ActualCheckinDate),
            ActualCheckoutDate: formatDateBeforeServing(record.ActualCheckoutDate),
        }));
    }

    getTenant(stayRecord) {
        return {
            Id: stayRecord.User.Id,
            StayRecordId: stayRecord.Id,
            Avatar: stayRecord.User.Avatar,
            FullName: stayRecord.User.FullName,
            DOB: formatDateBeforeServing(stayRecord.User.DOB),
            Tel: stayRecord.User.Tel,
            Email: stayRecord.User.Email,
            IdNumber: stayRecord.User.IdNumber,
            IdCard: stayRecord.User.IdCard,
            ActualCheckinDate: formatDateBeforeServing(stayRecord.ActualCheckinDate),
            ActualCheckoutDate: formatDateBeforeServing(stayRecord.ActualCheckoutDate),
            Active: !!stayRecord.Active,
            StayRegistration: !!stayRecord.StayRegistration,
            StayRecord: this.formatStayRecord(stayRecord.User.StayRecord),
            Note: this.formatNote(stayRecord.User.UserNote),
        };
    }

    getVehicle(vehicle, house) {
        return {
            Id: vehicle.Id,
            Plate: vehicle.Plate,
            Type: vehicle.Type,
            OwnerName: vehicle.OwnerName,
            Room: {
                Id: _get(vehicle, ['House', 'Id']) || house.Id,
                Code: _get(vehicle, ['House', 'Code']) || house.Code
            },
            Active: vehicle.Active,
            CheckinDate: formatDateBeforeServing(vehicle.CheckinDate),
            CheckoutDate: formatDateBeforeServing(vehicle.CheckoutDate),
            Basement: vehicle.Basement,
            Card: vehicle.Card,
            Note: this.formatNote(vehicle.VehicleNote),
        };
    }

    format(house) {
        let apartment = { Id: house.Id };

        const statusHistory = [];

        house.ApartmentStatusHistory.forEach(status => {
            statusHistory.push({
                Status: status.ApartmentStatus.Code,
                Time: status.CreatedDate
            })
        });

        apartment.StatusHistory = statusHistory;

        apartment.Info = {
            Code: house.Code,
            Furniture: house.Furniture || null,
            ExpectedRentalFee: house.RentalFee,
            ActualRentalFee: house.Contract.length ? house.Contract[0].RentalFee : null,
            ReadyDate: house.ReadyDate ? moment(house.ReadyDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
            CheckinDate: house.CheckinDate ? moment(house.CheckinDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null,
            CheckoutDate: house.CheckoutDate ? moment(house.CheckoutDate, 'YYYY-MM-DD').format('DD/MM/YYYY'): null
        }

        apartment.Contract = house.Contract.length ? {
            Id: house.Contract[0].Id,
            Representative: {
                FullName: house.Contract[0].RepresentativeName,
                Tel: house.Contract[0].RepresentativeTel,
            },
            CheckinDate: formatDateBeforeServing(house.Contract[0].CheckinDate),
            CheckoutDate: formatDateBeforeServing(house.Contract[0].CheckoutDate)
        } : null;

        const tenants = [];

        house.StayRecord.forEach(record => {
            tenants.push(this.getTenant(record));
        });

        apartment.Tenants = tenants;

        const vehicles = [];

        house.Vehicle.forEach(record => {
            vehicles.push(this.getVehicle(record, house));
        });

        apartment.Vehicles = vehicles;

        apartment.Note = this.formatNote(house.HouseNote);

        return apartment;
    }

    formatAllHouse(houses) {
        let apartments = [];

        houses.forEach(house => {
            const apartment = {};

            apartment.Id = house.Id;
            apartment.Code = house.Code;
            apartment.CheckinDate = house.CheckinDate ? moment(house.CheckinDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;
            apartment.CheckoutDate = house.CheckoutDate ? moment(house.CheckoutDate, 'YYYY-MM-DD').format('DD/MM/YYYY') : null;

            if (!house.StayRecord.length) {
                apartment.StayRegistration = false;
            } else {
                if (Array.isArray(house.StayRecord)) {
                    apartment.StayRegistration = house.StayRecord.every(record => record.User.StayRegistration);
                } else {
                    apartment.StayRegistration = false;
                }
            }

            const statusHistory = [];

            house.ApartmentStatusHistory.forEach(status => {
                statusHistory.push({
                    Status: status.ApartmentStatus.Code,
                    Time: status.CreatedDate
                })
            });

            apartment.Status = _get(statusHistory, [statusHistory.length - 1, 'Status'], null);

            apartments.push(apartment);
        });

        return apartments;
    }

    async findActiveStayRecord(tenantId, houseId) {
        const now = moment().format('YYYY-MM-DD');
        return await StayRecord.findOne({
            where: {
                TenantId: tenantId,
                HouseId: houseId,
                Active: true,
                IsDeleted: 0,
                [Op.and]: [
                    {[Op.or]: [
                        {
                            ActualCheckinDate: now
                        },
                        {
                            ActualCheckinDate: {
                                [Op.lt]: now
                            }
                        },
                        {
                            ActualCheckinDate: {
                                [Op.is]: null
                            }
                        }
                    ]},
                    {[Op.or]: [
                        {
                            ActualCheckoutDate: now
                        },
                        {
                            ActualCheckoutDate: {
                                [Op.gt]: now
                            }
                        },
                        {
                            ActualCheckoutDate: {
                                [Op.is]: null
                            }
                        }
                    ]}
                ]
            }
        });
    }

    async validateTenant(tenantId, houseId) {
        const activeStayRecord = await this.findActiveStayRecord(tenantId, houseId);

        if (activeStayRecord) {
            throw new Error('Tenant.Fail.ActiveRecordExist')
        }
    }

    async createHouse(req, res){
        try {
            let house = req.body.House;
            house.CheckinDate = house.CheckinDate ? moment(house.CheckinDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;
            house.CheckoutDate = house.CheckoutDate ? moment(house.CheckoutDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : null;

            await House.create(house).then(() => {
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

    async updateHouse(req, res){
        try {
            let house = await House.findByPk(req.body.House.Id);
            if(!house){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const updateInfo = JSON.parse(JSON.stringify(req.body.House));
                updateInfo.CheckinDate = formatDateBeforeSaving(req.body.House.CheckinDate);
                updateInfo.CheckoutDate = formatDateBeforeSaving(req.body.House.CheckoutDate);
                House.update(updateInfo , {where: {Id : req.body.House.Id}}).then(() => {
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

    async deleteHouse(req, res){
        try {
            let house = await House.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!house){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                house.IsDeleted = 1;
                House.update(house , {where: {Id : req.body.Id}}).then(() => {
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

    getHouseById(req, res){
        try {
            House.findByPk(req.body.Id, {attributes: ['Id', 'BuildingId', 'ManagerId','Name','Note','Code', 'Block','Floor','RentalFee','Status']}).then( (house) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        House: house,
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

    searchHouse(req, res){
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
            House.findAll(
                {
                    where: {[Op.or] : [options],},
                    attributes: ['Id', 'BuildingId', 'ManagerId','Name','Note','Code', 'Block','Floor','RentalFee','Status'],
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
            }).then((houses)=> {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Houses: houses
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

    async getAllByBuildingId(req, res){
        const now = moment().format('YYYY-MM-DD');
        const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:15;
        let inDate = req.query.inDate ? req.query.inDate : "1970-01-01";
        let outDate = req.query.outDate ? req.query.outDate : '2050-01-01';
        let status =  {[Op.like] :'%' + (req.query.status ? req.query.status : "") + '%' };
        let stayRegistration = req.query.stayRegistration ? req.query.stayRegistration : "";

        try {           
            const { offset,limit } = Paging.calculateLimitAndOffset(currentPage, pageSize);
            let {rows,count} = await House.findAndCountAll({
                limit,
                offset,
                order: [
                    ['Id', 'DESC']
                ],
                where: {
                    ManagerId: req.query.UserId, // only get houses that belong to apartments this user manages
                    Status: status,
                    [Op.and]: [
                        {[Op.or]: [
                            {
                                CheckinDate: {
                                    [Op.gte]: inDate
                                }
                            },
                            {
                                CheckinDate: {
                                    [Op.is]: null
                                }
                            }
                        ]},
                        {[Op.or]: [
                            {
                                CheckoutDate: {
                                    [Op.lte]: outDate
                                }
                            },
                            {
                                CheckoutDate: {
                                    [Op.is]: null
                                }
                            }
                        ]},
                    ],              
                    BuildingId: req.query.BuildingId,
                    IsDeleted: 0
                },
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
                include: [
                    {
                        model: StayRecord,
                        as: 'StayRecord',
                        where: {
                            IsDeleted: 0,
                            [Op.and]: [
                                {
                                    [Op.or]: [{
                                            ActualCheckinDate: now
                                        },
                                        {
                                            ActualCheckinDate: {
                                                [Op.lt]: now
                                            }
                                        },
                                        {
                                            ActualCheckinDate: {
                                                [Op.is]: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    [Op.or]: [{
                                            ActualCheckoutDate: now
                                        },
                                        {
                                            ActualCheckoutDate: {
                                                [Op.gt]: now
                                            }
                                        },
                                        {
                                            ActualCheckoutDate: {
                                                [Op.is]: null
                                            }
                                        }
                                    ]
                                }
                            ],
                            StayRegistration:{[Op.eq]:stayRegistration}
                        },
                        separate: true,
                        include: [{
                            model: User,
                            as: 'User'
                        }]
                    },
                    {
                        model: ApartmentStatusHistory,
                        as: 'ApartmentStatusHistory',
                        order: [
                            ['CreatedDate', 'DESC']
                        ],
                        include: [{
                            model: ApartmentStatus,
                            as: 'ApartmentStatus',
                            attributes: ['Code', 'Description']
                        }]
                    }
                ]
            });
            const meta = Paging.paginate(currentPage, count, rows, pageSize);
            console.log(meta)
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                res.status(200).json({
                    Success: true,
                    Data: {
                        Apartments: this.formatAllHouse(rows),
                        meta
                    }
                });
            }
            // .then( (apartments) => {
            //     res.status(200).json({
            //         Success: true,
            //         Data: {
            //             // Apartments: apartments
            //             Apartments: this.formatAllHouse(apartments)
            //         }
            //     });
            // });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async getManagingHouseById(req, res) {
        try {
            const now = moment().format('YYYY-MM-DD');
            await House.findOne({
                where: {
                    [Op.or]: [{
                        ManagerId: req.body.UserId, // only get houses that belong to apartments this user manages
                    },
                    {
                        '$Building.ManagerId$': req.body.UserId
                    }],
                    Id: req.body.ApartmentId,
                    IsDeleted: 0
                },
                attributes: ['Id', 'Name', 'Note', 'Code', 'Block', 'Floor', 'Status', 'RentalFee', 'Furniture', 'ReadyDate', 'CheckinDate', 'CheckoutDate'],
                include: [
                    {
                        model: Building,
                        as: 'Building'
                    },
                    {
                        model: Contract,
                        as: 'Contract',
                        order: ['CheckinDate'],
                        where: {
                            IsDeleted: 0,
                            [Op.and]: [{
                                    [Op.or]: [{
                                            CheckinDate: now
                                        },
                                        {
                                            CheckinDate: {
                                                [Op.lt]: now
                                            }
                                        },
                                        {
                                            CheckinDate: {
                                                [Op.is]: null
                                            }
                                        }
                                    ]
                                },
                                {
                                    [Op.or]: [{
                                            CheckoutDate: now
                                        },
                                        {
                                            CheckoutDate: {
                                                [Op.gt]: now
                                            }
                                        },
                                        {
                                            CheckoutDate: {
                                                [Op.is]: null
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        limit: 1
                    },
                    {
                        model: User,
                        as: 'User'
                    },
                    {
                        model: StayRecord,
                        as: 'StayRecord',
                        where: {
                            IsDeleted: 0,
                            [Op.and]: [
                                {[Op.or]: [
                                    {
                                        ActualCheckinDate: now
                                    },
                                    {
                                        ActualCheckinDate: {
                                            [Op.lt]: now
                                        }
                                    },
                                    {
                                        ActualCheckinDate: {
                                            [Op.is]: null
                                        }
                                    }
                                ]},
                                {[Op.or]: [
                                    {
                                        ActualCheckoutDate: now
                                    },
                                    {
                                        ActualCheckoutDate: {
                                            [Op.gt]: now
                                        }
                                    },
                                    {
                                        ActualCheckoutDate: {
                                            [Op.is]: null
                                        }
                                    }
                                ]}
                            ]
                        },
                        separate: true,
                        include: [{
                            model: User,
                            as: 'User',
                            include: [
                                {
                                    model: UserNote,
                                    as: 'UserNote',
                                    include: [{
                                        model: User,
                                        as: 'Creator',
                                        attributes: ['Id', 'FullName', 'Avatar'],
                                        include: [{
                                            model: Role,
                                            as: 'Role'
                                        }]
                                    }]
                                },
                                {
                                    model: StayRecord,
                                    as: 'StayRecord',
                                    order: [['ActualCheckinDate', 'ASC'], ['ActualCheckoutDate', 'ASC']],
                                    separate: true,
                                    include: [{
                                        model: House,
                                        as: 'House',
                                        include: [{
                                            model: Building,
                                            as: 'Building'
                                        }]
                                    }]
                                }
                            ]
                        }]
                    },
                    {
                        model: Vehicle,
                        as: 'Vehicle',
                        include: [
                            {
                                model: VehicleNote,
                                as: 'VehicleNote',
                                include: [{
                                    model: User,
                                    as: 'Creator',
                                    attributes: ['Id', 'FullName', 'Avatar'],
                                    include: [{
                                        model: Role,
                                        as: 'Role'
                                    }]
                                }]
                            }
                        ],
                        separate: true,
                        where: {
                            IsDeleted: 0,
                            [Op.and]: [
                                {[Op.or]: [
                                    {
                                        CheckinDate: now
                                    },
                                    {
                                        CheckinDate: {
                                            [Op.lt]: now
                                        }
                                    },
                                    {
                                        CheckinDate: {
                                            [Op.is]: null
                                        }
                                    }
                                ]},
                                {[Op.or]: [
                                    {
                                        CheckoutDate: now
                                    },
                                    {
                                        CheckoutDate: {
                                            [Op.gt]: now
                                        }
                                    },
                                    {
                                        CheckoutDate: {
                                            [Op.is]: null
                                        }
                                    }
                                ]}
                            ]
                        }
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
                    },
                    {
                        model: HouseNote,
                        as: 'HouseNote',
                        order: [
                            ['CreatedDate', 'DESC']
                        ],
                        attributes: ['Id', 'Content', 'CreatedDate'],
                        include: [{
                            model: User,
                            as: 'Creator',
                            attributes: ['Id', 'FullName', 'Avatar'],
                            include: [{
                                model: Role,
                                as: 'Role'
                            }]
                        }]
                    }
                ]
            }).then((apartment) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        // Apartment: apartment
                        Apartment: apartment ? this.format(apartment) : null
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

    async updateManagingHouseById(req, res) {
        try {
            await Contract.update(
                { RentalFee: req.body.ActualRentalFee },
                { where: { Id: req.body.ContractId } }
            );

            House.update(
                {
                    Code: req.body.Code,
                    Furniture: req.body.Furniture,
                    RentalFee: req.body.ExpectedRentalFee,
                    ReadyDate: formatDateBeforeSaving(req.body.ReadyDate),
                    CheckinDate: formatDateBeforeSaving(req.body.CheckinDate),
                    CheckoutDate: formatDateBeforeSaving(req.body.CheckoutDate),
                },
                { where: { Id: req.body.Id }
            }).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
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

    async addVehicle(req, res){
        try {
            const updateData = {
                HouseId: req.body.ApartmentId,
                CheckinDate: moment().format('YYYY-MM-DD'),
                CheckoutDate: null,
                Active: true
            }
    
            await Vehicle.update(updateData, {where: {Id: req.body.VehicleId}});
            
            await Vehicle.findByPk(
                req.body.VehicleId,
                {
                    include: [
                        {
                            model: House,
                            as: 'House'
                        },
                        {
                            model: VehicleNote,
                            as: 'VehicleNote',
                            include: [{
                                model: User,
                                as: 'Creator',
                                attributes: ['Id', 'FullName', 'Avatar'],
                                include: [{
                                    model: Role,
                                    as: 'Role'
                                }]
                            }]
                        }
                    ]
                }
            ).then((newVehicle) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
                    NewVehicle: this.getVehicle(newVehicle)
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

    async createAndAddVehicle(req, res){
        try {
            const vehicle = await Vehicle.findOne({
                where: {
                    Plate: req.body.Plate
                }
            });

            if(vehicle) {
                throw new Error('Vehicle.Fail.AlreadyExist');
            }

            const newVehicleInfo = {
                HouseId: req.body.ApartmentId,
                OwnerName: req.body.OwnerName,
                Plate: req.body.Plate,
                CheckinDate: req.body.CheckinDate || moment().format('YYYY-MM-DD'),
                CheckoutDate: req.body.CheckoutDate || null,
                Basement: req.body.Basement,
                Card: req.body.Card,
                Active: req.body.Active,
                Type: req.body.Type,
            }
    
            const newVehicle = await Vehicle.create(newVehicleInfo);
            
            await Vehicle.findByPk(
                newVehicle.Id,
                {
                    include: [
                        {
                            model: House,
                            as: 'House'
                        },
                        {
                            model: VehicleNote,
                            as: 'VehicleNote',
                            include: [{
                                model: User,
                                as: 'Creator',
                                attributes: ['Id', 'FullName', 'Avatar'],
                                include: [{
                                    model: Role,
                                    as: 'Role'
                                }]
                            }]
                        }
                    ]
                }
            ).then((newVehicle) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewVehicle: this.getVehicle(newVehicle)
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
            const vehicle = await Vehicle.findOne({
                where: {
                    Plate: req.body.Plate,
                    Id: {
                        [Op.not]: req.body.VehicleId
                    }
                }
            });

            if (vehicle) {
                throw new Error('Vehicle.Fail.AlreadyExist');
            }

            await Vehicle.update(
                {
                    HouseId: req.body.ApartmentId,
                    OwnerName: req.body.OwnerName,
                    Plate: req.body.Plate,
                    CheckinDate: formatDateBeforeSaving(req.body.CheckinDate),
                    CheckoutDate: formatDateBeforeSaving(req.body.CheckoutDate),
                    Basement: req.body.Basement,
                    Card: req.body.Card,
                    Active: req.body.Active,
                    Type: req.body.Type
                },
                { where: { Id: req.body.VehicleId }}
            );
            
            await Vehicle.findByPk(
                req.body.VehicleId,
                {
                    include: [
                        {
                            model: House,
                            as: 'House'
                        },
                        {
                            model: VehicleNote,
                            as: 'VehicleNote',
                            include: [{
                                model: User,
                                as: 'Creator',
                                attributes: ['Id', 'FullName', 'Avatar'],
                                include: [{
                                    model: Role,
                                    as: 'Role'
                                }]
                            }]
                        }
                    ]
                }
            ).then((updatedVehicle) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
                    UpdatedVehicle: this.getVehicle(updatedVehicle)
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

    async deleteVehicle(req, res){
        try {
            const updateData = {
                CheckoutDate: moment().format('YYYY-MM-DD'),
                IsDeleted: 1
            }
            await Vehicle.update(updateData, {where: {Id: req.body.VehicleId}}).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
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

    async addTenant(req, res){
        try {
            await this.validateTenant(req.body.TenantId, req.body.ApartmentId);

            const stayRecord = {
                TenantId: req.body.TenantId,
                HouseId: req.body.ApartmentId,
                ActualCheckinDate: moment().format('YYYY-MM-DD'),
                Active: true
            }
    
            const newStayRecord = await StayRecord.create(stayRecord);
            
            await User.update({ HouseId: req.body.ApartmentId }, { where: { Id: req.body.TenantId } })
            
            await StayRecord.findByPk(
                newStayRecord.Id,
                {
                    include: [{
                        model: User,
                        as: 'User',
                        include: [
                            {
                                model: UserNote,
                                as: 'UserNote',
                                include: [{
                                    model: User,
                                    as: 'Creator',
                                    attributes: ['Id', 'FullName', 'Avatar'],
                                    include: [{
                                        model: Role,
                                        as: 'Role'
                                    }]
                                }]
                            },
                            {
                                model: StayRecord,
                                as: 'StayRecord',
                                order: [['ActualCheckinDate', 'ASC'], ['ActualCheckoutDate', 'ASC']],
                                separate: true,
                                include: [{
                                    model: House,
                                    as: 'House',
                                    include: [{
                                        model: Building,
                                        as: 'Building'
                                    }]
                                }]
                            }
                        ]
                    }]
                }
            ).then((newTenant) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewTenant: this.getTenant(newTenant)
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

    isTenantCurrentlyInHouse(actualCheckinDate, actualCheckoutDate) {
        const now = moment();

        return ( now.diff(actualCheckinDate) >= 0 || actualCheckinDate === null )
            &&
            (now.diff(actualCheckoutDate) <= 0 || actualCheckoutDate === null);
    }

    async createAndAddTenant(req, res){
        try {
            // access avatar image and updated user information in form-data
            const form =  new formidable.IncomingForm();

            const generatedPassword = await bcrypt.hash(uuidv4(), bcrypt.genSaltSync(10), null);
            const data = await new Promise(function (resolve, reject) {
                form.parse(req, function(parseErr, fields, files) {
                    if(parseErr) {
                        reject(parseErr);
                    }
                    
                    // prepare updated user information
                    try {
                        let data = {};
    
                        if (files.avatar) {
                            const tmpPath = files.avatar.path;
                            const fileExtension = files.avatar.name.split('.').slice(-1)[0];
                            const fileName = `${uuidv4()}.${fileExtension}`;
                            const storagePath = appRoot + '/storage/avatar/' + fileName;
                            const avatarUrl = `/avatar/${fileName}`;
                            
                            // save uploaded avatar in /avatar directory
                            fs.moveSync(tmpPath, storagePath);
    
                            Object.assign(
                                data,
                                {
                                    user: {
                                        Avatar: avatarUrl
                                    }
                                },
                            );
                        }
    
                        if (fields.tenant) {
                            const tenantInfo = JSON.parse(fields.tenant);
                            
                            const actualCheckinDate = moment(tenantInfo.ActualCheckinDate, 'DD/MM/YYYY');
                            const actualCheckoutDate = moment(tenantInfo.ActualCheckoutDate, 'DD/MM/YYYY');
                            const houseId = (this.isTenantCurrentlyInHouse(actualCheckinDate, actualCheckoutDate)) ? tenantInfo.ApartmentId : null;
                            
                            Object.assign(
                                data,
                                {
                                    user: {
                                        ...data.user,
                                        Password: generatedPassword,
                                        Email: tenantInfo.Email || uuidv4(),
                                        DOB: formatDateBeforeSaving(tenantInfo.DOB),
                                        FullName: tenantInfo.FullName,
                                        IdCard: tenantInfo.IdCard,
                                        Tel: tenantInfo.Tel,
                                        Address: tenantInfo.Address,
                                        BankAccount: tenantInfo.BankAccount,
                                        HouseId: houseId
                                    }
                                },
                                {
                                    stayRecord: {
                                        HouseId: tenantInfo.ApartmentId,
                                        ActualCheckinDate: formatDateBeforeSaving(tenantInfo.ActualCheckinDate),
                                        ActualCheckoutDate: formatDateBeforeSaving(tenantInfo.ActualCheckoutDate),
                                        StayRegistration: tenantInfo.StayRegistration,
                                        Active: tenantInfo.Active
                                    }
                                },
                            );
                        }
                        
                        resolve(data);
                    } catch (err) {
                        reject(err)
                    }
                }.bind(this));
            }.bind(this));

            // check if Tel exist
            const user = await User.findOne({                
                where: {
                    Tel: data.user.Tel
                }
            });
            
            if(user) {
                throw new Error('User.Fail.TelExist');
            }

            const role = await Role.findOne({
                where: {
                    Type: 4
                },
                attributes: ['Id']
            });
            const roleId = role.Id;

            // create new user
            Object.assign(data, { user: { ...data.user, RoleId: roleId } });

            const newUser = await User.create(data.user);

            Object.assign(
                data,
                {
                    stayRecord: {
                        ...data.stayRecord,
                        TenantId: newUser.Id
                    }
                }
            )

            const newStayRecord = await StayRecord.create(data.stayRecord);
            
            await StayRecord.findByPk(
                newStayRecord.Id,
                {
                    include: [{
                        model: User,
                        as: 'User',
                        include: [
                            {
                                model: UserNote,
                                as: 'UserNote',
                                include: [{
                                    model: User,
                                    as: 'Creator',
                                    attributes: ['Id', 'FullName', 'Avatar'],
                                    include: [{
                                        model: Role,
                                        as: 'Role'
                                    }]
                                }]
                            },
                            {
                                model: StayRecord,
                                as: 'StayRecord',
                                order: [['ActualCheckinDate', 'ASC'], ['ActualCheckoutDate', 'ASC']],
                                separate: true,
                                include: [{
                                    model: House,
                                    as: 'House',
                                    include: [{
                                        model: Building,
                                        as: 'Building'
                                    }]
                                }]
                            }
                        ]
                    }]
                }
            ).then((newTenant) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewTenant: this.getTenant(newTenant)
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

    async updateTenant(req, res) {
        try {
            // access avatar image and updated user information in form-data
            const form =  new formidable.IncomingForm();

            const data = await new Promise(function (resolve, reject) {
                form.parse(req, function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    
                    // prepare updated user information
                    try {
                        let data = {};
    
                        if (files.avatar) {
                            const tmpPath = files.avatar.path;
                            const fileExtension = files.avatar.name.split('.').slice(-1)[0];
                            const fileName = `${uuidv4()}.${fileExtension}`;
                            const storagePath = appRoot + '/storage/avatar/' + fileName;
                            const avatarUrl = `/avatar/${fileName}`;
                            
                            // save uploaded avatar in /avatar directory
                            fs.moveSync(tmpPath, storagePath);
    
                            Object.assign(
                                data,
                                {
                                    user: {
                                        Avatar: avatarUrl
                                    }
                                },
                            );
                        }
    
                        if (fields.tenant) {
                            const tenantInfo = JSON.parse(fields.tenant);
                            
                            const actualCheckinDate = moment(tenantInfo.ActualCheckinDate, 'DD/MM/YYYY');
                            const actualCheckoutDate = moment(tenantInfo.ActualCheckoutDate, 'DD/MM/YYYY');
                            const houseId = (this.isTenantCurrentlyInHouse(actualCheckinDate, actualCheckoutDate)) ? tenantInfo.ApartmentId : null;
                            
                            Object.assign(
                                data,
                                {
                                    user: {
                                        ...data.user,
                                        Id: tenantInfo.TenantId,
                                        DOB: formatDateBeforeSaving(tenantInfo.DOB),
                                        FullName: tenantInfo.FullName,
                                        IdCard: tenantInfo.IdCard,
                                        Tel: tenantInfo.Tel,
                                        Address: tenantInfo.Address,
                                        BankAccount: tenantInfo.BankAccount,
                                        HouseId: houseId
                                    }
                                },
                                {
                                    stayRecord: {
                                        HouseId: tenantInfo.ApartmentId,
                                        ActualCheckinDate: formatDateBeforeSaving(tenantInfo.ActualCheckinDate),
                                        ActualCheckoutDate: formatDateBeforeSaving(tenantInfo.ActualCheckoutDate),
                                        StayRegistration: tenantInfo.StayRegistration,
                                        Active: tenantInfo.Active
                                    }
                                },
                                {
                                    userId: tenantInfo.TenantId,
                                    stayRecordId: tenantInfo.StayRecordId
                                }
                            );
                        }
                        resolve(data);
                    } catch (err) {
                        reject(err)
                    }
                }.bind(this));
            }.bind(this));

            // check if Tel exist
            if(data.user.Tel) {
                const userWithDuplicatedTel = await User.findOne({                
                    where: {
                        Id: {
                            [Op.ne]: data.userId
                        },
                        Tel: data.user.Tel,
                    }
                });
                
                if(userWithDuplicatedTel) {
                    throw new Error ('User.Fail.TelExist');
                }
            }

            // check if Email exist
            if(data.user.Email) {
                const userWithDuplicatedEmail = await User.findOne({                
                    where: {
                        Id: {
                            [Op.ne]: data.userId
                        },
                        Email: data.user.Email,
                    }
                });
                
                if(userWithDuplicatedEmail) {
                    throw new Error ('User.Fail.EmailExist');
                }
            }

            await User.update(data.user, { where: { Id: data.userId } });

            await StayRecord.update(data.stayRecord, { where: { Id: data.stayRecordId } });
            
            await StayRecord.findByPk(
                data.stayRecordId,
                {
                    include: [{
                        model: User,
                        as: 'User',
                        include: [
                            {
                                model: UserNote,
                                as: 'UserNote',
                                include: [{
                                    model: User,
                                    as: 'Creator',
                                    attributes: ['Id', 'FullName', 'Avatar'],
                                    include: [{
                                        model: Role,
                                        as: 'Role'
                                    }]
                                }]
                            },
                            {
                                model: StayRecord,
                                as: 'StayRecord',
                                order: [['ActualCheckinDate', 'ASC'], ['ActualCheckoutDate', 'ASC']],
                                separate: true,
                                include: [{
                                    model: House,
                                    as: 'House',
                                    include: [{
                                        model: Building,
                                        as: 'Building'
                                    }]
                                }]
                            }
                        ]
                    }]
                }
            ).then((updatedTenant) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
                    UpdatedTenant: this.getTenant(updatedTenant)
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

    async deleteTenant(req, res){
        try {
            const activeStayRecord = await this.findActiveStayRecord(
                req.body.TenantId,
                req.body.ApartmentId
            );
            const updateData = {
                ActualCheckoutDate: moment().format('YYYY-MM-DD'),
                IsDeleted: 1
            }
            await StayRecord.update(updateData, {where: {Id: activeStayRecord.Id}});

            await User.update({ HouseId: null }, { where: { Id: req.body.TenantId } }).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
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

    async updateContract(req, res){
        try {
            const updates = {
                Id: req.body.Id,
                HouseId: req.body.ApartmentId,
                RepresentativeName: req.body.RepresentativeName,
                RepresentativeTel: req.body.RepresentativeTel,
                CheckinDate: formatDateBeforeSaving(req.body.CheckinDate),
                CheckoutDate: formatDateBeforeSaving(req.body.CheckoutDate),
            };

            await Contract.update(updates, { where: { Id: req.body.Id } }).then(() => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Update'),
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

module.exports = HouseHandler;