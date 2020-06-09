const db = require('../Models/index');
const User = db.User;
const AppRating = db.AppRating;
const StaffRating = db.StaffRating;
const ServiceRating = db.ServiceRating;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const i18n = require("i18n");

class RatingHandler{
	constructor(){}

	async ratingService(req, res){
		let rating = req.body.Rating;
		try{
			let data = await ServiceRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['LifeTimeRating','Fortune','Parking','Invironment','Feedback','GoodPoint']	
			})
			if(data){
				return res.status(200).json({
					Success: true,
					Message: "Bạn đã gửi một đánh giá trước đó. 3SHome xin cảm ơn",
					Data: data
				})
			}else {
				await ServiceRating.create({
					LifeTimeRating: rating.LifeTimeRating,
					Fortune: rating.Fortune,
					Parking: rating.Parking,
					Invironment: rating.Invironment,
					Feedback: rating.Feedback,
					GoodPoint: rating.GoodPoint,
					UserId: rating.UserId
				})
				res.status(200).json({
					Success: true,
					Message: "3SHome cảm ơn những đánh giá của bạn với hệ thống của chúng tôi."
				})
			}
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__("General.Fail.Opps")
			})
		}
	}
	async myServiceRating(req,res){
		let rating = req.body.Rating;
		try{
			let data = await ServiceRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['LifeTimeRating','Fortune','Parking','Invironment','Feedback','GoodPoint']	
			})
			if(!data) return res.status(500).json({Success:false, Data:null})
			res.status(200).json({
				Success: true,
				Data: data
			})
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps')
			})
		}	
	}

	async ratingStaff(req, res){
		let rating = req.body.Rating;
		try{
			let data = await StaffRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['LifeSkill','WorkingSkill','Feedback']
			})
			if(data){
				return res.status(200).json({
					Success: true,
					Message: "Bạn đã gửi một đánh giá trước đó. 3SHome xin cảm ơn",
					Data: data
				})
			}else {
				await StaffRating.create({
					LifeSkill: rating.LifeSkill,
					WorkingSkill: rating.WorkingSkill,
					Feedback: rating.Feedback,
					UserId: rating.UserId
				})
				res.status(200).json({
					Success: true,
					Message: "3SHome cảm ơn những đánh giá của bạn với hệ thống của chúng tôi."
				})
			}
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__("General.Fail.Opps")
			})
		}
	}

	async myStaffRating(req,res){
		let rating = req.body.Rating;
		try{
			let data = await StaffRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['LifeSkill','WorkingSkill','Feedback']
			})
			if(!data) return res.status(500).json({Success:false, Data:null})
			res.status(200).json({
				Success: true,
				Data: data
			})
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps')
			})
		}
	}
	async ratingApp(req, res){
		let rating = req.body.Rating;
		try{
			let data = await AppRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['Point','LikeFunction','Feedback']
			})
			if(data){
				return res.status(200).json({
					Success: true,
					Message: "Bạn đã gửi một đánh giá trước đó. 3SHome xin cảm ơn",
					Data: data
				})
			}else {
				await AppRating.create({
					Point: rating.Point,
					LikeFunction: rating.LikeFunction,
					Feedback: rating.Feedback,
					UserId: rating.UserId
				})
				res.status(200).json({
					Success: true,
					Message: "3SHome cảm ơn những đánh giá của bạn với hệ thống của chúng tôi."
				})
			}
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__("General.Fail.Opps")
			})
		}
	}
	async myAppRating(req, res){
		let rating = req.body.Rating;
		try{
			let data = await AppRating.findOne({
				where: {
					UserId: rating.UserId
				},
				attributes: ['Point','LikeFunction','Feedback']
			})
			if(!data) return res.status(500).json({Success:false, Data:null})
			res.status(200).json({
				Success: true,
				Data: {
					Point: data.Point,
					LikeFunction: data.LikeFunction.split(','),
					Feedback: data.Feedback
				}
			})
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__('General.Fail.Opps')
			})
		}
		
	}
}

module.exports = RatingHandler;