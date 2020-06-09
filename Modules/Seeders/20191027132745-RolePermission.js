'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Role_Permission', [
    {
      RoleId: 1,
      PermissionId: 1,
      IsActive: 1
    },
    {
      RoleId: 1,
      PermissionId: 2,
      IsActive: 1
    },
    {
      RoleId: 1,
      PermissionId: 3,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 4,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 5,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 6,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 7,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 8,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 9,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 10,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 11,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 12,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 13,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 14,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 15,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 16,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 17,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 18,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 19,
      IsActive: 1
    },{
      RoleId: 1,
      PermissionId: 20,
      IsActive: 1
    },
], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Role_Permission', null, {});
  }
};
