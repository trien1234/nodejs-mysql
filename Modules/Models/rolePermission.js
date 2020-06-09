'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define('RolePermission', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    RoleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'Role',
            key: 'Id'
        },
    },
    PermissionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
            model: 'Permission',
            key: 'Id'
        },
    },
    IsActive: {
        type : DataTypes.BOOLEAN,
        defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Role_Permission',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  RolePermission.associate = function(models) {
    // associations can be defined here
    RolePermission.belongsTo(models.Role, { foreignKey: 'RoleId', targetKey: 'Id', as: 'Role' });
    RolePermission.belongsTo(models.Permission, { foreignKey: 'PermissionId', targetKey: 'Id', as: 'Permission' });
  };
  return RolePermission;
};
