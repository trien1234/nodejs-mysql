'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permission', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name:{
          type: Sequelize.STRING,
          allowNull: false
      },
      Type:{
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Method: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Resource: {
          type: Sequelize.STRING,
          allowNull: false
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
    return queryInterface.dropTable('Permission');
  }
};