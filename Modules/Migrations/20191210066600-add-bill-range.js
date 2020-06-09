'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'House',
        'BillDateRange', {
          type: Sequelize.INTEGER
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'House',
        'BillDateRange'
      ),
    ])
  }
};
