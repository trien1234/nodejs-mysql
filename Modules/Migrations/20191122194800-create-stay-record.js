'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StayRecord', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TenantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'Id'
        },
      },
      HouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'House',
          key: 'Id'
        },
      },
      ActualCheckinDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      ActualCheckoutDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      StayRegistration: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      CreatedBy: {
        type: Sequelize.INTEGER
      },
      CreatedDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedBy: {
        type: Sequelize.INTEGER
      },
      UpdatedDate: {
        type: Sequelize.DATE
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StayRecord');
  }
};