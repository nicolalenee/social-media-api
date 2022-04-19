const router = require('express').Router();

// import the api routes
const apiRoutes = require('./api');

// add `/api` prefix to routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send(`<h1>What are you looking at this 404 error for? 🤔</h1>`);
});

module.exports = router;