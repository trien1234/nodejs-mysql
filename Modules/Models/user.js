'use strict';
const bcrypt = require("bcryptjs");
const i18n = require("i18n");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    FullName:{
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUnique: function (value, next) {
                var self = this.dataValues;
                User.findOne({where: {Email: value}})
                    .then(function (user) {
                        // reject if a different user wants to use the same email
                        console.log(user);
                        if (user && self.Id !== user.dataValues.Id) {
                            return next(i18n.__('User.Fail.EmailExist'));
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    },
    Avatar: {
        type: DataTypes.STRING
    },
    Tel:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUnique: function (value, next) {
                var self = this.dataValues;
                User.findOne({where: {Tel: value}})
                    .then(function (user) {
                        // reject if a different user wants to use the same email
                        if (user && self.Id !== user.dataValues.Id) {
                            return next(i18n.__('User.Fail.TelExist'));
                        }
                        return next();
                    })
                    .catch(function (err) {
                        return next(err);
                    });
            }
        }
    },
    Address:{
        type: DataTypes.STRING,
        allowNull: true
    },
    BankAccount:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DOB:{
        type: DataTypes.DATEONLY,
    },
    RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    HouseId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    RatedTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:0
    },
    FixerGroupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'FixerGroup',
            key: 'Id'
        },
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IdCard: {
        type: DataTypes.STRING
    },
    Active:{
        type: DataTypes.STRING
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
        tableName: 'User',
        charset: 'utf8',
        dialectOptions: {
        collate: 'utf8_general_ci'
      }
  });
  User.associate = function(models) {
    // associations can be defined here
    // User.belongsToMany(models.House, {
    //     through: models.UserHouse,
    //     as: 'House'
    // });
    User.hasMany(models.House, {as: 'House', foreignKey: 'ManagerId'});
    User.hasMany(models.DeviceToken, {as: 'DeviceToken', foreignKey: 'UserId'});
    User.hasMany(models.Incident, {as: 'Incident', foreignKey: 'CreatedBy'});
    User.hasMany(models.Building, {as: 'Building', foreignKey: 'ManagerId'});
    User.hasMany(models.IncidentStatus, {as: 'IncidentStatus', foreignKey: 'UserId'});
    User.hasMany(models.UserNote, {as: 'UserNote', foreignKey: 'UserId'});
    User.hasMany(models.IncidentNote, {as: 'IncidentNote', foreignKey: 'UserId'});
    User.hasMany(models.FixerPrice, {as: 'FixerPrice', foreignKey: 'UserId'});
    User.hasMany(models.StayRecord, {as: 'StayRecord', foreignKey: 'TenantId'});
    User.belongsTo(models.Role, {as: 'Role', foreignKey: 'RoleId'});
    User.belongsTo(models.FixerGroup, {as: 'FixerGroup', foreignKey: 'FixerGroupId'});
  };
  User.prototype.validPassword  = async function(password){
    return bcrypt.compareSync(password, this.Password);
  };
  User.beforeCreate((user, options) => {
      return bcrypt.hash(user.Password, bcrypt.genSaltSync(10), null).then(hash => {
          user.Password = hash;
      }).catch(err => {
          console.log(err);
      });
  });

//   User.listUser((start, length)=>{
//       return 
//   })
  return User;
};
