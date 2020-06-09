const db = require('../Models/index');
const News = db.News;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const i18n = require("i18n");
const multiparty = require('multiparty');
const uuidv4 = require('uuid/v4');
const fs = require("fs");
const moment = require('moment');
const Paging = require('paginate-info');

class NewsHandler {
    constructor(){}

    async listNews(req, res){
        const currentPage = req.query.currentPage?req.query.currentPage:1;
        const pageSize = req.query.pageSize?req.query.pageSize:5;
        try {
            const { limit, offset } = Paging.calculateLimitAndOffset(currentPage, pageSize);     
            let { rows, count } = await News.findAndCountAll({
                limit,
                offset,
                order: [
                    ['Id', 'DESC'],
                    ['IsFeatured', 'DESC']
                ],
                attributes: ['Id', 'Title', 'Content', 'Image', 'CreatedDate', 'IsFeatured'],
                where: {
                    IsDeleted: 0
                }
            })
            const meta = Paging.paginate(currentPage, count, rows, pageSize);
            if(!rows || rows == ""){
                res.status(200).json({
                    Success: false,
                    Message: i18n.__('General.Fail.NotFound'),
                });
            }else {
                let news = [];
                rows.forEach(n =>{
                    news.push({
                        Id: n.get('Id'),
                        Title: n.Title,
                        Content: n.get('IsFeatured') === 1 ? n.Content : "" ,
                        Image: n.Image?n.Image:'',
                        CreatedDate: moment(n.CreatedDate).format("H:m DD/MM/YYYY"),
                        IsFeatured: n.get('IsFeatured')    
                    })
                })
                return res.status(200).json({
                    Success: true,
                    Data: {news, meta},
                });
            }
        }catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }

    async viewNews(req, res){
        const newsId = req.params.id;
        try {
            let news = await News.findOne({
                where: {
                    Id: newsId,
                    IsDeleted: 0
                }
            }).then( (news)=>{
                if(!news || news == ""){
                    res.status(200).json({
                        Success: false,
                        Message: i18n.__('General.Fail.NotFound'),
                    })
                }
                else{
                    let data = {};
                    Object.assign(
                        data,
                        {
                            Id: news.Id,
                            Title: news.Title,
                            Content: news.Content,
                            Image: news.Image ? news.Image: "",
                            CreatedDate: moment(news.CreatedDate).format("H:m DD/MM/YYYY")
                        },
                    );
                    res.status(200).json({
                        Success: true,
                        Data: data
                    })
                }
            })
        }catch(error){
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}

module.exports = NewsHandler;