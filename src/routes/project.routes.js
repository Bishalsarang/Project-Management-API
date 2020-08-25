const router = require('express').Router();

const { ROLE } = require('../constants');
const authorize = require('../middlewares/authorize');
const projectController = require('../controllers/project.controller');
const errorHandler = require('../middlewares/errorHandler');

router
  .route('/')
  // Only Admin and Project Manager can view all the projects
  .get(authorize.isAuthorized([ROLE.admin, ROLE.projectManager]), projectController.readAll)
  //   Only admin can create new project
  .post(authorize.isAuthorized([ROLE.admin]), projectController.create)
  .all(errorHandler.methodNotAllowed);

router
  .route('/:id')
  .get(authorize.isAuthorized([ROLE.admin]), projectController.readById) // READ
  .put(authorize.isAuthorized([ROLE.admin]), projectController.update) // UPDATE
  .delete(authorize.isAuthorized([ROLE.admin]), projectController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

module.exports = router;
