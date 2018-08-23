require('./global');
let Game = require('./game.component');


let game = new Game();
document.addEventListener("DOMContentLoaded", () => game.run());