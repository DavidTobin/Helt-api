module.exports = (function (AuthenticationController, Validators) {
  console.log(Validators);
  return [
    {
      type: 'post',
      url: '/authentication/token',
      func: AuthenticationController.token,
      validator: Validators.authentication.token
    }
  ];
})(
  require('../controller/AuthenticationController'),
  require('../validators')
);
