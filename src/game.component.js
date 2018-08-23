'use strict';

module.exports = class Game {

    run() {
        this.canvas = document.getElementById("renderCanvas"); // Get the canvas element 
        this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
        this.scene = this.createScene();

        this.engine.runRenderLoop(() => this.scene.render());
     
        window.addEventListener("resize", () => this.engine.resize());
    }

    createScene() {

        // Create the scene space
        var scene = new BABYLON.Scene(this.engine);

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(this.canvas, true);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);


        // Add and manipulate meshes in the scene
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 2
        }, scene);

        return scene;
    };
};