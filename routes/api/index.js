const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add the `/thoughts` prefix to the thought routes
router.use('/thoughts', thoughtRoutes);
// add the `/users` prefix to routes
router.use('/users', userRoutes);


module.exports = router;