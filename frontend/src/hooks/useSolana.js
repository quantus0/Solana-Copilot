import { useContext } from 'react';
import { SolanaContext } from '../contexts/SolanaContext';

export const useSolana = () => {
  const { wallet, setWallet } = useContext(SolanaContext);
  return { wallet, setWallet };
};