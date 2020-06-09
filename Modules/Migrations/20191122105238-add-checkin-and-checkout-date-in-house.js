'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'House',
        'CheckinDate', {
          type: Sequelize.DATEONLY,
        }
      ),
      queryInterface.addColumn(
        'House',
        'CheckoutDate', {
          type: Sequelize.DATEONLY,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'House',
        'CheckinDate'
      ),
      queryInterface.removeColumn(
        'House',
        'CheckoutDate'
      )
    ]);
  }
};
