'use strict';
module.exports = (sequelize, DataTypes) => {
  const WaterPriceType = sequelize.define('WaterPriceType', {
  	Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    Name: DataTypes.TEXT,
    Price: DataTypes.INTEGER,
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
    tableName: 'WaterPriceTypes',
    charset: 'utf8',
    dialectOptions: {
    collate: 'utf8_general_ci'
    }
  });
  WaterPriceType.associate = function(models) {
    // associations can be defined here
  };
  return WaterPriceType;
};