const Agent = require('../models/Agent');

const createAgent = async (req, res) => {
  const { walletAddress, goal } = req.body;
  try {
    const agent = {
      id: Date.now(),
      walletAddress,
      goal,
      status: 'Active',
      txCount: 0
    };
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create agent' });
  }
};

module.exports = { createAgent };