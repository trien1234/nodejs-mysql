'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define('Setting', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Address: DataTypes.STRING,
    Logo: DataTypes.STRING,
    Slogan: DataTypes.STRING,
    BankName: DataTypes.STRING,
    BankAccount: DataTypes.STRING,
    BankNum: DataTypes.STRING,
    Website: DataTypes.STRING,
    FanPage: DataTypes.JSON,
    OpenTime: DataTypes.STRING,
    CloseTime: DataTypes.STRING,
    IncidentReceiveTime: DataTypes.INTEGER,
    IncidentFixingTime: DataTypes.INTEGER,
    ExpriedContractTime: DataTypes.INTEGER,
    IncidentFixingScheduleTime: DataTypes.INTEGER,
    CreatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    UpdatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'Setting',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  Setting.associate = function(models) {
    // associations can be defined here
  };
  return Setting;
};