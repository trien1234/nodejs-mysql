'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
	    queryInterface.addColumn(
	        'Billings',
	        'IsDraft', {
	          	type: Sequelize.BOOLEAN
	        }
	    )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      	queryInterface.removeColumn(
        	'Billings',
        	'IsDraft'
      	)
    ])
  }
};
