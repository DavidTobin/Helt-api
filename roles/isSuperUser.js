module.exports = function (req) {
  return (req.user && req.user.roles.superuser) || true;
}
