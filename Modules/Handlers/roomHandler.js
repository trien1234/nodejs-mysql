const db = require('../Models/index');
const Room = db.Room;
const House = db.House;
const User= db.User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");

class RoomHandler {
    constructor(){}

    async createRoom(req, res){
        try {
            let room = req.body.Room;
            await Room.create(room).then(() => {
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

    async updateRoom(req, res){
        try {
            let room = await Room.findByPk(req.body.Room.Id);
            if(!room){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                Room.update(req.body.Room , {where: {Id : req.body.Room.Id}}).then(() => {
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

    async deleteRoom(req, res){
        try {
            let room = await Room.findAll({                
                limit: 1,
                where: {
                    Id: req.body.Id
                }
            });
            if(!room){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                room.IsDeleted = 1;
                Room.update(room , {where: {Id : req.body.Id}}).then(() => {
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

    getRoomById(req, res){
        try {
            Room.findByPk(req.body.Id, {attributes: ['Id', 'BuildingId', 'ManagerId','Name','Note','Code', 'Block','Floor','ServicePrice','Status']}).then( (room) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Room: room,
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

    async getAllByHouseId(req, res) {
        try {
            let options = {
                HouseId: req.body.ApartmentId,
                IsDeleted: 0,
            };

            await Room.findAll({
                where: options,
                attributes: ['Id', 'HouseId', 'Name', 'Code', 'Status', 'CheckinDate', 'CheckoutDate'],
                include: [{
                    model: House,
                    as: 'House',
                    attributes: [],
                    where: { ManagerId: req.body.UserId } // only get rooms that belong to apartments this user manages
                }]
            }).then((rooms) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Rooms: rooms
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

    searchRoom(req, res){
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
            Room.findAll(
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
            }).then((rooms)=> {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Rooms: rooms
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

    async getManagingRoomById(req, res) {
        try {
            let options = {
                Id: req.body.RoomId,
                IsDeleted: 0,
            };

            await Room.findOne({
                where: options,
                include: [{
                    model: House,
                    as: 'House',
                    attributes: [],
                    where: {
                        ManagerId: req.body.UserId
                    } // only get rooms that belong to apartments this user manages
                }]
            }).then((room) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Room: room
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

module.exports = RoomHandler;