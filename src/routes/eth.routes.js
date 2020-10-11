const express = require('express');

const router = express.Router();
const ethService = require('../services/eth.service');

function testEth(req, res) {
  ethService.acceptInvite(req, res);
}
function acceptInvite(req, res) {
  ethService.acceptInvite(req, res);
}
router.get('/test', testEth);
router.post('/acceptInvite', acceptInvite);

module.exports = router;
