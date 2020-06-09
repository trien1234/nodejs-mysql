const express = require('express');
const router = express.Router();
const {checkAdmin, checkManager, checkAccounting} = require('../../Config/index.js');
const UserController = require('../Controllers/userController');
const AuthController = require('../Controllers/CMS/Action/authController');
const PagesController = require('../Controllers/CMS/Pages/pagesController');
const BuildingController = require('../Controllers/CMS/Action/cmsBuildingController')
const CmsUserController = require('../Controllers/CMS/Action/cmsUserController')
const HouseController = require('../Controllers/CMS/Action/cmsHouseController')
const NewsController = require('../Controllers/CMS/Action/cmsNewsController')
const IncidentController = require('../Controllers/CMS/Action/cmsIncidentController')
const ContractController = require('../Controllers/CMS/Action/cmsContractController')
const RoleController = require('../Controllers/CMS/Action/cmsRoleController')
const NotificationController = require('../Controllers/CMS/Action/cmsNotificationController')
const BillingController = require('../Controllers/CMS/Action/cmsBillingController')
const CmsDashboardController = require('../Controllers/CMS/Action/cmsDashboardController')
const SettingController = require('../Controllers/CMS/Action/cmsSettingController')
// const authMiddleware = require('../Middlewares/authMiddleware');

let authController = new AuthController();
let pagesController = new PagesController();
let buildingController = new BuildingController();
let cmsUserController = new CmsUserController();
let houseController = new HouseController();
let newsController = new NewsController();
let incidentController = new IncidentController();
let contractController = new ContractController();
let roleController = new RoleController();
let billingController = new BillingController();
let notificationController = new NotificationController();
let cmsDashboardController = new CmsDashboardController();
let settingController = new SettingController();

router.post('/login', function(req,res){
    authController.adminLogin(req,res);
});
router.get('/logout', function(req,res){
    authController.logOut(req,res);
});
router.get('/login', function(req,res){
    pagesController.adminLogin(req,res);
});
//dashboard
router.get('/dashboard', checkAdmin, function(req,res){
    pagesController.dashboard(req,res);
});
router.get('/incidentDashboard', checkAdmin, function(req,res){
    pagesController.incidentDashboard(req,res);
});
router.get('/billDashboard', checkAdmin, function(req,res){
    pagesController.billDashboard(req,res);
});

router.get('/houseDashboard', checkAdmin, function(req,res){
    pagesController.houseDashboard(req,res);
});

router.get('/countIncidentByType', checkAdmin, function(req,res){
    cmsDashboardController.countIncidentByType(req,res);
});
router.get('/countIncidentByStatus', checkAdmin, function(req,res){
    cmsDashboardController.countIncidentByStatus(req,res);
});

router.get('/countIncidentByTimeAvg', checkAdmin, function(req,res){
    cmsDashboardController.countIncidentByTimeAvg(req,res);
});

router.get('/getCountIncidentByYear', checkAdmin, function(req,res){
    cmsDashboardController.getCountIncidentByYear(req,res);
});

router.get('/countIncidentByMonth', checkAdmin, function(req,res){
    cmsDashboardController.countIncidentByMonth(req,res);
});

router.get('/countBillByStatus', checkAdmin, function(req,res){
    cmsDashboardController.countBillByStatus(req,res);
});

router.get('/getCountBillByYear', checkAdmin, function(req,res){
    cmsDashboardController.getCountBillByYear(req,res);
});

router.get('/countBillByMonth', checkAdmin, function(req,res){
    cmsDashboardController.countBillByMonth(req,res);
});

router.get('/getListBuilding', checkAdmin, function(req,res){
    cmsDashboardController.getListBuilding(req,res);
});

router.get('/getListFloor', checkAdmin, function(req,res){
    cmsDashboardController.getListFloor(req,res);
});

router.get('/countHouseByStatus', checkAdmin, function(req,res){
    cmsDashboardController.countHouseByStatus(req,res);
});


//end dashboard
router.get('/', checkAdmin, function(req,res){
    pagesController.index(req,res);
});
/**
    All Route for manager & accounting
**/
router.get('/managerDashboard', checkManager, function(req,res){
    pagesController.managerDashboard(req,res);
});
router.get('/managerBuilding', checkManager, function(req,res){
    pagesController.managerBuilding(req,res);
});
router.get('/listManagerBuilding', checkManager, function(req,res){
    buildingController.managerBuilding(req,res);
});
router.get('/managerHouse', checkManager, function(req,res){
    pagesController.managerHouse(req,res);
});
router.get('/listManagerHouse', checkManager, function(req,res){
    houseController.managerHouse(req,res);
});
// router.get('/accountingHouse', checkAccounting, function(req,res){
//     pagesController.accountingHouse(req,res);
// });
router.get('/listAccountingHouse', checkAccounting, function(req,res){
    houseController.accountingHouse(req,res);
});
router.get('/accountingCreateBilling/:id', function(req,res){
    pagesController.accountingCreateBilling(req,res);
});
router.get('/viewBillAsDraft/:id', function(req,res){
    pagesController.viewBillAsDraft(req,res);
});
router.post('/saveBillAsDraft',checkAccounting, function(req,res){
    billingController.saveBillAsDraft(req,res);
});
router.post('/saveBill',checkAccounting, function(req,res){
    billingController.saveBill(req,res);
});
router.post('/checkBeforeSave',checkAccounting, function(req,res){
    billingController.checkBeforeSave(req,res);
});
/**
    End
**/
/**
    Add all for Resident, Manager and Fixer
**/
router.get('/addUser',checkAdmin,function(req,res){
    pagesController.addUser(req,res);
})
router.post('/addUser', checkAdmin, function(req,res){
    cmsUserController.addUser(req,res);
})
router.post('/editUsers', checkAdmin, function(req,res){
    cmsUserController.editUsers(req,res);
})
/**
    End
**/

router.get('/getListUser',checkAdmin, function(req,res){
    cmsUserController.listUser(req,res);
});
router.get('/listUser',checkAdmin, function(req,res){
    pagesController.listUser(req,res);
});

router.post('/deleteUserPost/:id',checkAdmin, function(req,res){
    
    pagesController.deleteUserPost(req,res);
});

router.get('/listFixer',checkAdmin,function(req,res){
    pagesController.listFixer(req,res)
})
router.get('/listManager',checkAdmin,function(req,res){
    pagesController.listManager(req,res)
})



//end-user

//start - building
router.get('/createBuilding',checkAdmin, function(req,res){
    pagesController.addBuildingGet(req,res);
}); 

router.get('/createBuildingGet',checkAdmin, function(req,res){  //file js call
    buildingController.addBuildingGet(req,res);
}); 

router.post('/createBuildingPost',checkAdmin, function(req,res){  //file js call
    buildingController.addBuildingPost(req,res);
});

router.get('/buildingListGet',checkAdmin,function(req,res){
    buildingController.buildingListGet(req,res);
})

router.get('/listBuildingGet',checkAdmin,function(req,res){
    pagesController.listBuildingGet(req,res);
})

router.post('/deleteBuildingPost/:id',checkAdmin, function(req,res){
    
    buildingController.deleteBuildingPost(req,res);
});

router.post('/editBuilding',checkAdmin,function(req,res){
    buildingController.editBuilding(req,res);
})

//end building

//start house
router.get('/createHouse',checkAdmin,function(req,res){
    pagesController.createHouse(req,res)
})

router.get('/createHouseGetManager/:idBuilding',checkAdmin,function(req,res){
    houseController.createHouseGetManager(req,res)
})

router.get('/createHouseGet',checkAdmin,function(req,res){
    houseController.createHouseGet(req,res)
})
router.post('/createHousePost',checkAdmin,function(req,res){
    houseController.createHousePost(req,res)
})
router.get('/houseList',checkAdmin,function(req,res){
    houseController.houseList(req,res)
})
router.get('/listHouse',checkAdmin,function(req,res){
    pagesController.listHouse(req,res)
})

router.post('/deleteHouse',checkAdmin,function(req,res,next){
    houseController.deleteHouse(req,res)
})

router.post('/updateHouse',checkAdmin,function(req,res,next){
    houseController.updateHouse(req,res)
})
router.get('/modalGetStatus',checkAdmin,function(req,res,next){
    houseController.modalGetStatus(req,res)
})

router.post('/updateStatusApartmentstatusHis',checkAdmin,function(req,res,next){
    houseController.updateStatusApartmentstatusHis(req,res)
})


//end house

//start contract
router.get('/createContract',checkAdmin,function(req,res){
    pagesController.createContract(req,res)
})

router.get('/contractCreate',checkAdmin,function(req,res){
    contractController.contractCreate(req,res)
})
router.get('/getAttribute/:id',checkAdmin,function(req,res){
    contractController.getAttribute(req,res)
})
router.get('/contractList',checkAdmin,function(req,res){
    contractController.contractList(req,res)
})
router.get('/listContract',checkAdmin,function(req,res){
    pagesController.listContract(req,res)
})

router.post('/createContract',checkAdmin,function(req,res){
    contractController.createContract(req,res)
})
router.post('/deleteContract',checkAdmin,function(req,res){
    contractController.deleteContract(req,res)
})
router.post('/editContract',checkAdmin,function(req,res){
    contractController.editContract(req,res)
})

router.get('/detailContract',checkAdmin,function(req,res){
    pagesController.detailContract(req,res)
})

//end contract

//news
router.post('/createNews',checkAdmin,function(req,res){
    newsController.createNews(req,res)
})
router.get('/createNews',checkAdmin,function(req,res){
    pagesController.createNews(req,res)
})
router.get('/listNews',checkAdmin,function(req,res){
    pagesController.listNews(req,res)
})

router.get('/newsList',checkAdmin,function(req,res){
    newsController.newsList(req,res)
})

router.post('/deleteNews',checkAdmin,function(req,res){
    newsController.deleteNews(req,res)
})

router.post('/editNews/:id',checkAdmin,function(req,res){
    newsController.editNews(req,res)
})
router.get('/updateNews',checkAdmin,function(req,res){
    pagesController.updateNews(req,res)
})
//end news

//incident

router.get('/listIncident',checkAdmin,function(req,res){
    pagesController.listIncident(req,res)
})

router.get('/incidentList',checkAdmin,function(req,res){
    incidentController.incidentList(req,res)
})
router.post('/deleteIncident',checkAdmin,function(req,res){
    incidentController.deleteIncident(req,res)
})
router.get('/getBuiLding_House_Incident',checkAdmin,function(req,res){
    incidentController.getBuiLding_House_Incident(req,res)
})
router.get('/getHousebyBuildingId',checkAdmin,function(req,res){
    incidentController.getHousebyBuildingId(req,res)
})

//end incident

//role

router.get('/createRole',checkAdmin,function(req,res){
    pagesController.createRole(req,res)
})
router.post('/createRole',checkAdmin,function(req,res){
    roleController.createRole(req,res)
})
router.get('/listRole',checkAdmin,function(req,res){
    pagesController.listRole(req,res)
})
router.get('/roleList',checkAdmin,function(req,res){
    roleController.roleList(req,res)
})

//end role

//notification
router.get('/listNotification',checkAdmin,function(req,res){
    pagesController.listNotification(req,res)
})

router.get('/notificationList',checkAdmin,function(req,res){
    notificationController.notificationList(req,res)
})

router.post('/deleteNotification',checkAdmin,function(req,res){
    notificationController.deleteNotification(req,res)
})

//end

/**
    Setting
**/
router.get('/setting',function(req,res){
    pagesController.setting(req,res)
})
router.post('/updateSetting',function(req,res){
    settingController.updateSetting(req,res)
})
/**
    End Setting
**/

router.use(function (req, res, next) {
    if (!req.route) return res.render('404', {layout:false})
    next()
});
module.exports = router;