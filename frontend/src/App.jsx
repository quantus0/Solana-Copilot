import React, { useState, useEffect } from "react";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (window.solana?.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
        setWallet(publicKey.toString());
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const res = await window.solana.connect();
      setWallet(res.publicKey.toString());
    } catch (err) {
      setStatus("Wallet connection failed.");
    }
  };

  const createAgent = async () => {
    setStatus("Creating agent...");
    try {
      const res = await fetch("http://localhost:3000/create-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet, goal }),
      });
      const data = await res.json();
      setStatus(`Agent created: ${data.agentId || JSON.stringify(data)}`);
    } catch (e) {
      setStatus("Error: " + e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1e] to-[#121e36] px-4">
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full p-8 text-white">
        <h1 className="text-2xl font-bold mb-2 text-center">zkID: Age Verification</h1>
        <p className="text-gray-400 text-center mb-6">
          Prove your age without revealing your identity using zero-knowledge proofs.
        </p>

        <input
          type="text"
          placeholder="e.g. 18"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white mb-4 focus:outline-none"
        />

        <button
          onClick={wallet ? createAgent : connectWallet}
          className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-4 rounded-lg transition"
        >
          {wallet ? "Generate & Verify" : "Connect Wallet"}
        </button>

        {status && (
          <div className="mt-4 bg-white/10 text-sm p-3 rounded-lg font-mono text-gray-300 whitespace-pre-wrap">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
