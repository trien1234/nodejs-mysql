const NoteHandler = require('../Handlers/noteHandler');

class NoteController{
    constructor(){
        this.noteHandler = new NoteHandler();
    }
    
    createHouseNote(req,res){
        this.noteHandler.createHouseNote(req,res);
    }
    createUserNote(req,res){
        this.noteHandler.createUserNote(req,res);
    }
    createVehicleNote(req,res){
        this.noteHandler.createVehicleNote(req,res);
    }
    updateNote(req,res){
        this.noteHandler.updateNote(req,res);
    }
    deleteNote(req,res){
        this.noteHandler.deleteNote(req,res);
    }
    getNoteById(req,res){
        this.noteHandler.getNoteById(req,res);
    }
    searchNote(req,res){
        this.noteHandler.searchNote(req,res);
    }
}

module.exports = NoteController;