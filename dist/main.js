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

/***/ "./src/game.component.js":
/*!*******************************!*\
  !*** ./src/game.component.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    'use strict';

    module.exports = function () {
        function Game() {
            _classCallCheck(this, Game);
        }

        _createClass(Game, [{
            key: 'run',
            value: function run() {
                var _this = this;

                this.puzzle = [{
                    type: 'start',
                    pos: [5, 1, 5],
                    rot: 1 // PI * rot/2 
                }, {
                    type: 'end',
                    pos: [1, 1, 5],
                    rot: 1 // PI * rot/2 
                }, {
                    type: 'mirror',
                    pos: [1, 1, 1],
                    rot: 0
                }, {
                    type: 'mirror',
                    pos: [5, 1, 1],
                    rot: 0
                }, {
                    type: 'wall',
                    pos: [3, 1, 5],
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
                                objs.push[starbox];
                                break;
                            case 'end':
                                var box = _this2.drawBox(scene, mat, cubes[0], _this2.puzzle[i].pos);
                                box.actionManager = new BABYLON.ActionManager(scene);
                                box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {

                                    box.rotation.y = box.rotation.y + Math.PI / 2;
                                }));
                                objs.push[box];
                                break;
                            case 'mirror':
                                var tr = _this2.drawTri(scene, mat, _this2.puzzle[i].pos);
                                tr.actionManager = new BABYLON.ActionManager(scene);
                                tr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                    tr.rotation.y = tr.rotation.y - Math.PI / 2;
                                }.bind(_this2, tr)));
                                objs.push[tr];
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

                var camera = scene.activeCamera;

                this.vrHelper.enableInteractions();
                this.vrHelper.enableTeleportation({
                    floorMeshName: "Tiled Ground"
                });

                scene.activeCamera.inertia = 0.6;
                scene.activeCamera.speed = 0.5;

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
                var uvs = [0.0, 0.75, 0.25, 0.5, 0.25, 0.75, 0.25, 0.75, 0.0, 0.5, 0.0, 0.75, 0.5, 0.25, 0.25, 0.25, 0.5, 0.5, 0.25, 0.5, 0.0, 0.75, 0.25, 0.75, 0.25, 0.5];
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
                var target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 10, 1, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 10);
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
})();

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
var Game = __webpack_require__(/*! ./game.component */ "./src/game.component.js");

window.game = new Game();
document.addEventListener("DOMContentLoaded", function () {
  return game.run();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJwdXp6bGUiLCJ0eXBlIiwicG9zIiwicm90IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkJBQllMT04iLCJFbmdpbmUiLCJtYXBzIiwiaW5pdE1hcHMiLCJzY2VuZSIsImNyZWF0ZVNjZW5lIiwiZHJhd0xhc2VyIiwicnVuUmVuZGVyTG9vcCIsInJlbmRlciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJpIiwiaiIsInB1c2giLCJWZWN0b3I0IiwiU2NlbmUiLCJsaWdodDEiLCJIZW1pc3BoZXJpY0xpZ2h0IiwiVmVjdG9yMyIsImxpZ2h0IiwiRGlyZWN0aW9uYWxMaWdodCIsInBvc2l0aW9uIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsImN1YmVzIiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwidGlsZWRHcm91bmQiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsInBsYW5hck1hdCIsInJlZmxlY3Rpb25UZXh0dXJlIiwiY29vcmRpbmF0ZXNNb2RlIiwiQ1VCSUNfTU9ERSIsImRpZmZ1c2VDb2xvciIsIkNvbG9yMyIsIm1ldGFsIiwiUEJSTWF0ZXJpYWwiLCJtaWNyb1N1cmZhY2UiLCJyZWZsZWN0aXZpdHlDb2xvciIsImFsYmVkb0NvbG9yIiwib2JqcyIsImxlbmd0aCIsInN0YXJib3giLCJkcmF3Qm94IiwibmFtZSIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJtZXNoIiwic3RhcnQiLCJmaW5kIiwiYiIsInJvdGF0aW9uIiwieSIsIk1hdGgiLCJQSSIsImJpbmQiLCJib3giLCJ0ciIsImRyYXdUcmkiLCJncm91bmRtYXQiLCJjbG9uZSIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhckNvbG9yIiwibWF0ZXJpYWwiLCJjYW1lcmEiLCJhY3RpdmVDYW1lcmEiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImluZXJ0aWEiLCJzcGVlZCIsImYiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJkZXB0aCIsImZhY2VVViIsIkNyZWF0ZUJveCIsImN1c3RvbU1lc2giLCJNZXNoIiwicG9zaXRpb25zIiwiaW5kaWNlcyIsInV2cyIsInZlcnRleERhdGEiLCJWZXJ0ZXhEYXRhIiwibm9ybWFscyIsIkNvbXB1dGVOb3JtYWxzIiwiYXBwbHlUb01lc2giLCJiYWNrRmFjZUN1bGxpbmciLCJvcmlnaW4iLCJkaXJlY3Rpb24iLCJzaW4iLCJjb3MiLCJyYXkiLCJSYXkiLCJyYXlIZWxwZXIiLCJSYXlIZWxwZXIiLCJzaG93IiwiaGl0IiwicGlja1dpdGhSYXkiLCJwcmVkaWNhdGUiLCJpc1BpY2thYmxlIiwidGFyZ2V0IiwicGlja2VkTWVzaCIsImNvbnNvbGUiLCJsb2ciLCJteVBvaW50cyIsImxhc2VyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJpbnN0YW5jZSIsInVwZGF0YWJsZSIsInJuZCIsInJhbmRvbSIsIm0iLCJyZXF1aXJlIiwiR2FtZSIsImdhbWUiLCJydW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxDQUFDLFlBQVk7QUFDVDs7QUFFQUEsV0FBT0MsT0FBUDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsa0NBSVU7QUFBQTs7QUFFRixxQkFBS0MsTUFBTCxHQUFjLENBQUM7QUFDUEMsMEJBQU0sT0FEQztBQUVQQyx5QkFBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZFO0FBR1BDLHlCQUFLLENBSEUsQ0FHQTtBQUhBLGlCQUFELEVBS1Y7QUFDSUYsMEJBQU0sS0FEVjtBQUVJQyx5QkFBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZUO0FBR0lDLHlCQUFLLENBSFQsQ0FHVztBQUhYLGlCQUxVLEVBVVY7QUFDSUYsMEJBQU0sUUFEVjtBQUVJQyx5QkFBSyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxDQUZUO0FBR0lDLHlCQUFLO0FBSFQsaUJBVlUsRUFlVjtBQUNJRiwwQkFBTSxRQURWO0FBRUlDLHlCQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRlQ7QUFHSUMseUJBQUs7QUFIVCxpQkFmVSxFQW9CVjtBQUNJRiwwQkFBTSxNQURWO0FBRUlDLHlCQUFLLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBRlQ7QUFHSUMseUJBQUs7QUFIVCxpQkFwQlUsQ0FBZDs7QUE0QkEscUJBQUtDLE1BQUwsR0FBY0MsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFkLENBOUJFLENBOEJxRDtBQUN2RCxxQkFBS0MsTUFBTCxHQUFjLElBQUlDLFFBQVFDLE1BQVosQ0FBbUIsS0FBS0wsTUFBeEIsRUFBZ0MsSUFBaEMsQ0FBZCxDQS9CRSxDQStCbUQ7QUFDckQscUJBQUtNLElBQUwsR0FBWSxLQUFLQyxRQUFMLEVBQVo7O0FBRUEscUJBQUtDLEtBQUwsR0FBYSxLQUFLQyxXQUFMLEVBQWI7O0FBRUEscUJBQUtDLFNBQUw7O0FBRUEscUJBQUtQLE1BQUwsQ0FBWVEsYUFBWixDQUEwQjtBQUFBLDJCQUFNLE1BQUtILEtBQUwsQ0FBV0ksTUFBWCxFQUFOO0FBQUEsaUJBQTFCOztBQUVBQyx1QkFBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0M7QUFBQSwyQkFBTSxNQUFLWCxNQUFMLENBQVlZLE1BQVosRUFBTjtBQUFBLGlCQUFsQztBQUNIO0FBN0NMO0FBQUE7QUFBQSx1Q0ErQ2U7QUFDUCxvQkFBSVQsT0FBTyxFQUFYOztBQUVBLHFCQUFLLElBQUlVLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEIseUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLENBQXBCLEVBQXVCQSxHQUF2QixFQUE0QjtBQUN4QlgsNkJBQUtZLElBQUwsQ0FBVSxJQUFJZCxRQUFRZSxPQUFaLENBQW9CSCxJQUFJLENBQXhCLEVBQTJCQyxJQUFJLENBQS9CLEVBQWtDRCxJQUFJLENBQUosR0FBUSxJQUExQyxFQUFnREMsSUFBSSxDQUFKLEdBQVEsSUFBeEQsQ0FBVjtBQUNIO0FBQ0o7QUFDRCx1QkFBT1gsSUFBUDtBQUNIO0FBeERMO0FBQUE7QUFBQSwwQ0EwRGtCO0FBQUE7O0FBRVY7QUFDQSxvQkFBSUUsUUFBUSxJQUFJSixRQUFRZ0IsS0FBWixDQUFrQixLQUFLakIsTUFBdkIsQ0FBWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBSWtCLFNBQVMsSUFBSWpCLFFBQVFrQixnQkFBWixDQUE2QixRQUE3QixFQUF1QyxJQUFJbEIsUUFBUW1CLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBdkMsRUFBcUVmLEtBQXJFLENBQWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsb0JBQUlnQixRQUFRLElBQUlwQixRQUFRcUIsZ0JBQVosQ0FBNkIsUUFBN0IsRUFBdUMsSUFBSXJCLFFBQVFtQixPQUFaLENBQW9CLENBQUMsQ0FBckIsRUFBd0IsQ0FBQyxDQUF6QixFQUE0QixDQUE1QixDQUF2QyxFQUF1RWYsS0FBdkUsQ0FBWjtBQUNBZ0Isc0JBQU1FLFFBQU4sR0FBaUIsSUFBSXRCLFFBQVFtQixPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFJSSxNQUFNLElBQUl2QixRQUFRd0IsZ0JBQVosQ0FBNkIsS0FBN0IsRUFBb0NwQixLQUFwQyxDQUFWO0FBQ0Esb0JBQUlxQixVQUFVLElBQUl6QixRQUFRMEIsT0FBWixDQUFvQixXQUFwQixFQUFpQ3RCLEtBQWpDLEVBQXdDLEtBQXhDLEVBQStDLElBQS9DLEVBQXFESixRQUFRMEIsT0FBUixDQUFnQkMsb0JBQXJFLENBQWQ7QUFDQUosb0JBQUlLLGNBQUosR0FBcUJILE9BQXJCOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBLG9CQUFJSSxRQUFRLENBQ1IsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixDQURRLEVBQ1M7QUFDakIsaUJBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsQ0FGUSxFQUVTO0FBQ2pCLGlCQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLENBSFEsQ0FBWjs7QUFPQSxxQkFBS0MsUUFBTCxHQUFnQjFCLE1BQU0yQix5QkFBTixFQUFoQjs7QUFFQSxvQkFBSUMsY0FBYyxJQUFJaEMsUUFBUWlDLFdBQVIsQ0FBb0JDLGlCQUF4QixDQUEwQyxjQUExQyxFQUEwRDtBQUN4RUMsMEJBQU0sQ0FBQyxFQURpRTtBQUV4RUMsMEJBQU0sQ0FBQyxFQUZpRTtBQUd4RUMsMEJBQU0sRUFIa0U7QUFJeEVDLDBCQUFNLEVBSmtFO0FBS3hFQyxrQ0FBYztBQUNWLDZCQUFLLEVBREs7QUFFViw2QkFBSztBQUZLO0FBTDBELGlCQUExRCxFQVNmbkMsS0FUZSxDQUFsQjs7QUFXQSxvQkFBSW9DLFlBQVksSUFBSXhDLFFBQVF3QixnQkFBWixDQUE2QixXQUE3QixFQUEwQ3BCLEtBQTFDLENBQWhCO0FBQ0FvQywwQkFBVUMsaUJBQVYsR0FBOEIsSUFBSXpDLFFBQVEwQixPQUFaLENBQW9CLFVBQXBCLEVBQWdDdEIsS0FBaEMsQ0FBOUI7QUFDQW9DLDBCQUFVQyxpQkFBVixDQUE0QkMsZUFBNUIsR0FBOEMxQyxRQUFRMEIsT0FBUixDQUFnQmlCLFVBQTlEO0FBQ0FILDBCQUFVSSxZQUFWLEdBQXlCLElBQUk1QyxRQUFRNkMsTUFBWixDQUFtQixFQUFuQixFQUF1QixFQUF2QixFQUEyQixFQUEzQixDQUF6QjtBQUNBLG9CQUFJQyxRQUFRLElBQUk5QyxRQUFRK0MsV0FBWixDQUF3QixPQUF4QixFQUFpQzNDLEtBQWpDLENBQVo7QUFDQTBDLHNCQUFNTCxpQkFBTixHQUEwQixJQUFJekMsUUFBUTBCLE9BQVosQ0FBb0IsVUFBcEIsRUFBZ0N0QixLQUFoQyxDQUExQjtBQUNBMEMsc0JBQU1FLFlBQU4sR0FBcUIsSUFBckI7QUFDQUYsc0JBQU1HLGlCQUFOLEdBQTBCLElBQUlqRCxRQUFRNkMsTUFBWixDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixDQUExQjtBQUNBQyxzQkFBTUksV0FBTixHQUFvQixJQUFJbEQsUUFBUTZDLE1BQVosQ0FBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsQ0FBcEI7QUFDQSxvQkFBSU0sT0FBTyxFQUFYO0FBQ0EscUJBQUssSUFBSXZDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLcEIsTUFBTCxDQUFZNEQsTUFBaEMsRUFBd0N4QyxHQUF4QyxFQUE2QztBQUFBO0FBQ3pDLGdDQUFRLE9BQUtwQixNQUFMLENBQVlvQixDQUFaLEVBQWVuQixJQUF2QjtBQUNJLGlDQUFLLE9BQUw7QUFDQSxvQ0FBSTRELFVBQVUsT0FBS0MsT0FBTCxDQUFhbEQsS0FBYixFQUFvQm1CLEdBQXBCLEVBQXlCTSxNQUFNLENBQU4sQ0FBekIsRUFBbUMsT0FBS3JDLE1BQUwsQ0FBWW9CLENBQVosRUFBZWxCLEdBQWxELENBQWQ7QUFDQTJELHdDQUFRRSxJQUFSLEdBQWEsVUFBYjs7QUFFQUYsd0NBQVFHLGFBQVIsR0FBd0IsSUFBSXhELFFBQVF5RCxhQUFaLENBQTBCckQsS0FBMUIsQ0FBeEI7QUFDQWlELHdDQUFRRyxhQUFSLENBQXNCRSxjQUF0QixDQUFxQyxJQUFJMUQsUUFBUTJELGlCQUFaLENBQThCM0QsUUFBUXlELGFBQVIsQ0FBc0JHLGFBQXBELEVBQW9FLFVBQVNDLElBQVQsRUFBZTtBQUNwSDtBQUNBLHdDQUFJQyxRQUFRLEtBQUt0RSxNQUFMLENBQVl1RSxJQUFaLENBQWlCO0FBQUEsK0NBQUtDLEVBQUV2RSxJQUFGLEtBQVcsT0FBaEI7QUFBQSxxQ0FBakIsQ0FBWjtBQUNBcUUsMENBQU1uRSxHQUFOLEdBQVksQ0FBQ21FLE1BQU1uRSxHQUFOLEdBQVksQ0FBYixJQUFrQixDQUE5QjtBQUNBLHlDQUFLVyxTQUFMO0FBQ0ErQyw0Q0FBUVksUUFBUixDQUFpQkMsQ0FBakIsR0FBcUJiLFFBQVFZLFFBQVIsQ0FBaUJDLENBQWpCLEdBQXFCQyxLQUFLQyxFQUFMLEdBQVUsQ0FBcEQ7QUFDSCxpQ0FOdUcsQ0FNckdDLElBTnFHLENBTWhHLE1BTmdHLEVBTTNGaEIsT0FOMkYsQ0FBbkUsQ0FBckM7QUFPQUYscUNBQUtyQyxJQUFMLENBQVV1QyxPQUFWO0FBQ0E7QUFDQSxpQ0FBSyxLQUFMO0FBQ0ksb0NBQUlpQixNQUFNLE9BQUtoQixPQUFMLENBQWFsRCxLQUFiLEVBQW9CbUIsR0FBcEIsRUFBeUJNLE1BQU0sQ0FBTixDQUF6QixFQUFtQyxPQUFLckMsTUFBTCxDQUFZb0IsQ0FBWixFQUFlbEIsR0FBbEQsQ0FBVjtBQUNBNEUsb0NBQUlkLGFBQUosR0FBb0IsSUFBSXhELFFBQVF5RCxhQUFaLENBQTBCckQsS0FBMUIsQ0FBcEI7QUFDQWtFLG9DQUFJZCxhQUFKLENBQWtCRSxjQUFsQixDQUFpQyxJQUFJMUQsUUFBUTJELGlCQUFaLENBQThCM0QsUUFBUXlELGFBQVIsQ0FBc0JHLGFBQXBELEVBQW1FLFVBQUNDLElBQUQsRUFBVTs7QUFFMUdTLHdDQUFJTCxRQUFKLENBQWFDLENBQWIsR0FBaUJJLElBQUlMLFFBQUosQ0FBYUMsQ0FBYixHQUFpQkMsS0FBS0MsRUFBTCxHQUFVLENBQTVDO0FBQ0gsaUNBSGdDLENBQWpDO0FBSUFqQixxQ0FBS3JDLElBQUwsQ0FBVXdELEdBQVY7QUFDQTtBQUNKLGlDQUFLLFFBQUw7QUFDSSxvQ0FBSUMsS0FBSyxPQUFLQyxPQUFMLENBQWFwRSxLQUFiLEVBQW9CbUIsR0FBcEIsRUFBeUIsT0FBSy9CLE1BQUwsQ0FBWW9CLENBQVosRUFBZWxCLEdBQXhDLENBQVQ7QUFDQTZFLG1DQUFHZixhQUFILEdBQW1CLElBQUl4RCxRQUFReUQsYUFBWixDQUEwQnJELEtBQTFCLENBQW5CO0FBQ0FtRSxtQ0FBR2YsYUFBSCxDQUFpQkUsY0FBakIsQ0FBZ0MsSUFBSTFELFFBQVEyRCxpQkFBWixDQUE4QjNELFFBQVF5RCxhQUFSLENBQXNCRyxhQUFwRCxFQUFvRSxVQUFVQyxJQUFWLEVBQWdCO0FBQ2hIVSx1Q0FBR04sUUFBSCxDQUFZQyxDQUFaLEdBQWdCSyxHQUFHTixRQUFILENBQVlDLENBQVosR0FBZ0JDLEtBQUtDLEVBQUwsR0FBVSxDQUExQztBQUNILGlDQUZrRyxDQUVoR0MsSUFGZ0csQ0FFM0YsTUFGMkYsRUFFckZFLEVBRnFGLENBQW5FLENBQWhDO0FBR0FwQixxQ0FBS3JDLElBQUwsQ0FBVXlELEVBQVY7QUFDQTtBQUNKLGlDQUFLLE1BQUw7QUFDSSx1Q0FBS2pCLE9BQUwsQ0FBYWxELEtBQWIsRUFBb0JtQixHQUFwQixFQUF5Qk0sTUFBTSxDQUFOLENBQXpCLEVBQW1DLE9BQUtyQyxNQUFMLENBQVlvQixDQUFaLEVBQWVsQixHQUFsRDtBQUNBOztBQWxDUjtBQUR5QztBQXVDNUM7QUFDRCxvQkFBSStFLFlBQVksSUFBSXpFLFFBQVF3QixnQkFBWixDQUE2QixXQUE3QixFQUEwQ3BCLEtBQTFDLENBQWhCO0FBQ0FxRSwwQkFBVTdDLGNBQVYsR0FBMkJILFFBQVFpRCxLQUFSLEVBQTNCO0FBQ0FELDBCQUFVN0MsY0FBVixDQUF5QitDLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0FGLDBCQUFVN0MsY0FBVixDQUF5QmdELE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0FILDBCQUFVN0MsY0FBVixDQUF5QmlELEtBQXpCLEdBQWlDN0UsUUFBUTBCLE9BQVIsQ0FBZ0JvRCxrQkFBakQ7QUFDQUwsMEJBQVU3QyxjQUFWLENBQXlCbUQsS0FBekIsR0FBaUMvRSxRQUFRMEIsT0FBUixDQUFnQm9ELGtCQUFqRDtBQUNBTCwwQkFBVU8sYUFBVixHQUEwQixJQUFJaEYsUUFBUTZDLE1BQVosQ0FBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsQ0FBMUI7QUFDQWIsNEJBQVlpRCxRQUFaLEdBQXVCUixTQUF2Qjs7QUFFQSxvQkFBSVMsU0FBUzlFLE1BQU0rRSxZQUFuQjs7QUFFQSxxQkFBS3JELFFBQUwsQ0FBY3NELGtCQUFkO0FBQ0EscUJBQUt0RCxRQUFMLENBQWN1RCxtQkFBZCxDQUFrQztBQUM5QkMsbUNBQWU7QUFEZSxpQkFBbEM7O0FBSUFsRixzQkFBTStFLFlBQU4sQ0FBbUJJLE9BQW5CLEdBQTZCLEdBQTdCO0FBQ0FuRixzQkFBTStFLFlBQU4sQ0FBbUJLLEtBQW5CLEdBQTJCLEdBQTNCOztBQUVBLHVCQUFPcEYsS0FBUDtBQUNIO0FBN01MO0FBQUE7QUFBQSxvQ0ErTVlBLEtBL01aLEVBK01tQm1CLEdBL01uQixFQStNd0JrRSxDQS9NeEIsRUErTTJCbkUsUUEvTTNCLEVBK01xQzs7QUFFN0Isb0JBQUlvRSxVQUFVO0FBQ1ZDLDJCQUFPLENBREc7QUFFVkMsNEJBQVEsQ0FGRTtBQUdWQywyQkFBTyxDQUhHO0FBSVZDLDRCQUFRLENBQUMsS0FBSzVGLElBQUwsQ0FBVXVGLEVBQUUsQ0FBRixDQUFWLENBQUQsRUFBa0IsS0FBS3ZGLElBQUwsQ0FBVXVGLEVBQUUsQ0FBRixDQUFWLENBQWxCLEVBQW1DLEtBQUt2RixJQUFMLENBQVV1RixFQUFFLENBQUYsQ0FBVixDQUFuQyxFQUFvRCxLQUFLdkYsSUFBTCxDQUFVdUYsRUFBRSxDQUFGLENBQVYsQ0FBcEQsRUFBcUUsS0FBS3ZGLElBQUwsQ0FBVXVGLEVBQUUsQ0FBRixDQUFWLENBQXJFLEVBQXNGLEtBQUt2RixJQUFMLENBQVV1RixFQUFFLENBQUYsQ0FBVixDQUF0RjtBQUpFLGlCQUFkOztBQU9BLG9CQUFJbkIsTUFBTXRFLFFBQVFpQyxXQUFSLENBQW9COEQsU0FBcEIsQ0FBOEIsS0FBOUIsRUFBcUNMLE9BQXJDLEVBQThDdEYsS0FBOUMsQ0FBVjtBQUNBa0Usb0JBQUlXLFFBQUosR0FBZTFELEdBQWY7QUFDQStDLG9CQUFJaEQsUUFBSixzQ0FBbUJ0QixRQUFRbUIsT0FBM0IsbUNBQXNDRyxRQUF0QztBQUNBLHVCQUFPZ0QsR0FBUDtBQUNIO0FBNU5MO0FBQUE7QUFBQSxvQ0E4TllsRSxLQTlOWixFQThObUJtQixHQTlObkIsRUE4TndCRCxRQTlOeEIsRUE4TmtDO0FBQzFCLG9CQUFJMEUsYUFBYSxJQUFJaEcsUUFBUWlHLElBQVosQ0FBaUIsUUFBakIsRUFBMkI3RixLQUEzQixDQUFqQjs7QUFFQTtBQUNBLG9CQUFJOEYsWUFBWSxDQUFDLENBQUMsR0FBRixFQUFPLENBQUMsR0FBUixFQUFhLEdBQWIsRUFBa0IsR0FBbEIsRUFBdUIsQ0FBQyxHQUF4QixFQUE2QixDQUFDLEdBQTlCLEVBQW1DLENBQUMsR0FBcEMsRUFBeUMsR0FBekMsRUFBOEMsR0FBOUMsRUFBbUQsR0FBbkQsRUFBd0QsR0FBeEQsRUFBNkQsQ0FBQyxHQUE5RCxFQUFtRSxDQUFDLEdBQXBFLEVBQXlFLENBQUMsR0FBMUUsRUFBK0UsQ0FBQyxHQUFoRixFQUFxRixDQUFDLEdBQXRGLEVBQTJGLEdBQTNGLEVBQWdHLENBQUMsR0FBakcsRUFBc0csQ0FBQyxHQUF2RyxFQUE0RyxDQUFDLEdBQTdHLEVBQWtILEdBQWxILEVBQXVILEdBQXZILEVBQTRILENBQUMsR0FBN0gsRUFBa0ksQ0FBQyxHQUFuSSxFQUF3SSxDQUFDLEdBQXpJLEVBQThJLEdBQTlJLEVBQW1KLEdBQW5KLEVBQXdKLEdBQXhKLEVBQTZKLEdBQTdKLEVBQWtLLENBQUMsR0FBbkssRUFBd0ssQ0FBQyxHQUF6SyxFQUE4SyxHQUE5SyxFQUFtTCxHQUFuTCxFQUF3TCxHQUF4TCxFQUE2TCxHQUE3TCxFQUFrTSxDQUFDLEdBQW5NLEVBQXdNLENBQUMsR0FBek0sRUFBOE0sR0FBOU0sRUFBbU4sQ0FBQyxHQUFwTixDQUFoQjtBQUNBLG9CQUFJQyxVQUFVLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBbEMsRUFBcUMsRUFBckMsRUFBeUMsRUFBekMsRUFBNkMsRUFBN0MsRUFBaUQsQ0FBakQsRUFBb0QsQ0FBcEQsRUFBdUQsQ0FBdkQsRUFBMEQsQ0FBMUQsRUFBNkQsQ0FBN0QsRUFBZ0UsQ0FBaEUsQ0FBZDtBQUNBLG9CQUFJQyxNQUFNLENBQ04sR0FETSxFQUNELElBREMsRUFFTixJQUZNLEVBRUEsR0FGQSxFQUdOLElBSE0sRUFHQSxJQUhBLEVBSU4sSUFKTSxFQUlBLElBSkEsRUFLTixHQUxNLEVBS0QsR0FMQyxFQU1OLEdBTk0sRUFNRCxJQU5DLEVBT04sR0FQTSxFQU9ELElBUEMsRUFRTixJQVJNLEVBUUEsSUFSQSxFQVNOLEdBVE0sRUFTRCxHQVRDLEVBVU4sSUFWTSxFQVVBLEdBVkEsRUFXTixHQVhNLEVBV0QsSUFYQyxFQVlOLElBWk0sRUFZQSxJQVpBLEVBYU4sSUFiTSxFQWFBLEdBYkEsQ0FBVjtBQWVBO0FBQ0Esb0JBQUlDLGFBQWEsSUFBSXJHLFFBQVFzRyxVQUFaLEVBQWpCO0FBQ0Esb0JBQUlDLFVBQVUsRUFBZDs7QUFFQTtBQUNBdkcsd0JBQVFzRyxVQUFSLENBQW1CRSxjQUFuQixDQUFrQ04sU0FBbEMsRUFBNkNDLE9BQTdDLEVBQXNESSxPQUF0RDs7QUFFQTtBQUNBRiwyQkFBV0gsU0FBWCxHQUF1QkEsU0FBdkI7QUFDQUcsMkJBQVdGLE9BQVgsR0FBcUJBLE9BQXJCO0FBQ0FFLDJCQUFXRSxPQUFYLEdBQXFCQSxPQUFyQjtBQUNBRiwyQkFBV0QsR0FBWCxHQUFpQkEsR0FBakI7QUFDQTtBQUNBQywyQkFBV0ksV0FBWCxDQUF1QlQsVUFBdkI7QUFDQUEsMkJBQVdmLFFBQVgsR0FBc0IxRCxHQUF0QjtBQUNBeUUsMkJBQVdmLFFBQVgsQ0FBb0J5QixlQUFwQixHQUFzQyxLQUF0QztBQUNBViwyQkFBVzFFLFFBQVgsc0NBQTBCdEIsUUFBUW1CLE9BQWxDLG1DQUE2Q0csUUFBN0M7QUFDQSx1QkFBTzBFLFVBQVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQTdSTDtBQUFBO0FBQUEsd0NBK1JnQjtBQUNSLG9CQUFJbEMsUUFBUSxLQUFLdEUsTUFBTCxDQUFZdUUsSUFBWixDQUFpQjtBQUFBLDJCQUFLQyxFQUFFdkUsSUFBRixLQUFXLE9BQWhCO0FBQUEsaUJBQWpCLENBQVo7O0FBRUEsb0JBQUlrSCw0Q0FBYTNHLFFBQVFtQixPQUFyQixtQ0FBZ0MyQyxNQUFNcEUsR0FBdEMsTUFBSjtBQUNBLG9CQUFJa0gsWUFBWSxJQUFJNUcsUUFBUW1CLE9BQVosQ0FBb0JnRCxLQUFLMEMsR0FBTCxDQUFTMUMsS0FBS0MsRUFBTCxHQUFVTixNQUFNbkUsR0FBaEIsR0FBc0IsQ0FBL0IsQ0FBcEIsRUFBdUQsQ0FBdkQsRUFBMER3RSxLQUFLMkMsR0FBTCxDQUFTM0MsS0FBS0MsRUFBTCxHQUFVTixNQUFNbkUsR0FBaEIsR0FBc0IsQ0FBL0IsQ0FBMUQsQ0FBaEI7QUFDQSxvQkFBSXlELFNBQVMsR0FBYjs7QUFFQSxvQkFBSTJELE1BQU0sSUFBSS9HLFFBQVFnSCxHQUFaLENBQWdCTCxNQUFoQixFQUF3QkMsU0FBeEIsRUFBbUN4RCxNQUFuQyxDQUFWO0FBQ0gsb0JBQUk2RCxZQUFZLElBQUlqSCxRQUFRa0gsU0FBWixDQUFzQkgsR0FBdEIsQ0FBaEI7QUFDR0UsMEJBQVVFLElBQVYsQ0FBZSxLQUFLL0csS0FBcEI7QUFDQSxvQkFBSWdILE1BQU0sS0FBS2hILEtBQUwsQ0FBV2lILFdBQVgsQ0FBdUJOLEdBQXZCLEVBQ04sU0FBU08sU0FBVCxDQUFtQnpELElBQW5CLEVBQXdCO0FBQ3hCLHdCQUFJQSxLQUFLTixJQUFMLElBQWEsVUFBYixJQUEyQixDQUFDTSxLQUFLMEQsVUFBckMsRUFBZ0Q7QUFDNUMsK0JBQU8sS0FBUDtBQUNIO0FBQ0QsMkJBQU8sSUFBUDtBQUNILGlCQU5TLENBQVY7QUFPQSxvQkFBSUMsU0FBUyxJQUFJeEgsUUFBUW1CLE9BQVosQ0FBb0IyQyxNQUFNcEUsR0FBTixDQUFVLENBQVYsSUFBZXlFLEtBQUswQyxHQUFMLENBQVMxQyxLQUFLQyxFQUFMLEdBQVVOLE1BQU1uRSxHQUFoQixHQUFzQixDQUEvQixJQUFvQyxFQUF2RSxFQUEyRSxDQUEzRSxFQUE4RW1FLE1BQU1wRSxHQUFOLENBQVUsQ0FBVixJQUFleUUsS0FBSzJDLEdBQUwsQ0FBUzNDLEtBQUtDLEVBQUwsR0FBVU4sTUFBTW5FLEdBQWhCLEdBQXNCLENBQS9CLElBQW9DLEVBQWpJLENBQWI7QUFDQSxvQkFBSXlILElBQUlLLFVBQVIsRUFBbUI7QUFDaEJDLDRCQUFRQyxHQUFSLENBQVlQLElBQUlLLFVBQUosQ0FBZWxFLElBQTNCO0FBQ0FpRSw2QkFBU0osSUFBSUssVUFBSixDQUFlbkcsUUFBeEI7QUFDRjs7QUFFRCxvQkFBSXNHLFdBQVcsQ0FDWGpCLE1BRFcsRUFFWGEsTUFGVyxDQUFmOztBQUtBLG9CQUFHLEtBQUtLLEtBQVIsRUFBYztBQUNWLHlCQUFLQSxLQUFMLEdBQWE3SCxRQUFRaUMsV0FBUixDQUFvQjZGLFVBQXBCLENBQStCLE9BQS9CLEVBQXdDO0FBQ2pEQyw4QkFBTUgsUUFEMkM7QUFFakRJLGdDQUFPLEdBRjBDO0FBR2pEQyxrQ0FBVSxLQUFLSjtBQUhrQyxxQkFBeEMsQ0FBYjtBQUtILGlCQU5ELE1BTUs7QUFDRCx5QkFBS0EsS0FBTCxHQUFhN0gsUUFBUWlDLFdBQVIsQ0FBb0I2RixVQUFwQixDQUErQixPQUEvQixFQUF3QztBQUNqREMsOEJBQU1ILFFBRDJDO0FBRWpETSxtQ0FBVSxJQUZ1QztBQUdqREYsZ0NBQU87QUFIMEMscUJBQXhDLEVBSVYsS0FBSzVILEtBSkssQ0FBYjtBQUtIO0FBQ0QscUJBQUt5SCxLQUFMLENBQVdOLFVBQVgsR0FBd0IsS0FBeEI7QUFDSDtBQXpVTDs7QUFBQTtBQUFBO0FBMlVILENBOVVELEk7Ozs7Ozs7Ozs7Ozs7O0FDQUE5RyxPQUFPMEgsR0FBUCxHQUFhO0FBQUEsU0FBSyxDQUFDLEVBQUVoRSxLQUFLaUUsTUFBTCxLQUFnQkMsQ0FBbEIsQ0FBTjtBQUFBLENBQWIsQzs7Ozs7Ozs7Ozs7Ozs7QUNBQSxtQkFBQUMsQ0FBUSxpQ0FBUjtBQUNBLElBQUlDLE9BQU8sbUJBQUFELENBQVEsaURBQVIsQ0FBWDs7QUFHQTdILE9BQU8rSCxJQUFQLEdBQWMsSUFBSUQsSUFBSixFQUFkO0FBQ0ExSSxTQUFTYSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEM7QUFBQSxTQUFNOEgsS0FBS0MsR0FBTCxFQUFOO0FBQUEsQ0FBOUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gY2xhc3MgR2FtZSB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgcnVuKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wdXp6bGUgPSBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbNSwgMSwgNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzEsIDEsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFsxLCAxLCAxXSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbNSwgMSwgMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFszLCAxLCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpOyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50IFxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSk7IC8vIEdlbmVyYXRlIHRoZSBCQUJZTE9OIDNEIGVuZ2luZVxyXG4gICAgICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gdGhpcy5jcmVhdGVTY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kcmF3TGFzZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0TWFwcygpIHtcclxuICAgICAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWFwcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZVNjZW5lKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBzY2VuZSBzcGFjZVxyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYSBjYW1lcmEgdG8gdGhlIHNjZW5lIGFuZCBhdHRhY2ggaXQgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICAvLyB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIE1hdGguUEkgLyAyLCBNYXRoLlBJIC8gMiwgMiwgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyAvLyBBZGQgbGlnaHRzIHRvIHRoZSBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vICB2YXIgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyAgICAgc2NlbmUuY3JlYXRlRGVmYXVsdENhbWVyYU9yTGlnaHQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgYm94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJib3hcIiwge2hlaWdodDogMX0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuICAgICAgICAgICAgLy8gdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig1MTIsIGxpZ2h0KTtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdG9yLnVzZUJsdXJFeHBvbmVudGlhbFNoYWRvd01hcCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRvci5ibHVyS2VybmVsID0gMztcclxuXHJcbiAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBnZW5lcmF0b3IuYWRkU2hhZG93Q2FzdGVyKHNjZW5lLm1lc2hlc1tpXSk7ICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgaGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcclxuICAgICAgICAgICAgLy8gICAgIGVuYWJsZUdyb3VuZE1pcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgIGdyb3VuZFNoYWRvd0xldmVsOiAwLjc1LFxyXG4gICAgICAgICAgICAvLyB9KTsgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICAgICAgbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9UaWxlczpcclxuICAgICAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAgICAgLy8gMjpcclxuICAgICAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAgICAgLy8gNDpcclxuICAgICAgICAgICAgLy8gNTpcclxuICAgICAgICAgICAgLy8gNjpcclxuICAgICAgICAgICAgLy8gNzpcclxuICAgICAgICAgICAgLy8gODpcclxuICAgICAgICAgICAgLy8gOTpcclxuICAgICAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgICAgIC8vIDExOlxyXG4gICAgICAgICAgICAvLyAxMjpcclxuICAgICAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgICAgIC8vIDE0OlxyXG4gICAgICAgICAgICAvLyAxNTpcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGN1YmVzID0gW1xyXG4gICAgICAgICAgICAgICAgWzcsIDcsIDMsIDcsIDddLCAvLyBsYXNlclxyXG4gICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDFdLCAvLyB3YWxsXHJcbiAgICAgICAgICAgICAgICBbNSwgNSwgNSwgNSwgNV0sIC8vIG1pcnJvclxyXG4gICAgICAgICAgICBdO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMudnJIZWxwZXIgPSBzY2VuZS5jcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGlsZWRHcm91bmQgPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgICAgICB6bWluOiAtMTAsXHJcbiAgICAgICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgc3ViZGl2aXNpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBwbGFuYXJNYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicGxhbmFyTWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgcGxhbmFyTWF0LnJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInJvb20ucG5nXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgcGxhbmFyTWF0LnJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9IEJBQllMT04uVGV4dHVyZS5DVUJJQ19NT0RFO1xyXG4gICAgICAgICAgICBwbGFuYXJNYXQuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKC4zLCAuMywgLjMpO1xyXG4gICAgICAgICAgICB2YXIgbWV0YWwgPSBuZXcgQkFCWUxPTi5QQlJNYXRlcmlhbChcIm1ldGFsXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgbWV0YWwucmVmbGVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwicm9vbS5wbmdcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICBtZXRhbC5taWNyb1N1cmZhY2UgPSAwLjk2O1xyXG4gICAgICAgICAgICBtZXRhbC5yZWZsZWN0aXZpdHlDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjg1LCAwLjg1LCAwLjg1KTtcclxuICAgICAgICAgICAgbWV0YWwuYWxiZWRvQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC4wMSwgMC4wMSwgMC4wMSk7XHJcbiAgICAgICAgICAgIGxldCBvYmpzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wdXp6bGVbaV0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcmJveCA9IHRoaXMuZHJhd0JveChzY2VuZSwgbWF0LCBjdWJlc1swXSwgdGhpcy5wdXp6bGVbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFyYm94Lm5hbWU9XCJzdGFydEJveFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGFyYm94LmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFyYm94LmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbihtZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnJvdCA9IChzdGFydC5yb3QgKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJib3gucm90YXRpb24ueSA9IHN0YXJib3gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcyxzdGFyYm94KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9ianMucHVzaFtzdGFyYm94XTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5kcmF3Qm94KHNjZW5lLCBtYXQsIGN1YmVzWzBdLCB0aGlzLnB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveC5yb3RhdGlvbi55ID0gYm94LnJvdGF0aW9uLnkgKyBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2hbYm94XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyID0gdGhpcy5kcmF3VHJpKHNjZW5lLCBtYXQsIHRoaXMucHV6emxlW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKGZ1bmN0aW9uIChtZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ci5yb3RhdGlvbi55ID0gdHIucm90YXRpb24ueSAtIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMsIHRyKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2hbdHJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Qm94KHNjZW5lLCBtYXQsIGN1YmVzWzFdLCB0aGlzLnB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHRpbGVkR3JvdW5kLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IHNjZW5lLmFjdGl2ZUNhbWVyYTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlSW50ZXJhY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgICAgICBmbG9vck1lc2hOYW1lOiBcIlRpbGVkIEdyb3VuZFwiXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5zcGVlZCA9IDAuNTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBzY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdCb3goc2NlbmUsIG1hdCwgZiwgcG9zaXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXHJcbiAgICAgICAgICAgICAgICBkZXB0aDogMSxcclxuICAgICAgICAgICAgICAgIGZhY2VVVjogW3RoaXMubWFwc1tmWzBdXSwgdGhpcy5tYXBzW2ZbMV1dLCB0aGlzLm1hcHNbZlsyXV0sIHRoaXMubWFwc1tmWzNdXSwgdGhpcy5tYXBzW2ZbNF1dLCB0aGlzLm1hcHNbZls1XV1dXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgYm94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goJ2JveCcsIG9wdGlvbnMsIHNjZW5lKTtcclxuICAgICAgICAgICAgYm94Lm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICBib3gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJveDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRyYXdUcmkoc2NlbmUsIG1hdCwgcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIGN1c3RvbU1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoKFwiY3VzdG9tXCIsIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vU2V0IGFycmF5cyBmb3IgcG9zaXRpb25zIGFuZCBpbmRpY2VzXHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbnMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgICAgIHZhciBpbmRpY2VzID0gWzYsIDgsIDksIDksIDcsIDYsIDQsIDEsIDMsIDMsIDUsIDQsIDExLCAxMCwgMTIsIDIsIDAsIDQsIDQsIDUsIDJdO1xyXG4gICAgICAgICAgICB2YXIgdXZzID0gW1xyXG4gICAgICAgICAgICAgICAgMC4wLCAwLjc1LFxyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC41LFxyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC43NSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNzUsXHJcbiAgICAgICAgICAgICAgICAwLjAsIDAuNSxcclxuICAgICAgICAgICAgICAgIDAuMCwgMC43NSxcclxuICAgICAgICAgICAgICAgIDAuNSwgMC4yNSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuMjUsXHJcbiAgICAgICAgICAgICAgICAwLjUsIDAuNSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNSxcclxuICAgICAgICAgICAgICAgIDAuMCwgMC43NSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNzUsXHJcbiAgICAgICAgICAgICAgICAwLjI1LCAwLjUsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICAgICAgdmFyIHZlcnRleERhdGEgPSBuZXcgQkFCWUxPTi5WZXJ0ZXhEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBub3JtYWxzID0gW107XHJcblxyXG4gICAgICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyhwb3NpdGlvbnMsIGluZGljZXMsIG5vcm1hbHMpO1xyXG5cclxuICAgICAgICAgICAgLy9Bc3NpZ24gcG9zaXRpb25zIGFuZCBpbmRpY2VzIHRvIHZlcnRleERhdGFcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IGluZGljZXM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IG5vcm1hbHM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEudXZzID0gdXZzO1xyXG4gICAgICAgICAgICAvL0FwcGx5IHZlcnRleERhdGEgdG8gY3VzdG9tIG1lc2hcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaChjdXN0b21NZXNoKTtcclxuICAgICAgICAgICAgY3VzdG9tTWVzaC5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgY3VzdG9tTWVzaC5tYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgY3VzdG9tTWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tTWVzaDtcclxuICAgICAgICAgICAgLy8gdmFyIG15U2hhcGUgPSBbXHJcbiAgICAgICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKC0uNSwgLjUsIC0uNSksXHJcbiAgICAgICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKCAuNSwgLjUsIC0uNSksXHJcbiAgICAgICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKCAuNSwtLjUsIC0uNSlcclxuICAgICAgICAgICAgLy8gXTtcclxuXHJcbiAgICAgICAgICAgIC8vIG15U2hhcGUucHVzaChteVNoYXBlWzBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBteVBhdGggPSBbXHJcbiAgICAgICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDAsMCksXHJcbiAgICAgICAgICAgIC8vICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsMCksXHJcbiAgICAgICAgICAgIC8vIF07XHJcblxyXG4gICAgICAgICAgICAvLyAvL0NyZWF0ZSBleHRydXNpb24gd2l0aCB1cGRhdGFibGUgcGFyYW1ldGVyIHNldCB0byB0cnVlIGZvciBsYXRlciBjaGFuZ2VzXHJcbiAgICAgICAgICAgIC8vIHZhciBleHRydXNpb24gPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkV4dHJ1ZGVTaGFwZShcInN0YXJcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgc2hhcGU6IG15U2hhcGUsXHJcbiAgICAgICAgICAgIC8vICAgICBwYXRoOiBteVBhdGgsXHJcbiAgICAgICAgICAgIC8vICAgICBzaWRlT3JpZW50YXRpb246IEJBQllMT04uTWVzaC5ET1VCTEVTSURFLFxyXG4gICAgICAgICAgICAvLyAgICAgdXBkYXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgY2FwOiBCQUJZTE9OLk1lc2guQ0FQX0FMTFxyXG4gICAgICAgICAgICAvLyB9LCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vIGV4dHJ1c2lvbi5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgLy8gZXh0cnVzaW9uLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBleHRydXNpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgb3JpZ2luID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5zdGFydC5wb3MpO1xyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSk7XHJcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSAxMDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmF5ID0gbmV3IEJBQllMT04uUmF5KG9yaWdpbiwgZGlyZWN0aW9uLCBsZW5ndGgpO1xyXG5cdCAgICAgICAgbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1x0XHRcclxuICAgICAgICAgICAgcmF5SGVscGVyLnNob3codGhpcy5zY2VuZSk7XHRcdFxyXG4gICAgICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcmVkaWNhdGUobWVzaCl7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzaC5uYW1lID09IFwic3RhcnRCb3hcIiB8fCAhbWVzaC5pc1BpY2thYmxlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHN0YXJ0LnBvc1swXSArIE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwLCAxLCBzdGFydC5wb3NbMl0gKyBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMClcclxuICAgICAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoKXtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coaGl0LnBpY2tlZE1lc2gubmFtZSk7XHJcbiAgICAgICAgICAgICAgIHRhcmdldCA9IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbXlQb2ludHMgPSBbXHJcbiAgICAgICAgICAgICAgICBvcmlnaW4sXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLmxhc2VyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsaW5lc1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogbXlQb2ludHMsXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzOi4xNSxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogdGhpcy5sYXNlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXNlciA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVHViZShcImxpbmVzXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBteVBvaW50cyxcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGFibGU6dHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6LjE1XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxhc2VyLmlzUGlja2FibGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpOyIsIndpbmRvdy5ybmQgPSBtID0+IH5+KE1hdGgucmFuZG9tKCkgKiBtKTsiLCJyZXF1aXJlKCcuL2dsb2JhbCcpO1xyXG5sZXQgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5jb21wb25lbnQnKTtcclxuXHJcblxyXG53aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGdhbWUucnVuKCkpOyJdLCJzb3VyY2VSb290IjoiIn0=