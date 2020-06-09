'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Billings',
        'ResidentId', {
          type: Sequelize.INTEGER,
          references: {
          	model: 'User',
          	key:'Id'
          }
        }
      ),
      queryInterface.addColumn(
        'Billings',
        'DateRange', {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'Billings',
        'ManagerReceiveMoneyDate', {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'Billings',
        'AccoutingReceiveMoneyDate', {
          type: Sequelize.DATE
        }
      )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Billings',
        'ResidentId'
      ),
      queryInterface.removeColumn(
        'Billings',
        'DateRange'
      ),
      queryInterface.removeColumn(
        'Billings',
        'ManagerReceiveMoneyDate'
      ),
      queryInterface.removeColumn(
        'Billings',
        'AccoutingReceiveMoneyDate'
      ),
    ])
  }
};
