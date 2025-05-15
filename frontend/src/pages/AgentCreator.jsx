import React, { useState } from 'react';
import { createAgent } from '../services/api';
import { useAgents } from '../hooks/useAgents';

const AgentCreator = ({ wallet }) => {
  const [goal, setGoal] = useState('');
  const { addAgent } = useAgents();

  const handleCreate = async () => {
    if (!wallet) {
      alert('Please connect your wallet');
      return;
    }
    try {
      const agent = await createAgent(wallet, goal);
      addAgent(agent);
      setGoal('');
      alert('Agent created successfully!');
    } catch (error) {
      alert('Failed to create agent');
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Create Agent</h2>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="e.g., Buy NFTs under 2 SOL"
        className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
      />
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create Agent
      </button>
    </div>
  );
};

export default AgentCreator;