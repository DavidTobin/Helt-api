module.exports = (function () {
	return {
		port: 80,
		environment: 'development',

		CORS: {
      origins: ['*'],
      headers: []
    },

		throttle: {
			rate: 5,
			burst: 10,
			ip: true
		},

    tokenSecret: 'mymilkshakebringsalltheboystotheyard'
	};
})();
