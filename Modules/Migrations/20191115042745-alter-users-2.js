'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.addColumn(
        'User',
        'HouseId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: false,
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'User',
        'HouseId'
      )
    ]);
  }
};
