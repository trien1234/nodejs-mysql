'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('News', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Title: {
        type: Sequelize.STRING
      },
      Content: {
        type: Sequelize.TEXT
      },
      Image: {
        type: Sequelize.TEXT
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedDate: {
          type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('News');
  }
};