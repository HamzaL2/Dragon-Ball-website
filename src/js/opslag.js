// opslag.js - alles wat ik opsla in localStorage

function getFavorieten() {
  const opgeslagen = localStorage.getItem("favorieten");
  if (opgeslagen) {
    return JSON.parse(opgeslagen);
  }
  return [];
}

export { getFavorieten };
