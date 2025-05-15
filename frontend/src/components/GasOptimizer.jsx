import React from 'react';
import { optimizeGas } from '../services/api';

const GasOptimizer = ({ wallet }) => {
  const handleOptimize = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }
    try {
      const result = await optimizeGas(wallet);
      alert(`Gas Optimization: ${JSON.stringify(result)}`);
    } catch (error) {
      alert('Failed to optimize gas');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Gas Optimizer</h2>
      <button
        onClick={handleOptimize}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Optimize Gas
      </button>
    </div>
  );
};

export default GasOptimizer;