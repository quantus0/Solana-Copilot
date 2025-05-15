import React from 'react';
import { useAgents } from '../hooks/useAgents';

const Analytics = () => {
  const { agents } = useAgents();
  const mockData = {
    agentsCreated: agents.length,
    totalTx: agents.reduce((sum, agent) => sum + (agent.txCount || 0), 0),
    gasSaved: '0.05 SOL',
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Analytics</h2>
      <p>Agents Created: {mockData.agentsCreated}</p>
      <p>Total Transactions: {mockData.totalTx}</p>
      <p>Gas Saved: {mockData.gasSaved}</p>
    </div>
  );
};

export default Analytics;