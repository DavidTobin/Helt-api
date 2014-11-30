var _ = require('underscore'),
rolesCache = {};

module.exports = (function (routes) {
  function checkRole (roles, req) {
    var isGood = false;

    _.each(roles, function (role) {
      rolesCache[role] = rolesCache[role] || require('../roles/' + role);

      isGood = rolesCache[role](req);
    });

    return isGood;
  }

  return {
    checkRole: checkRole
  };
})(
  require('../routes')
);
