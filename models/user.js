/* global require, module */

'use strict';

module.exports = function(sequelize, DataTypes) {
  var hash = require('password-hash');

  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be an email address'
        }
      }
    },

    gender: DataTypes.ENUM('male', 'female'),

    age: {
      type: DataTypes.INTEGER,
      defaultValue: 25,
      validate: {
        min: {
          args: [0],
          msg: 'The minimum age is 0'
        },

        max: {
          args: [150],
          msg: 'The maximum age is 150'
        }
      }
    },

    weight: {
      type: DataTypes.FLOAT,
      defaultValue: 150,
      validate: {
        min: {
          args: [1],
          msg: 'You cannot weigh less than nothing'
        }
      }
    },

    height: {
      type: DataTypes.FLOAT,
      defaultValue: 150,
      validate: {
        min: {
          args: [1],
          msg: 'You cannot be less than 0cm tall'
        }
      }
    },

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
      allowNull: false,

      set: function (password) {
        this.setDataValue('password', hash.generate(password, {
          algorithm: 'SHA384',
          saltLength: 24
        }));
      }
    },

    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: ['user'],

      set: function (roles) {
        roles = roles || [];

        if (!this.getDataValue('id') || roles.length === 0) {
          this.setDataValue('roles', ['user']);
        } else {
          this.setDataValue('roles', roles);
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
        return this.values.roles.indexOf('admin') !== -1;
      }
    }
  });

  return User;
};
