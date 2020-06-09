const db = require('../Models/index.js')
const Notifications = db.Notifications;
const i18n = require("i18n");
const Paging = require('paginate-info');
const moment = require('moment');
const CONSTANT = require("../../Config/constant.js");


moment.updateLocale('vi', {
    relativeTime : {
        future: "trong %s",
        past:   "%s trước",
        s  : 'vài giây',
        ss : '%d giây',
        m:  "một phút",
        mm: "%d phút",
        h:  "một giờ",
        hh: "%d giờ",
        d:  "một ngày",
        dd: "%d ngày",
        M:  "một tháng",
        MM: "%d tháng",
        y:  "một năm",
        yy: "%d năm"
    }
});

class NotifyHandler{
	constructor(){}

	async listNotify(req, res){
		const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:15;
		try{
			const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);
			let { rows, count } = await Notifications.findAndCountAll({
				limit, offset,
				order: [['Id', 'DESC']],
				where: {
					ToUserId: req.query.UserId
				}
			})
			const meta = Paging.paginate(currentPage, count, rows, pageSize);
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else{
            	let notify = []
            	rows.forEach(n=>{
            		notify.push({
            			Id: n.Id,
            			Content: n.Content,
            			Status: n.Status,
            			CreatedDate: moment(n.CreatedDate).fromNow()
            		})
            	})
            	res.status(200).json({
                    Success: true,
                    Data: {notify, meta},
                });
            }
		}catch(error){
			console.log(error)
			res.status(500).json({
				Success:false,
				Message: i18n.__("General.Fail.Opps"),
				Error: error
			})
		}
	}

    async updateNotify(req,res){
        try{
            let check = await Notifications.findOne({
                where: {
                    Id: req.body.Id
                }
            })
            if(!check){
                return res.status(200).json({
                    Success:false,
                    Message: i18n.__('General.Fail.NotFound')
                })
            }
            await Notifications.update({Status:CONSTANT.READ_STATUS.READ,UpdatedDate: Date.now()},{where:{Id:req.body.Id}})
            res.status(200).json({
                Success:true,
                Message: i18n.__('General.Success.Update')
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                Success:false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            })
        }
    }
}

module.exports = NotifyHandler