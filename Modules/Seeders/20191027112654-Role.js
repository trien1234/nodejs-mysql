'use strict';

const CONSTANT = require("../../Config/constant");
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
    return queryInterface.bulkInsert('Role', [
      {
        Name: 'Admin',
        Type: CONSTANT.RoleType.CMS,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Admin phó ',
        Type: CONSTANT.RoleType.CMS,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Owner',
        Type: 1,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Cư Dân ',
        Type: CONSTANT.RoleType.Resident,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Quản Lý Nhà',
        Type: CONSTANT.RoleType.CMSAndManager,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Thợ sửa chữa',
        Type: CONSTANT.RoleType.Fixer,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'Kế Toán',
        Type: CONSTANT.RoleType.CMS,
        Description: '',
        CreatedDate: new Date(),
      },
      {
        Name: 'CSKH',
        Type: CONSTANT.RoleType.CMS,
        Description: '',
        CreatedDate: new Date(),
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Role', null, {});
  }
};
