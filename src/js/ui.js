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
    rij.innerHTML = `
      <td><img class="tabel-foto" src="${character.foto}" alt="${character.naam}" /></td>
      <td>${character.naam}</td>
      <td>${character.ras}</td>
      <td>${character.geslacht}</td>
      <td>${character.ki}</td>
      <td>${character.maxKi}</td>
      <td>${character.affiliation}</td>
      <td>
        <button class="favoriet-knop" data-id="${character.id}">
          ${isGefavoriet ? "★" : "☆"}
        </button>
      </td>
    `;

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

  modalData.innerHTML = `
    <img class="modal-foto" src="${character.foto}" alt="${character.naam}" />
    <h2>${character.naam}</h2>
    <p><strong>Ras:</strong> ${character.ras}</p>
    <p><strong>Geslacht:</strong> ${character.geslacht}</p>
    <p><strong>Ki:</strong> ${character.ki}</p>
    <p><strong>Max Ki:</strong> ${character.maxKi}</p>
    <p><strong>Affiliation:</strong> ${character.affiliation}</p>
    <p><strong>Beschrijving:</strong> ${character.beschrijving}</p>
  `;

  modal.classList.remove("verborgen");
}

export { toonKaarten, toonTabel, toonDetail };
