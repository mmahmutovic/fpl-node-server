const errorHandler = require('../_helpers/error-handler');
const db = require('../db/db');

const { Bet } = db;

async function fetchGames(req, res) {
  try {
    const result = await Bet.find();
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchUsersGames(req, res) {
  try {
    const result = await Bet.find();
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchInvitedGames(req, res) {
  try {
    const result = await Bet.find();
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchHistory(req, res) {
  try {
    const result = await Bet.find();
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
module.exports = {
  fetchGames,
  fetchUsersGames,
  fetchInvitedGames,
  fetchHistory,
};
