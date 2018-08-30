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
                                                var positions = [-0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5];
                                                var indices = [6, 8, 9, 9, 7, 6, 4, 1, 3, 3, 5, 4, 3, 2, 5, 2, 0, 4, 4, 5, 2];
                                                var uvs = [0.25, 0.75, 0.0, 0.75, 0.0, 0.5, 0.25, 0.5, 0.25, 0.75, 0.0, 0.75, 0.5, 0.25, 0.25, 0.5, 0.0, 0.5, 0.25, 0.5, 0.25, 0.75, 0.0, 0.75, 0.5, 0.5, 0.25, 0.5, 0.25, 0.25];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiQkFCWUxPTiIsIkVuZ2luZSIsIm1hcHMiLCJpbml0TWFwcyIsInNjZW5lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwicmVuZGVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsImkiLCJqIiwicHVzaCIsIlZlY3RvcjQiLCJTY2VuZSIsImxpZ2h0MSIsIkhlbWlzcGhlcmljTGlnaHQiLCJWZWN0b3IzIiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwicG9zaXRpb24iLCJtYXQiLCJTdGFuZGFyZE1hdGVyaWFsIiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwicHV6emxlIiwidHlwZSIsInBvcyIsInJvdCIsImN1YmVzIiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwidGlsZWRHcm91bmQiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsInBsYW5hck1hdCIsInJlZmxlY3Rpb25UZXh0dXJlIiwiY29vcmRpbmF0ZXNNb2RlIiwiQ1VCSUNfTU9ERSIsImRpZmZ1c2VDb2xvciIsIkNvbG9yMyIsIm1ldGFsIiwiUEJSTWF0ZXJpYWwiLCJtaWNyb1N1cmZhY2UiLCJyZWZsZWN0aXZpdHlDb2xvciIsImFsYmVkb0NvbG9yIiwib2JqcyIsImxlbmd0aCIsImJveCIsImRyYXdCb3giLCJhY3Rpb25NYW5hZ2VyIiwiQWN0aW9uTWFuYWdlciIsInJlZ2lzdGVyQWN0aW9uIiwiRXhlY3V0ZUNvZGVBY3Rpb24iLCJPblBpY2tUcmlnZ2VyIiwibWVzaCIsInJvdGF0aW9uIiwieSIsIk1hdGgiLCJQSSIsImJpbmQiLCJ0ciIsImRyYXdUcmkiLCJncm91bmRtYXQiLCJjbG9uZSIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhckNvbG9yIiwibWF0ZXJpYWwiLCJjYW1lcmEiLCJhY3RpdmVDYW1lcmEiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImluZXJ0aWEiLCJzcGVlZCIsImYiLCJvcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJkZXB0aCIsImZhY2VVViIsIkNyZWF0ZUJveCIsImN1c3RvbU1lc2giLCJNZXNoIiwicG9zaXRpb25zIiwiaW5kaWNlcyIsInV2cyIsInZlcnRleERhdGEiLCJWZXJ0ZXhEYXRhIiwibm9ybWFscyIsIkNvbXB1dGVOb3JtYWxzIiwiYXBwbHlUb01lc2giLCJiYWNrRmFjZUN1bGxpbmciLCJybmQiLCJyYW5kb20iLCJtIiwicmVxdWlyZSIsIkdhbWUiLCJnYW1lIiwicnVuIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxp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Ozs7Ozs7Ozs7Ozs7QUNBQSxtQkFBQUMsQ0FBUSxpQ0FBUjtBQUNBLElBQUlDLE9BQU8sbUJBQUFELENBQVEsaURBQVIsQ0FBWDs7QUFHQXBHLE9BQU9zRyxJQUFQLEdBQWMsSUFBSUQsSUFBSixFQUFkO0FBQ0FoSCxTQUFTWSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEM7QUFBQSxTQUFNcUcsS0FBS0MsR0FBTCxFQUFOO0FBQUEsQ0FBOUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0gY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgICAgIHJ1bigpIHtcclxuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKTsgLy8gR2V0IHRoZSBjYW52YXMgZWxlbWVudCBcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpOyAvLyBHZW5lcmF0ZSB0aGUgQkFCWUxPTiAzRCBlbmdpbmVcclxuICAgICAgICAgICAgdGhpcy5tYXBzID0gdGhpcy5pbml0TWFwcygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zY2VuZSA9IHRoaXMuY3JlYXRlU2NlbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0TWFwcygpIHtcclxuICAgICAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbWFwcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZVNjZW5lKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBzY2VuZSBzcGFjZVxyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYSBjYW1lcmEgdG8gdGhlIHNjZW5lIGFuZCBhdHRhY2ggaXQgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICAvLyB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIE1hdGguUEkgLyAyLCBNYXRoLlBJIC8gMiwgMiwgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyAvLyBBZGQgbGlnaHRzIHRvIHRoZSBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vICB2YXIgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyAgICAgc2NlbmUuY3JlYXRlRGVmYXVsdENhbWVyYU9yTGlnaHQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgYm94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJib3hcIiwge2hlaWdodDogMX0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuICAgICAgICAgICAgLy8gdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig1MTIsIGxpZ2h0KTtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdG9yLnVzZUJsdXJFeHBvbmVudGlhbFNoYWRvd01hcCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRvci5ibHVyS2VybmVsID0gMztcclxuXHJcbiAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBnZW5lcmF0b3IuYWRkU2hhZG93Q2FzdGVyKHNjZW5lLm1lc2hlc1tpXSk7ICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgaGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcclxuICAgICAgICAgICAgLy8gICAgIGVuYWJsZUdyb3VuZE1pcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgIGdyb3VuZFNoYWRvd0xldmVsOiAwLjc1LFxyXG4gICAgICAgICAgICAvLyB9KTsgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICAgICAgbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy9UaWxlczpcclxuICAgICAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAgICAgLy8gMjpcclxuICAgICAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAgICAgLy8gNDpcclxuICAgICAgICAgICAgLy8gNTpcclxuICAgICAgICAgICAgLy8gNjpcclxuICAgICAgICAgICAgLy8gNzpcclxuICAgICAgICAgICAgLy8gODpcclxuICAgICAgICAgICAgLy8gOTpcclxuICAgICAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgICAgIC8vIDExOlxyXG4gICAgICAgICAgICAvLyAxMjpcclxuICAgICAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgICAgIC8vIDE0OlxyXG4gICAgICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIHB1enpsZSA9IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFs1LCAxLCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMSwgMSwgNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzEsIDEsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFs1LCAxLCAxXSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzMsIDEsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1YmVzID0gW1xyXG4gICAgICAgICAgICAgICAgWzMsIDcsIDcsIDcsIDddLCAvLyBsYXNlclxyXG4gICAgICAgICAgICAgICAgWzEsIDEsIDEsIDEsIDFdLCAvLyB3YWxsXHJcbiAgICAgICAgICAgICAgICBbNSwgNSwgNSwgNSwgNV0sIC8vIG1pcnJvclxyXG4gICAgICAgICAgICBdO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWxlZEdyb3VuZCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVRpbGVkR3JvdW5kKFwiVGlsZWQgR3JvdW5kXCIsIHtcclxuICAgICAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgICAgIHhtYXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnaCc6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgc2NlbmUpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgcGxhbmFyTWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcInBsYW5hck1hdFwiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHBsYW5hck1hdC5yZWZsZWN0aW9uVGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJyb29tLnBuZ1wiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIHBsYW5hck1hdC5yZWZsZWN0aW9uVGV4dHVyZS5jb29yZGluYXRlc01vZGUgPSBCQUJZTE9OLlRleHR1cmUuQ1VCSUNfTU9ERTtcclxuICAgICAgICAgICAgcGxhbmFyTWF0LmRpZmZ1c2VDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMyguMywgLjMsIC4zKTtcclxuICAgICAgICAgICAgdmFyIG1ldGFsID0gbmV3IEJBQllMT04uUEJSTWF0ZXJpYWwoXCJtZXRhbFwiLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIG1ldGFsLnJlZmxlY3Rpb25UZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInJvb20ucG5nXCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgbWV0YWwubWljcm9TdXJmYWNlID0gMC45NjtcclxuICAgICAgICAgICAgbWV0YWwucmVmbGVjdGl2aXR5Q29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMC44NSwgMC44NSwgMC44NSk7XHJcbiAgICAgICAgICAgIG1ldGFsLmFsYmVkb0NvbG9yID0gbmV3IEJBQllMT04uQ29sb3IzKDAuMDEsIDAuMDEsIDAuMDEpO1xyXG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChwdXp6bGVbaV0udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYm94ID0gdGhpcy5kcmF3Qm94KHNjZW5lLCBtYXQsIGN1YmVzWzBdLCBwdXp6bGVbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHNjZW5lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm94LmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94LnJvdGF0aW9uLnkgPSBib3gucm90YXRpb24ueSAtIE1hdGguUEkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5iaW5kKHRoaXMsIGJveCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2Jqcy5wdXNoW2JveF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pcnJvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ciA9IHRoaXMuZHJhd1RyaShzY2VuZSwgbWF0LCBwdXp6bGVbaV0ucG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHIuYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ci5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyLnJvdGF0aW9uLnkgPSB0ci5yb3RhdGlvbi55IC0gTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmJpbmQodGhpcywgdHIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ianMucHVzaFt0cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdCb3goc2NlbmUsIG1hdCwgY3ViZXNbMV0sIHB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHRpbGVkR3JvdW5kLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhbWVyYSA9IHNjZW5lLmFjdGl2ZUNhbWVyYTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVJbnRlcmFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IFwiVGlsZWQgR3JvdW5kXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuaW5lcnRpYSA9IDAuNjtcclxuICAgICAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNjZW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd0JveChzY2VuZSwgbWF0LCBmLCBwb3NpdGlvbikge1xyXG5cclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcclxuICAgICAgICAgICAgICAgIGRlcHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgZmFjZVVWOiBbdGhpcy5tYXBzW2ZbMF1dLCB0aGlzLm1hcHNbZlsxXV0sIHRoaXMubWFwc1tmWzJdXSwgdGhpcy5tYXBzW2ZbM11dLCB0aGlzLm1hcHNbZls0XV0sIHRoaXMubWFwc1tmWzVdXV1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBib3ggPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCgnYm94Jywgb3B0aW9ucywgc2NlbmUpO1xyXG4gICAgICAgICAgICBib3gubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgIGJveC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYm94O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZHJhd1RyaShzY2VuZSwgbWF0LCBwb3NpdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgY3VzdG9tTWVzaCA9IG5ldyBCQUJZTE9OLk1lc2goXCJjdXN0b21cIiwgc2NlbmUpO1xyXG5cdFxyXG4gICAgICAgICAgICAvL1NldCBhcnJheXMgZm9yIHBvc2l0aW9ucyBhbmQgaW5kaWNlc1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb25zID0gWy0wLjUsLTAuNSwwLjUsMC41LC0wLjUsLTAuNSwtMC41LDAuNSwwLjUsMC41LDAuNSwtMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsLTAuNSwtMC41LDAuNSwwLjUsLTAuNSwtMC41LC0wLjUsMC41LDAuNSwwLjUsMC41LC0wLjVdO1xyXG4gICAgICAgICAgICB2YXIgaW5kaWNlcyA9IFs2LDgsOSwgOSw3LDYsIDQsMSwzLCAzLDUsNCwgMywyLDUsIDIsMCw0LCA0LDUsMl07XHJcbiAgICAgICAgICAgIHZhciB1dnMgPSBbMC4yNSwwLjc1LCAwLjAsMC43NSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC43NSwgMC4wLDAuNzUsIDAuNSwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC43NSwgMC4wLDAuNzUsIDAuNSwwLjUsIDAuMjUsMC41LCAwLjI1LDAuMjVdO1xyXG5cclxuICAgICAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgICAgICB2YXIgdmVydGV4RGF0YSA9IG5ldyBCQUJZTE9OLlZlcnRleERhdGEoKTtcclxuICAgICAgICAgICAgdmFyIG5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vQ2FsY3VsYXRpb25zIG9mIG5vcm1hbHMgYWRkZWRcclxuICAgICAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHBvc2l0aW9ucywgaW5kaWNlcywgbm9ybWFscyk7XHJcblxyXG4gICAgICAgICAgICAvL0Fzc2lnbiBwb3NpdGlvbnMgYW5kIGluZGljZXMgdG8gdmVydGV4RGF0YVxyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5pbmRpY2VzID0gaW5kaWNlcztcdFxyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSBub3JtYWxzO1xyXG4gICAgICAgICAgICB2ZXJ0ZXhEYXRhLnV2cyA9IHV2cztcclxuICAgICAgICAgICAgLy9BcHBseSB2ZXJ0ZXhEYXRhIHRvIGN1c3RvbSBtZXNoXHJcbiAgICAgICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2goY3VzdG9tTWVzaCk7XHJcbiAgICAgICAgICAgIGN1c3RvbU1lc2gubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgIGN1c3RvbU1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGN1c3RvbU1lc2gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbU1lc2g7XHJcbiAgICAgICAgICAgIC8vIHZhciBteVNoYXBlID0gW1xyXG4gICAgICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMygtLjUsIC41LCAtLjUpLFxyXG4gICAgICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggLjUsIC41LCAtLjUpLFxyXG4gICAgICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMyggLjUsLS41LCAtLjUpXHJcbiAgICAgICAgICAgIC8vIF07XHJcblxyXG4gICAgICAgICAgICAvLyBteVNoYXBlLnB1c2gobXlTaGFwZVswXSk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgbXlQYXRoID0gW1xyXG4gICAgICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAwLDApLFxyXG4gICAgICAgICAgICAvLyAgICAgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLDApLFxyXG4gICAgICAgICAgICAvLyBdO1xyXG5cclxuICAgICAgICAgICAgLy8gLy9DcmVhdGUgZXh0cnVzaW9uIHdpdGggdXBkYXRhYmxlIHBhcmFtZXRlciBzZXQgdG8gdHJ1ZSBmb3IgbGF0ZXIgY2hhbmdlc1xyXG4gICAgICAgICAgICAvLyB2YXIgZXh0cnVzaW9uID0gQkFCWUxPTi5NZXNoQnVpbGRlci5FeHRydWRlU2hhcGUoXCJzdGFyXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgIHNoYXBlOiBteVNoYXBlLFxyXG4gICAgICAgICAgICAvLyAgICAgcGF0aDogbXlQYXRoLFxyXG4gICAgICAgICAgICAvLyAgICAgc2lkZU9yaWVudGF0aW9uOiBCQUJZTE9OLk1lc2guRE9VQkxFU0lERSxcclxuICAgICAgICAgICAgLy8gICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgIGNhcDogQkFCWUxPTi5NZXNoLkNBUF9BTExcclxuICAgICAgICAgICAgLy8gfSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyBleHRydXNpb24ubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgIC8vIGV4dHJ1c2lvbi5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZXh0cnVzaW9uO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7Iiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pOyIsInJlcXVpcmUoJy4vZ2xvYmFsJyk7XHJcbmxldCBHYW1lID0gcmVxdWlyZSgnLi9nYW1lLmNvbXBvbmVudCcpO1xyXG5cclxuXHJcbndpbmRvdy5nYW1lID0gbmV3IEdhbWUoKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZ2FtZS5ydW4oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==