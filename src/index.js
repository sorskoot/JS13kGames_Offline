import './global';
import { Game } from "./classes/game";

window.game = new Game();
document.addEventListener("DOMContentLoaded", () => game.run());