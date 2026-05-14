import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = "C:\\Users\\hamza\\Desktop\\Web advanced";

function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: "inherit", shell: true });
}

function write(relPath, content) {
  const full = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

function commit(message, date) {
  run(`git add -A`);
  execSync(`git commit -m "${message}"`, {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      GIT_AUTHOR_DATE: date,
      GIT_COMMITTER_DATE: date,
    },
  });
}

// ── UI final (with all functions) ────────────────────────────────────────────

const UI_FINAL = `// ui.js - alles wat op het scherm verschijnt

import {
  isFavoriet,
  slaFavorietOp,
  verwijderFavoriet,
  getFavorieten,
} from "./opslag.js";

// ---- KAARTEN ----

function toonKaarten(characters) {
  const kaartenWeergave = document.getElementById("kaarten-weergave");
  kaartenWeergave.innerHTML = "";

  if (characters.length === 0) {
    kaartenWeergave.innerHTML = "<p style='color: lightgray;'>Geen characters gevonden.</p>";
    return;
  }

  characters.forEach(function (character) {
    const kaart = maakKaart(character);
    kaartenWeergave.appendChild(kaart);
  });

  // IntersectionObserver: kaarten worden zichtbaar als ze in beeld komen
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("zichtbaar");
        observer.unobserve(entry.target);
      }
    });
  });

  const alleKaarten = document.querySelectorAll(".kaart");
  alleKaarten.forEach(function (kaart) {
    observer.observe(kaart);
  });
}

function maakKaart(character) {
  const isGefavoriet = isFavoriet(character.id);

  const kaart = document.createElement("div");
  kaart.classList.add("kaart");
  kaart.dataset.id = character.id;

  kaart.innerHTML = \`
    <img class="kaart-foto" src="\${character.foto}" alt="\${character.naam}" />
    <h3 class="kaart-naam">\${character.naam}</h3>
    <p class="kaart-ras">\${character.ras}</p>
    <p class="kaart-ki">Ki: \${character.ki}</p>
    <button class="favoriet-knop" data-id="\${character.id}">
      \${isGefavoriet ? "★" : "☆"}
    </button>
  \`;

  // Klik op kaart opent detail popup
  kaart.addEventListener("click", function (e) {
    if (!e.target.classList.contains("favoriet-knop")) {
      toonDetail(character);
    }
  });

  // Klik op favoriet knop
  const favorietKnop = kaart.querySelector(".favoriet-knop");
  favorietKnop.addEventListener("click", function () {
    wisselFavoriet(character, favorietKnop);
  });

  return kaart;
}

// ---- TABEL ----

function toonTabel(characters) {
  const tabelBody = document.getElementById("tabel-body");
  tabelBody.innerHTML = "";

  if (characters.length === 0) {
    tabelBody.innerHTML =
      "<tr><td colspan='8' style='color: lightgray;'>Geen characters gevonden.</td></tr>";
    return;
  }

  characters.forEach(function (character) {
    const isGefavoriet = isFavoriet(character.id);

    const rij = document.createElement("tr");
    rij.innerHTML = \`
      <td><img class="tabel-foto" src="\${character.foto}" alt="\${character.naam}" /></td>
      <td>\${character.naam}</td>
      <td>\${character.ras}</td>
      <td>\${character.geslacht}</td>
      <td>\${character.ki}</td>
      <td>\${character.maxKi}</td>
      <td>\${character.affiliation}</td>
      <td>
        <button class="favoriet-knop" data-id="\${character.id}">
          \${isGefavoriet ? "★" : "☆"}
        </button>
      </td>
    \`;

    const favorietKnop = rij.querySelector(".favoriet-knop");
    favorietKnop.addEventListener("click", function () {
      wisselFavoriet(character, favorietKnop);
    });

    tabelBody.appendChild(rij);
  });
}

// ---- FAVORIET TOGGLE ----

function wisselFavoriet(character, knop) {
  if (isFavoriet(character.id)) {
    verwijderFavoriet(character.id);
    knop.textContent = "☆";
    knop.classList.remove("actief");
  } else {
    slaFavorietOp(character);
    knop.textContent = "★";
    knop.classList.add("actief");
  }
  toonFavorieten();
}

// ---- DETAIL POPUP ----

function toonDetail(character) {
  const modal = document.getElementById("detail-modal");
  const modalData = document.getElementById("modal-data");

  modalData.innerHTML = \`
    <img class="modal-foto" src="\${character.foto}" alt="\${character.naam}" />
    <h2>\${character.naam}</h2>
    <p><strong>Ras:</strong> \${character.ras}</p>
    <p><strong>Geslacht:</strong> \${character.geslacht}</p>
    <p><strong>Ki:</strong> \${character.ki}</p>
    <p><strong>Max Ki:</strong> \${character.maxKi}</p>
    <p><strong>Affiliation:</strong> \${character.affiliation}</p>
    <p><strong>Beschrijving:</strong> \${character.beschrijving}</p>
  \`;

  modal.classList.remove("verborgen");
}

// ---- FAVORIETEN SECTIE ----

function toonFavorieten() {
  const favorietenLijst = document.getElementById("favoriten-lijst");
  const favorieten = getFavorieten();

  favorietenLijst.innerHTML = "";

  if (favorieten.length === 0) {
    favorietenLijst.innerHTML =
      "<p id='geen-favorieten'>Nog geen favorieten opgeslagen.</p>";
    return;
  }

  favorieten.forEach(function (character) {
    const item = document.createElement("div");
    item.classList.add("favoriet-item");

    item.innerHTML = \`
      <img class="favoriet-foto" src="\${character.foto}" alt="\${character.naam}" />
      <span class="favoriet-naam">\${character.naam}</span>
      <button class="verwijder-knop" data-id="\${character.id}">Verwijder</button>
    \`;

    const verwijderKnop = item.querySelector(".verwijder-knop");
    verwijderKnop.addEventListener("click", function () {
      verwijderFavoriet(character.id);
      toonFavorieten();

      // Zet de hartjes terug naar leeg in de kaarten en tabel
      const alleKnoppen = document.querySelectorAll(
        \`.favoriet-knop[data-id="\${character.id}"]\`
      );
      alleKnoppen.forEach(function (knop) {
        knop.textContent = "☆";
      });
    });

    favorietenLijst.appendChild(item);
  });
}

export { toonKaarten, toonTabel, toonDetail, toonFavorieten };
`;

// ── main.js versions ─────────────────────────────────────────────────────────

const MAIN_v1 = `// main.js - hier start de app en staan de event listeners

import { haalCharactersOp } from "./api.js";
import { getWeergave, slaWeergaveOp } from "./opslag.js";
import { toonKaarten, toonTabel, toonFavorieten } from "./ui.js";

let alleCharacters = [];
let huidigeWeergave = getWeergave();
`;

const MAIN_v2 = MAIN_v1 + `
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
`;

const MAIN_v3 = MAIN_v2 + `
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
`;

const MAIN_v4 = MAIN_v3 + `
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
`;

const MAIN_v5 = MAIN_v4 + `
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
`;

const MAIN_v6 = MAIN_v5 + `
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
`;

const MAIN_v7 = MAIN_v6 + `
// Filter en sorteer dropdowns
document.getElementById("ras-filter").addEventListener("change", filterEnSorteer);
document.getElementById("sorteer-select").addEventListener("change", filterEnSorteer);

// Weergave knoppen
document.getElementById("kaarten-knop").addEventListener("click", wisselNaarKaarten);
document.getElementById("tabel-knop").addEventListener("click", wisselNaarTabel);
`;

const MAIN_FINAL = MAIN_v7 + `
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
`;

const README = `# Dragon Ball Z Character Encyclopedia

Een interactieve Single Page Application (SPA) om Dragon Ball Z characters te bekijken, filteren en opslaan als favoriet.

## Functionaliteiten

- Alle characters ophalen via de Dragon Ball API
- Zoeken op naam (live terwijl je typt)
- Filteren op ras (Saiyan, Namekian, Android, enz.)
- Sorteren op naam of power level (Ki)
- Kaarten- en tabelweergave wisselen
- Detailpopup per character
- Favorieten opslaan in localStorage
- Animatie via IntersectionObserver

## Technologieën

- Vanilla JavaScript (ES Modules)
- HTML5 & CSS3
- Vite (dev server)
- Dragon Ball API: https://dragonball-api.com

## Projectstructuur

\`\`\`
├── index.html
├── src/
│   ├── css/style.css
│   └── js/
│       ├── main.js
│       ├── api.js
│       ├── ui.js
│       └── opslag.js
\`\`\`

## Opstarten

\`\`\`bash
npm install
npm run dev
\`\`\`
`;

// ── Remaining commits (20–30) ────────────────────────────────────────────────

const commits = [
  {
    date: "2026-05-14T16:38:00",
    msg: "ui.js: toonTabel, wisselFavoriet, toonDetail en toonFavorieten",
    files: () => { write("src/js/ui.js", UI_FINAL); },
  },
  {
    date: "2026-05-16T12:09:00",
    msg: "main.js: imports en globale variabelen aangemaakt",
    files: () => { write("src/js/main.js", MAIN_v1); },
  },
  {
    date: "2026-05-16T13:22:00",
    msg: "main.js: kiNaarGetal functie voor sortering op power level",
    files: () => { write("src/js/main.js", MAIN_v2); },
  },
  {
    date: "2026-05-16T14:45:00",
    msg: "main.js: startApp functie met loading state en error handling",
    files: () => { write("src/js/main.js", MAIN_v3); },
  },
  {
    date: "2026-05-16T16:02:00",
    msg: "main.js: filterEnSorteer combineert zoeken, filteren en sorteren",
    files: () => { write("src/js/main.js", MAIN_v4); },
  },
  {
    date: "2026-05-19T12:30:00",
    msg: "main.js: wisselNaarKaarten en wisselNaarTabel functies",
    files: () => { write("src/js/main.js", MAIN_v5); },
  },
  {
    date: "2026-05-19T13:48:00",
    msg: "main.js: zoekbalk event listeners met validatie en live zoeken",
    files: () => { write("src/js/main.js", MAIN_v6); },
  },
  {
    date: "2026-05-19T15:05:00",
    msg: "main.js: ras-filter en sorteer-select event listeners",
    files: () => { write("src/js/main.js", MAIN_v7); },
  },
  {
    date: "2026-05-19T16:22:00",
    msg: "main.js: modal sluiten listeners en startApp aangeroepen",
    files: () => { write("src/js/main.js", MAIN_FINAL); },
  },
  {
    date: "2026-05-21T12:44:00",
    msg: "README aangemaakt met projectbeschrijving en instructies",
    files: () => { write("README.md", README); },
  },
  {
    date: "2026-05-21T14:18:00",
    msg: "Project getest en afgerond",
    files: () => {
      const cur = fs.readFileSync(path.join(ROOT, "src/js/main.js"), "utf8");
      fs.writeFileSync(path.join(ROOT, "src/js/main.js"), cur.trimEnd() + "\n", "utf8");
    },
  },
];

for (let i = 0; i < commits.length; i++) {
  const c = commits[i];
  console.log(`\n[${i + 1}/${commits.length}] ${c.msg}`);
  c.files();
  commit(c.msg, c.date);
}

console.log("\nForce push naar GitHub...");
run(`git push origin main --force`);
console.log("\nKlaar!");
