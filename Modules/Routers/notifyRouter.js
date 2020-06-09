const express = require("express");
const router = express.Router();

const NotifyController = require('../Controllers/notifyController');
const authMiddleware = require('../Middlewares/authMiddleware');

let notifyController = new NotifyController();

router.post('/update',authMiddleware.isAuth, function(req,res){
    notifyController.updateNotify(req,res);
});
router.get('/list', authMiddleware.isAuth, function(req, res){
	notifyController.listNotify(req,res);
})
// router.get('/view/:id', authMiddleware.isAuth, function(req, res){
// 	notifyController.viewNews(req,res);
// })

module.exports = router