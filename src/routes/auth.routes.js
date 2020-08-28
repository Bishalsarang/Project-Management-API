const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const authorize = require('../middlewares/authorize');

const { ROLE } = require('../constants');
const { isAuthenticated } = require('../middlewares/authenticate');
const errorHandler = require('../middlewares/errorHandler');

router.route('/login').post(authController.login).all(errorHandler.methodNotAllowed);
router.route('/logout').post().all(errorHandler.methodNotAllowed);
router
  .route('/register')
  .post(isAuthenticated, authorize.isAuthorized([ROLE.admin]), authController.register)
  .all(errorHandler.methodNotAllowed);

module.exports = router;
