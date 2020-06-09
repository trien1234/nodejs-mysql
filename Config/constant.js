module.exports = {
    Evaluate: {
        Login: 1,
        Service: 2,
        Employee: 3,
        App: 4
    },
    RoleType:{
        CMS : 1,
        CMSAndManager: 2,
        Fixer: 3,
        Resident: 4
    },
    UserStatus: {
        Active: "AC",
        Inactive: "IN",
        Exprired: "EX"
    },
    IncidentStatus: {
        SENT: 1, //Đã gửi ở app Cư dân Hoặc Mới ở app QL
        MANAGERRECEIVED: 2, //Đã được manager nhận 
        PRICING: 3, // Đang báo giá 
        TROUBLESHOOTING: 4, //Đang sửa chữa
        FINISH: 5 //Hoàn thành
    },
    FixerIncidentStatus: {
        NEW: 1,
        PRICING: 2,
        PRICEDACCEPT: 3, //Đã được chấp nhận báo giá
        TROUBLESHOOTING: 4, //Đang sửa chữa
        FINISH: 5 //Hoàn thành
    },
    IncidentArea: {
        INSIDE: 1, // trong nhà
        OUTSIDE: 2 //ngoài trời
    },
    NeedFixer: {
        YES: 1, 
        NO: 0
    },
    FixerPriceStatus: {
        PENDING: 0, //Chờ duyệt
        RECEIVED: 1, // Đã chấp nhận
        CANCEL: 2, //Đã hủy
    },
    Rating: {
        INCIDENT_REPORT: 1, //Báo cáo sự cố 
        BILL: 2, //Nhận hoá đơn
        CONTRACT: 3, //Hợp đồng 
        NOTIFICATION: 4 // Thông báo 
    },
    NOTIFY_TYPE: {
        ADMIN_SEND_TO_ALL: 'SENT_TO_ALL',
        INCIDENT: 'INCIDENT',
        NEED_CONFIRM: 'NEED_CONFIRM',
        BILLING: 'BILLING',
    },
    READ_STATUS: {
        NOT_READ: 0,
        READ: 1
    },
    TIME: {
        ADDED: 7.2e+6 // 2giờ
    },
    BILLDATE_RANGE: {
        FIRST: 1, // ngay mung 1 dau thang
        SECOND: 2 // ngay mung 5 dau thang
    },
    WATERPRICE_TYPE: {
        M3: 1,  //nước theo số điện
        PERSON: 2 // nước theo đầu người
    },
    BILL_EXPRIRE: 5,
    BILL_TYPE : {
        NEW: 1,
        MONTHY: 2,
        END: 3
    },
    BILL_STATUS: {
        NEW: 1, //mới
        EXPRIED: 2, //quá hạn 
        PAID: 3, // đã nộp
        PAID_INDEPT: 4, // đã nộp/còn thiếu
        PAID_REDUN: 5, // đã nộp/còn thừa
        REVOKE: 6, //bỏ cọc
        DONE: 7//hoàn thành
    },
    VIHICLE_TYPE: {
        CAR: 1,
        MOTOR: 2,
        BIKE: 3
    },
    HOUSE_STATUS:{
        NOT_READY: 1, //chưa sẵng sàng
        READY: 2, //sẵn sàng
        DEPOSITED: 3, //đã cọc
        STAYING: 4, // đang ở 
        NEARLY_EXPRIED: 5, // gần hết hạn 
        EXTEND: 6, // gia hạn 
        PAY_OFF: 7 // thanh lý
    },
    INCIDENT_TYPE:{
        DIEN: 1,
        NUOC: 2,
        DL: 3,
        INTERNET: 4,
        MT: 5,
        TTB: 6,
        HM: 7,
        KHAC: 8
    },
    PAYMENT_METHOD: {
        CASHIER: 1,
        CARD: 2
    },
    SEARCHING_TYPE: {
        HOUSE: 1,
        BILL: 2,
        INCIDENT: 3,
        RESIDENT: 4
    }    
}