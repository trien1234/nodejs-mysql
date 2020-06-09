'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'User_FeedBacks',
        'Star', {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: false
        }
      ),
      queryInterface.addColumn(
        'User_FeedBacks',
        'IncidentId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: false,
          references: {
            model:'Incident',
            key:'Id'
          }
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'User_FeedBacks',
        'Star'
      ),
      queryInterface.removeColumn(
        'User_FeedBacks',
        'IncidentId'
      )
    ]);
  }
};
