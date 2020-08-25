const router = require('express').Router();

const projectController = require('../controllers/project.controller');
const errorHandler = require('../middlewares/errorHandler');

router.route('/').get(projectController.readAll).post(projectController.create).all(errorHandler.methodNotAllowed);
// api/projects/id
router
  .route('/:id')
  .get(projectController.readById) // READ
  .put(projectController.update) // UPDATE
  .delete(projectController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

module.exports = router;
