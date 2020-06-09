'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StaffRating', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      LifeSkill: {
        type: Sequelize.INTEGER
      },
      WorkingSkill: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('StaffRating');
  }
};