"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/Database')[env];
var _         = require('underscore');
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

var devUsers  = require('../devusers.json'), devBuildUsers = [];

_.each(devUsers.results, function (devUser) {
  console.log(devUser);
  devBuildUsers.push({
    name: [
      devUser.user.name.first.charAt(0).toUpperCase() + devUser.user.name.first.slice(1),
      devUser.user.name.last.charAt(0).toUpperCase() + devUser.user.name.last.slice(1)
    ].join(' '),
    email: devUser.user.email,
    password: devUser.user.password,
    gender: devUser.user.gender
  });
});

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

      _.each(config.defaultUsers.concat(devBuildUsers), function (defaultUser) {
        db.User
          .build(defaultUser)
          .save()
          .error(function (err) {
            // return console.error(err);
          })
          .success(function (user) {
            user
              .addRole(defaultUser.roles, true)
              .save()
              .success(function (u) {
                console.log(user.name + ' created...', u.roles);
              });
          });
      });
    });
}, 1000);

module.exports = db;
