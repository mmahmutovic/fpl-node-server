const mongoose = require('mongoose');
const users = require('../models/user.model');
const bets = require('../models/bet.model');

mongoose.connect(process.env.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

module.exports = {
  User: users,
  Bet: bets,
};
