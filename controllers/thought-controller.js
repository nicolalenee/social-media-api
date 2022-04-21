const { Thought, User } = require('../models');

const thoughtController = {
  // add a Thought to a User
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      )
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
     
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id !'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  // add a reaction to a thought (update a thought on a user)
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },
  // remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought with this id! '});
      }
      return User.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id! '});
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => res.json(err))
  }
}

module.exports = thoughtController;