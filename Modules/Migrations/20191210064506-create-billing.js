'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Billings', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BuildingId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
            model: 'Building',
            key: 'Id'
        }
      },
      HouseId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
            model: 'House',
            key: 'Id'
        }
      },
      HouseFee: {
        type: Sequelize.INTEGER
      },
      FromDate: {
        type: Sequelize.DATEONLY
      },
      ToDate: {
        type: Sequelize.DATEONLY
      },
      ElFirstNum: {
        type: Sequelize.INTEGER
      },
      ElLastNum: {
        type: Sequelize.INTEGER
      },
      SerCompo: {
        type: Sequelize.INTEGER
      },
      RoomBlance: {
        type: Sequelize.INTEGER
      },
      WarFirstNum: {
        type: Sequelize.INTEGER
      },
      WarLastNum: {
        type: Sequelize.INTEGER
      },
      WarPrice: {
        type: Sequelize.INTEGER
      },
      ElPrice: {
        type: Sequelize.INTEGER
      },
      ParkingPrice: {
        type: Sequelize.INTEGER
      },
      OtherFee: {
        type: Sequelize.INTEGER
      },
      SalePrice: {
        type: Sequelize.INTEGER
      },
      InDebtMoney: {
        type: Sequelize.INTEGER
      },
      ResiMoney: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Type: {
        type: Sequelize.INTEGER
      },
      DepositMoney: {
        type: Sequelize.INTEGER
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      Status: {
        type: Sequelize.INTEGER
      },
      Note: {
        type: Sequelize.TEXT
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Billings');
  }
};