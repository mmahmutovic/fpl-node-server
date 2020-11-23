const dotenv = require('dotenv');

dotenv.config();
const db = require('./db');
const users = require('./data.json');

const { User } = db;

User.insertMany(users);
// eslint-disable-next-line no-console
console.log('Database seeded! Press CTRL+C to exit the process :)');
