'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillPaymentMethod = sequelize.define('BillPaymentMethod', {
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
    Method: DataTypes.INTEGER,
    Money: DataTypes.FLOAT,
    CreatedDate: {
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
      tableName: 'BillPaymentMethod',
      charset: 'utf8',
      dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  BillPaymentMethod.associate = function(models) {
    // associations can be defined here
  };
  return BillPaymentMethod;
};