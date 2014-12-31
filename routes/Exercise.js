module.exports = (function (ExerciseController, Validators) {
  return [
    {
      type: 'get',
      url: '/user/:id/exercise',
      func: ExerciseController.read,
      roles: ['self']
    },

    {
      type: 'post',
      url: '/user/:id/exercise',
      func: ExerciseController.create,
      roles: ['self']
    }
  ];
})(
  require('../controller/ExerciseController'),
  require('../validators')
);
