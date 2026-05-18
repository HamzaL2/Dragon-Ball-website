// main.js - hier start de app en staan de event listeners

import { haalCharactersOp } from "./api.js";
import { getWeergave, slaWeergaveOp } from "./opslag.js";
import { toonKaarten, toonTabel, toonFavorieten } from "./ui.js";

let alleCharacters = [];
let huidigeWeergave = getWeergave();

async function startApp() {
  const kaartenWeergave = document.getElementById("kaarten-weergave");
  kaartenWeergave.innerHTML = "<p style='color: lightgray;'>Characters laden...</p>";

  try {
    alleCharacters = await haalCharactersOp();
    toonKaarten(alleCharacters);
    toonFavorieten();
  } catch (fout) {
    console.error("Fout bij laden:", fout);
    kaartenWeergave.innerHTML = "<p style='color: red;'>Kon characters niet laden.</p>";
  }
}

startApp();
