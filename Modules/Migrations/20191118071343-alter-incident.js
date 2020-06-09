'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'Incident',
        'Status',
        {
          type: Sequelize.INTEGER,
          primaryKey: false,
        }
      ),
      queryInterface.changeColumn(
        'Incident',
        'IncidentArea',
        {
          type: Sequelize.INTEGER,
          primaryKey: false,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Incident',
        'Note'
      )
    ]);
  }
};
