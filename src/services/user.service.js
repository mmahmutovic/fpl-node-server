const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../_helpers/error-handler');
const db = require('../db/db');

const saltRounds = 10;
const { User } = db;

async function auth(req, res) {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return errorHandler(
        new Error(
          'Unable to find the user, either username is invalid or you have made an unauthorized request!',
        ),
        req,
        res,
        401,
      );
    }
    const { password } = user;
    const isMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, password, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    if (!isMatch) { return errorHandler(new Error('Password is incorrect'), req, res, 401); }
    // create a jwt token that is valid for 7 days
    const token = jwt.sign(
      {
        sub: user.id,
      },
      process.env.secret,
      {
        expiresIn: '7d',
      },
    );

    return res.status(200).json({
      user: {
        username: user.username,
      },
      token,
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return errorHandler(new Error('Invalid token!'), req, res);
  }
}

async function createUser(req, res) {
  try {
    const { username } = req.body;
    const { password } = req.body;
    if (!username || !password) {
      return errorHandler(new Error('Enter username and password!'), req, res);
    }
    if (await User.findOne({ username })) {
      return errorHandler(
        new Error('User already exists with that username'),
        req,
        res,
      );
    }
    const hashed = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    const user = new User({ username, password: hashed });
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

async function addETHAddress(req, res) {
  try {
    const loggedUser = await User.findById(req.user.sub);
    loggedUser.ethAddress = req.body.ethAddress;
    await loggedUser.save();
    return res.status(200).send(loggedUser);
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

async function getUser(req, res) {
  try {
    const loggedUser = await User.findById(req.user.sub);
    return res.status(200).send(loggedUser);
  } catch (error) {
    return errorHandler(error, req, res);
  }
}
module.exports = {
  auth,
  getUsers,
  createUser,
  addETHAddress,
  getUser,
};
