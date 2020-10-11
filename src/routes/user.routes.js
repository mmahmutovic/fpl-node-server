const express = require('express');

const router = express.Router();
const userService = require('../services/user.service');

function getExternalUsers(req, res) {
  userService.getExternalUsers(req, res);
}
function createExternalUser(req, res) {
  userService.createExternalUser(req, res);
}
function createInternalUser(req, res) {
  userService.createInternalUser(req, res);
}
function login(req, res) {
  userService.auth(req, res);
}

router.get('/', getExternalUsers);
router.post('/addUser', createExternalUser);
router.post('/signup', createInternalUser);
router.post('/login', login);

module.exports = router;
