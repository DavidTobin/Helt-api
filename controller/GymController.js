module.exports = (function (db) {
  'use strict';
  var DAY = 1000 * 60 * 24;

  var GymController =  {
    _verify: function (type, body) {
      switch (type) {
        case 'create':
          return body && body.name;

        case 'updateGym':
          return body && body.gymId;
      }
    },

    _sendError: function (err) {
      return this.json(400, {
        error: err
      });
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
      },

      updateGym: function (req, res, next) {
        if (!GymController._verify('updateGym', req.body)) {
          return GymController._sendError.bind(res)('Unable to update Gym');
        }

        console.log(req.user);

        db.User
          .setGym(req.body.gymId)
          .success(function (user) {
            return res.json(user);
          })
          .error(function (err) {
            return GymController._sendError.bind(res)(err);
          });
      }
    }
  }

  return GymController.API;
})(
  require('../models')
);
