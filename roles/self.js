module.exports = function (req) {
  return req.user && (req.user.id === parseInt(req.params.id) || req.user.isSuperUser());
}
