'use strict';
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Title: { 
    	type:DataTypes.STRING
    },
    Content: {
    	type: DataTypes.TEXT
    },
    Image: {
    	type: DataTypes.TEXT
    },
    IsDeleted: {
    	type: DataTypes.BOOLEAN,
    	defaultValue: 0
    },
    IsFeatured: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    CreatedDate: {
    	type: DataTypes.DATE,
    	defaultValue: DataTypes.NOW
    },
    UpdatedDate: {
        type: DataTypes.DATE
    }
  }, {
  		timestamps: false,
        freezeTableName: true,
        tableName: 'News',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
        }
  });
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};