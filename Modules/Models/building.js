'use strict';
module.exports = (sequelize, DataTypes) => {
  const Building = sequelize.define('Building', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name:{
        type: DataTypes.STRING
    },
    Code:{
        type: DataTypes.STRING
    },
    Address:{
        type: DataTypes.STRING
    },
    Status:{
        type: DataTypes.STRING
    },
    Note:{
        type: DataTypes.STRING
    },
    ManagerId:{
        type: DataTypes.INTEGER
    },
    BillDateRange:{
        type: DataTypes.INTEGER
    },
    ElectricBill:{
        type: DataTypes.FLOAT
    },
    WaterType:{
        type: DataTypes.STRING
    },
    WaterPrice:{
        type: DataTypes.FLOAT
    },
    CarParkPrice:{
        type: DataTypes.FLOAT
    },
    MotobikeParkPrice:{
        type: DataTypes.FLOAT
    },
    BikeParkPrice:{
        type: DataTypes.FLOAT
    },
    ServicePrice:{
        type: DataTypes.FLOAT
    },
    CreatedBy: {
        type: DataTypes.INTEGER
    },
    CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdatedBy: {
        type: DataTypes.INTEGER
    },
    UpdatedDate: {
        type: DataTypes.DATE
    },
    IsDeleted: {
        type : DataTypes.BOOLEAN,
        defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Building',
    charset: 'utf8',
    dialectOptions: {
          collate: 'utf8_general_ci'
    }
  });
  Building.associate = function(models) {
    // associations can be defined here
    Building.hasMany(models.House, {as: 'House',  foreignKey: 'BuildingId'});
    Building.belongsTo(models.User, {as: 'Manager',  foreignKey: 'ManagerId'});
  };
  return Building;
};
