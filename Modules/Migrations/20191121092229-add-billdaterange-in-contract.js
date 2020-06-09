'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Contract',
      'BillDateRange', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Contract',
      'BillDateRange'
    )
  }
};
