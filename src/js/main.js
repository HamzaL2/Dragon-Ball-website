// main.js - hier start de app en staan de event listeners

import { haalCharactersOp } from "./api.js";
import { getWeergave, slaWeergaveOp } from "./opslag.js";
import { toonKaarten, toonTabel, toonFavorieten } from "./ui.js";

let alleCharacters = [];
let huidigeWeergave = getWeergave();

function kiNaarGetal(kiString) {
  if (!kiString || kiString === "Unknown") return 0;

  const tekst = kiString.replace(/,/g, "").toLowerCase().trim();

  const eenheden = {
    thousand:    1_000,
    million:     1_000_000,
    billion:     1_000_000_000,
    trillion:    1_000_000_000_000,
    quadrillion: 1_000_000_000_000_000,
    quintillion: 1_000_000_000_000_000_000,
    sextillion:  1_000_000_000_000_000_000_000,
    septillion:  1_000_000_000_000_000_000_000_000,
    octillion:   1_000_000_000_000_000_000_000_000_000,
    nonillion:   1_000_000_000_000_000_000_000_000_000_000,
    decillion:   1_000_000_000_000_000_000_000_000_000_000_000,
    googolplex:  1e100,
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

function wisselNaarKaarten() {
  huidigeWeergave = "kaarten";
  slaWeergaveOp("kaarten");

  document.getElementById("kaarten-weergave").classList.remove("verborgen");
  document.getElementById("tabel-weergave").classList.add("verborgen");

  document.getElementById("kaarten-knop").classList.add("actief-knop");
  document.getElementById("tabel-knop").classList.remove("actief-knop");

  toonKaarten(alleCharacters);
}

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

document.getElementById("zoekbalk").addEventListener("input", function () {
  document.getElementById("zoek-fout").textContent = "";
  filterEnSorteer();
});

document.getElementById("zoekbalk").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    document.getElementById("zoek-knop").click();
  }
});

startApp();
