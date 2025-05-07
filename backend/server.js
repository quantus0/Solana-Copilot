const express = require('express');
const axios = require('axios');
const solanaWeb3 = require('@solana/web3.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// GPT-4 function schema
const functions = [
  {
    name: 'sendSol',
    description: 'Send SOL to a specified address',
    parameters: {
      type: 'object',
      properties: {
        amount: { type: 'number', description: 'Amount of SOL to send' },
        toAddress: { type: 'string', description: 'Recipient address' },
      },
      required: ['amount', 'toAddress'],
    },
  },
];

// Build and return a transaction to be signed in Phantom
async function createTransferTransaction(amount, toAddress, walletAddress) {
  try {
    const fromPubkey = new solanaWeb3.PublicKey(walletAddress);
    const toPubkey = new solanaWeb3.PublicKey(toAddress);
    const lamports = amount * solanaWeb3.LAMPORTS_PER_SOL;

    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      })
    );

    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    transaction.feePayer = fromPubkey;

    const serialized = transaction.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });

    return serialized.toString('base64');
  } catch (error) {
    throw new Error(Failed to create transaction: ${error.message});
  }
}

// API endpoint for prompt execution
app.post('/api/execute', async (req, res) => {
  const { prompt, walletAddress } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        functions,
        function_call: 'auto',
      },
      {
        headers: {
          Authorization: Bearer ${OPENAI_API_KEY},
          'Content-Type': 'application/json',
        },
      }
    );

    const functionCall = response.data.choices[0].message.function_call;
    if (!functionCall) {
      return res.status(400).json({ error: 'No valid action detected in prompt' });
    }

    const { name, arguments: args } = functionCall;
    const params = JSON.parse(args);

    if (name === 'sendSol') {
      const transaction = await createTransferTransaction(params.amount, params.toAddress, walletAddress);
      res.json({ transaction });
    } else {
      res.status(400).json({ error: 'Unsupported action' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));