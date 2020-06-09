const db = require('../Models/index');
const Note = db.Note;
const User = db.User;
const Role = db.Role;
const HouseNote = db.HouseNote;
const UserNote = db.UserNote;
const VehicleNote = db.VehicleNote;
const Building= db.Building;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const moment = require("moment-timezone");

moment().tz('Asia/Ho_Chi_Minh').format();

class NoteHandler {
    constructor(){}

    createNote(model, info) {
        return new Promise(function (resolve, reject) {
            model.create(info)
            .then(newNote => {
                resolve(newNote);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    formatNewNote(note, creator) {
        return {
            Id: note.Id,
            Content: note.Content,
            CreatedDate: moment(note.CreatedDate).format('DD/MM/YYYY - HH:mm'),
            Creator: {
                Id: creator.Id,
                Avatar: creator.Avatar,
                FullName: creator.FullName,
                Role: creator.Role.Name,
            }
        }
    }
    
    async createHouseNote(req, res){
        try {
            const info = {
                HouseId: req.body.ApartmentId,
                Content: req.body.Content,
                CreatedBy: req.body.UserId,
            }

            const newNote = await this.createNote(HouseNote, info);

            User.findByPk(
                newNote.CreatedBy, {
                    include: [{
                        model: Role,
                        as: 'Role'
                    }]
                }
            ).then((creator) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewNote: this.formatNewNote(newNote, creator)
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
    
    async createUserNote(req, res){
        try {
            const info = {
                UserId: req.body.TenantId,
                Content: req.body.Content,
                CreatedBy: req.body.UserId,
            }

            const newNote = await this.createNote(UserNote, info);

            User.findByPk(
                newNote.CreatedBy, {
                    include: [{
                        model: Role,
                        as: 'Role'
                    }]
                }
            ).then((creator) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewNote: this.formatNewNote(newNote, creator)
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
    
    async createVehicleNote(req, res){
        try {
            const info = {
                VehicleId: req.body.VehicleId,
                Content: req.body.Content,
                CreatedBy: req.body.UserId,
            }

            const newNote = await this.createNote(VehicleNote, info);

            User.findByPk(
                newNote.CreatedBy, {
                    include: [{
                        model: Role,
                        as: 'Role'
                    }]
                }
            ).then((creator) => {
                res.status(200).json({
                    Success: true,
                    Message: i18n.__('General.Success.Create'),
                    NewNote: this.formatNewNote(newNote, creator)
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

    async updateNote(req, res){
        try {
            let contract = await Note.findByPk(req.body.Note.Id);
            if(!contract){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                const contract = req.body.Note;
                await this.validateNote(contract, contract.Id);

                const formattedNote = await this.formatNoteBeforeSaving(contract);

                Note.update(formattedNote , {where: {Id : req.body.Note.Id}}).then(() => {
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

    async deleteNote(req, res){
        try {
            let contract = await Note.findAll({                
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
                Note.update(contract , {where: {Id : req.body.Id}}).then(() => {
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

    async getNoteById(req, res){
        try {
            await Note.findByPk(req.body.Id).then((contract) => {
                res.status(200).json({
                    Success: true,
                    Data: {
                        Note: this.formatNoteBeforeServing(contract),
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

    searchNote(req, res){
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
            Note.findAll(
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
                        Notes: contracts
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

module.exports = NoteHandler;