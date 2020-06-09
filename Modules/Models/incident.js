'use strict';
module.exports = (sequelize, DataTypes) => {
  const Incident = sequelize.define('Incident', {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    Code:{
        type: DataTypes.STRING
    },
    IncidentTypeId:{
        type: DataTypes.INTEGER
    },
    HouseId:{
        type: DataTypes.INTEGER
    },
    BuildingId:{
        type: DataTypes.INTEGER
    },
    Status:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    IncidentArea:{
        type: DataTypes.INTEGER
    },
    NeedFixerPrice:{
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    FixerPriceId:{
        type: DataTypes.INTEGER
    },
    Description:{
        type: DataTypes.TEXT
    },
    ContactName : {
        type: DataTypes.STRING
    },
    ContactNumber: {
        type: DataTypes.STRING
    },
    Images:{
        type: DataTypes.TEXT
    },
    FixDate: {
        type: DataTypes.DATE,
    },
    CreatedBy: {
        type: DataTypes.INTEGER
    },
    FixedBy: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdatedBy: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    IsDeleted: {
        type : DataTypes.BOOLEAN,
        defaultValue: 0
    },
    SumTimeFix: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    }
  }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Incident',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
    }
  });
  Incident.associate = function(models) {
    // associations can be defined here
    Incident.belongsTo(models.IncidentType, {as: 'Type',  foreignKey: 'IncidentTypeId'});
    Incident.belongsTo(models.House, {as: 'House',  foreignKey: 'HouseId'});
    Incident.belongsTo(models.Building, {as: 'Building',  foreignKey: 'BuildingId'});
    Incident.belongsTo(models.User, {as: 'User',  foreignKey: 'CreatedBy'});
    Incident.hasMany(models.FixerPrice, {as: 'FixerPrice',  foreignKey: 'IncidentId'});
    Incident.hasMany(models.IncidentNote, {as: 'IncidentNote',  foreignKey: 'IncidentId'});
    Incident.hasMany(models.IncidentStatus, {as: 'IncidentStatus',  foreignKey: 'IncidentId'});
    Incident.hasMany(models.UserFeedBacks, {as: 'UserFeedBacks',  foreignKey: 'IncidentId'});
  };
  return Incident;
};