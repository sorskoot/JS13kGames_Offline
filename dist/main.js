/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: 'run',
        value: function run() {
            var _this = this;

            this.puzzle = [{
                type: 'start',
                pos: [5, 0.5, 5],
                rot: 1 // PI * rot/2 
            }, {
                type: 'end',
                pos: [1, 0.5, 5],
                rot: 1 // PI * rot/2 
            }, {
                type: 'mirror',
                pos: [1, 0.5, 1],
                rot: 0
            }, {
                type: 'mirror',
                pos: [5, 0.5, 1],
                rot: 0
            }, {
                type: 'wall',
                pos: [3, 0.5, 5],
                rot: 0
            }];

            this.canvas = document.getElementById("renderCanvas"); // Get the canvas element 
            this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
            this.maps = this.initMaps();

            this.scene = this.createScene();

            this.drawLaser();
            this.engine.runRenderLoop(function () {
                return _this.scene.render();
            });

            window.addEventListener("resize", function () {
                return _this.engine.resize();
            });
        }
    }, {
        key: 'initMaps',
        value: function initMaps() {
            var maps = [];

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    maps.push(new BABYLON.Vector4(i / 4, j / 4, i / 4 + 0.25, j / 4 + 0.25));
                }
            }
            return maps;
        }
    }, {
        key: 'createScene',
        value: function createScene() {
            var _this2 = this;

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


            var cubes = [[7, 7, 3, 7, 7], // laser
            [1, 1, 1, 1, 1], // wall
            [5, 5, 5, 5, 5]];

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
            var objs = [];
            for (var i = 0; i < this.puzzle.length; i++) {
                (function () {
                    switch (_this2.puzzle[i].type) {
                        case 'start':
                            var starbox = _this2.drawBox(scene, mat, cubes[0], _this2.puzzle[i].pos);
                            starbox.name = "startBox";

                            starbox.actionManager = new BABYLON.ActionManager(scene);
                            starbox.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                //console.log(mesh);
                                var start = this.puzzle.find(function (b) {
                                    return b.type === "start";
                                });
                                start.rot = (start.rot + 1) % 4;
                                this.drawLaser();
                                starbox.rotation.y = starbox.rotation.y + Math.PI / 2;
                            }.bind(_this2, starbox)));
                            objs.push(starbox);
                            break;
                        case 'end':
                            var box = _this2.drawBox(scene, mat, cubes[0], _this2.puzzle[i].pos);
                            box.actionManager = new BABYLON.ActionManager(scene);
                            box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {

                                box.rotation.y = box.rotation.y + Math.PI / 2;
                            }));
                            objs.push(box);
                            break;
                        case 'mirror':
                            var tr = _this2.drawTri(scene, mat, _this2.puzzle[i].pos);
                            tr.actionManager = new BABYLON.ActionManager(scene);
                            tr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                tr.rotation.y = tr.rotation.y - Math.PI / 2;
                            }.bind(_this2, tr)));
                            objs.push(tr);
                            break;
                        case 'wall':
                            _this2.drawBox(scene, mat, cubes[1], _this2.puzzle[i].pos);
                            break;

                    }
                })();
            }
            var groundmat = new BABYLON.StandardMaterial("groundmat", scene);
            groundmat.diffuseTexture = texture.clone();
            groundmat.diffuseTexture.uScale = 0.249;
            groundmat.diffuseTexture.vScale = 0.249;
            groundmat.diffuseTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
            groundmat.diffuseTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
            groundmat.specularColor = new BABYLON.Color3(0, 0, 0);
            tiledGround.material = groundmat;

            scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

            this.vrHelper.enableInteractions();
            this.vrHelper.enableTeleportation({
                floorMeshName: "Tiled Ground"
            });

            scene.activeCamera.inertia = 0.6;
            scene.activeCamera.speed = 0.5;
            scene.activeCamera.applyGravity = true;
            scene.activeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;

            tiledGround.checkCollisions = true;
            return scene;
        }
    }, {
        key: 'drawBox',
        value: function drawBox(scene, mat, f, position) {

            var options = {
                width: 1,
                height: 1,
                depth: 1,
                faceUV: [this.maps[f[0]], this.maps[f[1]], this.maps[f[2]], this.maps[f[3]], this.maps[f[4]], this.maps[f[5]]]
            };

            var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
            box.material = mat;
            box.position = new (Function.prototype.bind.apply(BABYLON.Vector3, [null].concat(_toConsumableArray(position))))();
            return box;
        }
    }, {
        key: 'drawTri',
        value: function drawTri(scene, mat, position) {
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
            var uvs = [0.0, 0.75, 0.25, 0.5, 0.25, 0.75, 0.25, 0.75, 0.0, 0.5, 0.25, 0.5, 0.5, 0.25, 0.25, 0.25, 0.5, 0.5, 0.25, 0.5, 0.0, 0.75, 0.25, 0.75, 0.25, 0.5];

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
            customMesh.position = new (Function.prototype.bind.apply(BABYLON.Vector3, [null].concat(_toConsumableArray(position))))();
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
    }, {
        key: 'drawLaser',
        value: function drawLaser() {
            var start = this.puzzle.find(function (b) {
                return b.type === "start";
            });

            var origin = new (Function.prototype.bind.apply(BABYLON.Vector3, [null].concat(_toConsumableArray(start.pos))))();
            var direction = new BABYLON.Vector3(Math.sin(Math.PI * start.rot / 2), 0, Math.cos(Math.PI * start.rot / 2));
            var length = 100;

            var ray = new BABYLON.Ray(origin, direction, length);
            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(this.scene);
            var hit = this.scene.pickWithRay(ray, function predicate(mesh) {
                if (mesh.name == "startBox" || !mesh.isPickable) {
                    return false;
                }
                return true;
            });
            var target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);
            if (hit.pickedMesh) {
                console.log(hit.pickedMesh.name);
                target = hit.pickedMesh.position;
            }

            var myPoints = [origin, target];

            if (this.laser) {
                this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                    path: myPoints,
                    radius: .15,
                    instance: this.laser
                });
            } else {
                this.laser = BABYLON.MeshBuilder.CreateTube("lines", {
                    path: myPoints,
                    updatable: true,
                    radius: .15
                }, this.scene);
            }
            this.laser.isPickable = false;
        }
    }]);

    return Game;
}();

/***/ }),

/***/ "./src/global.js":
/*!***********************!*\
  !*** ./src/global.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.rnd = function (m) {
  return ~~(Math.random() * m);
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./global */ "./src/global.js");

var _game = __webpack_require__(/*! ./classes/game */ "./src/classes/game.js");

window.game = new _game.Game();
document.addEventListener("DOMContentLoaded", function () {
  return game.run();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJHYW1lIiwicHV6emxlIiwidHlwZSIsInBvcyIsInJvdCIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmdpbmUiLCJCQUJZTE9OIiwiRW5naW5lIiwibWFwcyIsImluaXRNYXBzIiwic2NlbmUiLCJjcmVhdGVTY2VuZSIsImRyYXdMYXNlciIsInJ1blJlbmRlckxvb3AiLCJyZW5kZXIiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiaSIsImoiLCJwdXNoIiwiVmVjdG9yNCIsIlNjZW5lIiwibGlnaHQxIiwiSGVtaXNwaGVyaWNMaWdodCIsIlZlY3RvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJwb3NpdGlvbiIsIm1hdCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJ0ZXh0dXJlIiwiVGV4dHVyZSIsIk5FQVJFU1RfU0FNUExJTkdNT0RFIiwiZGlmZnVzZVRleHR1cmUiLCJjdWJlcyIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsInRpbGVkR3JvdW5kIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUaWxlZEdyb3VuZCIsInhtaW4iLCJ6bWluIiwieG1heCIsInptYXgiLCJzdWJkaXZpc2lvbnMiLCJwbGFuYXJNYXQiLCJyZWZsZWN0aW9uVGV4dHVyZSIsImNvb3JkaW5hdGVzTW9kZSIsIkNVQklDX01PREUiLCJkaWZmdXNlQ29sb3IiLCJDb2xvcjMiLCJtZXRhbCIsIlBCUk1hdGVyaWFsIiwibWljcm9TdXJmYWNlIiwicmVmbGVjdGl2aXR5Q29sb3IiLCJhbGJlZG9Db2xvciIsIm9ianMiLCJsZW5ndGgiLCJzdGFyYm94IiwiZHJhd0JveCIsIm5hbWUiLCJhY3Rpb25NYW5hZ2VyIiwiQWN0aW9uTWFuYWdlciIsInJlZ2lzdGVyQWN0aW9uIiwiRXhlY3V0ZUNvZGVBY3Rpb24iLCJPblBpY2tUcmlnZ2VyIiwibWVzaCIsInN0YXJ0IiwiZmluZCIsImIiLCJyb3RhdGlvbiIsInkiLCJNYXRoIiwiUEkiLCJiaW5kIiwiYm94IiwidHIiLCJkcmF3VHJpIiwiZ3JvdW5kbWF0IiwiY2xvbmUiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwic3BlY3VsYXJDb2xvciIsIm1hdGVyaWFsIiwiZ3Jhdml0eSIsImVuYWJsZUludGVyYWN0aW9ucyIsImVuYWJsZVRlbGVwb3J0YXRpb24iLCJmbG9vck1lc2hOYW1lIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwiY29sbGlzaW9uc0VuYWJsZWQiLCJjaGVja0NvbGxpc2lvbnMiLCJmIiwib3B0aW9ucyIsIndpZHRoIiwiaGVpZ2h0IiwiZGVwdGgiLCJmYWNlVVYiLCJDcmVhdGVCb3giLCJjdXN0b21NZXNoIiwiTWVzaCIsInBvc2l0aW9ucyIsImluZGljZXMiLCJ1dnMiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsImFwcGx5VG9NZXNoIiwiYmFja0ZhY2VDdWxsaW5nIiwib3JpZ2luIiwiZGlyZWN0aW9uIiwic2luIiwiY29zIiwicmF5IiwiUmF5IiwicmF5SGVscGVyIiwiUmF5SGVscGVyIiwic2hvdyIsImhpdCIsInBpY2tXaXRoUmF5IiwicHJlZGljYXRlIiwiaXNQaWNrYWJsZSIsInRhcmdldCIsInBpY2tlZE1lc2giLCJjb25zb2xlIiwibG9nIiwibXlQb2ludHMiLCJsYXNlciIsIkNyZWF0ZVR1YmUiLCJwYXRoIiwicmFkaXVzIiwiaW5zdGFuY2UiLCJ1cGRhdGFibGUiLCJybmQiLCJyYW5kb20iLCJtIiwiZ2FtZSIsInJ1biJdLCJtYXBw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Q0FBK0IsT0FBL0IsRUFBd0M7QUFDakRDLDBCQUFNSCxRQUQyQztBQUVqRE0sK0JBQVcsSUFGc0M7QUFHakRGLDRCQUFRO0FBSHlDLGlCQUF4QyxFQUlWLEtBQUtoSSxLQUpLLENBQWI7QUFLSDtBQUNELGlCQUFLNkgsS0FBTCxDQUFXTixVQUFYLEdBQXdCLEtBQXhCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9VTGxILE9BQU84SCxHQUFQLEdBQWE7QUFBQSxTQUFLLENBQUMsRUFBRXBFLEtBQUtxRSxNQUFMLEtBQWdCQyxDQUFsQixDQUFOO0FBQUEsQ0FBYixDOzs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUVBaEksT0FBT2lJLElBQVAsR0FBYyxJQUFJbkosVUFBSixFQUFkO0FBQ0FNLFNBQVNhLGdCQUFULENBQTBCLGtCQUExQixFQUE4QztBQUFBLFNBQU1nSSxLQUFLQyxHQUFMLEVBQU47QUFBQSxDQUE5QyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcclxuICAgIHJ1bigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBbe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7IC8vIEdldCB0aGUgY2FudmFzIGVsZW1lbnQgXHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpOyAvLyBHZW5lcmF0ZSB0aGUgQkFCWUxPTiAzRCBlbmdpbmVcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSB0aGlzLmNyZWF0ZVNjZW5lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5lbmdpbmUucmVzaXplKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgIGxldCBtYXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgc2NlbmUgc3BhY2VcclxuICAgICAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBhIGNhbWVyYSB0byB0aGUgc2NlbmUgYW5kIGF0dGFjaCBpdCB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgLy8gdmFyIGNhbWVyYSA9IG5ldyBCQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcIkNhbWVyYVwiLCBNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDIsIDIsIEJBQllMT04uVmVjdG9yMy5aZXJvKCksIHNjZW5lKTtcclxuICAgICAgICAvLyBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIC8vIEFkZCBsaWdodHMgdG8gdGhlIHNjZW5lXHJcbiAgICAgICAgdmFyIGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgIC8vICB2YXIgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSwgc2NlbmUpO1xyXG4gICAgICAgIC8vICAgICBzY2VuZS5jcmVhdGVEZWZhdWx0Q2FtZXJhT3JMaWdodCh0cnVlLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAvL3NjZW5lLmNyZWF0ZURlZmF1bHRFbnZpcm9ubWVudCgpO1xyXG5cclxuICAgICAgICAvLyB2YXIgYm94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJib3hcIiwge2hlaWdodDogMX0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcbiAgICAgICAgLy8gdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig1MTIsIGxpZ2h0KTtcclxuICAgICAgICAvLyBnZW5lcmF0b3IudXNlQmx1ckV4cG9uZW50aWFsU2hhZG93TWFwID0gdHJ1ZTtcclxuICAgICAgICAvLyBnZW5lcmF0b3IuYmx1cktlcm5lbCA9IDM7XHJcblxyXG4gICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGdlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIoc2NlbmUubWVzaGVzW2ldKTsgICAgXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyB2YXIgaGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcclxuICAgICAgICAvLyAgICAgZW5hYmxlR3JvdW5kTWlycm9yOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICBncm91bmRTaGFkb3dMZXZlbDogMC43NSxcclxuICAgICAgICAvLyB9KTsgICAgICAgXHJcbiAgICAgICAgdmFyIG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJtYXRcIiwgc2NlbmUpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInRpbGVzLnBuZ1wiLCBzY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL1RpbGVzOlxyXG4gICAgICAgIC8vIDA6IEdyb3VuZFxyXG4gICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIC8vIDM6IExhc2VyXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICAvLyA1OlxyXG4gICAgICAgIC8vIDY6XHJcbiAgICAgICAgLy8gNzpcclxuICAgICAgICAvLyA4OlxyXG4gICAgICAgIC8vIDk6XHJcbiAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgLy8gMTI6XHJcbiAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgLy8gMTU6XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGN1YmVzID0gW1xyXG4gICAgICAgICAgICBbNywgNywgMywgNywgN10sIC8vIGxhc2VyXHJcbiAgICAgICAgICAgIFsxLCAxLCAxLCAxLCAxXSwgLy8gd2FsbFxyXG4gICAgICAgICAgICBbNSwgNSwgNSwgNSwgNV0sIC8vIG1pcnJvclxyXG4gICAgICAgIF07XHJcblxyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSgpO1xyXG5cclxuICAgICAgICB2YXIgdGlsZWRHcm91bmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHBsYW5hck1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJwbGFuYXJNYXRcIiwgc2NlbmUpO1xyXG4gICAgICAgIHBsYW5hck1hdC5yZWZsZWN0aW9uVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJyb29tLnBuZ1wiLCBzY2VuZSk7XHJcbiAgICAgICAgcGxhbmFyTWF0LnJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9IEJBQllMT04uVGV4dHVyZS5DVUJJQ19NT0RFO1xyXG4gICAgICAgIHBsYW5hck1hdC5kaWZmdXNlQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoLjMsIC4zLCAuMyk7XHJcbiAgICAgICAgdmFyIG1ldGFsID0gbmV3IEJBQllMT04uUEJSTWF0ZXJpYWwoXCJtZXRhbFwiLCBzY2VuZSk7XHJcbiAgICAgICAgbWV0YWwucmVmbGVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwicm9vbS5wbmdcIiwgc2NlbmUpO1xyXG4gICAgICAgIG1ldGFsLm1pY3JvU3VyZmFjZSA9IDAuOTY7XHJcbiAgICAgICAgbWV0YWwucmVmbGVjdGl2aXR5Q29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC44NSwgMC44NSwgMC44NSk7XHJcbiAgICAgICAgbWV0YWwuYWxiZWRvQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC4wMSwgMC4wMSwgMC4wMSk7XHJcbiAgICAgICAgbGV0IG9ianMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHV6emxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wdXp6bGVbaV0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGFyYm94ID0gdGhpcy5kcmF3Qm94KHNjZW5lLCBtYXQsIGN1YmVzWzBdLCB0aGlzLnB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJib3gubmFtZSA9IFwic3RhcnRCb3hcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcmJveC5hY3Rpb25NYW5hZ2VyID0gbmV3IEJBQllMT04uQWN0aW9uTWFuYWdlcihzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcmJveC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFyYm94LnJvdGF0aW9uLnkgPSBzdGFyYm94LnJvdGF0aW9uLnkgKyBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzLCBzdGFyYm94KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaChzdGFyYm94KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJveCA9IHRoaXMuZHJhd0JveChzY2VuZSwgbWF0LCBjdWJlc1swXSwgdGhpcy5wdXp6bGVbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJveC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAobWVzaCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LnJvdGF0aW9uLnkgPSBib3gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2goYm94KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pcnJvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRyID0gdGhpcy5kcmF3VHJpKHNjZW5lLCBtYXQsIHRoaXMucHV6emxlW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHIuYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5yb3RhdGlvbi55ID0gdHIucm90YXRpb24ueSAtIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcywgdHIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Jqcy5wdXNoKHRyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0JveChzY2VuZSwgbWF0LCBjdWJlc1sxXSwgdGhpcy5wdXp6bGVbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHNjZW5lKTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlLmNsb25lKCk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGlsZWRHcm91bmQubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC05LjgxLCAwKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVJbnRlcmFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZVRlbGVwb3J0YXRpb24oe1xyXG4gICAgICAgICAgICBmbG9vck1lc2hOYW1lOiBcIlRpbGVkIEdyb3VuZFwiXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5pbmVydGlhID0gMC42O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5zcGVlZCA9IDAuNTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRpbGVkR3JvdW5kLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdCb3goc2NlbmUsIG1hdCwgZiwgcG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXHJcbiAgICAgICAgICAgIGRlcHRoOiAxLFxyXG4gICAgICAgICAgICBmYWNlVVY6IFt0aGlzLm1hcHNbZlswXV0sIHRoaXMubWFwc1tmWzFdXSwgdGhpcy5tYXBzW2ZbMl1dLCB0aGlzLm1hcHNbZlszXV0sIHRoaXMubWFwc1tmWzRdXSwgdGhpcy5tYXBzW2ZbNV1dXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBib3ggPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCgnYm94Jywgb3B0aW9ucywgc2NlbmUpO1xyXG4gICAgICAgIGJveC5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICBib3gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gYm94O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdUcmkoc2NlbmUsIG1hdCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgY3VzdG9tTWVzaCA9IG5ldyBCQUJZTE9OLk1lc2goXCJjdXN0b21cIiwgc2NlbmUpO1xyXG5cclxuICAgICAgICAvL1NldCBhcnJheXMgZm9yIHBvc2l0aW9ucyBhbmQgaW5kaWNlc1xyXG4gICAgICAgIHZhciBwb3NpdGlvbnMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdmFyIGluZGljZXMgPSBbNiwgOCwgOSwgOSwgNywgNiwgNCwgMSwgMywgMywgNSwgNCwgMTEsIDEwLCAxMiwgMiwgMCwgNCwgNCwgNSwgMl07XHJcbiAgICAgICAgLy8gdmFyIHV2cyA9IFtcclxuICAgICAgICAvLyAgICAgMC4wLCAwLjc1LFxyXG4gICAgICAgIC8vICAgICAwLjI1LCAwLjUsXHJcbiAgICAgICAgLy8gICAgIDAuMjUsIDAuNzUsXHJcbiAgICAgICAgLy8gICAgIDAuMjUsIDAuNzUsXHJcbiAgICAgICAgLy8gICAgIDAuMCwgMC41LFxyXG4gICAgICAgIC8vICAgICAwLjAsIDAuNzUsXHJcbiAgICAgICAgLy8gICAgIDAuNSwgMC4yNSxcclxuICAgICAgICAvLyAgICAgMC4yNSwgMC4yNSxcclxuICAgICAgICAvLyAgICAgMC41LCAwLjUsXHJcbiAgICAgICAgLy8gICAgIDAuMjUsIDAuNSxcclxuICAgICAgICAvLyAgICAgMC4wLCAwLjc1LFxyXG4gICAgICAgIC8vICAgICAwLjI1LCAwLjc1LFxyXG4gICAgICAgIC8vICAgICAwLjI1LCAwLjUsXHJcbiAgICAgICAgLy8gXTtcclxuICAgICAgICB2YXIgdXZzID0gWzAuMCwgMC43NSwgMC4yNSwgMC41LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjAsIDAuNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuMjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjUsIDAuMCwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMC41XTtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHZhciBub3JtYWxzID0gW107XHJcblxyXG4gICAgICAgIC8vQ2FsY3VsYXRpb25zIG9mIG5vcm1hbHMgYWRkZWRcclxuICAgICAgICBCQUJZTE9OLlZlcnRleERhdGEuQ29tcHV0ZU5vcm1hbHMocG9zaXRpb25zLCBpbmRpY2VzLCBub3JtYWxzKTtcclxuXHJcbiAgICAgICAgLy9Bc3NpZ24gcG9zaXRpb25zIGFuZCBpbmRpY2VzIHRvIHZlcnRleERhdGFcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSBpbmRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IG5vcm1hbHM7XHJcbiAgICAgICAgdmVydGV4RGF0YS51dnMgPSB1dnM7XHJcbiAgICAgICAgLy9BcHBseSB2ZXJ0ZXhEYXRhIHRvIGN1c3RvbSBtZXNoXHJcbiAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaChjdXN0b21NZXNoKTtcclxuICAgICAgICBjdXN0b21NZXNoLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgIGN1c3RvbU1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgY3VzdG9tTWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4ucG9zaXRpb24pO1xyXG4gICAgICAgIHJldHVybiBjdXN0b21NZXNoO1xyXG4gICAgICAgIC8vIHZhciBteVNoYXBlID0gW1xyXG4gICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKC0uNSwgLjUsIC0uNSksXHJcbiAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIC41LCAuNSwgLS41KSxcclxuICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggLjUsLS41LCAtLjUpXHJcbiAgICAgICAgLy8gXTtcclxuXHJcbiAgICAgICAgLy8gbXlTaGFwZS5wdXNoKG15U2hhcGVbMF0pO1xyXG5cclxuICAgICAgICAvLyB2YXIgbXlQYXRoID0gW1xyXG4gICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsMCksXHJcbiAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwwKSxcclxuICAgICAgICAvLyBdO1xyXG5cclxuICAgICAgICAvLyAvL0NyZWF0ZSBleHRydXNpb24gd2l0aCB1cGRhdGFibGUgcGFyYW1ldGVyIHNldCB0byB0cnVlIGZvciBsYXRlciBjaGFuZ2VzXHJcbiAgICAgICAgLy8gdmFyIGV4dHJ1c2lvbiA9IEJBQllMT04uTWVzaEJ1aWxkZXIuRXh0cnVkZVNoYXBlKFwic3RhclwiLCB7XHJcbiAgICAgICAgLy8gICAgIHNoYXBlOiBteVNoYXBlLFxyXG4gICAgICAgIC8vICAgICBwYXRoOiBteVBhdGgsXHJcbiAgICAgICAgLy8gICAgIHNpZGVPcmllbnRhdGlvbjogQkFCWUxPTi5NZXNoLkRPVUJMRVNJREUsXHJcbiAgICAgICAgLy8gICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgY2FwOiBCQUJZTE9OLk1lc2guQ0FQX0FMTFxyXG4gICAgICAgIC8vIH0sIHNjZW5lKTtcclxuICAgICAgICAvLyBleHRydXNpb24ubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgLy8gZXh0cnVzaW9uLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5wb3NpdGlvbik7XHJcbiAgICAgICAgLy8gcmV0dXJuIGV4dHJ1c2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4uc3RhcnQucG9zKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSk7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEwMDtcclxuXHJcbiAgICAgICAgdmFyIHJheSA9IG5ldyBCQUJZTE9OLlJheShvcmlnaW4sIGRpcmVjdGlvbiwgbGVuZ3RoKTtcclxuICAgICAgICBsZXQgcmF5SGVscGVyID0gbmV3IEJBQllMT04uUmF5SGVscGVyKHJheSk7XHJcbiAgICAgICAgcmF5SGVscGVyLnNob3codGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIGhpdCA9IHRoaXMuc2NlbmUucGlja1dpdGhSYXkocmF5LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcmVkaWNhdGUobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1lc2gubmFtZSA9PSBcInN0YXJ0Qm94XCIgfHwgIW1lc2guaXNQaWNrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbmV3IEJBQllMT04uVmVjdG9yMyhzdGFydC5wb3NbMF0gKyBNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDAsIDAuNSwgc3RhcnQucG9zWzJdICsgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwKVxyXG4gICAgICAgIGlmIChoaXQucGlja2VkTWVzaCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhoaXQucGlja2VkTWVzaC5uYW1lKTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gaGl0LnBpY2tlZE1lc2gucG9zaXRpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbXlQb2ludHMgPSBbXHJcbiAgICAgICAgICAgIG9yaWdpbixcclxuICAgICAgICAgICAgdGFyZ2V0XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFzZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXNlciA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVHViZShcImxpbmVzXCIsIHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IG15UG9pbnRzLFxyXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAuMTUsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogdGhpcy5sYXNlclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhc2VyID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUdWJlKFwibGluZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogbXlQb2ludHMsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IC4xNVxyXG4gICAgICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXNlci5pc1BpY2thYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbndpbmRvdy5nYW1lID0gbmV3IEdhbWUoKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZ2FtZS5ydW4oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==