const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  betId: {
    type: String,
  },
  betAmount: {
    type: Number,
  },
  numberOfPlayers: {
    type: Number,
  },
  unlockDate: {
    type: Number,
  },
  winners: {
    type: [],
  },
  players: {
    type: [],
  },
});

schema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Bet', schema);