const express = require('express');
const router = express.Router();

const NoteController = require('../Controllers/noteController');
const authMiddleware = require('../Middlewares/authMiddleware');

let noteController = new NoteController();

router.post('/add/apartmentNote',authMiddleware.isAuth, function(req,res){
    noteController.createHouseNote(req,res);
});
router.post('/add/userNote',authMiddleware.isAuth, function(req,res){
    noteController.createUserNote(req,res);
});
router.post('/add/vehicleNote',authMiddleware.isAuth, function(req,res){
    noteController.createVehicleNote(req,res);
});
router.post('/update',authMiddleware.isAuth, function(req,res){
    noteController.updateNote(req,res);
});
router.post('/delete',authMiddleware.isAuth, function(req,res){
    noteController.deleteNote(req,res);
});
router.post('/getById',authMiddleware.isAuth, function(req,res){
    noteController.getNoteById(req,res);
});
router.post('/search',authMiddleware.isAuth, function(req,res){
    noteController.searchNote(req,res);
});

module.exports = router;