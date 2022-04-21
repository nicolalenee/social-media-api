const router = require('express').Router();
const { 
  addThought, 
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// post a new thought to a specific user
  // -->  api/thoughts/userId
router.route('/:userId').post(addThought);

// update a thought by adding a reaction or delete a thought from the user it's attached to
  // --> api/thoughts/userId/thoughtId
router.route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought);

// delete a reaction from a thought by the thought's id
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

// export the routes`
module.exports = router;
// localhost:3001/api/thoughts/6260c62a4547ae0c713bb23e/6260c6b84547ae0c713bb243/6260c84eae7a0f195c760897