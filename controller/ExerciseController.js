/* global require, module */

module.exports = (function (_, db, Controller) {
  'use strict';

  var ExerciseController =  _.extend({}, Controller, {
    _createExercise: function (req, res) {
      var exercise = db.Exercise.build(req.body);

      exercise
      .save()
      .success(function (exercise) {
        exercise
          .setUser(req.user.id)
          .success(function (exercise) {
            return res.json(exercise);
          });
      })
      .error(function (err) {
        return res.json(400, {
          error: err
        });
      });
    },

    API: function () {
      var $super = this;

      return {
        read: function (req, res) {
          db.Exercise
            .findAll({
              where: {
                userId: req.user.id
              }
            })
            .success(function (exercise) {
              return res.json(exercise || []);
            });
        },

        create: function (req, res, next) {
          return $super._createExercise(req, res, next);
        }
      };
    }
  });

  return ExerciseController.API.bind(ExerciseController)();
})(
  require('underscore'),
  require('../models'),
  require('./Controller')
);
