// api.js - hier haal ik de data op van de Dragon Ball API

const API_URL = "https://dragonball-api.com/api/characters?limit=25";

// Engelse beschrijvingen per character naam
const beschrijvingen = {
  "Goku": "The main hero of the series. Originally sent to Earth as a baby Saiyan, he lost his memory and grew up to become the greatest warrior on Earth and the defender of the universe.",
  "Vegeta": "The proud prince of the Saiyan race. Once a villain working for Frieza, he later became one of the most powerful Z Fighters and rival of Goku.",
  "Piccolo": "A Namekian warrior and one of the strongest fighters on Earth. He became the mentor and father figure of Gohan after their intense training together.",
  "Bulma": "A genius scientist and founder of Capsule Corporation. She is the one who discovered the Dragon Balls and built many of the gadgets used by the Z Fighters.",
  "Freezer": "The tyrannical ruler of the universe who destroyed Planet Vegeta. He is one of the most powerful and feared villains in the Dragon Ball series.",
  "Frieza": "The tyrannical ruler of the universe who destroyed Planet Vegeta. He is one of the most powerful and feared villains in the Dragon Ball series.",
};
