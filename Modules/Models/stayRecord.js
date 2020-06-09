'use strict';
module.exports = (sequelize, DataTypes) => {
  const StayRecord = sequelize.define('StayRecord', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      },
    },
    HouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'House',
        key: 'Id'
      },
    },
    Active: {
      type: DataTypes.BOOLEAN,
    },
    ActualCheckinDate: {
      type: DataTypes.DATEONLY,
    },
    ActualCheckoutDate: {
      type: DataTypes.DATEONLY,
    },
    StayRegistration: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'StayRecord',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  StayRecord.associate = function(models) {
    // associations can be defined here
    StayRecord.belongsTo(models.User, {
      foreignKey: 'TenantId',
      targetKey: 'Id'
    });
    StayRecord.belongsTo(models.House, {
      foreignKey: 'HouseId',
      targetKey: 'Id'
    });
  };
  return StayRecord;
};