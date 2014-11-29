module.exports = (function () {
	return {
		port: 80,
		environment: 'development',

		CORS: {
      origins: ['*']
    },

		throttle: {
			rate: 5,
			burst: 10,
			ip: true
		},

    tokenSecret: 'mymilkshakebringsalltheboystotheyard'
	};
})();
