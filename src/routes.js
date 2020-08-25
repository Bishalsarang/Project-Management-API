const router = require('express').Router();

const { isAuthenticated } = require('./middlewares/authenticate');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

router.use('/auth', authRoutes);
router.use('/users', isAuthenticated, userRoutes);

module.exports = router;
