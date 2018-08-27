(function () {
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
            // var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
            // camera.attachControl(this.canvas, true);

            // // Add lights to the scene
            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
            //  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);
            //     scene.createDefaultCameraOrLight(true, true, true);
            //scene.createDefaultEnvironment();

            // var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, scene);

            var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
            light.position = new BABYLON.Vector3(6, 9, 3);
            // var generator = new BABYLON.ShadowGenerator(512, light);
            // generator.useBlurExponentialShadowMap = true;
            // generator.blurKernel = 3;

            // for (var i = 0; i < scene.meshes.length; i++) {
            //     generator.addShadowCaster(scene.meshes[i]);    
            // }

            // var helper = scene.createDefaultEnvironment({
            //     enableGroundMirror: true,
            //     groundShadowLevel: 0.75,
            // });       
            var mat = new BABYLON.StandardMaterial("mat", scene);
            var texture = new BABYLON.Texture("tiles.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
            mat.diffuseTexture = texture;

            var maps = [];

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    // faceUV[i] = new BABYLON.Vector4(.75, 0, 1, .25);
                    maps.push(new BABYLON.Vector4(i / 4, j / 4, i / 4 + 0.25, j / 4 + 0.25));
                }
            }

            //Tiles:
            // 0: Ground
            // 1:
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

            var options = {
                width: 1,
                height: 1,
                depth: 1,
                faceUV: [maps[3], maps[7], maps[7], maps[7], maps[7], maps[7]]
            };

            var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
            box.material = mat;
            box.position = new BABYLON.Vector3(1, 1, 0);

            box.actionManager = new BABYLON.ActionManager(scene);
            box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (function (mesh) {
                box.rotation.y = box.rotation.y - Math.PI / 2;
            }).bind(this, box)));

            this.vrHelper = scene.createDefaultVRExperience();

            var tiledGround = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
                xmin: -10,
                zmin: -10,
                xmax: 10,
                zmax: 10,
                subdivisions: {
                    'h': 20,
                    'w': 20
                }
            }, scene);

            var groundmat = new BABYLON.StandardMaterial("groundmat", scene);
            groundmat.diffuseTexture = texture.clone();
            groundmat.diffuseTexture.uScale = 0.249;
            groundmat.diffuseTexture.vScale = 0.249;
            groundmat.diffuseTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
            groundmat.diffuseTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
            tiledGround.material = groundmat;

            var camera = scene.activeCamera;
            if (camera.controllers) {
                camera.controllers.forEach((gp) => {
                    console.log(gp);
                    let mesh = gp.hand === 'right' ? rightBox : leftBox;

                    gp.onPadValuesChangedObservable.add(function (stateObject) {
                        let r = (stateObject.x + 1) / 2;
                        let g = (stateObject.y + 1) / 2;
                        mesh.material.diffuseColor.copyFromFloats(r, g, 1);
                    });
                    gp.onTriggerStateChangedObservable.add(function (stateObject) {
                        let scale = 2 - stateObject.value;
                        mesh.scaling.x = scale;
                    });
                    // oculus only
                    /*gp.onSecondaryTriggerStateChangedObservable.add(function (stateObject) {
                        let scale = 2 - stateObject.value;
                        mesh.scaling.z = scale;
                    });*/
                    gp.attachToMesh(mesh);
                });

                var rightBox = BABYLON.Mesh.CreateBox("sphere1", 0.1, scene);
                rightBox.scaling.copyFromFloats(2, 1, 2);
                var leftBox = BABYLON.Mesh.CreateBox("sphere1", 0.1, scene);
                leftBox.scaling.copyFromFloats(2, 1, 2);

                rightBox.material = new BABYLON.StandardMaterial('right', scene);
                leftBox.material = new BABYLON.StandardMaterial('right', scene);

            }
            this.vrHelper.enableInteractions();

            this.vrHelper.enableTeleportation({
                floorMeshName: "Tiled Ground"
            });

            scene.activeCamera.inertia = 0.6;
            scene.activeCamera.speed = 0.5;

       
            return scene;
        }
    };
})();