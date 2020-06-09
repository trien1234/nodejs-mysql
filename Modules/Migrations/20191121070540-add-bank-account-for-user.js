'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'User',
      'BankAccount', {
        type: Sequelize.STRING,
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'User',
      'BankAccount'
    )
  }
};
