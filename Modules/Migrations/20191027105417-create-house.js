'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('House', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BuildingId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      ManagerId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Name:{
          type: Sequelize.STRING
      },
      Note:{
          type: Sequelize.STRING
      },
      Code:{
          type: Sequelize.STRING
      },
      Block:{
          type: Sequelize.STRING
      },
      Floor:{
          type: Sequelize.STRING
      },
      ServicePrice:{
          type: Sequelize.FLOAT
      },
      Status:{
          type: Sequelize.STRING
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
    return queryInterface.dropTable('House');
  }
};