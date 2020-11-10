const Web3 = require('web3');
const Betting = require('../../node_modules/fpl-contract/build/contracts/Betting.json');

const etherUrl = 'http://localhost:8545';
const contractAddress = Betting.networks[5777].address;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(etherUrl));
const contractInstance = new web3.eth.Contract(Betting.abi, contractAddress);
const db = require('../db/db');

const profit = 1.02;
const { Bet } = db;

async function createGame(req, res) {
  const resultHash = await contractInstance.methods.balanceOf(contractAddress).send({ from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1' });
  const bet = new Bet();
  bet.betId = resultHash.betId;
  bet.betAmount = req.body.betAmount;
  bet.unlockDate = new Date(req.body.unlockDate).getTime();
  bet.owner = req.user.sub;
  await bet.save();
  await contractInstance.createGame(req.body.amount, bet.unlockDate).send({ from: req.body.address, to: contractInstance, value: web3.utils.toWei(req.body.amount * profit, 'ether') });
  await contractInstance.transferToContract(req.body.amount)
    .send({
      from: req.body.address,
      to: contractAddress,
      value: web3.utils.toWei(req.body.amount * profit, 'ether'),
    });
  return res;
}

async function invitePlayers(req, res) {
  const bet = await Bet.findOneAndUpdate({ _id: req.body.betId },
    { $push: { invitedUsers: req.invitedUsers } });
  res.status(200).send(bet);
}

async function acceptInvite(req, res) {
  const bet = await Bet.findOneAndUpdate({ _id: req.body.betId }, {
    $push: { players: req.user.sub },
  });
  await contractInstance.acceptInvite().send({ from: req.body.address });
  await contractInstance.transferToContract(req.body.amount * profit)
    .send({
      from: req.body.address,
      to: contractAddress,
      value: web3.utils.toWei(req.body.amount * profit, 'ether'),
    });
  await bet.save();
  return res.status(200).send(bet);
}

async function payOut(req, res) {
  return res.status(200);
}

module.exports = {
  createGame,
  acceptInvite,
  invitePlayers,
  payOut,
};
