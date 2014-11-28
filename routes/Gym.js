module.exports = (function (GymController) {
  return [
    {
      type: 'get',
      url: '/gym/work',
      func: GymController.readWork
    }
  ]
})(
  require('../controller/GymController')
);
