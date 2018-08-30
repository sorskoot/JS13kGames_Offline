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
                                    key: "run",
                                    value: function run() {
                                                var _this = this;

                                                this.canvas = document.getElementById("renderCanvas"); // Get the canvas element 
                                                this.engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
                                                this.maps = this.initMaps();

                                                this.scene = this.createScene();

                                                this.engine.runRenderLoop(function () {
                                                            return _this.scene.render();
                                                });

                                                window.addEventListener("resize", function () {
                                                            return _this.engine.resize();
                                                });
                                    }
                        }, {
                                    key: "initMaps",
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
                                    key: "createScene",
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


                                                var puzzle = [{
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

                                                var cubes = [[3, 7, 7, 7, 7], // laser
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
                                                for (var i = 0; i < puzzle.length; i++) {
                                                            (function () {
                                                                        switch (puzzle[i].type) {
                                                                                    case 'start':
                                                                                    case 'end':
                                                                                                var box = _this2.drawBox(scene, mat, cubes[0], puzzle[i].pos);
                                                                                                box.actionManager = new BABYLON.ActionManager(scene);
                                                                                                box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                                                                                            box.rotation.y = box.rotation.y - Math.PI / 2;
                                                                                                }.bind(_this2, box)));
                                                                                                objs.push[box];
                                                                                                break;
                                                                                    case 'mirror':
                                                                                                var tr = _this2.drawTri(scene, mat, puzzle[i].pos);
                                                                                                tr.actionManager = new BABYLON.ActionManager(scene);
                                                                                                tr.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                                                                                            tr.rotation.y = tr.rotation.y - Math.PI / 2;
                                                                                                }.bind(_this2, tr)));
                                                                                                objs.push[tr];
                                                                                                break;
                                                                                    case 'wall':
                                                                                                _this2.drawBox(scene, mat, cubes[1], puzzle[i].pos);
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
                                    key: "drawBox",
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
                                    key: "drawTri",
                                    value: function drawTri(scene, mat, position) {
                                                var customMesh = new BABYLON.Mesh("custom", scene);

                                                //Set arrays for positions and indices
                                                var positions = [-0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5];
                                                var indices = [6, 8, 9, 9, 7, 6, 4, 1, 3, 3, 5, 4, 11, 10, 12, 2, 0, 4, 4, 5, 2];
                                                //var uvs = [0.5,0.25, 0.5,0.5, 0.25,0.5,  0.25,0.5, 0.25,0.25, 0.5,0.25,  0.0,0.5, 0.25,0.5, 0.25,0.75,  0.25,0.75, 0.0,0.75, 0.0,0.5,  0.25,0.75, 0.0,0.75, 0.25,0.5,  0.25,0.75, 0.0,0.75, 0.0,0.5,  0.0,0.5, 0.25,0.5, 0.25,0.75];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiQkFCWUxPTiIsIkVuZ2luZSIsIm1hcHMiLCJpbml0TWFwcyIsInNjZW5lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwicmVuZGVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsImkiLCJqIiwicHVzaCIsIlZlY3RvcjQiLCJTY2VuZSIsImxpZ2h0MSIsIkhlbWlzcGhlcmljTGlnaHQiLCJWZWN0b3IzIiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwicG9zaXRpb24iLCJtYXQiLCJTdGFuZGFyZE1hdGVyaWFsIiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwicHV6emxlIiwidHlwZSIsInBvcyIsInJvdCIsImN1YmVzIiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwidGlsZWRHcm91bmQiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsInBsYW5hck1hdCIsInJlZmxlY3Rpb25UZXh0dXJlIiwiY29vcmRpbmF0ZXNNb2RlIiwiQ1VCSUNfTU9ERSIsImRpZmZ1c2VDb2xvciIsIkNvbG9yMyIsIm1ldGFsIiwiUEJSTWF0ZXJpYWwiLCJtaWNyb1N1cmZhY2UiLCJyZWZsZWN0aXZpdHlDb2xvciIsImFsYmVkb0NvbG9yIiwib2JqcyIsImxlbmd0aCIsImJveCIsImRyYXdCb3giLCJhY3Rpb25NYW5hZ2VyIiwiQWN0aW9uTWFuYWdlciIsInJlZ2lzdGVyQWN0aW9uIiwiRXhlY3V0ZUNvZGVBY3Rpb24iLCJPblBpY2tUcmlnZ2VyIiwibWVzaCIsInJvdGF0aW9uIiwieSIsIk1hdGgiLCJQSSIsImJpbmQiLCJ0ciIsImRyYXdUcmkiLCJncm91bmRtYXQiLCJjbG9uZSIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhckNvbG9yIiwibWF0ZXJpYWwiLCJjYW1lcmEiLCJhY3RpdmVDYW1lcmEiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImluZXJ0aWEiLCJzcGVlZCIsImYiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJkZXB0aCIsImZhY2VVViIsIkNyZWF0ZUJveCIsImN1c3RvbU1lc2giLCJNZXNoIiwicG9zaXRpb25zIiwiaW5kaWNlcyIsInV2cyIsInZlcnRleERhdGEiLCJWZXJ0ZXhEYXRhIiwibm9ybWFscyIsIkNvbXB1dGVOb3JtYWxzIiwiYXBwbHlUb01lc2giLCJiYWNrRmFjZUN1bGxpbmciLCJybmQiLCJyYW5kb20iLCJtIiwicmVxdWlyZSIsIkdhbWUiLCJnYW1lIiwicnVuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxp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QyxNQUFMLEtBQWdCQyxDQUFsQixDQUFOO0FBQUEsQ0FBYixDOzs7Ozs7Ozs7Ozs7OztBQ0FBLG1CQUFBQyxDQUFRLGlDQUFSO0FBQ0EsSUFBSUMsT0FBTyxtQkFBQUQsQ0FBUSxpREFBUixDQUFYOztBQUdBcEcsT0FBT3NHLElBQVAsR0FBYyxJQUFJRCxJQUFKLEVBQWQ7QUFDQWhILFNBQVNZLGdCQUFULENBQTBCLGtCQUExQixFQUE4QztBQUFBLFNBQU1xRyxLQUFLQyxHQUFMLEVBQU47QUFBQSxDQUE5QyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICAgICAgcnVuKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpOyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50IFxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSk7IC8vIEdlbmVyYXRlIHRoZSBCQUJZTE9OIDNEIGVuZ2luZVxyXG4gICAgICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gdGhpcy5jcmVhdGVTY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgICAgICBsZXQgbWFwcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwcy5wdXNoKG5ldyBCQUJZTE9OLlZlY3RvcjQoaSAvIDQsIGogLyA0LCBpIC8gNCArIDAuMjUsIGogLyA0ICsgMC4yNSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3JlYXRlU2NlbmUoKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHNjZW5lIHNwYWNlXHJcbiAgICAgICAgICAgIHZhciBzY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKHRoaXMuZW5naW5lKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBhIGNhbWVyYSB0byB0aGUgc2NlbmUgYW5kIGF0dGFjaCBpdCB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgICAgIC8vIHZhciBjYW1lcmEgPSBuZXcgQkFCWUxPTi5BcmNSb3RhdGVDYW1lcmEoXCJDYW1lcmFcIiwgTWF0aC5QSSAvIDIsIE1hdGguUEkgLyAyLCAyLCBCQUJZTE9OLlZlY3RvcjMuWmVybygpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vIGNhbWVyYS5hdHRhY2hDb250cm9sKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8vIEFkZCBsaWdodHMgdG8gdGhlIHNjZW5lXHJcbiAgICAgICAgICAgIHZhciBsaWdodDEgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwibGlnaHQxXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksIHNjZW5lKTtcclxuICAgICAgICAgICAgLy8gIHZhciBsaWdodDIgPSBuZXcgQkFCWUxPTi5Qb2ludExpZ2h0KFwibGlnaHQyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgLTEpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vICAgICBzY2VuZS5jcmVhdGVEZWZhdWx0Q2FtZXJhT3JMaWdodCh0cnVlLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgLy9zY2VuZS5jcmVhdGVEZWZhdWx0RW52aXJvbm1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBib3ggPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveChcImJveFwiLCB7aGVpZ2h0OiAxfSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICAgICAgbGlnaHQucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDYsIDksIDMpO1xyXG4gICAgICAgICAgICAvLyB2YXIgZ2VuZXJhdG9yID0gbmV3IEJBQllMT04uU2hhZG93R2VuZXJhdG9yKDUxMiwgbGlnaHQpO1xyXG4gICAgICAgICAgICAvLyBnZW5lcmF0b3IudXNlQmx1ckV4cG9uZW50aWFsU2hhZG93TWFwID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdG9yLmJsdXJLZXJuZWwgPSAzO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBzY2VuZS5tZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgIGdlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIoc2NlbmUubWVzaGVzW2ldKTsgICAgXHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHZhciBoZWxwZXIgPSBzY2VuZS5jcmVhdGVEZWZhdWx0RW52aXJvbm1lbnQoe1xyXG4gICAgICAgICAgICAvLyAgICAgZW5hYmxlR3JvdW5kTWlycm9yOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgZ3JvdW5kU2hhZG93TGV2ZWw6IDAuNzUsXHJcbiAgICAgICAgICAgIC8vIH0pOyAgICAgICBcclxuICAgICAgICAgICAgdmFyIG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJtYXRcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgICAgICBtYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvL1RpbGVzOlxyXG4gICAgICAgICAgICAvLyAwOiBHcm91bmRcclxuICAgICAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgICAgICAvLyAyOlxyXG4gICAgICAgICAgICAvLyAzOiBMYXNlclxyXG4gICAgICAgICAgICAvLyA0OlxyXG4gICAgICAgICAgICAvLyA1OlxyXG4gICAgICAgICAgICAvLyA2OlxyXG4gICAgICAgICAgICAvLyA3OlxyXG4gICAgICAgICAgICAvLyA4OlxyXG4gICAgICAgICAgICAvLyA5OlxyXG4gICAgICAgICAgICAvLyAxMDpcclxuICAgICAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgICAgIC8vIDEyOlxyXG4gICAgICAgICAgICAvLyAxMzpcclxuICAgICAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgICAgIC8vIDE1OlxyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB2YXIgcHV6emxlID0gW3tcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzUsIDEsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFsxLCAxLCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMSwgMSwgMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzUsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMywgMSwgNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgY3ViZXMgPSBbXHJcbiAgICAgICAgICAgICAgICBbMywgNywgNywgNywgN10sIC8vIGxhc2VyXHJcbiAgICAgICAgICAgICAgICBbMSwgMSwgMSwgMSwgMV0sIC8vIHdhbGxcclxuICAgICAgICAgICAgICAgIFs1LCA1LCA1LCA1LCA1XSwgLy8gbWlycm9yXHJcbiAgICAgICAgICAgIF07XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnZySGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpbGVkR3JvdW5kID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICAgICAgeG1pbjogLTEwLFxyXG4gICAgICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB6bWF4OiAxMCxcclxuICAgICAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3cnOiAyMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBzY2VuZSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBwbGFuYXJNYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwicGxhbmFyTWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgcGxhbmFyTWF0LnJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInJvb20ucG5nXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgcGxhbmFyTWF0LnJlZmxlY3Rpb25UZXh0dXJlLmNvb3JkaW5hdGVzTW9kZSA9IEJBQllMT04uVGV4dHVyZS5DVUJJQ19NT0RFO1xyXG4gICAgICAgICAgICBwbGFuYXJNYXQuZGlmZnVzZUNvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKC4zLCAuMywgLjMpO1xyXG4gICAgICAgICAgICB2YXIgbWV0YWwgPSBuZXcgQkFCWUxPTi5QQlJNYXRlcmlhbChcIm1ldGFsXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgbWV0YWwucmVmbGVjdGlvblRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwicm9vbS5wbmdcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICBtZXRhbC5taWNyb1N1cmZhY2UgPSAwLjk2O1xyXG4gICAgICAgICAgICBtZXRhbC5yZWZsZWN0aXZpdHlDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLjg1LCAwLjg1LCAwLjg1KTtcclxuICAgICAgICAgICAgbWV0YWwuYWxiZWRvQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC4wMSwgMC4wMSwgMC4wMSk7XHJcbiAgICAgICAgICAgIGxldCBvYmpzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHV6emxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBib3ggPSB0aGlzLmRyYXdCb3goc2NlbmUsIG1hdCwgY3ViZXNbMF0sIHB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKGZ1bmN0aW9uIChtZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3gucm90YXRpb24ueSA9IGJveC5yb3RhdGlvbi55IC0gTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcywgYm94KSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpzLnB1c2hbYm94XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyID0gdGhpcy5kcmF3VHJpKHNjZW5lLCBtYXQsIHB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5hY3Rpb25NYW5hZ2VyID0gbmV3IEJBQllMT04uQWN0aW9uTWFuYWdlcihzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHIucm90YXRpb24ueSA9IHRyLnJvdGF0aW9uLnkgLSBNYXRoLlBJIC8gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYmluZCh0aGlzLCB0cikpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Jqcy5wdXNoW3RyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2FsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd0JveChzY2VuZSwgbWF0LCBjdWJlc1sxXSwgcHV6emxlW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFYgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICAgICAgdGlsZWRHcm91bmQubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FtZXJhID0gc2NlbmUuYWN0aXZlQ2FtZXJhO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZVRlbGVwb3J0YXRpb24oe1xyXG4gICAgICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogXCJUaWxlZCBHcm91bmRcIlxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5pbmVydGlhID0gMC42O1xyXG4gICAgICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuc3BlZWQgPSAwLjU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3Qm94KHNjZW5lLCBtYXQsIGYsIHBvc2l0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxyXG4gICAgICAgICAgICAgICAgZGVwdGg6IDEsXHJcbiAgICAgICAgICAgICAgICBmYWNlVVY6IFt0aGlzLm1hcHNbZlswXV0sIHRoaXMubWFwc1tmWzFdXSwgdGhpcy5tYXBzW2ZbMl1dLCB0aGlzLm1hcHNbZlszXV0sIHRoaXMubWFwc1tmWzRdXSwgdGhpcy5tYXBzW2ZbNV1dXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGJveCA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlQm94KCdib3gnLCBvcHRpb25zLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGJveC5tYXRlcmlhbCA9IG1hdDtcclxuICAgICAgICAgICAgYm94LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBib3g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3VHJpKHNjZW5lLCBtYXQsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXN0b21NZXNoID0gbmV3IEJBQllMT04uTWVzaChcImN1c3RvbVwiLCBzY2VuZSk7XHJcblx0XHJcbiAgICAgICAgICAgIC8vU2V0IGFycmF5cyBmb3IgcG9zaXRpb25zIGFuZCBpbmRpY2VzXHJcbnZhciBwb3NpdGlvbnMgPSBbLTAuNSwtMC41LDAuNSwwLjUsLTAuNSwtMC41LC0wLjUsMC41LDAuNSwwLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwtMC41LC0wLjUsMC41LDAuNSwtMC41LC0wLjUsLTAuNSwwLjUsMC41LDAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsMC41LDAuNSwtMC41LC0wLjUsMC41LC0wLjVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNlcyA9IFs2LDgsOSwgOSw3LDYsIDQsMSwzLCAzLDUsNCwgMTEsMTAsMTIsIDIsMCw0LCA0LDUsMl07XHJcbiAgICAgICAgICAgIC8vdmFyIHV2cyA9IFswLjUsMC4yNSwgMC41LDAuNSwgMC4yNSwwLjUsICAwLjI1LDAuNSwgMC4yNSwwLjI1LCAwLjUsMC4yNSwgIDAuMCwwLjUsIDAuMjUsMC41LCAwLjI1LDAuNzUsICAwLjI1LDAuNzUsIDAuMCwwLjc1LCAwLjAsMC41LCAgMC4yNSwwLjc1LCAwLjAsMC43NSwgMC4yNSwwLjUsICAwLjI1LDAuNzUsIDAuMCwwLjc1LCAwLjAsMC41LCAgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC43NV07XHJcbiAgICAgICAgICAgIHZhciB1dnMgPSBbXHJcbiAgICAgICAgICAgICAgICAwLjAsIDAuNzUsXHJcbiAgICAgICAgICAgICAgICAwLjI1LCAwLjUsXHJcbiAgICAgICAgICAgICAgICAwLjI1LCAwLjc1LCBcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNzUsICBcclxuICAgICAgICAgICAgICAgIDAuMCwgMC41LCBcclxuICAgICAgICAgICAgICAgIDAuMCwgMC43NSwgXHJcbiAgICAgICAgICAgICAgICAwLjUsIDAuMjUsIFxyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC4yNSwgXHJcbiAgICAgICAgICAgICAgICAwLjUsIDAuNSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNSwgXHJcbiAgICAgICAgICAgICAgICAwLjAsIDAuNzUsIFxyXG4gICAgICAgICAgICAgICAgMC4yNSwgMC43NSxcclxuICAgICAgICAgICAgICAgIDAuMjUsIDAuNSwgXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICAgICAgdmFyIHZlcnRleERhdGEgPSBuZXcgQkFCWUxPTi5WZXJ0ZXhEYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBub3JtYWxzID0gW107XHJcblxyXG4gICAgICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyhwb3NpdGlvbnMsIGluZGljZXMsIG5vcm1hbHMpO1xyXG5cclxuICAgICAgICAgICAgLy9Bc3NpZ24gcG9zaXRpb25zIGFuZCBpbmRpY2VzIHRvIHZlcnRleERhdGFcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IGluZGljZXM7XHRcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gbm9ybWFscztcclxuICAgICAgICAgICAgdmVydGV4RGF0YS51dnMgPSB1dnM7XHJcbiAgICAgICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLmFwcGx5VG9NZXNoKGN1c3RvbU1lc2gpO1xyXG4gICAgICAgICAgICBjdXN0b21NZXNoLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICBjdXN0b21NZXNoLm1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjdXN0b21NZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21NZXNoO1xyXG4gICAgICAgICAgICAvLyB2YXIgbXlTaGFwZSA9IFtcclxuICAgICAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoLS41LCAuNSwgLS41KSxcclxuICAgICAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIC41LCAuNSwgLS41KSxcclxuICAgICAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoIC41LC0uNSwgLS41KVxyXG4gICAgICAgICAgICAvLyBdO1xyXG5cclxuICAgICAgICAgICAgLy8gbXlTaGFwZS5wdXNoKG15U2hhcGVbMF0pO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIG15UGF0aCA9IFtcclxuICAgICAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMCwwKSxcclxuICAgICAgICAgICAgLy8gICAgIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwwKSxcclxuICAgICAgICAgICAgLy8gXTtcclxuXHJcbiAgICAgICAgICAgIC8vIC8vQ3JlYXRlIGV4dHJ1c2lvbiB3aXRoIHVwZGF0YWJsZSBwYXJhbWV0ZXIgc2V0IHRvIHRydWUgZm9yIGxhdGVyIGNoYW5nZXNcclxuICAgICAgICAgICAgLy8gdmFyIGV4dHJ1c2lvbiA9IEJBQllMT04uTWVzaEJ1aWxkZXIuRXh0cnVkZVNoYXBlKFwic3RhclwiLCB7XHJcbiAgICAgICAgICAgIC8vICAgICBzaGFwZTogbXlTaGFwZSxcclxuICAgICAgICAgICAgLy8gICAgIHBhdGg6IG15UGF0aCxcclxuICAgICAgICAgICAgLy8gICAgIHNpZGVPcmllbnRhdGlvbjogQkFCWUxPTi5NZXNoLkRPVUJMRVNJREUsXHJcbiAgICAgICAgICAgIC8vICAgICB1cGRhdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICBjYXA6IEJBQllMT04uTWVzaC5DQVBfQUxMXHJcbiAgICAgICAgICAgIC8vIH0sIHNjZW5lKTtcclxuICAgICAgICAgICAgLy8gZXh0cnVzaW9uLm1hdGVyaWFsID0gbWF0O1xyXG4gICAgICAgICAgICAvLyBleHRydXNpb24ucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGV4dHJ1c2lvbjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpOyIsIndpbmRvdy5ybmQgPSBtID0+IH5+KE1hdGgucmFuZG9tKCkgKiBtKTsiLCJyZXF1aXJlKCcuL2dsb2JhbCcpO1xyXG5sZXQgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5jb21wb25lbnQnKTtcclxuXHJcblxyXG53aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGdhbWUucnVuKCkpOyJdLCJzb3VyY2VSb290IjoiIn0=