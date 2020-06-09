'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Incident_Type', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Code:{
                type: Sequelize.STRING
            },
            Name:{
                type: Sequelize.STRING
            },
            CreatedBy: {
                type: Sequelize.INTEGER
            },
            CreatedDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            UpdatedBy: {
                type: Sequelize.INTEGER,
                defaultValue: null
            },
            UpdatedDate: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            IsDeleted: {
                type : Sequelize.BOOLEAN,
                defaultValue: 0
            }
            });
        },
        down: (queryInterface, Sequelize) => {
            return queryInterface.dropTable('Incident_Type');
        }
};