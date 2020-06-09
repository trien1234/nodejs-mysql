const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const Incident = db.Incident;
const House = db.House;
const i18n = require("i18n");
// const FixerGroup = db.FixerGroup;
const Building = db.Building;
const IncidentType = db.IncidentType;
const CONSTANT = require("../../../Config/constant");
class IncidentHandler{
    constructor(){}

    async getBuiLding_House_Incident (req,res,next){
        try {
            let data = await Building.findAll({
                attributes: ['Id','Name']
            })

            let dataTypeIncident = await IncidentType.findAll({
                attributes: ['Id','Name']
            })
            res.json({"data":data,"dataTypeIncident":dataTypeIncident})
        } catch (error) {
            console.log(error)
        }
    }
    async getHousebyBuildingId (req,res,next){
        try {
            let data = await House.findAll({
                attributes: ['Id','Name'],
                where : {BuildingId:req.query.BuildingId}
            }             
            )
            res.json({data})
        } catch (error) {
            console.log(error)
        }
    }
    async incidentList(req,res,next){
        let { draw, order, length, search, start } = req.query
			start = parseInt(start)
            draw = parseInt(draw)
            length = parseInt(length)           
            let HouseId = req.query.HouseId
            let BuildingId = req.query.BuildingId
            let TypeSearchIncident = req.query.TypeSearchIncident
            let StatusIncidentSearch = req.query.StatusIncidentSearch
            let cond = {IsDeleted: 0,HouseId:HouseId,BuildingId:BuildingId,IncidentTypeId:TypeSearchIncident,Status:StatusIncidentSearch}
            if(!HouseId){delete cond.HouseId}
            if(HouseId == 'undefined'){delete cond.HouseId}
            if(!BuildingId){delete cond.BuildingId}
            if(!TypeSearchIncident){delete cond.IncidentTypeId}
            if(!StatusIncidentSearch){delete cond.Status}
            console.log("cond",cond)
            let keyword = {[Op.like] :'%' + (search.value ? search.value : "") + '%' };
            if(search.value !== ""){
                let cond2 = {
                    [Op.or]:{
                    Id:keyword,
                    Code:keyword,
                }}
                cond = Object.assign(cond,cond2)
            }
            try{
                let { rows, count } = await Incident.findAndCountAll({
                    limit:length,
                    offset:start,
                    order: [
                        ['Id', 'DESC']
                    ],
                    where:cond,
                    include: [
                        {
                            model: Building, as : 'Building',attributes: ['Name']
                        },
                        {
                            model: House, as: 'House', attributes:['Name']
                        },
                        {
                            model:IncidentType, as:'Type', attributes:['Name']
                        }
                    ]
                })
                rows.forEach(value =>{
                    value.dataValues.constantIncident = CONSTANT.IncidentStatus
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

    async deleteIncident (req,res,next){
        try {
            let data = await Incident.update(
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
module.exports = IncidentHandler