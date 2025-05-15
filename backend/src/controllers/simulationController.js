const simulateTransaction = (req, res) => {
  const { walletAddress } = req.body;
  try {
    const result = {
      success: true,
      gasEstimate: '0.001 SOL',
      details: `Mock simulation for ${walletAddress}`
    };
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to simulate transaction' });
  }
};

module.exports = { simulateTransaction };