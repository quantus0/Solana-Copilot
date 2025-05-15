module.exports = {
  simulate: (walletAddress) => {
    return {
      success: true,
      gasEstimate: '0.001 SOL',
      details: `Mock simulation for ${walletAddress}`
    };
  }
};