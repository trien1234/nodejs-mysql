'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    OwnerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HouseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'House',
        key: 'Id'
      },
    },
    CheckinDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    CheckoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Plate: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Type: {
      type: DataTypes.INTEGER,
    },
    Basement: {
      type: DataTypes.STRING,
    },
    Card: {
      type: DataTypes.BOOLEAN,
    },
    Active: {
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
    tableName: 'Vehicle',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  Vehicle.associate = function(models) {
    // associations can be defined here
    Vehicle.belongsTo(models.House, {
      foreignKey: 'HouseId',
      targetKey: 'Id'
    });
    Vehicle.hasMany(models.VehicleNote, {
      as: 'VehicleNote',
      foreignKey: 'VehicleId'
    });
  };
  return Vehicle;
};