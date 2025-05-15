const { PublicKey } = require('@solana/web3.js');
const { connection, programId } = require('../config/solanaConfig');

module.exports = {
  getProgram: () => ({
    programId: new PublicKey(programId),
    connection
  })
};