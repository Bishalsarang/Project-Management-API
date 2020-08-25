const router = require('express').Router();

const { isAuthenticated } = require('./middlewares/authenticate');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);
router.use('/projects', isAuthenticated, projectRoutes);
module.exports = router;
