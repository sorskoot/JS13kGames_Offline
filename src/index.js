import './global';
import { Game } from "./classes/game";

class Offline {

    constructor() {

        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.debugLayer.show();
        window.game = new Game(this.scene);

        game.createScene(this.scene);

        this.engine.runRenderLoop(() => this.scene.render());

        window.addEventListener("resize", () => this.engine.resize());
    }

}

new Offline();