'use strict';
module.exports = (sequelize, DataTypes) => {
  const DeviceToken = sequelize.define('DeviceToken', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PlayerId: DataTypes.STRING,
    UserId: {
    	type: DataTypes.INTEGER,
    	primaryKey: false,
        references: {
          	model: 'User',
          	key: 'Id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
  }, {});
  DeviceToken.associate = function(models) {
    // associations can be defined here
    DeviceToken.belongsTo(models.User, {as: 'User',  foreignKey: 'UserId'});
  };
  return DeviceToken;
};