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
    return queryInterface.bulkInsert('Incident_Type', [
      {
        Code: 'DI',
        Name: 'Điện',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'NU',
        Name: 'Nước',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'DL',
        Name: 'Điện lạnh',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'IN',
        Name: 'Internet',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'MT',
        Name: 'Môi trường',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'TB',
        Name: 'Trang thiết bị',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'HM',
        Name: 'Con người',
        CreatedBy: 1,
        CreatedDate: new Date(),
      },
      {
        Code: 'KH',
        Name: 'Khác',
        CreatedBy: 1,
        CreatedDate: new Date(),
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
  }
};
