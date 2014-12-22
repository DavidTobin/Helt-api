'use strict';

module.exports = (function (GymController) {
  return [
    {
      type: 'get',
      url: '/gym',
      func: GymController.readAll,
      roles: ['loggedIn']
    },

    {
      type: 'post',
      url: '/gym',
      func: GymController.create,
      roles: ['loggedIn', 'isSuperUser']
    },

    {
      type: 'get',
      url: '/user/:id/gym/:gymId',
      func: GymController.read,
      roles: ['self']
    },

    {
      type: 'put',
      url: '/user/:id/gym',
      func: GymController.updateGym,
      roles: ['self']
    },

    {
      type: 'get',
      url: '/user/:id/gym/:gymId/work',
      func: GymController.readWork,
      roles: ['self']
    }
  ];
})(
  require('../controller/GymController')
);
