'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserNote = sequelize.define('UserNote', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'Id'
        },
    },
    Content:{
        type: DataTypes.STRING
    },
    CreatedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'Id'
        },
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
    tableName: 'UserNote',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  UserNote.associate = function(models) {
    // associations can be defined here
    UserNote.belongsTo(models.User, {
        as: 'User',
        foreignKey: 'UserId'
      });
    UserNote.belongsTo(models.User, {
        as: 'Creator',
        foreignKey: 'CreatedBy'
      });
  };
  return UserNote;
};