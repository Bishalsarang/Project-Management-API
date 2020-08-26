const router = require('express').Router();

const { ROLE } = require('./constants');

const authorize = require('./middlewares/authorize');
const { isAuthenticated } = require('./middlewares/authenticate');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const projectRoutes = require('./routes/project.routes');
const commentRoutes = require('./routes/comment.routes');

router.use('/auth', authRoutes);
router.use('/comments', isAuthenticated, commentRoutes);
router.use('/users', isAuthenticated, authorize.isAuthorized([ROLE.admin]), userRoutes);
router.use(
  '/tasks',
  isAuthenticated,
  //   Task route can be accessed by anyone regardless of permission but the access level vary
  authorize.isAuthorized([ROLE.admin, ROLE.projectManager, ROLE.teamLeader, ROLE.engineer]),
  taskRoutes
);
router.use('/projects', isAuthenticated, projectRoutes);

module.exports = router;
