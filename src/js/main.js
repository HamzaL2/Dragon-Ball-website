// main.js - hier start de app en staan de event listeners

import { haalCharactersOp } from "./api.js";
import { getWeergave, slaWeergaveOp } from "./opslag.js";
import { toonKaarten, toonTabel, toonFavorieten } from "./ui.js";

let alleCharacters = [];
let huidigeWeergave = getWeergave();
