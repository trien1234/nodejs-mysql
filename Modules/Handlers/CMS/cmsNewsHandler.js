const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../Models/index');
const i18n = require("i18n");
const House = db.House;
const uuidv4 = require('uuid/v4');
// const FixerGroup = db.FixerGroup;
const User = db.User;
const Building = db.Building;
const News = db.News;
const multiparty = require('multiparty');
const fs = require("fs");
class NewsHandler{
    async createNews(req, res, next){
        try {
            const form = new multiparty.Form();
            const news = await new Promise(function (resolve, reject) {
                form.parse(req, async function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    try {
                        let Image = {};
                        let news = {};
                        
                        if (files) {
                            let img = files.Image;
                            if(img){
                                img.forEach(e => {
                                    const tempPath = e.path;
                                    const fileExtension = e.originalFilename.split('.').slice(-1)[0];
                                    const fileName = `${uuidv4()}.${fileExtension}`;
                                    const targetPath = appRoot + '/storage/news/' + fileName;
                                    fs.copyFile(tempPath, targetPath, err => {
                                        console.log(err)
                                    //if (err) return res.status(HttpStatus.BAD_REQUEST).send({ message: "Cannot save images" })
                                    });
                                    Image = '/news-img/'+fileName;
                                });
                            }                              
                        }
                        if (fields) {
                            let newsInf = JSON.stringify(fields);
                            let newsInfo = JSON.parse(newsInf);
                            let check = await News.findOne({
                                where:{
                                    Title:newsInfo.Title.join(),
                                    IsDeleted: 0
                                }
                            });
                            if(newsInfo.IsFeatured.join()==1){
                               let checkIsFeatured = await News.findOne({
                                    where:{
                                        IsFeatured: 1,
                                        IsDeleted: 0
                                    }
                                });
                                if(checkIsFeatured){
                                    News.update({IsFeatured:0},{where:{Id:checkIsFeatured.Id}})
                                } 
                            }                         
                            if(check) 
                                return res.render('news/addNews', {
                                    sess:req.session.admin,
                                    message: 'Tiêu đề bài viết đã tồn tại'
                                })
                                                          
                            Object.assign(
                                news,
                                {
                                    Title: newsInfo.Title.join(),
                                    Content: newsInfo.Content.join(),
                                    Image: Image,
                                    IsFeatured: newsInfo.IsFeatured.join()
                                },
                            );
                        }
                        
                        resolve(news);
                    } catch (err) {
                        reject(err)
                    }
                });
            });
            let data = await News.create(news)
            if(data){
                return res.render('news/addNews', {
                    sess:req.session.admin,
                    message: 'Thêm mới bài viết thành công'
                }) 
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
    async newsList(req,res,next){
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
                    Title:keyword,
                    Content:keyword,
                }
            }
        }
        try{
            let { rows, count } = await News.findAndCountAll({
                limit:length,
                offset:start,
                order: [
                    ['Id', 'DESC']
                ],
                where:cond,
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

    async deleteNews(req,res,next){
        try {
            let data = await News.update(
                {IsDeleted: true},
                {where: {Id:req.body.id}}
            )
            if(!data){return res.json({data:null,Message:"Xóa không thành công"})}
            res.json({data,Message:"Xóa thành công"})
        } catch (error) {
            console.log(error)
        }
    }

    async editNews(req, res){
        try {
            const form = new multiparty.Form();
            const news = await new Promise(function (resolve, reject) {
                form.parse(req, async function(parseErr, fields, files){
                    if(parseErr) {
                        reject(parseErr);
                    }
                    try {
                        let Image = {};
                        let news = {};                      
                        if (files) {
                            let img = files.Image;
                            if(img){
                                img.forEach(e => {
                                    const tempPath = e.path;
                                    const fileExtension = e.originalFilename.split('.').slice(-1)[0];
                                    const fileName = `${uuidv4()}.${fileExtension}`;
                                    const targetPath = appRoot + '/storage/news/' + fileName;
                                    fs.copyFile(tempPath, targetPath, err => {
                                        console.log(err)
                                    });
                                    Image = '/news-img/'+fileName;
                                });
                            }                              
                        }
                        if (fields) {
                            let newsInf = JSON.stringify(fields);
                            let newsInfo = JSON.parse(newsInf);
                            if(!(files.Image[0].originalFilename)){
                                Object.assign(
                                    news,
                                    {
                                        Title: newsInfo.Title.join(),
                                        Content: newsInfo.ContentEdit.join(),
                                        IsFeatured: newsInfo.IsFeatured.join()
                                    },
                                );
                            }
                            else{
                                Object.assign(
                                    news,
                                    {
                                        Title: newsInfo.Title.join(),
                                        Content: newsInfo.ContentEdit.join(),
                                        Image: Image,
                                        IsFeatured: newsInfo.IsFeatured.join()
                                    },
                                );
                            }
                        }
                        
                        resolve(news);
                    } catch (err) {
                        reject(err)
                    }
                });
            });
            let Id = req.params.id
            let data = await News.update(news,{where:{Id:Id}}).then( () => {                  
                res.redirect('/cms/listNews')
                // res.status(200).json({
                //     Success: true,
                //     Message: i18n.__('General.Success.Create'),
                // });
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                Success: false,
                Message: i18n.__('General.Fail.Opps'),
                Error: error
            });
        }
    }
}
module.exports = NewsHandler