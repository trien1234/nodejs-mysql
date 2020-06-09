const StatisticHandler = require('../Handlers/statisticHandler');

class StatisticController{
    constructor(){
        this.statisticHandler = new StatisticHandler();
    }

    allStatistic(req,res){
        this.statisticHandler.allStatistic(req,res);
    }
}

module.exports = StatisticController;