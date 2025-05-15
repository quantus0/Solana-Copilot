import React from 'react';

const AgentCard = ({ agent, onSelect }) => {
  return (
    <div
      className="p-4 bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
      onClick={() => onSelect(agent.id)}
    >
      <h3 className="text-lg font-semibold text-white">Goal: {agent.goal}</h3>
      <p className="text-sm text-gray-400">Status: {agent.status}</p>
      <p className="text-sm text-gray-400">Wallet: {agent.walletAddress.slice(0, 8)}...</p>
    </div>
  );
};

export default AgentCard;