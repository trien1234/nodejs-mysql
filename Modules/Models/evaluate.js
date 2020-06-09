'use strict';
module.exports = (sequelize, DataTypes) => {
    const Evaluate = sequelize.define('Evaluate', {
        Id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        Type:{
            type: DataTypes.INTEGER,
        },
        Question1:{
            type: DataTypes.INTEGER,
        },
        Question2:{
            type: DataTypes.STRING,
        },
        Question3:{
            type: DataTypes.STRING,
        },
        CreatedBy: {
            type: DataTypes.INTEGER
        },
        CreatedDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UpdatedBy: {
            type: DataTypes.INTEGER
        },
        UpdatedDate: {
            type: DataTypes.DATE
        },
        IsDeleted: {
            type : DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'Evaluate',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
        }
    });
    Evaluate.associate = function(models) {
        // associations can be defined here
    };
    return Evaluate;
};
