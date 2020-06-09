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
   return queryInterface.bulkInsert('Permission', [
    {
      Name: 'Thêm tài khoản',
      Type: 1,
      Method: 'add_user',
      Resource:'add_user',
      CreatedDate: new Date(),
    }, {
      Name: 'Sửa tài khoản',
      Type: 1,
      Method: 'update_user',
      Resource:'update_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xem tài khoản',
      Type: 1,
      Method: 'view_user',
      Resource:'view_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa tài khoản',
      Type: 1,
      Method: 'delete_user',
      Resource:'delete_user',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm quyền',
      Type: 1,
      Method: 'add_role',
      Resource:'add_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa quyền',
      Type: 1,
      Method: 'update_role',
      Resource:'update_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem quyền',
      Type: 1,
      Method: 'view_role',
      Resource:'view_role',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa quyền',
      Type: 1,
      Method: 'delete_role',
      Resource:'delete_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm nhà',
      Type: 1,
      Method: 'add_house',
      Resource:'add_house',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa nhà',
      Type: 1,
      Method: 'update_house',
      Resource:'update_house',
      CreatedDate: new Date(),
    },{
      Name: 'Xem nhà',
      Type: 1,
      Method: 'view_house',
      Resource:'view_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xóa nhà',
      Type: 1,
      Method: 'delete_house',
      Resource:'delete_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm chung cư',
      Type: 1,
      Method: 'add_building',
      Resource:'add_building',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa chung cư',
      Type: 1,
      Method: 'update_building',
      Resource:'update_building',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem chung cư',
      Type: 1,
      Method: 'view_building',
      Resource:'view_building',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa chung cư',
      Type: 1,
      Method: 'delete_building',
      Resource:'delete_building',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm sự cố',
      Type: 1,
      Method: 'add_incident',
      Resource:'add_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa sự cố',
      Type: 1,
      Method: 'update_incident',
      Resource:'update_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem sự cố',
      Type: 1,
      Method: 'view_incident',
      Resource:'view_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa sự cố',
      Type: 1,
      Method: 'delete_incident',
      Resource:'delete_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm tài khoản',
      Type: 2,
      Method: 'add_user',
      Resource:'add_user',
      CreatedDate: new Date(),
    }, {
      Name: 'Sửa tài khoản',
      Type: 2,
      Method: 'update_user',
      Resource:'update_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xem tài khoản',
      Type: 2,
      Method: 'view_user',
      Resource:'view_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa tài khoản',
      Type: 2,
      Method: 'delete_user',
      Resource:'delete_user',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm quyền',
      Type: 2,
      Method: 'add_role',
      Resource:'add_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa quyền',
      Type: 2,
      Method: 'update_role',
      Resource:'update_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem quyền',
      Type: 2,
      Method: 'view_role',
      Resource:'view_role',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa quyền',
      Type: 2,
      Method: 'delete_role',
      Resource:'delete_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm nhà',
      Type: 2,
      Method: 'add_house',
      Resource:'add_house',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa nhà',
      Type: 2,
      Method: 'update_house',
      Resource:'update_house',
      CreatedDate: new Date(),
    },{
      Name: 'Xem nhà',
      Type: 2,
      Method: 'view_house',
      Resource:'view_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xóa nhà',
      Type: 2,
      Method: 'delete_house',
      Resource:'delete_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm chung cư',
      Type: 2,
      Method: 'add_building',
      Resource:'add_building',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa chung cư',
      Type: 2,
      Method: 'update_building',
      Resource:'update_building',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem chung cư',
      Type: 2,
      Method: 'view_building',
      Resource:'view_building',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa chung cư',
      Type: 2,
      Method: 'delete_building',
      Resource:'delete_building',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm sự cố',
      Type: 2,
      Method: 'add_incident',
      Resource:'add_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa sự cố',
      Type: 2,
      Method: 'update_incident',
      Resource:'update_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem sự cố',
      Type: 2,
      Method: 'view_incident',
      Resource:'view_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa sự cố',
      Type: 2,
      Method: 'delete_incident',
      Resource:'delete_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm tài khoản',
      Type: 3,
      Method: 'add_user',
      Resource:'add_user',
      CreatedDate: new Date(),
    }, {
      Name: 'Sửa tài khoản',
      Type: 3,
      Method: 'update_user',
      Resource:'update_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xem tài khoản',
      Type: 3,
      Method: 'view_user',
      Resource:'view_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa tài khoản',
      Type: 3,
      Method: 'delete_user',
      Resource:'delete_user',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm quyền',
      Type: 3,
      Method: 'add_role',
      Resource:'add_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa quyền',
      Type: 3,
      Method: 'update_role',
      Resource:'update_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem quyền',
      Type: 3,
      Method: 'view_role',
      Resource:'view_role',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa quyền',
      Type: 3,
      Method: 'delete_role',
      Resource:'delete_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm nhà',
      Type: 3,
      Method: 'add_house',
      Resource:'add_house',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa nhà',
      Type: 3,
      Method: 'update_house',
      Resource:'update_house',
      CreatedDate: new Date(),
    },{
      Name: 'Xem nhà',
      Type: 3,
      Method: 'view_house',
      Resource:'view_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xóa nhà',
      Type: 3,
      Method: 'delete_house',
      Resource:'delete_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm chung cư',
      Type: 3,
      Method: 'add_building',
      Resource:'add_building',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa chung cư',
      Type: 3,
      Method: 'update_building',
      Resource:'update_building',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem chung cư',
      Type: 3,
      Method: 'view_building',
      Resource:'view_building',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa chung cư',
      Type: 3,
      Method: 'delete_building',
      Resource:'delete_building',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm sự cố',
      Type: 3,
      Method: 'add_incident',
      Resource:'add_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa sự cố',
      Type: 3,
      Method: 'update_incident',
      Resource:'update_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem sự cố',
      Type: 3,
      Method: 'view_incident',
      Resource:'view_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa sự cố',
      Type: 3,
      Method: 'delete_incident',
      Resource:'delete_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm tài khoản',
      Type: 4,
      Method: 'add_user',
      Resource:'add_user',
      CreatedDate: new Date(),
    }, {
      Name: 'Sửa tài khoản',
      Type: 4,
      Method: 'update_user',
      Resource:'update_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xem tài khoản',
      Type: 4,
      Method: 'view_user',
      Resource:'view_user',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa tài khoản',
      Type: 4,
      Method: 'delete_user',
      Resource:'delete_user',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm quyền',
      Type: 4,
      Method: 'add_role',
      Resource:'add_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa quyền',
      Type: 4,
      Method: 'update_role',
      Resource:'update_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem quyền',
      Type: 4,
      Method: 'view_role',
      Resource:'view_role',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa quyền',
      Type: 4,
      Method: 'delete_role',
      Resource:'delete_role',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm nhà',
      Type: 4,
      Method: 'add_house',
      Resource:'add_house',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa nhà',
      Type: 4,
      Method: 'update_house',
      Resource:'update_house',
      CreatedDate: new Date(),
    },{
      Name: 'Xem nhà',
      Type: 4,
      Method: 'view_house',
      Resource:'view_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xóa nhà',
      Type: 4,
      Method: 'delete_house',
      Resource:'delete_house',
      CreatedDate: new Date(),
    },
    {
      Name: 'Thêm chung cư',
      Type: 4,
      Method: 'add_building',
      Resource:'add_building',
      CreatedDate: new Date(),
    },{
      Name: 'Sửa chung cư',
      Type: 4,
      Method: 'update_building',
      Resource:'update_building',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem chung cư',
      Type: 4,
      Method: 'view_building',
      Resource:'view_building',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa chung cư',
      Type: 4,
      Method: 'delete_building',
      Resource:'delete_building',
      CreatedDate: new Date(),
    },{
      Name: 'Thêm sự cố',
      Type: 4,
      Method: 'add_incident',
      Resource:'add_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Sửa sự cố',
      Type: 4,
      Method: 'update_incident',
      Resource:'update_incident',
      CreatedDate: new Date(),
    },
    {
      Name: 'Xem sự cố',
      Type: 4,
      Method: 'view_incident',
      Resource:'view_incident',
      CreatedDate: new Date(),
    },{
      Name: 'Xóa sự cố',
      Type: 4,
      Method: 'delete_incident',
      Resource:'delete_incident',
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
   return queryInterface.bulkDelete('Permission', null, {});
  }
};
