'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fixer_Price', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IncidentId: {
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.STRING
      },
      FixDate: {
        type: Sequelize.DATE
      },
      CreatedDate: {
        type: Sequelize.DATE
      },
      UpdatedDate: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Fixer_Price');
  }
};