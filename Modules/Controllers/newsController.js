const NewsHandler = require('../Handlers/newsHandler');

class NewsController{
    constructor(){
        this.newsHandler = new NewsHandler();
    }

    createNews(req,res){
        this.newsHandler.createNews(req,res);
    }
    listNews(req,res){
        this.newsHandler.listNews(req,res);
    }
    viewNews(req,res){
        this.newsHandler.viewNews(req,res);
    }
}

module.exports = NewsController;