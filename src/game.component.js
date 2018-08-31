(function () {
    'use strict';

    module.exports = class Game {



        run() {

            this.puzzle = [{
                    type: 'start',
                    pos: [5, 1, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'end',
                    pos: [1, 1, 5],
                    rot: 1 // PI * rot/2 
                },
                {
                    type: 'mirror',
                    pos: [1, 1, 1],
                    rot: 0
                },
                {
                    type: 'mirror',
                    pos: [5, 1, 1],
                    rot: 0
                },
                {
                    type: 'wall',
                    pos: [3, 1, 5],
                    rot: 0
                }
            ];


            this.canvas = document.getElementById("renderCanvas"); // Get the canvas element 
            this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
            this.maps = this.initMaps();

            this.scene = this.createScene();

            this.drawLaser();

            this.engine.runRenderLoop(() => this.scene.render());

            window.addEventListener("resize", () => this.engine.resize());
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



            var cubes = [
                [7, 7, 3, 7, 7], // laser
                [1, 1, 1, 1, 1], // wall
                [5, 5, 5, 5, 5], // mirror
            ];


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

            var planarMat = new BABYLON.StandardMaterial("planarMat", scene);
            planarMat.reflectionTexture = new BABYLON.Texture("room.png", scene);
            planarMat.reflectionTexture.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
            planarMat.diffuseColor = new BABYLON.Color3(.3, .3, .3);
            var metal = new BABYLON.PBRMaterial("metal", scene);
            metal.reflectionTexture = new BABYLON.Texture("room.png", scene);
            metal.microSurface = 0.96;
            metal.reflectivityColor = new BABYLON.Color3(0.85, 0.85, 0.85);
            metal.albedoColor = new BABYLON.Color3(0.01, 0.01, 0.01);
            let objs = [];
            for (let i = 0; i < this.puzzle.length; i++) {
                switch (this.puzzle[i].type) {
                    case 'start':
                    let starbox = this.drawBox(scene, mat, cubes[0], this.puzzle[i].pos);
                    starbox.name="startBox";

                    starbox.actionManager = new BABYLON.ActionManager(scene);
                    starbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (function(mesh) {
                        //console.log(mesh);
                        let start = this.puzzle.find(b => b.type === "start");
                        start.rot = (start.rot + 1) % 4;
                        this.drawLaser();
                        starbox.rotation.y = starbox.rotation.y + Math.PI / 2;
                    }).bind(this,starbox)));
                    objs.push[starbox];
                    break;
                    case 'end':
                        let box = this.drawBox(scene, mat, cubes[0], this.puzzle[i].pos);
                        box.actionManager = new BABYLON.ActionManager(scene);
                        box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (mesh) => {
                          
                            box.rotation.y = box.rotation.y + Math.PI / 2;
                        }));
                        objs.push[box];
                        break;
                    case 'mirror':
                        let tr = this.drawTri(scene, mat, this.puzzle[i].pos);
                        tr.actionManager = new BABYLON.ActionManager(scene);
                        tr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, (function (mesh) {
                            tr.rotation.y = tr.rotation.y - Math.PI / 2;
                        }).bind(this, tr)));
                        objs.push[tr];
                        break;
                    case 'wall':
                        this.drawBox(scene, mat, cubes[1], this.puzzle[i].pos);
                        break;

                }

            }
            var groundmat = new BABYLON.StandardMaterial("groundmat", scene);
            groundmat.diffuseTexture = texture.clone();
            groundmat.diffuseTexture.uScale = 0.249;
            groundmat.diffuseTexture.vScale = 0.249;
            groundmat.diffuseTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
            groundmat.diffuseTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
            groundmat.specularColor = new BABYLON.Color3(0, 0, 0);
            tiledGround.material = groundmat;

            var camera = scene.activeCamera;

            this.vrHelper.enableInteractions();
            this.vrHelper.enableTeleportation({
                floorMeshName: "Tiled Ground"
            });

            scene.activeCamera.inertia = 0.6;
            scene.activeCamera.speed = 0.5;

            return scene;
        }

        drawBox(scene, mat, f, position) {

            var options = {
                width: 1,
                height: 1,
                depth: 1,
                faceUV: [this.maps[f[0]], this.maps[f[1]], this.maps[f[2]], this.maps[f[3]], this.maps[f[4]], this.maps[f[5]]]
            };

            var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
            box.material = mat;
            box.position = new BABYLON.Vector3(...position);
            return box;
        }

        drawTri(scene, mat, position) {
            var customMesh = new BABYLON.Mesh("custom", scene);

            //Set arrays for positions and indices
            var positions = [-0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5];
            var indices = [6, 8, 9, 9, 7, 6, 4, 1, 3, 3, 5, 4, 11, 10, 12, 2, 0, 4, 4, 5, 2];
            // var uvs = [
            //     0.0, 0.75,
            //     0.25, 0.5,
            //     0.25, 0.75,
            //     0.25, 0.75,
            //     0.0, 0.5,
            //     0.0, 0.75,
            //     0.5, 0.25,
            //     0.25, 0.25,
            //     0.5, 0.5,
            //     0.25, 0.5,
            //     0.0, 0.75,
            //     0.25, 0.75,
            //     0.25, 0.5,
            // ];
            var uvs = [0.0,0.75, 0.25,0.5, 0.25,0.75, 0.25,0.75, 0.0,0.5, 0.25,0.5, 0.5,0.25, 0.25,0.25, 0.5,0.5, 0.25,0.5, 0.0,0.75, 0.25,0.75, 0.25,0.5];

            //Create a vertexData object
            var vertexData = new BABYLON.VertexData();
            var normals = [];

            //Calculations of normals added
            BABYLON.VertexData.ComputeNormals(positions, indices, normals);

            //Assign positions and indices to vertexData
            vertexData.positions = positions;
            vertexData.indices = indices;
            vertexData.normals = normals;
            vertexData.uvs = uvs;
            //Apply vertexData to custom mesh
            vertexData.applyToMesh(customMesh);
            customMesh.material = mat;
            customMesh.material.backFaceCulling = false;
            customMesh.position = new BABYLON.Vector3(...position);
            return customMesh;
            // var myShape = [
            //     new BABYLON.Vector3(-.5, .5, -.5),
            //     new BABYLON.Vector3( .5, .5, -.5),
            //     new BABYLON.Vector3( .5,-.5, -.5)
            // ];

            // myShape.push(myShape[0]);

            // var myPath = [
            //     new BABYLON.Vector3(0, 0,0),
            //     new BABYLON.Vector3(0, 1,0),
            // ];

            // //Create extrusion with updatable parameter set to true for later changes
            // var extrusion = BABYLON.MeshBuilder.ExtrudeShape("star", {
            //     shape: myShape,
            //     path: myPath,
            //     sideOrientation: BABYLON.Mesh.DOUBLESIDE,
            //     updatable: true,
            //     cap: BABYLON.Mesh.CAP_ALL
            // }, scene);
            // extrusion.material = mat;
            // extrusion.position = new BABYLON.Vector3(...position);
            // return extrusion;
        }

        drawLaser() {
            let start = this.puzzle.find(b => b.type === "start");
            
            let origin = new BABYLON.Vector3(...start.pos);
            let direction = new BABYLON.Vector3(Math.sin(Math.PI * start.rot / 2), 0, Math.cos(Math.PI * start.rot / 2));
            let length = 100;

            var ray = new BABYLON.Ray(origin, direction, length);
	        let rayHelper = new BABYLON.RayHelper(ray);		
            rayHelper.show(this.scene);		
            var hit = this.scene.pickWithRay(ray,
                function predicate(mesh){
                if (mesh.name == "startBox" || !mesh.isPickable){
                    return false;
                }
                return true;
            });
            let target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 10, 1, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 10)
            if (hit.pickedMesh){
               console.log(hit.pickedMesh.name);
               target = hit.pickedMesh.position;
            }

            var myPoints = [
                origin,
                target                
            ];

            if(this.laser){
                this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                    path: myPoints,
                    radius:.15,
                    instance: this.laser
                });
            }else{
                this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                    path: myPoints,
                    updatable:true,
                    radius:.15
                }, this.scene);
            }
            this.laser.isPickable = false;
        }
    };
})();