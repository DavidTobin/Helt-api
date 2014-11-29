"use strict";

module.exports = function(sequelize, DataTypes) {
  var hash = require('password-hash'), User;

  User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,

      set: function (password) {
        this.setDataValue('password', hash.generate(password, {
          algorithm: 'SHA384',
          saltLength: 24
        }));
      }
    }
  }, {
    instanceMethods: {
      verifyPassword: function (password) {
        return hash.verify(password, this.getDataValue('password'));
      },

      toJSON: function () {
        var json = this.values;

        delete json.password;

        return json;
      }
    }
  });

  return User;
};
