'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillExpriedCalendar = sequelize.define('BillExpriedCalendar', {
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
    CreatedBy: {
      type: DataTypes.INTEGER,
      primaryKey:false,
      references: {
        model: "User",
        key: "Id"
      }
    },
    Reason: DataTypes.TEXT,
    PayDay: DataTypes.DATE,
    ExpriedMoney: DataTypes.FLOAT,
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
      tableName: 'BillExpriedCalendar',
      charset: 'utf8',
      dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  BillExpriedCalendar.associate = function(models) {
    // associations can be defined here
    BillExpriedCalendar.belongsTo(models.Billing, {as: 'Billing',  foreignKey: 'BillId'});
  };
  return BillExpriedCalendar;
};