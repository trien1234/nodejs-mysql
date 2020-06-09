'use strict';
module.exports = (sequelize, DataTypes) => {
  const VehicleNote = sequelize.define('VehicleNote', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    VehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicle',
          key: 'Id'
        },
    },
    Content:{
        type: DataTypes.STRING
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'Id'
        },
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
    tableName: 'VehicleNote',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  VehicleNote.associate = function(models) {
    // associations can be defined here
    VehicleNote.belongsTo(models.Vehicle, {
        as: 'Vehicle',
        foreignKey: 'VehicleId'
      });
    VehicleNote.belongsTo(models.User, {
        as: 'Creator',
        foreignKey: 'CreatedBy'
      });
  };
  return VehicleNote;
};