const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.APIKEY });

const express = require("express");
const router = express.Router();

router.get("/callAPI", async (req, res) => {
  console.log(req.query.playerInput);
  const userInput = req.query.playerInput;

  const API_KEY = process.env.APIKEY; //change to env
  const API_BODY = {
    messages: [
      {
        role: "system",
        content:
          "You are the Oracle. A magical prophet of great importance in this world." +
          "\n Base your knownledge off anything from the Dungeons and Dragons setting : Forgotten Realms" +
          "\n You will answer 3 questions to the player/the user, but will become enraged or impatient if they ask you anything silly or unimportant." +
          "\n if you become enrage or the player has asked too many questions answer them : Begone! \n if they continue to ask you questions respond only : ...",
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 60,
  };
  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify(API_BODY),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log("Data.chocies is: " + data.choices);
      console.log(data.choices);
      console.log(
        "Data.chocies[0].message is:" + data.choices[0].message.content
      );
      console.log(data.choices[0].message.content);

      res.json(data.choices[0].message.content);
    });
});

module.exports = router;
