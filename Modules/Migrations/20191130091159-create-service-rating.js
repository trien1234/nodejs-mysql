'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ServiceRating', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LifeTimeRating: {
        type: Sequelize.INTEGER
      },
      Fortune: {
        type: Sequelize.INTEGER
      },
      Parking: {
        type: Sequelize.INTEGER
      },
      Invironment: {
        type: Sequelize.INTEGER
      },
      Feedback: {
        type: Sequelize.STRING
      },
      GoodPoint: {
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
    return queryInterface.dropTable('ServiceRating');
  }
};