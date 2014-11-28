module.exports = (function (db) {
  'use strict';
  var DAY = 1000 * 60 * 24;

  var GymWorkController =  {
    API: {
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

  return GymWorkController.API;
})(
  require('../models')
);
