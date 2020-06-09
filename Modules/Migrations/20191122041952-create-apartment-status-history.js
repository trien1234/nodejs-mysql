'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ApartmentStatusHistory', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'House',
          key: 'Id'
        },
      },
      StatusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        references: {
          model: 'ApartmentStatus',
          key: 'Id'
        },
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
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ApartmentStatusHistory');
  }
};