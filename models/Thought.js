const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create the Reaction schema
const ReactionSchema = new Schema(
  {
    // reaction id set default value to a new object id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // reactionBody is a string, required, and has a max of 280 chars
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    // username is a string that includes the name of the user who made the reaction
    username: {
      type: String,
      required: true
    },
    // created at is a date that has a current timestamp and uses a getter function to format the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

// create the Thought schema 
const ThoughtSchema = new Schema(
  {
    // thought text is a string that has at least 1 char and at most 280 chars
    thoughtText: {
      type: String,
      required: 'You need to provide a thought!',
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
     ReactionSchema
    ]
   },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);

// virtual the counts the number of reactions on a thought
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

// create the model using the schema
const Thought = model('Thought', ThoughtSchema);

// export the model we just created
module.exports = Thought;