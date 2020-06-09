const i18n = require("i18n");
const db = require('../Models/index');
const User = db.User;
const Role = db.Role;
const Evaluate = db.Evaluate;
const Token = db.Token;
const Permission = db.Permission;
const Contract = db.Contract;
const StayRecord = db.StayRecord;
const Vehicle = db.Vehicle;
const House = db.House;
const Building = db.Building;
const RolePermission = db.RolePermission;
const DeviceToken = db.DeviceToken;
const bcrypt = require("bcryptjs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwtHelper = require("../Helpers/jwtHelper");
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "5d";
const accessTokenLifeToInt = process.env.ACCESS_TOKEN_LIFE_TO_INT || 5;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-smart-home";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-smart-home";
const moment = require('moment');
const formidable = require('formidable');
const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
const _get = require('lodash.get');
const { formatDateBeforeSaving, formatDateBeforeServing } = require('../Helpers/dateFormatter');

class UserHandler {
    constructor(){

    }

    getContractInfo(contract) {
        const checkinDate = moment(contract.CheckinDate, 'YYYY-MM-DD');
        const checkoutDate = moment(contract.CheckoutDate, 'YYYY-MM-DD');
        let contractDuration = Math.ceil(checkoutDate.diff(checkinDate, 'months', true));
        let durationUnit = 'tháng';

        if (contractDuration < 1) {
            contractDuration = checkoutDate.diff(checkinDate, 'days') + 1;
            durationUnit = 'ngày';
        }

        return {
            CheckinDate: checkinDate.format('DD/MM/YYYY'),
            CheckoutDate: checkoutDate.format('DD/MM/YYYY'),
            Duration: `${contractDuration} ${durationUnit}`,
            RentalFee: contract.RentalFee,
            BillDateRange: contract.BillDateRange,
            ElectricBill: contract.ElectricBill,
            WaterPrice: contract.WaterPrice,
            CarParkPrice: contract.CarParkPrice,
            MotobikeParkPrice: contract.MotobikeParkPrice,
            BikeParkPrice: contract.BikeParkPrice,
            ServicePrice: contract.ServicePrice
        };
    }

    getTenantsInfo(tenants) {
        return tenants.map(tenant => ({
            Id: tenant.Id,
            Name: tenant.FullName,
        }));
    }

    getVehiclesInfo(vehicles) {
        return vehicles.map(vehicle => ({
            Id: vehicle.Id,
            Plate: vehicle.Plate
        }));
    }

    getManagerInfo(contract) {
        return contract.House.User;
    }

    getApartmentInfo(contract) {
        return {
            Code: contract.House.Code,
            Name: contract.House.Name,
            BuildingCode: contract.House.Building.Code,
            Address: contract.House.Building.Address,
        };
    }

    formatContractInfo(contract, tenants, vehicles) {
        return {
            Contract: contract ? this.getContractInfo(contract) : null,
            Tenants: contract ? this.getTenantsInfo(tenants) : null,
            Vehicles: contract ? this.getVehiclesInfo(vehicles) : null,
            Manager: contract ? this.getManagerInfo(contract) : null,
            Apartment: contract ? this.getApartmentInfo(contract) : null,
        }
    }

    formatUserList(users) {
        const result = [];
        const clonedUsers = JSON.parse(JSON.stringify(users));

        clonedUsers.forEach(user => {
            result.push(Object.assign(
                {},
                user,
                { DOB: formatDateBeforeServing(user.DOB) }
            ))
        });

        return result;
    }

    async login(req, res){
        try {
            let param = {Email: req.body.Email};           
            if(!req.body.Email){
                param = {Tel : req.body.Tel};
            }
            let user  = await User.findOne({where : param});
            if(!user || (user && !(await user.validPassword(req.body.Password)) && user.IsDeleted == 0))  {
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('Login.Fail.Login')
                });
            }else{               
                let payload = {Id : user.Id};
                let accessToken = await jwtHelper.generateToken(payload, accessTokenSecret, accessTokenLife);
                let refreshToken = await jwtHelper.generateToken(payload, refreshTokenSecret, refreshTokenLife);      
                // store refresToken
                let token = {
                    CreatedBy: user.Id,
                    Token: refreshToken
                };
                let today = new Date();
                let timeOut = today.setDate(today.getDate() + parseInt(accessTokenLifeToInt));
                let tokenData = await Token.findOne({where : { CreatedBy: user.Id}});
                if(tokenData){
                    Token.update(token, {where: {Id : tokenData.Id}}).then(() => {
                        res.status(200).json({
                            Success: true,
                            AccessToken: accessToken,
                            RefreshToken: refreshToken,
                            TokenLife: moment(timeOut).format()
                        });
                    });
                }else{
                    Token.create(token).then(() => {
                        res.status(200).json({
                            Success: true,
                            AccessToken: accessToken,
                            RefreshToken: refreshToken,
                            TokenLife: moment(timeOut).format()
                        });
                    });
                }
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
    async refreshToken(req, res){
        try {
            let refreshTokenFromClient = req.body.RefreshToken;
            let token  = await Token.findOne({where : {Token : refreshTokenFromClient}});
            if(refreshTokenFromClient && token){
                let decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
                let payload = decoded.data;
                let accessToken = await jwtHelper.generateToken(payload, accessTokenSecret, accessTokenLife);
                res.status(200).json({
                    Success: true,
                    AccessToken: accessToken
                });
            }else{
                res.status(403).json({
                    Success: false,
                    Message: i18n.__('Token.InvalidToken'),
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
    createUser(req, res){
        try {
            let user = req.body.User;
            User.create(user).then(() => {
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
    async updateUser(req, res){
        try {
            // retrieve user
            let user = await User.findAll({                
                limit: 1,
                where: {
                    Id: req.body.UserId
                }
            });
            
            if(!user) {
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }

            // access avatar image and updated user information in form-data
            const form =  new formidable.IncomingForm();

            const updates = await new Promise(function (resolve, reject) {
                form.parse(req, function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    
                    // prepare updated user information
                    try {
                        let updates = {};
    
                        if (files.avatar) {
                            const tmpPath = files.avatar.path;
                            const fileExtension = files.avatar.name.split('.').slice(-1)[0];
                            const fileName = `${uuidv4()}.${fileExtension}`;
                            const storagePath = appRoot + '/storage/avatar/' + fileName;
                            const avatarUrl = `/avatar/${fileName}`;
                            
                            // save uploaded avatar in /avatar directory
                            fs.moveSync(tmpPath, storagePath);
    
                            Object.assign(
                                updates,
                                {
                                    Id: req.body.UserId,
                                    Avatar: avatarUrl
                                },
                            );
                        }
    
                        if (fields.user) {
                            const userInfo = JSON.parse(fields.user);
                            Object.assign(
                                updates,
                                {
                                    Id: req.body.UserId,
                                    Email: userInfo.Email,
                                    DOB: userInfo.DOB ? moment(userInfo.DOB, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
                                    RoleId: userInfo.RoleId,
                                    FullName: userInfo.FullName,
                                    Tel: userInfo.Tel,
                                    Address: userInfo.Address,
                                    BankAccount: userInfo.BankAccount,
                                    Active: userInfo.Active,
                                },
                            );
                        }
                        
                        resolve(updates);
                    } catch (err) {
                        reject(err)
                    }
                });
            });

            // save updated information in database
            User.update(updates, {where: {Id : req.body.UserId}}).then( () => {
                console.log('success');
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('User.Success.Update'),
                });
            }).catch(Sequelize.ValidationError, function (error) {
                // respond with validation errors
                res.status(500).json({
                    Success: false,
                    Message: error.errors[0].message,
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
    async deleteUser(req,res){
        try {
            let user = await User.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });

            if(!user){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                user.IsDeleted = 1;
                User.update(user, {where: {Id : req.body.Id}}).then( () => {
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
    getUserById(req,res){
        try {
            User.findByPk(req.body.Id, {attributes: ['Id', 'FullName', 'Avatar', 'Tel', 'Address', 'DOB', 'RoleId', 'Active']}).then(result => {
                const clonedResult = JSON.parse(JSON.stringify(result));
                clonedResult.DOB = !!result.DOB
                    ? moment(result.DOB, 'YYYY-MM-DD').format('DD/MM/YYYY')
                    : null;

                res.status(200).json({
                    Success: true,
                    Data: {
                        User: clonedResult
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
    searchUser(req,res){
        try {
            let options = {
                FullName : {[Op.like] :'%' + _get(req, ['body', 'FullName'], '') + '%' },
                Email: {[Op.like] :'%' + _get(req, ['body', 'Email'], '') + '%' },
                Tel : {[Op.like] :'%' + _get(req, ['body', 'Tel'], '') + '%' },
                IsDeleted : {[Op.eq] : 0 },
            };
            if (req.body.RoleId) {
                options.RoleId = {
                    [Op.in]: req.body.RoleId
                }
            }
            if(req.body.Active){
                options.Active = {[Op.eq] : req.body.Active };
            }else{
                options.Active = {[Op.like] :'%%' };
            }
            User.findAll(
                {
                    where: {[Op.or] : [options]},
                    attributes: ['Id', 'FullName', 'Avatar','Tel','DOB','RoleId', 'Active', 'Email']
                }
                ).then((users)=> {
                    res.status(200).json({
                    Success: true,
                    Data: {
                        Users: this.formatUserList(users)
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
    async forgotPassword(req,res){
        try {
            let user = await User.findOne({                
                where: {
                    Tel: req.body.Tel
                }
            });
            if(!user){
                res.status(200).json({
                    Success: false,
                    Message:  i18n.__('General.Fail.NotFound'),
                });
            }
            if(req.body.NewPassword != req.body.ConfirmPassword){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NewPasswordNotMatchConfirmPassword'),
                });
            }else{
                bcrypt.hash(req.body.NewPassword, bcrypt.genSaltSync(10), null).then(hash => {
                    User.update({Password: hash}, {where:{Id : user.Id}}).then(()=>{
                        res.status(200).json({
                            Success: true,
                            Message: i18n.__('General.Success.Update'),
                        });
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
    async changePassword(req,res){
        try {
            let user = await User.findOne({                
                where: {
                    Id: req.body.Id
                }
            });
            if(!user || (user && !user.validPassword(req.body.Password) && user.IsDeleted == 0)){
                res.status(200).json({
                    Success: false,
                    Message:  i18n.__('General.Fail.PasswordNotMatch'),
                });
            }else if(req.body.NewPassword != req.body.ConfirmPassword){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NewPasswordNotMatchConfirmPassword'),
                });
            }
            else{                
                bcrypt.hash(req.body.NewPassword, bcrypt.genSaltSync(10), null).then(hash => {
                    console.log(hash);
                    User.update({Password: hash}, {where:{Id : req.body.Id}}).then(()=>{
                        res.status(200).json({
                            Success: true,
                            Message: i18n.__('General.Success.Update'),
                        });
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
    async getProfile(req,res){
        try {
            const now = moment().format('YYYY-MM-DD');
            let user  = await User.findOne({where : {Id: req.body.UserId}, attributes:['Id', 'FullName', 'Email', 'Avatar', 'Tel', 'Address', 'DOB', 'RoleId', 'Active','HouseId']});
            let roleId = user.RoleId;
            let role = await Role.findOne({
                include: [
                    {
                        model : Permission,
                        as: 'Permission',
                        required: false,
                        attributes: ['Id','Name', 'Type', 'Method', 'Resource' ],
                        through: {
                            model: RolePermission,
                            as: 'RolePermission',
                            attributes: ['IsActive']
                        }
                    }
                ],
                where: {
                    Id: roleId
                },
                attributes: ['Id', 'Name', 'Type']
            });
            let evaluate = await Evaluate.findOne({
                where: {
                    CreatedBy: req.body.UserId,
                    Type: Constant.Evaluate.Login
                },
                order: [['CreatedDate', 'DESC']],
                attributes:['Type', 'Question1', 'Question2', 'Question3']
            });
            const contract = await Contract.findOne({
                where: {
                    HouseId: user.HouseId || null,
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
                    }]
                },
                attributes: [
                    'CheckinDate',
                    'CheckoutDate',
                    'Tenants',
                    'RentalFee',
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
                    attributes: [
                        'Name',
                        'Code'
                    ],
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: [
                                'FullName',
                                'Tel',
                                'BankAccount'
                            ]
                        },
                        {
                            model: Building,
                            as: 'Building',
                            attributes: [
                                'Name',
                                'Code',
                                'Address'
                            ]
                        }
                    ]
                }]
            });
            
            const tenants = await User.findAll({
                include: [
                    {
                        model: StayRecord,
                        as: 'StayRecord',
                        where: {
                            HouseId: user.HouseId ? user.HouseId : null, // search for HouseId = null returns an empty array
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
                    }
                ]
            })

            const vehicles = await Vehicle.findAll({
                where: {
                    HouseId: user.HouseId ? user.HouseId : null, // search for HouseId = null returns an empty array
                }
            })

            const clonedUser = JSON.parse(JSON.stringify(user));
            clonedUser.DOB = !!user.DOB
                ? moment(user.DOB, 'YYYY-MM-DD').format('DD/MM/YYYY')
                : null;
            if(!evaluate){
                let data = {
                    CreatedBy: req.body.UserId,
                    Type: Constant.Evaluate.Login
                }
                Evaluate.create(data).then((result)=>{
                    const response = {
                        Success: true,
                        Evaluate: result,
                        Role: role,
                        User: clonedUser
                    };
                    Object.assign(
                        response,
                        this.formatContractInfo(contract, tenants, vehicles)
                    );

                    res.status(200).json(response);
                });
            }else{
                const response = {
                    Success: true,
                    Evaluate: evaluate,
                    Role: role,
                    User: clonedUser,
                };
                Object.assign(
                        response,
                        this.formatContractInfo(contract, tenants, vehicles)
                    );

                res.status(200).json(response);
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
    async updateEvaluate(req,res){
        try {
            let evaluate = await Evaluate.findOne({                
                where: {
                    CreatedBy: req.body.UserId,
                    Type: Constant.Evaluate.Login
                },
                order: [['CreatedDate', 'DESC']],
            });
            if(!evaluate){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const updates = Object.assign(
                    {},
                    evaluate,
                    {
                        Question1: req.body.Evaluate.Question1,
                        Question2: req.body.Evaluate.Question2,
                        Question3: req.body.Evaluate.Question3,
                    }
                );
                Evaluate.update(updates, {where: {Id : evaluate.Id}}).then( () => {
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
    async getEvaluateByType(req,res){
        try {
            let evaluate = await Evaluate.findOne({                
                where: {
                    CreatedBy: req.body.UserId,
                    Type: req.body.Type
                }
            });
            if(!evaluate){
                let data = {
                    CreatedBy: req.body.UserId,
                    Type: req.body.Type
                }
                Evaluate.create(data).then((result)=>{
                    res.status(200).json({
                        Success: true,
                        Evaluate: result
                    });
                });
            }else{
                res.status(200).json({
                    Success: true,
                    Evaluate: evaluate
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
    async logout(req,res){
        try {
            let token = await Token.findOne(
                {
                    where: {
                    CreatedBy: req.body.Id
                }});
            if(token){
                Token.destroy({where: {Id : token.Id}}).then( ()=>{
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('User.Success.Logout')
                    });
                });
            }
            res.status(200).json({
                Success: true,
                Message: i18n.__('User.Success.Logout')
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
    async updateDeviceToken(req, res){
        let token = req.body.Token;
        try{
            let check = await DeviceToken.findOne({
                where: {
                    PlayerId: token.PlayerId
                }
            })
            let data = {}
            if(check){
                data =await DeviceToken.update({UserId: token.UserId},{where:{Id:check.Id}})
            }else{
                data = await DeviceToken.create({
                    PlayerId: token.PlayerId,
                    UserId: token.UserId
                })
            }
            res.status(200).json({
                Success:true,
                Message: i18n.__('General.Success.Create'),
                Data: data
            })
        }catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}

module.exports = UserHandler;