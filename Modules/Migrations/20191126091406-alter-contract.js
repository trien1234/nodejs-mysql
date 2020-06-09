'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Contract',
        'RepresentativeName', {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Contract',
        'RepresentativeTel', {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.removeColumn(
        'Contract',
        'RepresentativeId'
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Contract',
        'RepresentativeName'
      ),
      queryInterface.removeColumn(
        'Contract',
        'RepresentativeTel'
      )
    ])
  }
};
