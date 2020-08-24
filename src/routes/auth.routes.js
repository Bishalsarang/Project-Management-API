const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const authorize = require('../middlewares/authorize');
const { isAuthenticated } = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');

router.route('/login').post(authController.login).all(errorHandler.methodNotAllowed);
router.route('/logout').post().all(errorHandler.methodNotAllowed);
router
  .route('/register')
  .post(isAuthenticated, authorize.isAdmin, authController.register)
  .all(errorHandler.methodNotAllowed);

module.exports = router;
