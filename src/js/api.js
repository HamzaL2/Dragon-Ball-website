// api.js - hier haal ik de data op van de Dragon Ball API

const API_URL = "https://dragonball-api.com/api/characters?limit=25";

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
