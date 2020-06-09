'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'ApartmentStatus',
      'Name',
      'Code'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'ApartmentStatus',
      'Code',
      'Name'
    );
  }
};
