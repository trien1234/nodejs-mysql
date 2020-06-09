'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const FixerGroup = sequelize.define('FixerGroup', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name:{
        type: DataTypes.STRING
    },
    Description: {
        type: DataTypes.STRING
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
    tableName: 'FixerGroup',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  FixerGroup.associate = function(models) {
    // associations can be defined here
    FixerGroup.hasMany(models.User, {as: 'User', foreignKey: 'FixerGroupId'});
  };
  return FixerGroup;
};
