const RatingHandler = require('../Handlers/ratingHandler');

class RatingController{
    constructor(){
        this.ratingHandler = new RatingHandler();
    }
    ratingService(req,res){
    	this.ratingHandler.ratingService(req,res)
    }
    myServiceRating(req,res){
        this.ratingHandler.myServiceRating(req,res)
    }
    ratingStaff(req,res){
    	this.ratingHandler.ratingStaff(req,res)
    }
    myStaffRating(req,res){
        this.ratingHandler.myStaffRating(req,res)
    }
    ratingApp(req,res){
    	this.ratingHandler.ratingApp(req,res)
    }
    myAppRating(req,res){
        this.ratingHandler.myAppRating(req,res)
    }
}

module.exports = RatingController;