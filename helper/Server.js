var _ 					= require('underscore'),
		colors			= require('colors'),
		heartString = '';

module.exports = (function () {
	function logRequest (req, res, next) {
		console.info((new Date()).toGMTString().blue, [req.method.red, req.url.green.underline, (req.headers['x-forwarded-for'] || req.connection.remoteAddress).yellow].join(' '));

		return next();
	}

	function logAfterRequest (req, res, next) {
		console.info((new Date()).toGMTString().blue, 'Request Status'.dim, res.statusCode);
	}

	function ensureJSON (req, res, next) {
		req.accepts('application/json');

		return next();
	}

	function customHeaders (req, res, next) {
		res.setHeader('Hello', 'Darkness my old friend');

		return next();
	}

	function startServerLog (server) {
		_.each(new Array(19), function () {
			heartString += '\u2665 ';
		});

		console.info(heartString.red);
		console.info('\u2665'.red + '                ' + 'HELT'.red.bold + '               ' + '\u2665'.red);
		console.info('\u2665'.red + '                                   ' + '\u2665'.red);
		console.info('\u2665 '.red + '  Server: %s    '.italic + ' \u2665'.red, server.url.green + new Array(20 - server.url.length).join(' '));
		console.info(heartString.red + '\n\n');
	}

	return {
		customHeaders: customHeaders,
		ensureJSON: ensureJSON,
		startServerLog: startServerLog,
		logRequest: logRequest,
		logAfterRequest: logAfterRequest
	};
})();
