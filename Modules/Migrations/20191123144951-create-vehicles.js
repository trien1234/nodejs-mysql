'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicle', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OwnerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'Id'
        },
      },
      HouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'House',
          key: 'Id'
        },
      },
      CheckinDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      CheckoutDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Plate: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Type: {
        type: Sequelize.INTEGER,
      },
      Basement: {
        type: Sequelize.STRING,
      },
      Card: {
        type: Sequelize.BOOLEAN,
      },
      Active: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Vehicle');
  }
};
