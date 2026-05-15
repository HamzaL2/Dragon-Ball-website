// api.js - hier haal ik de data op van de Dragon Ball API

const API_URL = "https://dragonball-api.com/api/characters?limit=25";

// Engelse beschrijvingen per character naam
const beschrijvingen = {
  "Goku": "The main hero of the series. Originally sent to Earth as a baby Saiyan, he lost his memory and grew up to become the greatest warrior on Earth and the defender of the universe.",
  "Vegeta": "The proud prince of the Saiyan race. Once a villain working for Frieza, he later became one of the most powerful Z Fighters and rival of Goku.",
  "Piccolo": "A Namekian warrior and one of the strongest fighters on Earth. He became the mentor and father figure of Gohan after their intense training together.",
  "Gohan": "The son of Goku, who possesses an incredible hidden power. He defeated Cell in his Super Saiyan 2 form and became one of the strongest fighters.",
  "Krillin": "Goku's best friend since childhood and the strongest human fighter on Earth.",
  "Frieza": "The tyrannical ruler of the universe who destroyed Planet Vegeta.",
  "Cell": "A bio-android created by Dr. Gero using the DNA of the strongest fighters.",
  "Beerus": "The God of Destruction of Universe 7. He is an extremely powerful deity.",
};

async function haalCharactersOp() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("API werkt niet: " + response.status);
  }

  const data = await response.json();
  console.log("API data ontvangen:", data);
  return data.items;
}

export { haalCharactersOp };
