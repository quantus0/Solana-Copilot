import React from 'react';
import { simulateTx } from '../services/api';

const TxSimulator = ({ wallet }) => {
  const handleSimulate = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }
    try {
      const result = await simulateTx(wallet);
      alert(`Simulation Result: ${JSON.stringify(result)}`);
    } catch (error) {
      alert('Failed to simulate transaction');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Transaction Simulator</h2>
      <button
        onClick={handleSimulate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Simulate Transaction
      </button>
    </div>
  );
};

export default TxSimulator;