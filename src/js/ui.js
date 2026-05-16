// ui.js - alles wat op het scherm verschijnt

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

  kaart.innerHTML = `
    <img class="kaart-foto" src="${character.foto}" alt="${character.naam}" />
    <h3 class="kaart-naam">${character.naam}</h3>
    <p class="kaart-ras">${character.ras}</p>
    <p class="kaart-ki">Ki: ${character.ki}</p>
    <button class="favoriet-knop" data-id="${character.id}">
      ${isGefavoriet ? "★" : "☆"}
    </button>
  `;

  kaart.addEventListener("click", function (e) {
    if (!e.target.classList.contains("favoriet-knop")) {
      toonDetail(character);
    }
  });

  const favorietKnop = kaart.querySelector(".favoriet-knop");
  favorietKnop.addEventListener("click", function () {
    wisselFavoriet(character, favorietKnop);
  });

  return kaart;
}

export { toonKaarten };
