module.exports = (function (db) {
  'use strict';

  var AuthenticationController =  {
    API: {
      token: function (req, res, next) {
        res.json({
          token: 'awoid12$12o1e910)*wu1'
        });
      }
    }
  }

  return AuthenticationController.API;
})(
  require('../models')
);
