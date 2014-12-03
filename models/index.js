"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/Database')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));

    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

setTimeout(function () {
  db.Gym
    .create(config.defaultGym)
    .success(function (gym) {
      console.log('Created default gym...');

      db.User
        .create(config.defaultUser)
        .success(function (user) {
          var roles = config.defaultUser.roles;

          roles.push('user');

          console.log('Created dev user...');

          user.updateAttributes({
            roles: roles
          }).success(function () {
            console.log('Updated roles to ', roles);
          });
        });
    })
}, 1000);

module.exports = db;
