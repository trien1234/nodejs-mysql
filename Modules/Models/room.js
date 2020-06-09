'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    HouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'House',
            key: 'Id'
        },
    },
    Name:{
        type: DataTypes.STRING
    },
    Code:{
        type: DataTypes.STRING
    },
    PeopleNumber:{
        type: DataTypes.INTEGER
    },
    Status:{
        type: DataTypes.FLOAT
    },
    Funiture :{
        type: DataTypes.STRING
    },
    ReadyDate :{
        type: DataTypes.DATEONLY,
    },
    CheckinDate :{
        type: DataTypes.DATEONLY,
    },
    CheckoutDate :{
        type: DataTypes.DATEONLY,
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
    tableName: 'Room',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  Room.associate = function(models) {
    // associations can be defined here
    Room.belongsTo(models.House, { as: 'House', foreignKey: 'HouseId' });
  };
  return Room;
};
