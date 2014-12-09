module.exports = (function (db) {
	'use strict';

	var UserController =  {
    _verify: function (type, data) {
      switch (type) {
        case 'create':
          return data && data.name && data.email;

        case 'update':
          return data && data.id;
      }
    },

		_sendError: function (err) {
			return this.json(400, {
				error: err
			});
		},

		_createUser: function (req, res, next) {
			var user = db.User.build(req.body);

      if (!user.validate()) {
        UserController._sendError.bind(res)(user.validate());
      }

      user
      .validate()
			.save()
			.success(function (user) {
				return res.json(user);
			})
      .error(function (err) {
        return res.json(400, {
          error: err
        });
      });
		},

		_updateUser: function (req, res, next) {
			this
				.updateAttributes(req.body)
        .validate()
				.success(function (user) {
					return res.json(user);
				})
        .error(function (err) {
          return UserController._sendError.bind(res)(err);
        });
		},

		API: {
      read: function (req, res) {
        if (parseInt(req.params.id) > 0) {
          db.User
            .find(req.params.id)
            .success(function (user) {
              if (!user) {
                return UserController._sendError.bind(res)('User not found');
              }

              return res.json(user);
            });
        } else {
          return UserController._sendError.bind(res)('Missing parameter: id');
        }
      },

      readAll: function (req, res) {
      	db.User
      		.findAll()
      		.success(function (users) {
      			return res.json(users);
      		})
      		.error(function (error) {
      			return UserController._sendError.bind(res)(error);
      		});
      },

			create: function (req, res, next) {
				if (req.user) {
					return UserController._sendError.bind(res)('You are already logged in');
				}

        if (!UserController._verify('create', req.body)) {
          return UserController._sendError.bind(res)('Missing required parameter');
        }

				return UserController._createUser(req, res, next);
			},

			update: function (req, res, next) {
        if (!UserController._verify('update', req.params)) {
          return UserController._sendError.bind(res)('No user to update');
        }

        // Make sure roles aren't updated
        if (req.body.roles && !req.user.isSuperUser()) {
        	req.body.roles = req.user.roles;
        }

				db.User
					.find(req.params.id)
					.success(function (user) {
						if (!user) {
							return UserController._sendError.bind(res)('User not found');
						}

						return UserController._updateUser.bind(user)(req, res, next);
					});
			}
		}
	};

	return UserController.API;
})(
	require('../models')
);
