import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

export const getBalance = async (publicKey) => {
  const key = new PublicKey(publicKey);
  return await connection.getBalance(key);
};