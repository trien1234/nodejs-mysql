'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Room', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HouseId: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      Name:{
          type: Sequelize.STRING
      },
      Code:{
          type: Sequelize.STRING
      },
      PeopleNumber:{
          type: Sequelize.INTEGER
      },
      Status:{
          type: Sequelize.FLOAT
      },
      Funiture :{
          type: Sequelize.STRING
      },
      ReadyDate :{
          type: Sequelize.DATE,
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
    return queryInterface.dropTable('Room');
  }
};