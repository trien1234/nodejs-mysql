'use strict';
module.exports = (sequelize, DataTypes) => {
  const IncidentStatus = sequelize.define('IncidentStatus', {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    Name:{
        type: DataTypes.STRING
    },
    IncidentId:{
        type: DataTypes.INTEGER
    },
    UserId:{
        type: DataTypes.INTEGER
    },
    CreatedDate: {
        type: DataTypes.DATE,
	    defaultValue: DataTypes.NOW
    }  
  	}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Incident_Status',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
    	}
  	});
  	IncidentStatus.associate = function(models) {
    	// associations can be defined here
        IncidentStatus.belongsTo(models.Incident, {as: 'Incident',  foreignKey: 'IncidentId'});
    	IncidentStatus.belongsTo(models.User, {as: 'User',  foreignKey: 'UserId'});
  	};
  	return IncidentStatus;
};