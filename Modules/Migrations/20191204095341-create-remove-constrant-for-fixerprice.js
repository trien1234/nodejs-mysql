'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint(
        'Fixer_Price',
        'Fixer_Price_AcceptedBy_foreign_idx',
      ),
      queryInterface.addConstraint(
        'Fixer_Price',
        ['UserId'],
        {
          type: 'foreign key',
          references: {
            table: 'User',
            field: 'Id'
          },
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint(
        'Fixer_Price',
        'Fixer_Price_UserId_User_fk'
      )   
    ]);
  }
};
