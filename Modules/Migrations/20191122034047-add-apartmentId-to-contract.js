'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Contract',
        'HouseId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: false,
          references: {
            model: 'House',
            key: 'Id'
          },
        }
      ),
      queryInterface.removeColumn(
        'Contract',
        'RoomId'
      ),
      queryInterface.addColumn(
        'House',
        'Furniture', {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.removeColumn(
        'House',
        'ServicePrice'
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Contract',
        'HouseId'
      ),
      queryInterface.removeColumn(
        'Contract',
        'Furniture'
      ),
    ]);
  }
};
