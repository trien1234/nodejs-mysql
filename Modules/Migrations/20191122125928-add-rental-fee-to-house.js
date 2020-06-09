'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'House',
      'RentalFee', {
        type: Sequelize.FLOAT,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'House',
      'RentalFee'
    )
  }
};
