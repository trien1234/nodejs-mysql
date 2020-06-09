'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Vehicle',
      'Vehicle_ibfk_1'
    )
  },
};
