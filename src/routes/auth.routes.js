const router = require('express').Router();
const authController = require('../controllers/auth.controllers');
const authorize = require('../middlewares/authorize');
const errorHandler = require('../middlewares/errorHandler');

router.route('/login').post().all(errorHandler.methodNotAllowed);
router.route('/logout').post().all(errorHandler.methodNotAllowed);
router.route('/register').post(authorize.isAdmin, authController.register).all(errorHandler.methodNotAllowed);

module.exports = router;
