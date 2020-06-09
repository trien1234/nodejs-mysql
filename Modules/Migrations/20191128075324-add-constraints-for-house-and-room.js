'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint(
        'House',
        ['BuildingId'],
        {
          type: 'foreign key',
          references: {
            table: 'Building',
            field: 'Id'
          },
        }
      ),
      queryInterface.addConstraint(
        'House',
        ['ManagerId'],
        {
          type: 'foreign key',
          references: {
            table: 'User',
            field: 'Id'
          },
        }
      ),
      queryInterface.addConstraint(
        'Room',
        ['HouseId'],
        {
          type: 'foreign key',
          references: {
            table: 'House',
            field: 'Id'
          },
        }
      ),
      queryInterface.addColumn(
        'Room',
        'CheckinDate', {
          type: Sequelize.DATEONLY,
          allowNull: true,
          primaryKey: false,
        }
      ),
      queryInterface.addColumn(
        'Room',
        'CheckoutDate', {
          type: Sequelize.DATEONLY,
          allowNull: true,
          primaryKey: false,
        }
      ),
      queryInterface.changeColumn(
        'Room',
        'ReadyDate', {
          type: Sequelize.DATEONLY
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint(
        'House',
        'House_BuildingId_Building_fk'
      ),
      queryInterface.removeConstraint(
        'House',
        'House_ManagerId_User_fk'
      ),
      queryInterface.removeConstraint(
        'Room',
        'Room_HouseId_House_fk'
      ),
      queryInterface.removeColumn(
        'Room',
        'CheckinDate'
      ),
      queryInterface.removeColumn(
        'Room',
        'CheckoutDate'
      )
    ]);
  }
};
