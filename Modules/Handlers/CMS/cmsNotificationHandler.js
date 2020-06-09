const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Notifications = db.Notifications;
const i18n = require("i18n");
const User = db.User;
class NotificationHandler{
    constructor(){}

    // async createRole(req,res,next){
    //     try {
    //         let {Name,Type,Description} = req.body
    //         if(!Name) {return res.json({data:null,Message:"Vui lòng nhập tên"})}
    //         if (!Type){return res.json({data:null,Message:"Vui lòng nhập type"})}
    //         let checkName= await Role.findOne({
    //             where :{Name:Name}
    //         })
    //         if(checkName){return res.json({data:null,Message:"Tên đã tồn tại"})}
    //         let data = await Role.create(req.body)
    //         if(!data){return res.json({data:null,Message:"Error create"})}
    //         res.json({data:data,Message: "Success create"})      
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    async notificationList(req,res,next){
        let { draw, order, length, search, start } = req.query
			start = parseInt(start)
            draw = parseInt(draw)
            length = parseInt(length)
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            let cond = {IsDeleted : 0}
            if(search.value !== ""){
                cond = {
                    [Op.or]:{
                        Id:keyword
                    },
                    IsDeleted : 0
                }
            }
            try{
                let { rows, count } = await Notifications.findAndCountAll({
                    limit:length,
                    offset:start,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:cond,                   
                })

                let users= await User.findAll({  
                    attributes: ['Id','FullName']               
                })
                rows.forEach(row =>{
                    users.forEach(user =>{
                        if(row.dataValues.FromUserId == user.dataValues.Id ){
                            row.dataValues.FromUser = user.dataValues.FullName
                        }
                        if(row.dataValues.ToUserId == user.dataValues.Id ){
                            row.dataValues.ToUser = user.dataValues.FullName
                        }

                    })
                })
                res.json({ data:rows, draw: parseInt(draw), recordsTotal:count, recordsFiltered: count })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success:false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }

    async deleteNotification(req,res,next){
        try {
            let data = await Notifications.update(
                {IsDeleted: true},
                {where: {Id:req.body.id}}
            )
            if(!data){return res.json({data:null,Message:"Xóa không thành công"})}
            res.json({data,Message:"Xóa thành công"})
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = NotificationHandler