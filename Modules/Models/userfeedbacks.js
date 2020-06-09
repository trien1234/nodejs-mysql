'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFeedBacks = sequelize.define('UserFeedBacks', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Content: DataTypes.TEXT,
    SendFrom: {
    	type:DataTypes.INTEGER,
    	primaryKey: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    SendTo: {
    	type:DataTypes.INTEGER,
    	primaryKey: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    Star: {
      type:DataTypes.INTEGER,
      primaryKey: false,
    },
    IncidentId: {
      type:DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: 'Incident',
        key: 'Id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
  		timestamps: false,
    	freezeTableName: true,
    	tableName: 'User_FeedBacks',
      	charset: 'utf8',
      	dialectOptions: {
        collate: 'utf8_general_ci'
      }
  });
  UserFeedBacks.associate = function(models) {
    // associations can be defined here
    UserFeedBacks.belongsTo(models.Incident, {as: 'Incident', foreignKey: 'IncidentId'});
  };
  return UserFeedBacks;
};