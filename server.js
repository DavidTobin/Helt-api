var ServerConfig 	  = require('./config/Server'),
		ServerHelper    = require('./helper/Server'),
    AuthHelper      = require('./helper/Authentication'),
    RoleHelper      = require('./helper/Roles'),
		Routes			 	  = require('./routes'),
		restify 			  = require('restify'),
		_							  = require('underscore'),
    db              = require('./models'),
    hash            = require('password-hash'),
    jwt             = require('jwt-simple'),
		server;

// Required for authorization
restify.CORS.ALLOW_HEADERS.push('authorization');

server = restify.createServer();

// Mixins
server.use(ServerHelper.logRequest);
server.use(ServerHelper.ensureJSON);
server.use(ServerHelper.customHeaders);
server.use(AuthHelper.checkToken);
server.use(restify.bodyParser());
server.use(restify.throttle(ServerConfig.throttle));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.CORS(ServerConfig.CORS));
server.use(restify.queryParser());
server.use(restify.fullResponse());

// Route handling
_.each(Routes, function (options) {
  server[options.type](options.url, function (req, res, next) {
    // Check roles
    if (options.roles) {
      if (!RoleHelper.checkRole(options.roles, req)) {
        return res.send(403);
      }
    }

    return options.func(req, res, next);
  });
});

// Sync database
require('./models').sequelize.sync();

// ....annnnnd start
server.listen(ServerConfig.port, function () {
	ServerHelper.startServerLog(server);
});
