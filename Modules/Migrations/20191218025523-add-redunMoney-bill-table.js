'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Billings',
        'RedunMoney', {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Billings',
        'TotalFee', {
          type: Sequelize.INTEGER
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Billings',
        'RedunMoney'
      ),
      queryInterface.removeColumn(
        'Billings',
        'TotalFee'
      )
    ])
  }
};
