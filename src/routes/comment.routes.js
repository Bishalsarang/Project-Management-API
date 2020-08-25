const router = require('express').Router();

const commentController = require('../controllers/comment.controller');
const errorHandler = require('../middlewares/errorHandler');

router.route('/').get(commentController.readAll).post(commentController.create).all(errorHandler.methodNotAllowed);

router
  .route('/:id')
  .get(commentController.readById) // READ
  .put(commentController.update) // UPDATE
  .delete(commentController.del) // DELETE
  .all(errorHandler.methodNotAllowed);

module.exports = router;
