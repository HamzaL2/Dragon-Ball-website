# Dragon Ball Z Characters

Een interactieve single-page webapplicatie over personages uit Dragon Ball Z. Gebouwd met vanilla JavaScript en Vite, gebruikmakend van de Dragon Ball API.

## Functionaliteiten

* Personages ophalen van de Dragon Ball API
* Zoeken op naam
* Filteren op ras (Saiyan, Namekian, Android, Human, ...)
* Sorteren op naam en power level (Ki)
* Favorieten opslaan tussen sessies
* Weergavevoorkeur (kaarten/tabel) opslaan met localStorage
* Animaties via IntersectionObserver

## Gebruikte API

* [Dragon Ball API documentatie](https://dragonball-api.com)
* Endpoint: `https://dragonball-api.com/api/characters?limit=25`

## Technische vereisten

### DOM Manipulatie

* Elementen selecteren: `main.js` - lijn 39 (`document.getElementById`)
* Elementen manipuleren: `ui.js` - lijn 14 (`kaartenWeergave.innerHTML`)
* Events koppelen: `main.js` - lijn 122 (`addEventListener`)

### Modern JavaScript

* Constanten: `api.js` - lijn 3 (`const API_URL`)
* Template literals: `ui.js` - lijn 49-57 (`kaart.innerHTML = \`...\``)
* Iteratie over arrays: `ui.js` - lijn 21 (`forEach`)
* Array methodes: `main.js` - lijn 66 (`filter`), `api.js` - lijn 48 (`map`), `main.js` - lijn 73 (`sort`)
* Arrow functions: `main.js` - lijn 74 (`resultaten.sort((a, b) => a.naam.localeCompare(b.naam))`)
* Ternary operator: `ui.js` - lijn 55 (`isGefavoriet ? "★" : "☆"`)
* Callback functions: `main.js` - lijn 122 (`addEventListener('click', function() {`)
* Promises: `api.js` - lijn 38 (`fetch` returns a Promise)
* Async & Await: `api.js` - lijn 37 (`async function haalCharactersOp()`), `main.js` - lijn 38 (`async function startApp()`)
* Observer API: `ui.js` - lijn 27 (`new IntersectionObserver`)

### Data & API

* Fetch: `api.js` - lijn 38 (`await fetch(API_URL)`)
* JSON manipuleren: `api.js` - lijn 44 (`await response.json()`), `opslag.js` - lijn 8 (`JSON.parse`)

### Opslag & Validatie

* Formuliervalidatie: `main.js` - lijn 126 (`zoekterm.trim() === ""`)
* LocalStorage: `opslag.js` - lijn 18 (`localStorage.setItem`)

### Tooling

* Project opgezet met Vite

## Installatiehandleiding

### Vereisten

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)

### Stappen

1. Clone de repository

```
git clone https://github.com/HamzaL2/Dragon-Ball-website
```

2. Ga naar de projectmap

```
cd jouw-dragonball-repo
```

3. Installeer de dependencies

```
npm install
```

4. Start de development server

```
npm run dev
```

5. Open de app in je browser

```
http://localhost:5173
```

## Screenshots

foto met zoekbalk en kaarten

<img width="1883" height="927" alt="image" src="https://github.com/user-attachments/assets/9da9bdd1-2233-4d12-a47e-25d7e1fab4fa" />

foto met kaarten en favorieten geselecteerd

<img width="1888" height="926" alt="image" src="https://github.com/user-attachments/assets/f033f22a-69c6-45cd-add7-6861d1a73d7e" />

## Gebruikte bronnen

### API

* [Dragon Ball API](https://dragonball-api.com/api/characters?limit=25)
* [Dragon Ball API documentatie](https://dragonball-api.com)

### Documentatie

* [MDN Web Docs](https://developer.mozilla.org/en-US/)
* [Vite documentatie](https://vitejs.dev/)

### AI

* Claude (Anthropic) - [chatlog bijgevoegd]
