module.exports = function (req) {
  return !! req.user.id;
}
