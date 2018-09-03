import {
    Puzzle
} from "./puzzle";
import {
    Wall
} from "./entities/wall";
import {
    Mirror
} from "./entities/mirror";
import {
    Laser
} from "./entities/laser";
import {
    Ground
} from "./ground";
import {
    Laserbeam
} from "./Laserbeam";

export class Game {

    constructor(scene) {
        this.scene = scene;
        this.maps = this.initMaps();
        this.puzzle = new Puzzle().puzzle;
        this.laserbeam = new Laserbeam(this.scene, this.puzzle);
    }

    initMaps() {
        let maps = [];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                maps.push(new BABYLON.Vector4(i / 4, j / 4, i / 4 + 0.25, j / 4 + 0.25));
            }
        }
        return maps;
    }

    createScene(scene) {
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

        var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
        light.position = new BABYLON.Vector3(6, 9, 3);

     
        //Tiles:
        // 0: Ground
        // 1: Wall
        // 2:
        // 3: Laser
        // 4:
        // 5:
        // 6:
        // 7:
        // 8:
        // 9:
        // 10:
        // 11:
        // 12:
        // 13:
        // 14:
        // 15:

        this.vrHelper = scene.createDefaultVRExperience();

        for (let i = 0; i < this.puzzle.length; i++) {
            switch (this.puzzle[i].type) {
                case 'start':
                    let startLaser = new Laser(this.scene, this.puzzle[i].pos, true, this.puzzle[i].rot);
                    startLaser.onPicked = () =>{
                        let start = this.puzzle.find(b => b.type === "start");
                        start.rot = (start.rot + 1) % 4;
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'end':
                    let endlaser = new Laser(this.scene, this.puzzle[i].pos, false, this.puzzle[i].rot);
                    endlaser.onPicked = () =>{
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'mirror':
                    let mirror = new Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                    mirror.onPicked = () =>{
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'wall':
                    new Wall(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                    break;
            }
        }

        let ground = new Ground(this.scene);

        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

        this.vrHelper.enableInteractions();
        this.vrHelper.enableTeleportation({
            floorMeshName: ground.name
        });

        scene.activeCamera.inertia = 0.6;
        scene.activeCamera.speed = 0.5;
        scene.activeCamera.applyGravity = true;
        scene.activeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        scene.collisionsEnabled = true;
        scene.activeCamera.checkCollisions = true;

        this.laserbeam.drawLaser();
    }
}