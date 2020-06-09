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
    return queryInterface.bulkInsert('FixerGroup', [
      {
        Name: 'Thợ điện',
        Description: 'Chuyên sửa điện',
        CreatedDate: new Date(),
      },
      {
        Name: 'Thợ nước',
        Description: 'Chuyên khắc phục sự cố về nước',
        CreatedDate: new Date(),
      },
      {
        Name: 'Thợ điện lạnh',
        Description: 'Chuyên sửa điều hoà, máy giặt, tủ lạnh...',
        CreatedDate: new Date(),
      },
      {
        Name: 'Thợ Internet',
        Description: 'Chuyên sửa, lắp đặt mạng Internet',
        CreatedDate: new Date(),
      },
      {
        Name: 'Môi trường',
        Description: 'Chuyên xử lý các vấn đề liên quan tới môi trường',
        CreatedDate: new Date(),
      },
      {
        Name: 'Trang thiết bị',
        Description: 'Chuyên xử lý các vấn đề về đồ dùng, trang thiết bị trong nhà',
        CreatedDate: new Date(),
      },
      {
        Name: 'Y tế',
        Description: 'Cấp cứu, cứu thương, điều trị tại gia',
        CreatedDate: new Date(),
      },
      {
        Name: 'Thợ khác',
        Description: 'Chuyên khắc phục những sự có khác...',
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
    return queryInterface.bulkDelete('FixerGroup', null, {});
  }
};
