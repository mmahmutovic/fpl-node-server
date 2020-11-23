const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  username: {
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
  games: {
    type: [],
  },
});

schema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', schema);
