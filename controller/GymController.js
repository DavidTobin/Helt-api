module.exports = (function (db) {
  'use strict';
  var DAY = 1000 * 60 * 60 * 24;

  var GymController =  {
    _verify: function (type, body) {
      switch (type) {
        case 'create':
          return body && body.name;

        case 'read':
          return body && body.gymId && typeof(parseInt(body.gymId)) === 'number';

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

      readAll: function (req, res, next) {
        db.Gym
          .findAll()
          .success(function (gyms) {
            return res.json(gyms);
          })
          .error(function (error) {
            return GymController._sendError.bind(res)(error);
          });
      },

      read: function (req, res, next) {
        if (!GymController._verify('read', req.user)) {
          return GymController._sendError.bind(res)('Unable to find Gym');
        }

        if (parseInt(req.params.gymId) !== req.user.gymId) {
          return res.send(401);
        }

        db.Gym
          .find(parseInt(req.user.gymId))
          .success(function (gym) {
            gym
              .addUser(req.user.id)
              .success(function (user) {
                return res.json(gym);
              })
              .error(function (err) {
                return GymController._sendError.bind(res)(err);
              });
          });
      },

      update: function (req, res, next) {

      },

      remove: function (req, res, next) {

      },

      readWork: function (req, res, next) {
        return res.json([
          {
            date: +new Date() - (DAY),
            calories: -1221
          },

          {
            date: +new Date() - (DAY * 2),
            calories: -1200
          },

          {
            date: +new Date() - (DAY * 30),
            calories: -723
          },

          {
            date: +new Date() - (DAY * 25),
            calories: -500
          }
        ]);
      },

      updateGym: function (req, res, next) {
        if (!GymController._verify('updateGym', req.body)) {
          return GymController._sendError.bind(res)('Unable to update Gym');
        }

        db.Gym
          .find(req.body.gymId)
          .success(function (gym) {
            gym
              .addUser(req.user.id)
              .success(function (user) {
                return res.json({
                  gym: gym,
                  user: user
                });
              })
              .error(function (err) {
                return GymController._sendError.bind(res)(err);
              });
          });
      }
    }
  }

  return GymController.API;
})(
  require('../models')
);
