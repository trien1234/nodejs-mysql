const express = require("express");
const router = express.Router();

const NewsController = require('../Controllers/newsController');
const authMiddleware = require('../Middlewares/authMiddleware');

let newsController = new NewsController();

router.get('/list', authMiddleware.isAuth, function(req, res){
	newsController.listNews(req,res);
})
router.get('/view/:id', authMiddleware.isAuth, function(req, res){
	newsController.viewNews(req,res);
})

module.exports = router