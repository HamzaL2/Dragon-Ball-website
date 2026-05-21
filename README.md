# Dragon Ball Z Character Encyclopedia

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

```
├── index.html
├── src/
│   ├── css/style.css
│   └── js/
│       ├── main.js
│       ├── api.js
│       ├── ui.js
│       └── opslag.js
```

## Opstarten

```bash
npm install
npm run dev
```
