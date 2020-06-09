'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User_FeedBacks', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Content: {
        type: Sequelize.TEXT
      },
      SendFrom: {
        type:Sequelize.INTEGER,
        primaryKey: false,
          references: {
              model: 'User',
              key: 'Id'
          }
      },
      SendTo: {
        type:Sequelize.INTEGER,
        primaryKey: false,
          references: {
              model: 'User',
              key: 'Id'
          }
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('User_FeedBacks');
  }
};