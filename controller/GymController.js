module.exports = (function (db) {
  'use strict';
  var DAY = 1000 * 60 * 24;

  var GymController =  {
    _verify: function (type, body) {
      switch (type) {
        case 'create':
          return body && body.name;
      }
    },

    API: {
      create: function (req, res, next) {
        if (!GymController._verify('create', req.body)) {
          db.Gym
            .build(req.body)
            .save()
            .success(function (gym) {
              return res.json({
                gym: gym
              });
            })
            .error(function (error) {
              res.json(400, {
                error: error
              });
            });
        }
      },

      read: function (req, res, next) {

      },

      update: function (req, res, next) {

      },

      remove: function (req, res, next) {

      },

      readWork: function (req, res, next) {
        res.json([
          {
            date: +new Date() - (DAY),
            calories: -231
          },

          {
            date: +new Date() - (DAY * 2),
            calories: -138
          }
        ]);
      }
    }
  }

  return GymController.API;
})(
  require('../models')
);
