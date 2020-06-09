'use strict';
module.exports = (sequelize, DataTypes) => {
	const IncidentNote = sequelize.define('IncidentNote', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    	Content: DataTypes.TEXT,
    	IncidentId: DataTypes.INTEGER,
    	UserId: DataTypes.INTEGER,
    	Images: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      } 
	}, {
  		timestamps: false,
    	freezeTableName: true,
    	tableName: 'Incident_Note',
    	charset: 'utf8',
    	dialectOptions: {
    	collate: 'utf8_general_ci'
    	}
  	});
  	IncidentNote.associate = function(models) {
    	// associations can be defined here
    	IncidentNote.belongsTo(models.Incident, {as: 'Incident',  foreignKey: 'IncidentId'});
    	IncidentNote.belongsTo(models.User, {as: 'User',  foreignKey: 'UserId'});
  	};
return IncidentNote;
};