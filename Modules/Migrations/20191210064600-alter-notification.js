'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications',
        'IsDeleted', {
          type: Sequelize.BOOLEAN,
          defaultValue : 0
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Notifications',
        'IsDeleted'
      ),
    ])
  }
};
