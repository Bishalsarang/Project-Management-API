const router = require('express').Router();

const { isAuthenticated } = require('./middlewares/authenticate');
const authorize = require('./middlewares/authorize');
const { ROLE } = require('./constants');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, authorize.isAuthorized([ROLE.admin]), userRoutes);
router.use('/projects', isAuthenticated, authorize.isAuthorized([ROLE.admin]), projectRoutes);

module.exports = router;
