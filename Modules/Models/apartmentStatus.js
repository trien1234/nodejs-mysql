'use strict';
module.exports = (sequelize, DataTypes) => {
  const ApartmentStatus = sequelize.define('ApartmentStatus', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Code: {
      type: DataTypes.STRING
    },
    Description: {
      type: DataTypes.STRING
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
    tableName: 'ApartmentStatus',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  ApartmentStatus.associate = function(models) {
    ApartmentStatus.belongsToMany(models.House, {
      as: 'House',
      through: models.ApartmentStatusHistory,
      foreignKey: 'StatusId'
    });
  };
  return ApartmentStatus;
};