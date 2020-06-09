'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Role_Permission', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RoleId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: false,
          references: {
              model: 'Role',
              key: 'Id'
          },
      },
      PermissionId:{
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: false,
          references: {
              model: 'Permission',
              key: 'Id'
          },
      },
      IsActive: {
          type : Sequelize.BOOLEAN,
          defaultValue: 0
      }
    },
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Role_Permission');
  }
};