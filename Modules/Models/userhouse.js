'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserHouse = sequelize.define('UserHouse', {
    User: DataTypes.INTEGER,
    House: DataTypes.INTEGER
  }, {
  		timestamps: false,
        freezeTableName: true,
        tableName: 'User_House',
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
  });
  UserHouse.associate = function(models) {
    // associations can be defined here
  };
  return UserHouse;
};