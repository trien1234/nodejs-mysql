'use strict';
module.exports = (sequelize, DataTypes) => {
  const AppRating = sequelize.define('AppRating', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Point: DataTypes.INTEGER,
    LikeFunction: DataTypes.STRING,
    Feedback: DataTypes.STRING,
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
    tableName: 'AppRating',
    charset: 'utf8',
    dialectOptions: {
    collate: 'utf8_general_ci'
    }
  });
  AppRating.associate = function(models) {
    // associations can be defined here
  };
  return AppRating;
};