import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Connect to Phantom wallet
  const connectWallet = async () => {
    try {
      const { solana } = window;
      if (solana?.isPhantom) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Please install Phantom wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect wallet');
    }
  };

  // Handle prompt submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      alert('Please connect your wallet');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/execute', { prompt, walletAddress });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error executing prompt:', error);
      setResponse('Error: ' + (error.response?.data?.error || 'Unknown error'));
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Solana Copilot</h1>
      <button onClick={connectWallet} className="wallet-button">
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : 'Connect Phantom Wallet'}
      </button>
      <form onSubmit={handleSubmit} className="prompt-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Send 0.1 SOL to <address>"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Execute'}
        </button>
      </form>
      {response && <div className="response">{response}</div>}
    </div>
  );
};

export default App;