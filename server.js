const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { message, playerName } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um NPC medieval sábio e misterioso em um RPG."
        },
        {
          role: "user",
          content: `Jogador ${playerName}: ${message}`
        }
      ],
      max_tokens: 150
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "A mente do sábio está confusa..." });
  }
});

app.get("/", (req, res) => {
  res.send("NPC AI Online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});
