'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Evaluate', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type:{
          type: Sequelize.INTEGER,
      },
      Question1:{
          type: Sequelize.INTEGER,
      },
      Question2:{
          type: Sequelize.STRING,
      },
      Question3:{
          type: Sequelize.STRING,
      },
      CreatedBy: {
          type: Sequelize.INTEGER
      },
      CreatedDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      UpdatedBy: {
          type: Sequelize.INTEGER
      },
      UpdatedDate: {
          type: Sequelize.DATE
      },
      IsDeleted: {
          type : Sequelize.BOOLEAN,
          defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Evaluate');
  }
};