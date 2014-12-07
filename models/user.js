"use strict";

module.exports = function(sequelize, DataTypes) {
  var hash = require('password-hash');

  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    weightGoal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    energyExpenditure: {
      type: DataTypes.FLOAT,
      defaultValue: 1
    },
    password: {
      type: DataTypes.STRING,

      set: function (password) {
        this.setDataValue('password', hash.generate(password, {
          algorithm: 'SHA384',
          saltLength: 24
        }));
      }
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),

      set: function () {
        if (!this.getDataValue('id')) {
          this.setDataValue('roles', ['user']);
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        models.User.belongsTo(models.Gym, {
          foreignKey: 'gymId'
        });
      }
    },

    instanceMethods: {
      verifyPassword: function (password) {
        return hash.verify(password, this.getDataValue('password'));
      },

      toJSON: function () {
        var json = this.values;

        delete json.password;

        return json;
      },

      isSuperUser: function () {
        return this.values.roles.indexOf('superuser') !== -1;
      }
    }
  });

  return User;
};
