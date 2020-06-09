const { checkPasswordByHash } = require('../../../Config/index.js');
const db = require('../../Models/index');
const User = db.User;
const Role = db.Role;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");

class AuthHandler {
	constructor(){}

	async adminLogin(req, res, next) {
        let { Email, Password } = req.body

        if (!Email) 
        	return res.status(200).json({ 
        		Success: false,
                Message: "Vui lòng nhập Email"
        	})
        if (!Password) return res.json({ data: null, Message: "Vui lòng nhập mật khẩu" })
        let data = await User.findOne({
            where: {
                Email: Email,
                [Op.and]: [{RoleId: {[Op.ne]:4}}, {RoleId: {[Op.ne]:7}}]
            },
            include: [
                {
                    model: Role,
                    as: 'Role',
                    attributes: ['Type', 'Name']
                }
            ]
        })
        if (!data) return res.json({ data: null, Message: "Tài khoản không tồn tại" })
        let passwordIsMatch = await checkPasswordByHash(Password, data.Password)
        if (!passwordIsMatch) return res.json({ data: null, Message: "Mật khẩu không chính xác" })

        let session = req.session;
        session.admin = data;
        res.json({ data, Message: "Chào mừng quay trở lại "+ session.admin.FullName })
    }
    async logOut(req, res){
        req.session.admin = null
        res.redirect('/cms/login')
    }
//FullName,Email,Avatar,Tel,Address,BankAccount,DOB,RoleId,HouseId,FixerGroupId,Password,IdCard,Active,CreatedBy,CreatedDate,UpdatedBy,UpdatedDate,IsDeleted
    // async addUser(req, res, next) {
    //     let 
    // }
}
module.exports = AuthHandler;