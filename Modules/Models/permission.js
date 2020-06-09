'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Resource: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'Permission',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  Permission.associate = function(models) {
    // associations can be defined here
    Permission.belongsToMany(models.Role, { as: 'Role', through: models.RolePermission, foreignKey: 'PermissionId'});
  };
  return Permission;
};
