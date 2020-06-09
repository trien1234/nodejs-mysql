'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'ApartmentStatus',
      'Code',
      { type: Sequelize.INTEGER }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'ApartmentStatus',
      'Code',
      { type: Sequelize.STRING }
    );
  }
};
