module.exports = (function (UserController) {
	return [
    {
      type: 'get',
      url: '/user/me',
      func: UserController.me
    },

    {
      type: 'get',
      url: '/user/:id',
      func: UserController.read,
      authenticate: true
    },

		{
			type: 'post',
			url: '/user',
			func: UserController.create
		},

		{
			type: 'put',
			url: '/user/:id',
			func: UserController.update
		}
	]
})(
	require('../controller/UserController')
);
