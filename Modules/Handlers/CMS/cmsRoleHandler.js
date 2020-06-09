const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Role = db.Role;
const House = db.House;
// const FixerGroup = db.FixerGroup;
const User = db.User;
const Building = db.Building;
const i18n = require("i18n");

class RoleHandler{
    constructor(){}
    async createRole(req,res,next){
        try {
            let {Name,Type,Description} = req.body
            if(!Name) {return res.json({data:null,Message:"Vui lòng nhập tên"})}
            if (!Type){return res.json({data:null,Message:"Vui lòng nhập type"})}
            let checkName= await Role.findOne({
                where :{Name:Name}
            })
            if(checkName){return res.json({data:null,Message:"Tên đã tồn tại"})}
            let data = await Role.create(req.body)
            if(!data){return res.json({data:null,Message:"Error create"})}
            res.json({data:data,Message: "Success create"})      
        } catch (error) {
            console.log(error)
        }
    }

    async roleList(req,res,next){
        let { draw, order, length, search, start } = req.query
			start = parseInt(start)
            draw = parseInt(draw)
            length = parseInt(length)
            let data
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            let cond = {IsDeleted: 0}
            if(search.value !== ""){
                cond = {
                    IsDeleted: 0,
                    [Op.or]:{
                        Id:keyword,
                        Name:keyword,
                    }
                }
            }
            try{
                let { rows, count } = await Role.findAndCountAll({
                    limit:length,
                    offset:start,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:cond,                   
                })
                // console.log("count",count)
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

    // async deleteHouse(req,res,next){
    //     try {
    //         let data = await House.update(
    //             {IsDeleted: true},
    //             {where: {Id:req.body.id}}
    //         )
    //         if(!data){return res.json({data:null,Message:"Xóa không thành công"})}
    //         res.json({data,Message:"Xóa thành công"})
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


}
module.exports = RoleHandler