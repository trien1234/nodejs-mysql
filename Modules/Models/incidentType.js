'use strict';
module.exports = (sequelize, DataTypes) => {
  	const IncidentType = sequelize.define('IncidentType', {
	    Id: {
	      	allowNull: false,
	      	autoIncrement: true,
	    	primaryKey: true,
	      	type: DataTypes.INTEGER
	    },
	    Code:{
	        type: DataTypes.STRING
	    },
	    Name:{
	        type: DataTypes.STRING
	    },
	    CreatedBy: {
	        type: DataTypes.INTEGER
	    },
	    CreatedDate: {
	        type: DataTypes.DATE,
	        defaultValue: DataTypes.NOW
	    },
	    UpdatedBy: {
	        type: DataTypes.INTEGER,
	        defaultValue: null
	    },
	    UpdatedDate: {
	        type: DataTypes.DATE,
	        defaultValue: DataTypes.NOW
	    },
	    IsDeleted: {
	        type : DataTypes.BOOLEAN,
	        defaultValue: 0
	    }
	  	}, {
		  	timestamps: false,
		    freezeTableName: true,
		    tableName: 'Incident_Type',
		    charset: 'utf8',
		    dialectOptions: {
	        collate: 'utf8_general_ci'
	    	}
	  	});
	  	IncidentType.associate = function(models) {
		    // associations can be defined here
		    IncidentType.belongsTo(models.User, {
		        as: 'User',
		        foreignKey: 'CreatedBy'
		    });
		    IncidentType.hasMany(models.Incident, {as: 'Incident',  foreignKey: 'IncidentTypeId'});
	  	};
 	return IncidentType;
};