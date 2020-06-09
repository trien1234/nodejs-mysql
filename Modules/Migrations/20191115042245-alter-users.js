'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'User',
        'FixerGroupId',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: false,
          references: {
            model: 'FixerGroup',
            key: 'Id'
          },
        }
      ),
      queryInterface.addColumn(
        'User',
        'Address',
        {
          type: Sequelize.STRING,
          allowNull: true,
          primaryKey: false,
        }
      ),
      queryInterface.changeColumn(
        'User',
        'DOB',
        {
          type: Sequelize.DATEONLY
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'User',
        'FixerGroupId'
      ),
      queryInterface.removeColumn(
        'User',
        'Address'
      )
    ]);
  }
};
