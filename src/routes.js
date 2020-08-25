const router = require('express').Router();

const { ROLE } = require('./constants');

const authorize = require('./middlewares/authorize');
const { isAuthenticated } = require('./middlewares/authenticate');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const projectRoutes = require('./routes/project.routes');

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, authorize.isAuthorized([ROLE.admin]), userRoutes);
router.use('/projects', isAuthenticated, authorize.isAuthorized([ROLE.admin]), projectRoutes);
router.use('/tasks', isAuthenticated, authorize.isAuthorized([ROLE.admin]), taskRoutes);

module.exports = router;
