import React from 'react';
import WalletConnector from '../components/WalletConnector';
import AgentCreator from './AgentCreator';
import GasOptimizer from '../components/GasOptimizer';
import TxSimulator from '../components/TxSimulator';
import Analytics from './Analytics';
import { useSolana } from '../hooks/useSolana';

const Dashboard = () => {
  const { wallet, setWallet } = useSolana();

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Solana Copilot Dashboard</h1>
      <WalletConnector setWallet={setWallet} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AgentCreator wallet={wallet} />
        <GasOptimizer wallet={wallet} />
        <TxSimulator wallet={wallet} />
        <Analytics />
      </div>
    </div>
  );
};

export default Dashboard;