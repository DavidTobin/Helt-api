module.exports = (function (AuthenticationController) {
  return [
    {
      type: 'post',
      url: '/authentication/token',
      func: AuthenticationController.token
    }
  ];
})(
  require('../controller/AuthenticationController')
);
