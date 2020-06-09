'use strict';
module.exports = (sequelize, DataTypes) => {
  const BillPaymentNote = sequelize.define('BillPaymentNote', {
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
    Content: DataTypes.TEXT,
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
      tableName: 'BillPaymentNote',
      charset: 'utf8',
      dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  BillPaymentNote.associate = function(models) {
    // associations can be defined here
    BillPaymentNote.belongsTo(models.User, {as: 'User', foreignKey: 'CreatedBy'})
  };
  return BillPaymentNote;
};