'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_House', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
            model: 'User',
            key: 'Id'
        },
      },
      House: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
            model: 'House',
            key: 'Id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_House');
  }
};