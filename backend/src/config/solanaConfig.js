const { Connection } = require('@solana/web3.js');

module.exports = {
  connection: new Connection('https://api.devnet.solana.com', 'confirmed'),
  programId: 'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS'
};