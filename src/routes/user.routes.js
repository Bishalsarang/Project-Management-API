const router = require('express').Router();
const userController = require('../controllers/user.controller');
const errorHandler = require('../middlewares/errorHandler');
const userAuthorize = require('../middlewares/userAuthorize');

router.route('/').get(userAuthorize.read, userController.readAll).all(errorHandler.methodNotAllowed);
// api/users/id
router
  .route('/:id')
  .get(userAuthorize.read, userController.readById) // READ
  .put(userAuthorize.update, userController.update) // UPDATE
  .delete(userAuthorize.del, userController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

module.exports = router;
