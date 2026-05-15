// api.js - hier haal ik de data op van de Dragon Ball API

const API_URL = "https://dragonball-api.com/api/characters?limit=25";

async function haalCharactersOp() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.items;
}

export { haalCharactersOp };
