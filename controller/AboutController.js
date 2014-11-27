module.exports = (function (AboutConfig) {
	'use strict';

	var AboutController = {
		API: {
			index: function (req, res, next) {
				return res.json(418, AboutConfig);
			}
		}
	};

	return AboutController.API;
})(
	require('../config/About')
);