const express = require('express');

const router = express.Router();
const userService = require('../services/user.service');

function getExternalUsers(req, res) {
  userService.getExternalUsers(req, res);
}
function createExternalUser(req, res) {
  userService.createExternalUser(req, res);
}
function login(req, res) {
  userService.auth(req, res);
}
function signup(req, res) {
  userService.signup(req, res);
}

router.get('/', getExternalUsers);
router.post('/addUser', createExternalUser);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
