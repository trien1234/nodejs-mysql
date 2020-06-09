'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillPaymentStatus = sequelize.define('BillPaymentStatus', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    BillId: {
      type: DataTypes.INTEGER,
      primaryKey:false,
      references: {
        model: "Billing",
        key: "Id"
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey:false,
      references: {
        model: "User",
        key: "Id"
      }
    },
    Name: DataTypes.STRING,
    UpdatedBy: DataTypes.INTEGER,
    CreatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    UpdatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    IsDeleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false,
      freezeTableName: true,
      tableName: 'BillPaymentStatus',
      charset: 'utf8',
      dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  BillPaymentStatus.associate = function(models) {
    // associations can be defined here
  };
  return BillPaymentStatus;
};