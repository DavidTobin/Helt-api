module.exports = (function (About, User) {
	return About.concat(User);
})(
	require('./About'),
	require('./User')
);