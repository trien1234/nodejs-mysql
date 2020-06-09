const express = require('express');
const bodyParser = require('body-parser');
const loggingHelpers = require('logging-helpers');
const exphbs  = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const flash = require('connect-flash');
const Swal = require('sweetalert2');
require('dotenv').config();
require('./Modules/Helpers/global');
const session = require('express-session');
const port = process.env.PORT || 3000;

const userRouter = require('./Modules/Routers/userRouter');
const roleRouter = require('./Modules/Routers/roleRouter');
const fixerGroupRouter = require('./Modules/Routers/fixerGroupRouter');
const buildingRouter = require('./Modules/Routers/buildingRouter');
const apartmentHistoryRouter = require('./Modules/Routers/apartmentHistoryRouter');
const houseRouter = require('./Modules/Routers/houseRouter');
const roomRouter = require('./Modules/Routers/roomRouter');
const contractRouter = require('./Modules/Routers/contractRouter');
const stayRecordRouter = require('./Modules/Routers/stayRecordRouter');
const noteRouter = require('./Modules/Routers/noteRouter');
const vehicleRouter = require('./Modules/Routers/vehicleRouter');
const configurationRouter = require('./Modules/Routers/configurationRouter');
const apartmentRouter = require('./Modules/Routers/apartmentRouter');
const incidentTypeRouter = require('./Modules/Routers/incidentTypeRouter');
const priceRouter = require('./Modules/Routers/priceRouter');
const newsRouter = require('./Modules/Routers/newsRouter');
const cmsRouter = require('./Modules/Routers/cmsRouter');
const managerIncidentRouter = require('./Modules/Routers/managerIncidentRouter');
const RatingRouter = require('./Modules/Routers/ratingRouter');
const NotifyRouter = require('./Modules/Routers/notifyRouter');
const BillRouter = require('./Modules/Routers/billRouter');
const managerStatistic = require('./Modules/Routers/managerStatistic');
const homeRouter = require('./Modules/Routers/homeRouter');

const app = express();
const i18n = require("i18n");
i18n.configure({
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    directory: __dirname+'/Utils/Locales',
    objectNotation: true
  });

app.use(i18n.init);
app.use(function (req, res, next) {
  i18n.setLocale(req);
  next();
});
// use session
app.use(session({ 
  secret: '3sHomeApp',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 100 * 60 * 1000 }
}));

// view engine setup
app.engine('.hbs', exphbs({
    defaultLayout:'layout',
    extname:'.hbs',
    layoutsDir:'views/layouts/',
    partialsDir: [
      'views/partials'
    ]
}));
app.set('view engine', 'hbs');

// Use Node.js body parsing middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
  req.setTimeout(10 * 60 * 1000);
  req.io = server;
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

const path = require('path');
global.appRoot = path.resolve(__dirname);

app.use('/public',express.static(__dirname+'/public'));
app.use('/avatar',express.static(__dirname+'/storage/avatar'));
app.use('/incidents',express.static(__dirname+'/storage/incidents'));
app.use('/news-img',express.static(__dirname+'/storage/news'));
app.use('/user', userRouter);
app.use('/role', roleRouter);
app.use('/fixer', fixerGroupRouter);
app.use('/building', buildingRouter);
app.use('/apartment', houseRouter);
app.use('/apartmentHistory', apartmentHistoryRouter);
app.use('/room', roomRouter);
app.use('/contract', contractRouter);
app.use('/stayRecord', stayRecordRouter);
app.use('/note', noteRouter);
app.use('/vehicle', vehicleRouter);
app.use('/configuration', configurationRouter);
app.use('/apartment', apartmentRouter);
app.use('/resident', incidentTypeRouter);
app.use('/price', priceRouter);
app.use('/news', newsRouter);
app.use('/cms', cmsRouter);
app.use('/manager', managerIncidentRouter);
app.use('/rating', RatingRouter);
app.use('/notify', NotifyRouter);
app.use('/bill', BillRouter);
app.use('/manager', managerStatistic);
app.use('/home', homeRouter);


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  return res.render('error',{layout:false})
})
const server = app.listen(port,'localhost', () => {
    require('./Modules/Middlewares/printRoutes')(app);
    require('./Modules/Middlewares/errorHandler')(app);
    let host = server.address().address;
    let port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
});
