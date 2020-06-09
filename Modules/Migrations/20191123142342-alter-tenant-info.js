'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'StayRecord',
        'Active', {
          type: Sequelize.BOOLEAN,
        }
      ),
      queryInterface.addColumn(
        'User',
        'IdCard', {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.removeColumn(
        'Contract',
        'StayRegistration'
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'StayRecord',
        'Active'
      ),
      queryInterface.removeColumn(
        'User',
        'IdCard'
      ),
    ])
  }
};
