'use strict';
module.exports = (sequelize, DataTypes) => {
  const House = sequelize.define('House', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    BuildingId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ManagerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Name:{
        type: DataTypes.STRING
    },
    Note:{
        type: DataTypes.STRING
    },
    Code:{
        type: DataTypes.STRING
    },
    Block:{
        type: DataTypes.STRING
    },
    Floor:{
        type: DataTypes.STRING
    },
    Furniture:{
        type: DataTypes.STRING
    },
    RentalFee:{
        type: DataTypes.FLOAT
    },
    Status:{
        type: DataTypes.STRING
    },
    ReadyDate: {
        type: DataTypes.DATEONLY,
    },
    BillDateRange:{
        type: DataTypes.INTEGER
    },
    CheckinDate: {
        type: DataTypes.DATEONLY,
    },
    CheckoutDate: {
        type: DataTypes.DATEONLY,
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
    tableName: 'House',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  House.associate = function(models) {
    // associations can be defined here
    House.belongsTo(models.Building, {
        as: 'Building',
        foreignKey: 'BuildingId'
      });
    House.belongsTo(models.User, {
        as: 'User',
        foreignKey: 'ManagerId'
      });
    House.hasMany(models.HouseNote, {as: 'HouseNote',  foreignKey: 'HouseId'});
    House.hasMany(models.StayRecord, {as: 'StayRecord',  foreignKey: 'HouseId'});
    House.hasMany(models.Vehicle, {as: 'Vehicle',  foreignKey: 'HouseId'});
    House.hasMany(models.Incident, {as: 'Incident',  foreignKey: 'HouseId'});
    House.hasMany(models.Contract, {as: 'Contract',  foreignKey: 'HouseId'});
    House.hasMany(models.ApartmentStatusHistory, {
        as: 'ApartmentStatusHistory',
        foreignKey: 'HouseId'
    });
    House.belongsTo(models.ApartmentStatus, {
        as: 'ApartmentStatus',
        foreignKey: 'Status'
    });
  };
  return House;
};