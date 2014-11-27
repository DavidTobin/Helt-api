module.exports = (function () {
	'use strict';

	return {
		dialect: 'postgresql',
		host: 'localhost',

		sync: {
			force: false
		},

		log: false,

		development: {
			database: 'helt_devbase',
			username: 'postgres',
			password: 'admin'
		},

		production: {
			database: 'helt_prodbase'
		}
	};
})();