'use strict';
module.exports = (sequelize, DataTypes) => {
  const Billing = sequelize.define('Billing', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    BuildingId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'Building',
            key: 'Id'
        }
    },
    HouseId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'House',
            key: 'Id'
        }
    },
    ResidentId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
            model: 'User',
            key: 'Id'
        }
    },
    HouseFee: DataTypes.INTEGER,
    Code: DataTypes.STRING,
    FromDate: DataTypes.DATEONLY,
    ToDate: DataTypes.DATEONLY,
    ElFirstNum: DataTypes.INTEGER,
    ElLastNum: DataTypes.INTEGER,
    SerCompo: DataTypes.INTEGER,
    RoomBlance: DataTypes.INTEGER,
    WarFirstNum: DataTypes.INTEGER,
    WarLastNum: DataTypes.INTEGER,
    WarPrice: DataTypes.INTEGER,
    ElPrice: DataTypes.INTEGER,
    ParkingPrice: DataTypes.INTEGER,
    OtherFee: DataTypes.INTEGER,
    SalePrice: DataTypes.INTEGER,
    InDebtMoney: DataTypes.INTEGER,
    DateRange: DataTypes.INTEGER,
    ManagerReceiveMoneyDate: DataTypes.DATE,
    AccoutingReceiveMoneyDate: DataTypes.DATE,
    Note: DataTypes.TEXT,
    RedunMoney: DataTypes.INTEGER,
    TotalFee: DataTypes.INTEGER,
    ResiMoney: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    IsDraft: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    Type: {
        type: DataTypes.INTEGER
    },
    DepositMoney: {
        type: DataTypes.INTEGER
    },
    CreatedBy: DataTypes.INTEGER,
    Status: DataTypes.INTEGER,
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdatedDate:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
        freezeTableName: true,
        tableName: 'Billings',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
    }
  });
  Billing.associate = function(models) {
    // associations can be defined here
    Billing.belongsTo(models.User, {as: 'Resident',  foreignKey: 'ResidentId'});
    Billing.belongsTo(models.House, {as: 'House',  foreignKey: 'HouseId'});
    Billing.belongsTo(models.Building, {as: 'Building',  foreignKey: 'BuildingId'});
    Billing.hasMany(models.BillPaymentMethod, {as: 'PaymentMethod', foreignKey: 'BillId'});
    Billing.hasMany(models.BillPaymentStatus, {as: 'LifeStatus', foreignKey: 'BillId'});
    Billing.hasMany(models.BillPaymentNote, {as: 'BillNote', foreignKey: 'BillId'});
    Billing.hasMany(models.BillExpriedCalendar, {as: 'BillExpriedCalendar', foreignKey: 'BillId'});
  };
  return Billing;
};