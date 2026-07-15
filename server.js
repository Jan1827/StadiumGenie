require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// Stadium Knowledge Base
// =====================================================

const stadiumKnowledge = {
  gate1: "🚪 Gate 1 is the Main Entrance of the stadium.",
  gate2: "⭐ Gate 2 is the VIP Entrance.",
  gate3: "➡️ Gate 3 is the East Entrance. The Medical Center is beside this gate.",
  gate4:
    "🚪 Gate 4 is the West Entrance. Walk along the main concourse and follow the overhead signs marked 'West Entrance'. Food Court B is located next to Gate 4.",

  restroom:
    "🚻 Restroom A is near Gate 1.\n🚻 Restroom B is beside Food Court B near Gate 4.",

  parking:
    "🚗 Parking Zone A is on the North Side (closest to Gate 1).\n🚗 Parking Zone B is on the South Side (recommended for Gate 4 visitors).",

  medical:
    "🏥 The Medical Center is beside Gate 3 and is open throughout the event.",

  wheelchair:
    "♿ Wheelchair accessible entrances are available at Gate 1 and Gate 3. Elevators are also available nearby.",

  metro:
    "🚇 The Metro Station is about a 5-minute walk from Gate 1.",

  bus:
    "🚌 The Bus Stop is located outside Gate 2.",

  taxi:
    "🚖 Taxi Pick-up and Drop-off is available near Parking Zone A.",

  food:
    "🍔 Food Court A is near Gate 2.\n🍕 Food Court B is near Gate 4.",

  emergency:
    "🚨 In case of emergency, contact the nearest stadium staff immediately. Emergency exits are available near every gate.",

  schedule:
    "📅 Today's Demo Match\n\n🇮🇳 India vs 🇧🇷 Brazil\n🕢 Kick-off: 7:30 PM\n🏟 Demo Stadium"
};

// =====================================================
// Chat Endpoint
// =====================================================

app.post("/chat", async (req, res) => {

  const userMessage = req.body.message.toLowerCase().trim();

  console.log("User:", userMessage);

  // ============================
  // Instant Stadium Responses
  // ============================

  if (userMessage.includes("gate 1"))
    return res.json({ reply: stadiumKnowledge.gate1 });

  if (userMessage.includes("gate 2"))
    return res.json({ reply: stadiumKnowledge.gate2 });

  if (userMessage.includes("gate 3"))
    return res.json({ reply: stadiumKnowledge.gate3 });

  if (userMessage.includes("gate 4"))
    return res.json({ reply: stadiumKnowledge.gate4 });

  if (
    userMessage.includes("restroom") ||
    userMessage.includes("washroom") ||
    userMessage.includes("toilet") ||
    userMessage.includes("bathroom")
  )
    return res.json({ reply: stadiumKnowledge.restroom });

  if (
    userMessage.includes("parking") ||
    userMessage.includes("park")
  )
    return res.json({ reply: stadiumKnowledge.parking });

  if (
    userMessage.includes("medical") ||
    userMessage.includes("doctor") ||
    userMessage.includes("hospital") ||
    userMessage.includes("first aid")
  )
    return res.json({ reply: stadiumKnowledge.medical });

  if (
    userMessage.includes("food") ||
    userMessage.includes("restaurant") ||
    userMessage.includes("canteen") ||
    userMessage.includes("eat")
  )
    return res.json({ reply: stadiumKnowledge.food });

  if (
    userMessage.includes("metro") ||
    userMessage.includes("train")
  )
    return res.json({ reply: stadiumKnowledge.metro });

  if (userMessage.includes("bus"))
    return res.json({ reply: stadiumKnowledge.bus });

  if (
    userMessage.includes("taxi") ||
    userMessage.includes("cab")
  )
    return res.json({ reply: stadiumKnowledge.taxi });

  if (
    userMessage.includes("wheelchair") ||
    userMessage.includes("accessible") ||
    userMessage.includes("disabled")
  )
    return res.json({ reply: stadiumKnowledge.wheelchair });

  if (
    userMessage.includes("emergency") ||
    userMessage.includes("help")
  )
    return res.json({ reply: stadiumKnowledge.emergency });

  if (
    userMessage.includes("schedule") ||
    userMessage.includes("match") ||
    userMessage.includes("fixture")
  )
    return res.json({ reply: stadiumKnowledge.schedule });

  // ============================
  // AI Response
  // ============================

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: "openrouter/auto",

          messages: [

            {
              role: "system",
              content: `You are StadiumGenie AI.

You are a smart assistant for a FIFA World Cup stadium.

Answer politely.

Keep responses under 120 words.

If someone asks about football, travel, crowd management, safety, transportation, accessibility or stadium experiences, help them.

Do not invent stadium layouts because those are already handled by the application.
`
            },

            {
              role: "user",
              content: userMessage
            }

          ]

        })

      }
    );

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {

      return res.status(response.status).json({
        reply: data.error?.message || "Unable to contact AI."
      });

    }

    if (!data.choices || data.choices.length === 0) {

      return res.json({
        reply: "⚠️ AI couldn't generate a response."
      });

    }

    res.json({
      reply: data.choices[0].message.content
    });

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      reply: "⚠️ AI service is temporarily unavailable."
    });

  }

});

// =====================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`🚀 StadiumGenie Server running on http://localhost:${PORT}`);

});