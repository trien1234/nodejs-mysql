module.exports = (app) => {
    app.use(function(err,req,res,next){
        console.log(err);
        return res.status(500).send({
            Success : false,
            Message : err
        })
    })
};
