'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServiceRating = sequelize.define('ServiceRating', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    LifeTimeRating: DataTypes.INTEGER,
    Fortune: DataTypes.INTEGER,
    Parking: DataTypes.INTEGER,
    Invironment: DataTypes.INTEGER,
    Feedback: DataTypes.STRING,
    GoodPoint: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: "User",
        key: "Id"
      }
    },
    CreatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    UpdatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'ServiceRating',
    charset: 'utf8',
    dialectOptions: {
    collate: 'utf8_general_ci'
    }
  });
  ServiceRating.associate = function(models) {
    // associations can be defined here
  };
  return ServiceRating;
};