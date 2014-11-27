var ServerConfig 	  = require('./config/Server'),
		ServerHelper    = require('./helper/Server'),
		Routes			 	  = require('./routes'),
		restify 			  = require('restify'),
		_							  = require('underscore'),
    db              = require('./models'),
    hash            = require('password-hash'),
		server				  = restify.createServer();

// Mixins
server.use(ServerHelper.logRequest);
server.use(ServerHelper.ensureJSON);
server.use(ServerHelper.customHeaders);
server.use(restify.bodyParser());
server.use(restify.CORS(ServerConfig.CORS));
server.use(restify.throttle(ServerConfig.throttle));

server.use(function (req, res, next) {
  console.log(req.headers.Authorization);

  return next();
});

// Route handling
_.each(Routes, function (options) {
  server[options.type](options.url, options.func);
});

// What happens with the request?
server.on('after', ServerHelper.logAfterRequest);

// Sync database
require('./models').sequelize.sync();

// ....annnnnd start
server.listen(ServerConfig.port, function () {
	ServerHelper.startServerLog(server);
});
