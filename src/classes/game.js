import {
    PuzzleManager
} from "./puzzleManager";
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
        this.puzzleManager = new PuzzleManager();
        this.initPuzzle();

        this.laserbeam.onWin = () => {
            var meshes = this.scene.getMeshesByTags("entity");
            for (let i = 0; i < meshes.length; i++) {
                this.scene.removeMesh(meshes[i]);
            }
            this.puzzleManager.next();
            this.initPuzzle();
            this.createPuzzle();
            this.updateShadow();
            this.laserbeam.drawLaser();
        };
    }

    initPuzzle() {

        this.puzzle = this.puzzleManager.puzzle;
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
        var hemiLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        hemiLight.diffuse = new BABYLON.Color3(.2, .4, .5);
      

        var light = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-2, -3, 1), scene);
        light.position = new BABYLON.Vector3(6, 9, 3);
        light.shadowMinZ = 1;
        light.shadowMaxZ = 20;
        light.intensity = 5;

        var generator = new BABYLON.ShadowGenerator(2048, light);
    
        generator.forceBackFacesOnly = true;
        

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

        this.createPuzzle();

        let ground = new Ground(this.scene);

        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

        this.vrHelper.enableInteractions();
        this.vrHelper.enableTeleportation({
            floorMeshName: ground.name
        });

        scene.activeCamera.inertia = 0.6;
        scene.activeCamera.speed = 0.5;
        scene.activeCamera.minZ = .1; 
        scene.activeCamera.applyGravity = true;
        scene.activeCamera.ellipsoid = new BABYLON.Vector3(.25, .75, .25);
        scene.collisionsEnabled = true;
        scene.activeCamera.checkCollisions = true;


        this.generator = generator;
        this.updateShadow();
        this.laserbeam.drawLaser();
    }

    updateShadow() {
        this.generator._shadowMap.renderList = [];
        for (var i = 0; i < this.scene.meshes.length; i++) {
            if (this.scene.meshes[i].name != "Tiled Ground") {
                this.generator.addShadowCaster(this.scene.meshes[i]);
            }
            this.scene.meshes[i].receiveShadows = true;
        }
    }

    createPuzzle() {
        for (let i = 0; i < this.puzzle.length; i++) {
            switch (this.puzzle[i].type) {
                case 'start':
                    let startLaser = new Laser(this.scene, this.puzzle[i].pos, true, this.puzzle[i].rot);
                    startLaser.onPicked = () => {
                        let start = this.puzzle.find(b => b.type === "start");
                        start.rot = (start.rot + 1) % 4;
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'end':
                    let endlaser = new Laser(this.scene, this.puzzle[i].pos, false, this.puzzle[i].rot);
                    endlaser.onPicked = () => {
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'mirror':
                    let mirror = new Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                    mirror.onPicked = () => {
                        this.laserbeam.drawLaser();
                    };
                    break;
                case 'wall':
                    new Wall(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                    break;
            }
        }
    }
}