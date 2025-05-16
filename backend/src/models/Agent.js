const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Takes a user-defined goal and returns a ChatGPT-generated action plan.
 * @param {string} goal - Natural language instruction from user.
 * @returns {Promise<string>} - GPT-4's response.
 */
async function generateAgentPlan(goal) {
  const prompt = `You are a Solana autonomous smart wallet agent. A user asked you: "${goal}". What should you do? Give a short plan.`;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI error:", err?.response?.data || err.message);
    return "Failed to generate plan from goal.";
  }
}

module.exports = { generateAgentPlan };
