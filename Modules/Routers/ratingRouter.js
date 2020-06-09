const express = require('express');
const router = express.Router();

const RatingController = require('../Controllers/ratingController');
const authMiddleware = require('../Middlewares/authMiddleware');

let ratingController = new RatingController();

router.post('/service',authMiddleware.isAuth, function(req,res){
    ratingController.ratingService(req,res);
});
router.post('/service/myRating',authMiddleware.isAuth, function(req,res){
    ratingController.myServiceRating(req,res);
});
router.post('/staff',authMiddleware.isAuth, function(req,res){
    ratingController.ratingStaff(req,res);
});
router.post('/staff/myRating',authMiddleware.isAuth, function(req,res){
    ratingController.myStaffRating(req,res);
});
router.post('/application',authMiddleware.isAuth, function(req,res){
    ratingController.ratingApp(req,res);
});
router.post('/application/myRating',authMiddleware.isAuth, function(req,res){
    ratingController.myAppRating(req,res);
});


module.exports = router;