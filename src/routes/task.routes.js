const router = require('express').Router();

const taskController = require('../controllers/task.controllers');
const errorHandler = require('../middlewares/errorHandler');

router.route('/').get(taskController.readAll).post(taskController.create).all(errorHandler.methodNotAllowed);

router
  .route('/:id')
  .get(taskController.readById) // READ
  .put(taskController.update) // UPDATE
  .delete(taskController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

router.route('/:id/users').get(taskController.getUsers);

module.exports = router;
