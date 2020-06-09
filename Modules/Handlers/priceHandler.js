const db = require('../Models/index');
const FixerPrice = db.FixerPrice;
const Incident = db.Incident;
const IncidentStatus = db.IncidentStatus;
const User = db.User;
const DeviceToken = db.DeviceToken;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const INCIDENT_STATUS = require("../../Config/constant.js");
const NotifyHelpers = require('../Helpers/NotifyHelper.js')

class PriceHandler {
    constructor(){}

    async createPrice(req, res){
        try {
            let fixerPrice = req.body.Price;
            let incident = await Incident.findAll({                
                limit: 1,
                where: {
                    Id: fixerPrice.IncidentId
                }
            });
            let price = await FixerPrice.findOne({
                where: {
                    UserId: fixerPrice.UserId,
                    IncidentId: fixerPrice.IncidentId
                },
                attributes: ['UserId']
            })
            if(price){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.Exist'),
                });
            }
            if(!incident || incident == ""){
                return res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
                FixerPrice.create(fixerPrice).then( async(result, error) => {
                    if(error) throw error;
                    // await Incident.update(
                    // {
                    //     Status : INCIDENT_STATUS.IncidentStatus.PRICING
                    // },
                    // {
                    //     where:{
                    //         Id: result.IncidentId
                    //     }
                    // });
                    let findStatus = await IncidentStatus.findOne({
                        where: {
                            IncidentId: result.IncidentId,
                            Name: INCIDENT_STATUS.IncidentStatus.PRICING,
                        }
                    })
                    if(!findStatus){
                        await IncidentStatus.create({
                            Name: INCIDENT_STATUS.IncidentStatus.PRICING,
                            IncidentId: result.IncidentId,
                            UserId: fixerPrice.UserId
                        })
                    }
                    res.status(200).json({
                        Success: true,
                        Message: i18n.__('General.Success.Create'),
                    })
                });
            }    

        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async confirmFixingPrice(req, res){
        let UserId = req.body.Confirm.UserId;
        let priceId = req.body.Confirm.Id;
        try{
            let check = await FixerPrice.findOne({
                where: {Id:priceId},
                attributes: ['Price','AcceptedBy','IncidentId','UserId']
            })
            if(!check || check == ""){
                return res.status(200).json({
                    Status: false,
                    Message: i18n.__('General.Fail.NotFound')
                })
            }
            if(check.AcceptedBy !=null){
                return res.status(200).json({
                    Status: false,
                    Message: i18n.__('Pricing.Fail.ChoseThisBefore')
                })
            }
            if(check){
                let getPriceByIncident = await FixerPrice.findAll({
                    where: {
                        IncidentId: check.IncidentId
                    },
                    attributes: ['AcceptedBy']
                });
                // Kiem tra để check cư dân chỉ được chọn 1 báo giá duy nhất 
                if(getPriceByIncident){
                    getPriceByIncident.forEach(i=>{
                        if(i.AcceptedBy!=null){
                            return res.status(200).json({
                                Status: false,
                                Message: i18n.__('Pricing.Fail.ChoseOneBefore')
                            })
                        }
                    })
                } 
            }                     
            let newData = {}
            Object.assign(
                newData,
                {
                    AcceptedBy: UserId,
                    AcceptedDate: Date.now(),
                    Status: INCIDENT_STATUS.FixerPriceStatus.RECEIVED 
                }
            )

            let data = await FixerPrice.update(newData,{where:{Id: priceId} });
            if(data){
                //Tìm kiểm và huỷ những báo giá không được chấp nhận
                let getRefusePrice = await FixerPrice.findAll({
                    where: {
                        IncidentId: check.IncidentId,
                        Status: INCIDENT_STATUS.FixerPriceStatus.PENDING
                    }
                });
                getRefusePrice.forEach( async r=>{
                    await FixerPrice.update({Status:INCIDENT_STATUS.FixerPriceStatus.CANCEL},{where:{Id:r.Id}})
                })

                //gui thong bao cho tho
                let user = await User.findOne({
                    where: {
                        Id: check.UserId
                    },attributes:['FullName'],
                    include: [
                        {
                            model: DeviceToken,
                            as: 'DeviceToken',
                            separate: true,
                            attributes: ['PlayerId']
                        }
                    ]
                })
                let player = [];
                user.DeviceToken.forEach(p=>{
                    player.push(p.PlayerId)
                })
                let incident = await Incident.findOne({where:{Id:check.IncidentId},attributes:['Code']})
                let title = 'Thông báo báo giá thành công';
                let contentNotify = `Xin chào ${user.FullName}. Báo giá sự cố ${incident.Code} của bạn đã được chấp nhận.`
                NotifyHelpers.toOneFixer(check.IncidentId, UserId, check.UserId, contentNotify, player, title)
            }

            res.status(200).json({
                Status: true,
                Message: "Bạn đã chấp nhận báo giá này"
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Status: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error 
            })
        }
    }
}

module.exports = PriceHandler;