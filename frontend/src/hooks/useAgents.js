import { useContext } from 'react';
import { SolanaContext } from '../contexts/SolanaContext';

export const useAgents = () => {
  const { agents, addAgent } = useContext(SolanaContext);
  return { agents, addAgent };
};