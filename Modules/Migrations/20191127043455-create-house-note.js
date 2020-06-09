'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HouseNote', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'House',
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
    return queryInterface.dropTable('HouseNote');
  }
};