const router = require('express').Router();
const userRoutes = require('./user-routes');

// add the `/users` prefix to routes
router.use('/users', userRoutes);

module.exports = router;