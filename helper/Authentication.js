var jwt    = require('jwt-simple'),
    ServerConfig = require('../config/Server');

module.exports = (function (db) {
  return {
    checkToken: function (req, res, next, err) {
      req.authorization = {};

      if (req.headers['authorization'] && req.headers['authorization'].length) {
        req.authorization.key     = new Buffer(req.headers['authorization'], 'base64').toString();
        req.authorization.decoded = jwt.decode(req.authorization.key, ServerConfig.tokenSecret);

        if (req.authorization.decoded.iss) {
          db.User
            .find(req.authorization.decoded.iss)
            .success(function (user) {
              req.user = user;

              // Change me ID to user id
              if (req.params.id === 'me') {
                req.params.id = req.user.id;
              }

              return next();
            })
            .error(function (err) {
              return next(err);
            });
        }
      } else {
        return next(err);
      }
    }
  };
})(
  require('../models')
);
