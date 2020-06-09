'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('User', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FullName:{
          type: Sequelize.STRING
      },
      Email: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Avatar: {
          type: Sequelize.STRING
      },
      DOB:{
        type: Sequelize.DATE,
      },
      Tel:{
          type: Sequelize.STRING,
      },
      RoleId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Stars: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue:0
      },
      RatedTime: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue:0
      },
      Password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      Active:{
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
    return queryInterface.dropTable('User');
  }
};