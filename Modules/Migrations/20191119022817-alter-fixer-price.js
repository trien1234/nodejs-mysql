'use strict';
const INCIDENT_STATUS = require("../../Config/constant.js");
module.exports = {
  	up: (queryInterface, Sequelize) => {
	    return Promise.all([
	      	queryInterface.addColumn(
		        'Fixer_Price',
		        'AcceptedBy',
		        {
		          	type: Sequelize.INTEGER,
		          	allowNull: true,
		          	primaryKey: false,
		          	references: {
		            	model: 'User',
		            	key: 'Id'
		          	},
		        }
	      	),
	      	queryInterface.addColumn(
		        'Fixer_Price',
		        'AcceptedDate',
		        {
		          	type: Sequelize.DATE,
		          	allowNull: true,
		        }
	      	),
	      	queryInterface.addColumn(
		        'Fixer_Price',
		        'Status',
		        {
		          	type: Sequelize.INTEGER,
		          	allowNull: true,
		          	defaultValue: INCIDENT_STATUS.FixerPriceStatus.PENDING
		        }
	      	)
	    ]);
  	},

	down: (queryInterface, Sequelize) => {
	    return Promise.all([
	      	queryInterface.removeColumn(
	        	'Fixer_Price',
	        	'AcceptedBy'
	      	),
	      	queryInterface.removeColumn(
	        	'Fixer_Price',
	        	'AcceptedDate'
	      	),
	      	queryInterface.removeColumn(
	        	'Fixer_Price',
	        	'Status'
	      	)
	    ]);
	}
};
