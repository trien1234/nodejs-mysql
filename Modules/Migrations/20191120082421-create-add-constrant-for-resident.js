'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint(
        'Incident',
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
        'Incident',
        ['HouseId'],
        {
          type: 'foreign key',
          references: {
            table: 'House',
            field: 'Id'
          },
        }
      ),
      queryInterface.addConstraint(
        'Incident',
        ['IncidentTypeId'],
        {
          type: 'foreign key',
          references: {
            table: 'Incident_Type',
            field: 'Id'
          },
        }
      ),
      queryInterface.addConstraint(
        'Incident_Status',
        ['IncidentId'],
        {
          type: 'foreign key',
          references: {
            table: 'Incident',
            field: 'Id'
          },
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint(
        'Incident',
        'Incident_BuildingId_Building_fk'
      ),
      queryInterface.removeConstraint(
        'Incident',
        'Incident_HouseId_House_fk'
      ),
      queryInterface.removeConstraint(
        'Incident',
        'Incident_IncidentTypeId_IncidentType_fk'
      ),
      queryInterface.removeConstraint(
        'Incident_Status',
        'Incident_Status_IncidentId_Incident_fk'
      )   
    ]);
  }
};
