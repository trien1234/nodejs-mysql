'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Contract',
        'WaterPriceType', {
          type: Sequelize.INTEGER,
          references: {
          	model: 'WaterPriceTypes',
          	key:'Id'
          }
        }
      ),
      queryInterface.addColumn(
        'Contract',
        'FirstWarNum', {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Contract',
        'FirstElNum', {
          type: Sequelize.INTEGER
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Contract',
        'WaterPriceType'
      ),
      queryInterface.removeColumn(
        'Contract',
        'FirstWarNum'
      ),
      queryInterface.removeColumn(
        'Contract',
        'FirstElNum'
      ),
    ])
  }
};
