'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Setting', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Logo: {
        type: Sequelize.STRING
      },
      Slogan: {
        type: Sequelize.STRING
      },
      BankName: {
        type: Sequelize.STRING
      },
      BankAccount: {
        type: Sequelize.STRING
      },
      BankNum: {
        type: Sequelize.STRING
      },
      Website: {
        type: Sequelize.STRING
      },
      FanPage: {
        type: Sequelize.JSON
      },
      OpenTime: {
        type: Sequelize.STRING
      },
      CloseTime: {
        type: Sequelize.STRING
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Setting');
  }
};