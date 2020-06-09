'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contract', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RepresentativeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'Id'
        },
      },
      RoomId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Room',
          key: 'Id'
        },
      },
      CheckinDate: {
        type: Sequelize.DATEONLY
      },
      CheckoutDate: {
        type: Sequelize.DATEONLY
      },
      Tenants: {
        type: Sequelize.STRING
      },
      StayRegistration: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      RentalFee: {
        type: Sequelize.FLOAT
      },
      ElectricBill: {
        type: Sequelize.FLOAT
      },
      WaterPrice: {
        type: Sequelize.FLOAT
      },
      CarParkPrice: {
        type: Sequelize.FLOAT
      },
      MotobikeParkPrice: {
        type: Sequelize.FLOAT
      },
      BikeParkPrice: {
        type: Sequelize.FLOAT
      },
      ServicePrice: {
        type: Sequelize.FLOAT
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedBy: {
        type: Sequelize.INTEGER
      },
      UpdatedDate: {
        type: Sequelize.DATE
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contract');
  }
};