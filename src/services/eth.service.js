const Web3 = require('web3');
const Betting = require('../../node_modules/fpl-contract/build/contracts/Betting.json');

const etherUrl = 'http://localhost:8545';
const contractAddress = Betting.networks[5777].address;
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(etherUrl));

async function acceptInvite() {
  const contractInstance = new web3.eth.Contract(Betting.abi, '0x7eB7B32624C2D8fBDE647C214Ef9f2D2688B2027');
  console.log(await contractInstance.methods.withdrawal('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', web3.utils.toWei('10000', 'ether')).send({ from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1' }));
  web3.eth
    .sendTransaction({
      from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1',
      to: contractAddress,
      value: web3.utils.toWei('100', 'ether'),
    });
  // await contractInstance.methods.balanceOf('0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1')
  // .send({ from: '0x7eB7B32624C2D8fBDE647C214Ef9f2D2688B2027' });
//   return contractInstance.acceptInvite();
}
module.exports = {
  acceptInvite,
};
