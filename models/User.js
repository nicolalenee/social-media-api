const { Schema, model } = require('mongoose');

// create the User schema
const UserSchema = new Schema(
  {
    // username is a string, unique, required, and trimmed
    username: {
      type: String,
      required: 'You need to provide a username.',
      trim: true,
      unique: true
    },
    // email address is a string, required, unique, and valid
    email: {
      type: String,
      match: [
        /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,15})/,
         'You need to provide a valid email address.'
        ],
      required: 'You need to provide an email address!',
      trim: true,
      unique: true,
    },
    // thoughts is an array of ids that references the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    // friends is an array of ids that self-references the User model 
    friends: [ this ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
 
);

// virtual that counts how many friends a user has 
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the model using the schema 
const User = model('User', UserSchema);

// export the model we just created
module.exports = User;