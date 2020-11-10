const errorHandler = require('../_helpers/error-handler');
const db = require('../db/db');

const { Bet } = db;

async function fetchGames(req, res) {
  try {
    // Fetch all active games
    const result = await Bet.find({ finished: false });
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchUsersGames(req, res) {
  try {
    // Find all games that requested user has active
    const result = await Bet.find({ players: { $elemMatch: req.user.sub }, finished: false });
    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchInvitedGames(req, res) {
  try {
    // Fetch all invites
    const result = await Bet.find({ invitedPlayers: { $elemMatch: req.user.sub } });

    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, req, res);
  }
}
async function fetchHistory(req, res) {
  try {
    // Fetch history of all games that user has been playing
    const result = await Bet.find({ players: { $elemMatch: req.user.sub }, finished: true });
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
