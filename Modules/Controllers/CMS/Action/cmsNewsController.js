const NewsHandler = require('../../../Handlers/CMS/cmsNewsHandler');

class NewsController {
	constructor(){
		this.newsHandler = new NewsHandler();
	}
    async createNews(req,res,next){
        this.newsHandler.createNews(req,res,next)
    }
    async newsList(req,res,next){
        this.newsHandler.newsList(req,res,next)
    }

    async deleteNews(req,res,next){
        this.newsHandler.deleteNews(req,res,next)
    }

    async editNews(req,res,next){
        this.newsHandler.editNews(req,res,next)
    }

}
module.exports = NewsController