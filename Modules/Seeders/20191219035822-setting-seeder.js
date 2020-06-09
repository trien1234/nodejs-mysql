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
    return queryInterface.bulkInsert('Setting', [{
      Name: 'Công ty cổ phần 3SHomes',
      Email: '3shomesvn@gmail.com',
      Phone: '0909.453.111',
      Address: '87/3, Nguyễn Sỹ Sách, phường 15, quận Tân Bình, Thành phố Hồ Chí Minh',
      Logo: '/public/images/logo.png',
      Slogan: '3SHomes',
      BankName: 'Ngân Hàng ACB',
      BankAccount: 'TRƯƠNG CÔNG MINH',
      BankNum: '0101010110',
      Website: '3shomesvn.com',
      FanPage: '{"FaceBook":"facebook.com/3shomesvn","Youtube":"youtube.com/3shomes","LinkedIn":"linkedin.com/3shomes","Twitter":"twitter.com/3shomes"}',
      IncidentReceiveTime:24,//hour
      IncidentFixingTime:3,//day
      ExpriedContractTime:1, //month
      IncidentFixingScheduleTime:2, //hour
      OpenTime: '08:00',
      CloseTime: '18:00',
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }], {});
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
