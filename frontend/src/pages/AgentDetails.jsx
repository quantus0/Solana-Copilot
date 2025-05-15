import React from 'react';
import { useAgents } from '../hooks/useAgents';

const AgentDetails = ({ agentId }) => {
  const { agents } = useAgents();
  const agent = agents.find(a => a.id === agentId);

  if (!agent) return <p className="text-white">No agent selected</p>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-bold text-white mb-4">Agent Details</h2>
      <p>ID: {agent.id}</p>
      <p>Goal: {agent.goal}</p>
      <p>Status: {agent.status}</p>
      <p>Wallet: {agent.walletAddress.slice(0, 8)}...</p>
    </div>
  );
};

export default AgentDetails;