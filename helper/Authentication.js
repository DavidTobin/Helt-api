var jwt    = require('jwt-simple'),
    ServerConfig = require('../config/Server');

module.exports = (function (db) {
  function checkToken (req, res, next) {
    var token = (req.body && req.body.token) || req.headers['Authentication'];
    console.log(req.headers);
    if (token) {
      try {
        var decoded = jwt.decoded(token, ServerConfig.secret);

        console.log(decoded);

        next();
      } catch (err) {
        next();
      }
    } else {
      next();
    }
  }

  return {
    checkToken: checkToken
  };
})(
  require('../models')
);
