'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('BillPaymentNote', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BillId: {
        type: Sequelize.INTEGER,
        primaryKey:false,
        references: {
            model: 'Billings',
            key: 'Id'
        }
      },
      CreatedBy: {
        type: Sequelize.INTEGER,
        primaryKey:false,
        references: {
          model: 'User',
          key: 'Id'
        }
      },
      Content: {
        type: Sequelize.TEXT
      },
      CreatedDate: {
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
    return queryInterface.dropTable('BillPaymentNote');
  }
};