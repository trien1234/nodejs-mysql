'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ApartmentStatus', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
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
    return queryInterface.dropTable('ApartmentStatus');
  }
};