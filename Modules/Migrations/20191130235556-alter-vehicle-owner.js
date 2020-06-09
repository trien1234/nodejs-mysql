'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Vehicle',
        'OwnerName', {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.removeColumn(
        'Vehicle',
        'OwnerId'
      )
    ]);
  },
};
