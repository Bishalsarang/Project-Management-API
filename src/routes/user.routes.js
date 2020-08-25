const router = require('express').Router();
const userController = require('../controllers/user.controller');
const errorHandler = require('../middlewares/errorHandler');

router.route('/').get(userController.readAll).all(errorHandler.methodNotAllowed);
// api/users/id
router
  .route('/:id')
  .get(userController.readById) // READ
  .put(userController.update) // UPDATE
  .delete(userController.del) // DELETE
  .all(errorHandler.methodNotAllowed);
module.exports = router;
