module.exports = (function (db) {
  'use strict';

  var jwt           = require('jwt-simple'),
      ServerConfig  = require('../config/Server'),
      DAY           = 1000 * 60 * 60 * 24,
      AuthenticationController;

  AuthenticationController = {
    _verify: function (body) {
      return body && body.email && body.password;
    },

    _error: function (error) {
      return this.json(400, error);
    },

    API: {
      token: function (req, res, next) {
        var token = '';

        if (!AuthenticationController._verify(req.body)) {
          return AuthenticationController._error.bind(res)({
            key: 'missing_parameters',
            msg: 'Missing parameters'
          });
        }

        db.User.find({
          where: {
            email: req.body.email
          }
        })
        .success(function (user) {
          console.log(user);
          if (!user) {
            return AuthenticationController._error.bind(res)({
              key: 'incorrect_login',
              msg: 'Incorrect details provided'
            });
          }

          if (!user.verifyPassword(req.body.password)) {
            return AuthenticationController._error.bind(res)({
              key: 'incorrect_password',
              msg: 'Incorrect password provided'
            });
          }

          // Generate a token
          token = jwt.encode({
            iss: user.id,
            exp: +new Date() + (DAY * 10),
          }, ServerConfig.tokenSecret);

          return res.json({
            token: token,
            user: user.toJSON(),
            expires: +new Date() + (DAY * 10)
          });
        })
        .error(function (err) {
          return AuthenticationController._error.bind(res)(err);
        });
      }
    }
  }

  return AuthenticationController.API;
})(
  require('../models')
);
