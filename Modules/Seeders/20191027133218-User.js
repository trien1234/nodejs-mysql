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
   return queryInterface.bulkInsert('User', [
    {
      FullName: 'Admin',
      Email: 'smarthomes.group.new@gmail.com',
      Avatar: '',
      Tel:'123456789',
      Address: "Cau Giay, Ha Noi",
      Stars: 0,
      RatedTime:0,
      RoleId:1,
      FixerGroupId: 1,
      Password: '$2a$10$W8AbNSRANa3i0xppy3MyPOQFXIHh6BjUo.PtrVhdXRV2n0nN6alLe',
      Active:'',
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
   return queryInterface.bulkDelete('User', null, {});
  }
};
