'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Type:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'Role',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.belongsToMany(models.Permission, { as: 'Permission', through: models.RolePermission, foreignKey: 'RoleId'});
    Role.hasMany(models.User, {as: 'User',  foreignKey: 'RoleId'});
  };
  return Role;
};
