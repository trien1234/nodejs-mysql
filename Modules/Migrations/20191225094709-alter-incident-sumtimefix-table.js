'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Incident',
        'SumTimeFix', {
          type: Sequelize.INTEGER
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Incident',
        'SumTimeFix'
      ),
    ])
  }
};
