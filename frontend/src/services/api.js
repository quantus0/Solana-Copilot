import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createAgent = async (walletAddress, goal) => {
  const response = await axios.post(`${API_URL}/agents`, { walletAddress, goal });
  return response.data;
};

export const simulateTx = async (wallet) => {
  return { success: true, gasEstimate: '0.001 SOL', details: 'Mock token transfer' };
};

export const optimizeGas = async (wallet) => {
  return { originalGas: '0.002 SOL', optimizedGas: '0.0015 SOL' };
};