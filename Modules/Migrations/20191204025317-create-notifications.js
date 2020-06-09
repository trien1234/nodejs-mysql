'use strict';
const NOTIFY_TYPE = require("../../Config/constant.js");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
        Id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        FromUserId: {
            type: Sequelize.INTEGER
        },
        ToUserId: {
            type: Sequelize.INTEGER
        },
        IncidentId: {
            type: Sequelize.INTEGER,
            primaryKey: false,
            references: {
              model: 'Incident',
              Key: 'Id'
            }
        },
        Type: {
            type: Sequelize.INTEGER,
            defaultValue: NOTIFY_TYPE.NOTIFY_TYPE.ADMIN_SEND_TO_ALL
        },
        Content: {
            type: Sequelize.JSON
        },
        Status: {
            type: Sequelize.INTEGER,
            defaultValue: NOTIFY_TYPE.READ_STATUS.NOT_READ
        },
        CreatedDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        UpdatedDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Notifications');
    }
};