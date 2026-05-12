// opslag.js - alles wat ik opsla in localStorage

// ---- FAVORIETEN ----

function getFavorieten() {
  const opgeslagen = localStorage.getItem("favorieten");
  if (opgeslagen) {
    return JSON.parse(opgeslagen);
  }
  return [];
}

function slaFavorietOp(character) {
  const favorieten = getFavorieten();
  const bestaatAl = favorieten.find((f) => f.id === character.id);
  if (!bestaatAl) {
    favorieten.push(character);
    localStorage.setItem("favorieten", JSON.stringify(favorieten));
  }
}

function verwijderFavoriet(id) {
  let favorieten = getFavorieten();
  favorieten = favorieten.filter((f) => f.id !== id);
  localStorage.setItem("favorieten", JSON.stringify(favorieten));
}

function isFavoriet(id) {
  const favorieten = getFavorieten();
  return favorieten.some((f) => f.id === id);
}

export { getFavorieten, slaFavorietOp, verwijderFavoriet, isFavoriet };
