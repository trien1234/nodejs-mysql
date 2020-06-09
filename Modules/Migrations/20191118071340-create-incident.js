'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Incident', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Code: {
        type: Sequelize.STRING
      },
      IncidentTypeId: {
        type: Sequelize.INTEGER
      },
      HouseId: {
        type: Sequelize.INTEGER
      },
      BuildingId:{
        type: Sequelize.INTEGER
      },
      Status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      IncidentArea: {
        type: Sequelize.INTEGER
      },
      NeedFixerPrice: {
        type: Sequelize.FLOAT
      },
      FixerPriceId:{
        type: Sequelize.INTEGER
      },
      Description: {
        type: Sequelize.TEXT
      },
      ContactName : {
        type: Sequelize.STRING
      },
      ContactNumber: {
        type: Sequelize.STRING
      },
      FixDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      Images: {
        type: Sequelize.TEXT
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      FixedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      UpdatedBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN
      },
      CreatedDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Incident');
  }
};