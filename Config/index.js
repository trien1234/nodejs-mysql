const bcrypt = require('bcryptjs');

const checkAdmin = (req, res, next) => {
  	if (!req.session.admin) return res.redirect('/cms/login');
    if(req.session.admin.RoleId==5) return res.redirect('/cms/managerDashboard');
  	next()
}
const checkManager = (req, res, next) => {
    if (!req.session.admin) return res.redirect('/cms/login');
    if(req.session.admin.RoleId==5){
      return next();
    }else{
      res.render('404', {layout:false})
    }
    
}
const checkAccounting = (req, res, next) => {
    if (!req.session.admin) return res.redirect('/cms/login');
    if(req.session.admin.RoleId==9){
      return next();
    }else{
      res.render('404', {layout:false})
    }
    
}
const checkPasswordByHash = async (password, hash) => {
  	return new Promise ((resolve, reject) => {
    	bcrypt.compare(password, hash, (err, isMatch) => {
      		if (err) return resolve(false)
      		resolve(isMatch)
    	})
  	})
}
module.exports = {
	checkAdmin:checkAdmin,
  checkManager:checkManager,
  checkAccounting:checkAccounting,
	checkPasswordByHash
}