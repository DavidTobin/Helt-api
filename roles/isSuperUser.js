module.exports = function (req) {
  return req.user && req.user.roles.indexOf('admin') !== -1;
}
