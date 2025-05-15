const express = require('express');
const { createAgent } = require('../controllers/agentController');
const { simulateTransaction } = require('../controllers/simulationController');

const router = express.Router();

router.post('/agents', createAgent);
router.post('/simulate', simulateTransaction);

module.exports = router;