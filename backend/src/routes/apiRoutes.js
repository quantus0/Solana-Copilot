const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

router.post('/generate-agent-plan', async (req, res) => {
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ error: 'Missing goal in request body.' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a Solana smart wallet AI agent. Given a user goal, output an actionable step-by-step plan using the Solana ecosystem.'
        },
        {
          role: 'user',
          content: `My goal is: ${goal}`
        }
      ]
    });

    const reply = response.data.choices[0].message.content;
    res.json({ plan: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate plan.' });
  }
});

module.exports = router;
