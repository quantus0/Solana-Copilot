import React, { createContext, useState } from 'react';

export const SolanaContext = createContext();

export const SolanaProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [agents, setAgents] = useState([]);

  const addAgent = (agent) => setAgents([...agents, agent]);

  return (
    <SolanaContext.Provider value={{ wallet, setWallet, agents, addAgent }}>
      {children}
    </SolanaContext.Provider>
  );
};