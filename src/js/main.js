// main.js - hier start de app en staan de event listeners

import { haalCharactersOp } from "./api.js";
import { getWeergave, slaWeergaveOp } from "./opslag.js";
import { toonKaarten, toonTabel, toonFavorieten } from "./ui.js";

let alleCharacters = [];
let huidigeWeergave = getWeergave();

// Zet een ki-string om naar een getal voor sortering
function kiNaarGetal(kiString) {
  if (!kiString || kiString === "Unknown") return 0;

  const tekst = kiString.replace(/,/g, "").toLowerCase().trim();

  const eenheden = {
    thousand: 1_000,
    million: 1_000_000,
    billion: 1_000_000_000,
    trillion: 1_000_000_000_000,
    quadrillion: 1_000_000_000_000_000,
    quintillion: 1_000_000_000_000_000_000,
  };

  for (const [woord, waarde] of Object.entries(eenheden)) {
    if (tekst.includes(woord)) {
      const getal = parseFloat(tekst);
      return isNaN(getal) ? waarde : getal * waarde;
    }
  }

  const getal = parseFloat(tekst);
  return isNaN(getal) ? 0 : getal;
}

// App opstarten
async function startApp() {
  const kaartenWeergave = document.getElementById("kaarten-weergave");
  kaartenWeergave.innerHTML = "<p style='color: lightgray; text-align: center; margin-top: 30px;'>Characters laden...</p>";

  try {
    alleCharacters = await haalCharactersOp();

    if (huidigeWeergave === "tabel") {
      wisselNaarTabel();
    } else {
      wisselNaarKaarten();
    }

    toonFavorieten();
  } catch (fout) {
    console.error("Fout bij laden:", fout);
    kaartenWeergave.innerHTML = "<p style='color: red; text-align: center; margin-top: 30px;'>Kon characters niet laden. Probeer de pagina te herladen.</p>";
  }
}
