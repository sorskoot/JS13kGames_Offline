require('./global');
let Game = require('./game.component');


window.game = new Game();
document.addEventListener("DOMContentLoaded", () => game.run());