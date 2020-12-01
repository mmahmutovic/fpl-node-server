const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  ethAddress: {
    type: String,
  },
  balance: {
    type: Number,
  },
  createdGames: {
    type: [],
  },
  acceptedGames: {
    type: [],
  },
  profilePicture: {},
  friends: { type: [] },
  requests: { type: [] },
  gamePoints: {
    type: Number,
  },
});

schema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', schema);
