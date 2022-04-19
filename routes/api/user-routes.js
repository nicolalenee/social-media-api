const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// get all and post user routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// get one, put, and delete routes by ID
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// export the user routes
module.exports = router;