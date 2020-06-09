'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApartmentStatusHistory = sequelize.define('ApartmentStatusHistory', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    HouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'House',
        key: 'Id'
      },
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      references: {
        model: 'ApartmentStatus',
        key: 'Id'
      },
    },
    CreatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'ApartmentStatusHistory',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  ApartmentStatusHistory.associate = function (models) {
    ApartmentStatusHistory.belongsTo(models.House, { foreignKey: 'HouseId', targetKey: 'Id', as: 'House' });
    ApartmentStatusHistory.belongsTo(models.ApartmentStatus, { foreignKey: 'StatusId', targetKey: 'Id', as: 'ApartmentStatus' });
  };
  return ApartmentStatusHistory;
};