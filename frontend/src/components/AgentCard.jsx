import React from 'react';
import { useProgram } from '../contexts/SolanaContext';

const AgentCard = ({ agent }) => {
  const { program } = useProgram();

  return (
    <div className="agent-card bg-gray-800 p-4 rounded-lg">
      <h3 className="text-xl font-bold">{agent.name}</h3>
      <p className="text-gray-400 mt-2">{agent.goal}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm">Balance: {agent.balance} SOL</span>
        <button 
          onClick={() => program.methods.closeAgent().accounts({ agent: agent.pubkey }).rpc()}
          className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
