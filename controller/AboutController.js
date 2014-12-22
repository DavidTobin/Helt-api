module.exports = (function (_, AboutConfig, Controller) {
	'use strict';

	var AboutController = _.extend({}, Controller, {
		API: {
			index: function (req, res) {
				return res.json(418, AboutConfig);
			}
		}
	});

	return AboutController.API;
})(
  require('underscore'),
	require('../config/About'),
  require('./Controller')
);
