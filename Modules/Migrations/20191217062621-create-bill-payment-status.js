'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BillPaymentStatus', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BillId: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        references: {
            model: 'Billings',
            key: 'Id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        primaryKey:false,
        references: {
          model: 'User',
          key: 'Id'
        }
      },
      Name: {
        type: Sequelize.STRING
      },
      UpdatedBy: {
        type: Sequelize.INTEGER
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      IsDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BillPaymentStatus');
  }
};