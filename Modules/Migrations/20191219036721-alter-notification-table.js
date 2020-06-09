'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
	    queryInterface.removeColumn(
        	'Notifications',
        	'IncidentId',
      	),
    	queryInterface.addColumn(
      	'Notifications',
      	'TableId',{
      		type: Sequelize.INTEGER,
        	allowNull: true,
      	}
    	),
      queryInterface.changeColumn(
        'Notifications',
        'Type',{
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      	queryInterface.removeColumn(
        	'Notifications',
        	'TableId'
      	)
    ])
  }
};
