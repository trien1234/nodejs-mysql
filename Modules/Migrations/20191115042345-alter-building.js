'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.addColumn(
            'Building',
            'ManagerId',
            {
                type: Sequelize.INTEGER,
                allowNull: true,
                primaryKey: false,
                references: {
                  model: 'User',
                  key: 'Id'
                },
            }
          )
      ]);
    },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.removeColumn(
            'Building',
            'ManagerId'
          )
      ]);
  }
};
