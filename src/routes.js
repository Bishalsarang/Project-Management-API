const router = require('express').Router();

const { isAuthenticated } = require('./middlewares/authenticate');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const projectRoutes = require('./routes/project.routes');
const commentRoutes = require('./routes/comment.routes');

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);
router.use('/tasks', isAuthenticated, taskRoutes);
router.use('/comments', isAuthenticated, commentRoutes);
router.use('/projects', isAuthenticated, projectRoutes);

module.exports = router;
