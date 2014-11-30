module.exports = (function (UserController) {
	return [
    {
      type: 'get',
      url: '/user/:id',
      func: UserController.read,
      authenticate: true,
      roles: ['self']
    },

		{
			type: 'post',
			url: '/user',
			func: UserController.create
		},

		{
			type: 'put',
			url: '/user/:id',
			func: UserController.update,
      roles: ['self']
		}
	]
})(
	require('../controller/UserController')
);
