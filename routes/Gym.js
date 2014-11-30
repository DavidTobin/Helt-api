module.exports = (function (GymController) {
  return [
    {
      type: 'post',
      url: '/gym',
      func: GymController.create,
      roles: []
    },

    {
      type: 'get',
      url: '/user/:id/gym/:gymId/work',
      func: GymController.readWork,
      roles: ['loggedIn']
    }
  ]
})(
  require('../controller/GymController')
);
