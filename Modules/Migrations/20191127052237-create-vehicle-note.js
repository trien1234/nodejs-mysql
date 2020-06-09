'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VehicleNote', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      VehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vehicle',
          key: 'Id'
        },
      },
      Content: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'Id'
        },
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
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VehicleNote');
  }
};