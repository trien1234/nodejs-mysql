'use strict';

const NOTIFY_TYPE = require("../../Config/constant.js")
module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    FromUserId: DataTypes.INTEGER,
    ToUserId: DataTypes.INTEGER,
    IncidentId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: 'Incident',
          Key: 'Id'
        }
    },  
    Type: {
        type: DataTypes.INTEGER,
        defaultValue: NOTIFY_TYPE.NOTIFY_TYPE.ADMIN_SEND_TO_ALL
    },
    Content: {
        type: DataTypes.JSON,
        allowNull: true
    },
    Status: {
        type: DataTypes.INTEGER,
        defaultValue: NOTIFY_TYPE.READ_STATUS.NOT_READ
    },
    CreatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdatedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Notifications',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
    }
    });
    Notifications.associate = function(models) {
    // associations can be defined here
    };
    return Notifications;
};