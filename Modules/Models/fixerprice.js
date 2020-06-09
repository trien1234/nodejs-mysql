'use strict';
const INCIDENT_STATUS = require("../../Config/constant.js");

module.exports = (sequelize, DataTypes) => {
  const FixerPrice = sequelize.define('FixerPrice', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    IncidentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Price: DataTypes.STRING,
    FixDate: DataTypes.DATE,
    AcceptedBy: DataTypes.INTEGER,
    AcceptedDate: DataTypes.DATE,
    Status: { type: DataTypes.INTEGER, defaultValue: INCIDENT_STATUS.FixerPriceStatus.PENDING},
    CreatedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    UpdatedDate: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Fixer_Price',
    charset: 'utf8',
    dialectOptions: {
    collate: 'utf8_general_ci'
  }
  });
  FixerPrice.associate = function(models) {
    // associations can be defined here
    FixerPrice.belongsTo(models.User, {as: 'User',  foreignKey: 'UserId'});
    FixerPrice.belongsTo(models.Incident, {as: 'Incident',  foreignKey: 'IncidentId'});
  };
  return FixerPrice;
};