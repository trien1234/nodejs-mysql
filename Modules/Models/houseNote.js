'use strict';
module.exports = (sequelize, DataTypes) => {
  const HouseNote = sequelize.define('HouseNote', {
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
    tableName: 'HouseNote',
      charset: 'utf8',
      dialectOptions: {
          collate: 'utf8_general_ci'
      }
  });
  HouseNote.associate = function(models) {
    // associations can be defined here
    HouseNote.belongsTo(models.House, {
        as: 'House',
        foreignKey: 'HouseId'
      });
    HouseNote.belongsTo(models.User, {
        as: 'Creator',
        foreignKey: 'CreatedBy'
      });
  };
  return HouseNote;
};