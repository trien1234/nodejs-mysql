'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'House',
      'Furniture', {
        type: Sequelize.STRING
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'House',
      'Furniture', {
        type: Sequelize.INTEGER
      }
    );
  }
};
