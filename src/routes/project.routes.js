const router = require('express').Router();

const errorHandler = require('../middlewares/errorHandler');
const projectAuthorize = require('../middlewares/projectAuthorize');
const projectController = require('../controllers/project.controller');

router
  .route('/')

  .get(projectAuthorize.read, projectController.readAll)
  //   Only admin can create new project
  .post(projectAuthorize.create, projectController.create)
  .all(errorHandler.methodNotAllowed);

router
  .route('/:id')
  .get(projectAuthorize.read, projectController.readById) // READ
  //  Only admin and project manager can update teh project
  // Admin has full access but PM can update only the projects he/she is assigned
  .put(projectAuthorize.update, projectController.update) // UPDATE
  .delete(projectAuthorize.del, projectController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

// Get tasks associated with project ID
router.route('/:id/tasks').get(projectController.getTasks);
// Get all the users associated with project Id
router.route('/:id/users').get(projectController.getUsers).post(projectController.addUsers);
module.exports = router;
