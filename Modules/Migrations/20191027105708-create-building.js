'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Building', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name:{
          type: Sequelize.STRING
      },
      Code:{
          type: Sequelize.STRING
      },
      Address:{
          type: Sequelize.STRING
      },
      Status:{
          type: Sequelize.STRING
      },
      Note:{
          type: Sequelize.STRING
      },
      BillDateRange:{
          type: Sequelize.INTEGER
      },
      ElectricBill:{
          type: Sequelize.FLOAT
      },
      WaterType:{
          type: Sequelize.STRING
      },
      WaterPrice:{
          type: Sequelize.FLOAT
      },
      CarParkPrice:{
          type: Sequelize.FLOAT
      },
      MotobikeParkPrice:{
          type: Sequelize.FLOAT
      },
      BikeParkPrice:{
          type: Sequelize.FLOAT
      },
      ServicePrice:{
          type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Building');
  }
};