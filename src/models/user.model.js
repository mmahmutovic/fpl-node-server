const mongoose = require('mongoose');

const { Schema } = mongoose;
const schema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  ssn: {
    type: String,
  },
  externalUser: {
    type: Boolean,
  },
});

schema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', schema);
