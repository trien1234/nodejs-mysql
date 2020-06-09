'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'House',
      'ReadyDate', {
        type: Sequelize.DATEONLY,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'House',
      'ReadyDate'
    )
  }
};
