'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    RepresentativeName: {
      type: DataTypes.STRING,
    },
    RepresentativeTel: {
      type: DataTypes.STRING,
    },
    HouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'House',
        key: 'Id'
      },
    },
    CheckinDate: {
      type: DataTypes.DATEONLY,
    },
    CheckoutDate: {
      type: DataTypes.DATEONLY,
    },
    RentalFee: {
      type: DataTypes.FLOAT,
    },
    DepositMoney: {
      type: DataTypes.INTEGER
    },
    BillDateRange: {
      type: DataTypes.INTEGER
    },
    ElectricBill: {
      type: DataTypes.FLOAT
    },
    WaterPrice: {
      type: DataTypes.FLOAT
    },
    CarParkPrice: {
      type: DataTypes.FLOAT
    },
    MotobikeParkPrice: {
      type: DataTypes.FLOAT
    },
    BikeParkPrice: {
      type: DataTypes.FLOAT
    },
    ServicePrice: {
      type: DataTypes.FLOAT
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
    },
    DepositMoney: {
      type: DataTypes.INTEGER
    },
    WaterPriceType: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
          model: 'WaterPriceTypes',
          key: 'Id'
      },
    },
    FirstWarNum: {
      type: DataTypes.INTEGER
    },
    FirstElNum: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'Contract',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  });
  Contract.associate = function(models) {
    // associations can be defined here
    Contract.belongsTo(models.House, {
      foreignKey: 'HouseId',
      targetKey: 'Id'
    });
  };
  return Contract;
};