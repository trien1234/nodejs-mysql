'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Incident_Status',
        'UserId',
        {
          type: Sequelize.INTEGER,
          primaryKey: false,
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'User',
        'UserId'
      )
    ]);
  }
};
