import React, { useState } from 'react';

const WalletConnector = ({ setWallet }) => {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    if (window.solana) {
      try {
        const { publicKey } = await window.solana.connect();
        setAddress(publicKey.toString());
        setWallet(publicKey.toString());
      } catch (error) {
        console.error('Wallet connection failed', error);
        alert('Failed to connect wallet');
      }
    } else {
      alert('Please install a Solana wallet (e.g., Phantom)');
    }
  };

  return (
    <div className="p-4">
      {address ? (
        <p className="text-green-600">Connected: {address.slice(0, 8)}...</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnector;