'use strict';

module.exports = {
  	up: (queryInterface, Sequelize) => {
	    return Promise.all([
	    	queryInterface.addColumn(
		      	'Setting',
		      	'IncidentReceiveTime',{
		      		type: Sequelize.INTEGER,
		        	allowNull: true,
		      	}
	    	),
	    	queryInterface.addColumn(
		      	'Setting',
		      	'IncidentFixingTime',{
		      		type: Sequelize.INTEGER,
		        	allowNull: true,
		      	}
	    	),
	    	queryInterface.addColumn(
		      	'Setting',
		      	'ExpriedContractTime',{
		      		type: Sequelize.INTEGER,
		        	allowNull: true,
		      	}
	    	),
	    	queryInterface.addColumn(
		      	'Setting',
		      	'IncidentFixingScheduleTime',{
		      		type: Sequelize.INTEGER,
		        	allowNull: true,
		      	}
	    	),
	    ])
  	},

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      	queryInterface.removeColumn(
        	'Setting',
        	'IncidentReceiveTime'
      	),
      	queryInterface.removeColumn(
        	'Setting',
        	'IncidentFixingTime'
      	),
      	queryInterface.removeColumn(
        	'Setting',
        	'ExpriedContractTime'
      	),
      	queryInterface.removeColumn(
        	'Setting',
        	'IncidentFixingScheduleTime'
      	)
    ])
  }
};
