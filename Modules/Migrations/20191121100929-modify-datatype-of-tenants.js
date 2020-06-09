'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Contract',
      'Tenants', {
        type: Sequelize.JSON
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Contract',
      'Tenants', {
        type: Sequelize.STRING
      }
    )
  }
};
