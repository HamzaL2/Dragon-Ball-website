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

// Filteren, zoeken en sorteren gecombineerd
function filterEnSorteer() {
  const zoekterm = document.getElementById("zoekbalk").value.toLowerCase();
  const geselecteerdRas = document.getElementById("ras-filter").value;
  const sortering = document.getElementById("sorteer-select").value;

  let resultaten = alleCharacters.filter(function (character) {
    const naamKlopt = character.naam.toLowerCase().includes(zoekterm);
    const rasKlopt = geselecteerdRas === "" || character.ras === geselecteerdRas;
    return naamKlopt && rasKlopt;
  });

  if (sortering === "naam-az") {
    resultaten.sort((a, b) => a.naam.localeCompare(b.naam));
  } else if (sortering === "naam-za") {
    resultaten.sort((a, b) => b.naam.localeCompare(a.naam));
  } else if (sortering === "ki-laag") {
    resultaten.sort((a, b) => kiNaarGetal(a.ki) - kiNaarGetal(b.ki));
  } else if (sortering === "ki-hoog") {
    resultaten.sort((a, b) => kiNaarGetal(b.ki) - kiNaarGetal(a.ki));
  }

  if (huidigeWeergave === "kaarten") {
    toonKaarten(resultaten);
  } else {
    toonTabel(resultaten);
  }
}

// Wisselen naar kaarten weergave
function wisselNaarKaarten() {
  huidigeWeergave = "kaarten";
  slaWeergaveOp("kaarten");

  document.getElementById("kaarten-weergave").classList.remove("verborgen");
  document.getElementById("tabel-weergave").classList.add("verborgen");

  document.getElementById("kaarten-knop").classList.add("actief-knop");
  document.getElementById("tabel-knop").classList.remove("actief-knop");

  toonKaarten(alleCharacters);
}

// Wisselen naar tabel weergave
function wisselNaarTabel() {
  huidigeWeergave = "tabel";
  slaWeergaveOp("tabel");

  document.getElementById("kaarten-weergave").classList.add("verborgen");
  document.getElementById("tabel-weergave").classList.remove("verborgen");

  document.getElementById("tabel-knop").classList.add("actief-knop");
  document.getElementById("kaarten-knop").classList.remove("actief-knop");

  toonTabel(alleCharacters);
}

// ---- EVENT LISTENERS ----

// Zoekknop met validatie
document.getElementById("zoek-knop").addEventListener("click", function () {
  const zoekterm = document.getElementById("zoekbalk").value;
  const foutMelding = document.getElementById("zoek-fout");

  if (zoekterm.trim() === "") {
    foutMelding.textContent = "Vul iets in om te zoeken!";
    return;
  }

  foutMelding.textContent = "";
  filterEnSorteer();
});

// Zoeken terwijl je typt
document.getElementById("zoekbalk").addEventListener("input", function () {
  document.getElementById("zoek-fout").textContent = "";
  filterEnSorteer();
});

// Enter toets in zoekbalk
document.getElementById("zoekbalk").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("zoek-knop").click();
  }
});

// Filter en sorteer dropdowns
document.getElementById("ras-filter").addEventListener("change", filterEnSorteer);
document.getElementById("sorteer-select").addEventListener("change", filterEnSorteer);

// Weergave knoppen
document.getElementById("kaarten-knop").addEventListener("click", wisselNaarKaarten);
document.getElementById("tabel-knop").addEventListener("click", wisselNaarTabel);

// Detail popup sluiten
document.getElementById("sluit-modal").addEventListener("click", function () {
  document.getElementById("detail-modal").classList.add("verborgen");
});

// Popup sluiten door buiten te klikken
document.getElementById("detail-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.classList.add("verborgen");
  }
});

// App starten
startApp();
