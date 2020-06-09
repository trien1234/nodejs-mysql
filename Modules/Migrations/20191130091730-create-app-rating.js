'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AppRating', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Point: {
        type: Sequelize.INTEGER
      },
      LikeFunction: {
        type: Sequelize.STRING
      },
      Feedback: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
          model: 'User',
          Key: 'Id'
        }
      },
      CreatedDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('AppRating');
  }
};