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
                                                this.scene = this.createScene();

                                                this.engine.runRenderLoop(function () {
                                                            return _this.scene.render();
                                                });

                                                window.addEventListener("resize", function () {
                                                            return _this.engine.resize();
                                                });
                                    }
                        }, {
                                    key: "createScene",
                                    value: function createScene() {

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
                                                box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                                            box.rotation.y = box.rotation.y - Math.PI / 2;
                                                }.bind(this, box)));

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
                                                            camera.controllers.forEach(function (gp) {
                                                                        console.log(gp);
                                                                        var mesh = gp.hand === 'right' ? rightBox : leftBox;

                                                                        gp.onPadValuesChangedObservable.add(function (stateObject) {
                                                                                    var r = (stateObject.x + 1) / 2;
                                                                                    var g = (stateObject.y + 1) / 2;
                                                                                    mesh.material.diffuseColor.copyFromFloats(r, g, 1);
                                                                        });
                                                                        gp.onTriggerStateChangedObservable.add(function (stateObject) {
                                                                                    var scale = 2 - stateObject.value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiQkFCWUxPTiIsIkVuZ2luZSIsInNjZW5lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwicmVuZGVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsIlNjZW5lIiwibGlnaHQxIiwiSGVtaXNwaGVyaWNMaWdodCIsIlZlY3RvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJwb3NpdGlvbiIsIm1hdCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJ0ZXh0dXJlIiwiVGV4dHVyZSIsIk5FQVJFU1RfU0FNUExJTkdNT0RFIiwiZGlmZnVzZVRleHR1cmUiLCJtYXBzIiwiaSIsImoiLCJwdXNoIiwiVmVjdG9yNCIsIm9wdGlvbnMiLCJ3aWR0aCIsImhlaWdodCIsImRlcHRoIiwiZmFjZVVWIiwiYm94IiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVCb3giLCJtYXRlcmlhbCIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJtZXNoIiwicm90YXRpb24iLCJ5IiwiTWF0aCIsIlBJIiwiYmluZCIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsInRpbGVkR3JvdW5kIiwiQ3JlYXRlVGlsZWRHcm91bmQiLCJ4bWluIiwiem1pbiIsInhtYXgiLCJ6bWF4Iiwic3ViZGl2aXNpb25zIiwiZ3JvdW5kbWF0IiwiY2xvbmUiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwiY2FtZXJhIiwiYWN0aXZlQ2FtZXJhIiwiY29udHJvbGxlcnMiLCJmb3JFYWNoIiwiZ3AiLCJjb25zb2xlIiwibG9nIiwiaGFuZCIsInJpZ2h0Qm94IiwibGVmdEJveCIsIm9uUGFkVmFsdWVzQ2hhbmdlZE9ic2VydmFibGUiLCJhZGQiLCJzdGF0ZU9iamVjdCIsInIiLCJ4IiwiZyIsImRpZmZ1c2VDb2xvciIsImNvcHlGcm9tRmxvYXRzIiwib25UcmlnZ2VyU3RhdGVDaGFuZ2VkT2JzZXJ2YWJsZSIsInNjYWxlIiwidmFsdWUiLCJzY2FsaW5nIiwiYXR0YWNoVG9NZXNoIiwiTWVzaCIsImVuYWJsZUludGVyYWN0aW9ucyIsImVuYWJsZVRlbGVwb3J0YXRpb24iLCJmbG9vck1lc2hOYW1lIiwiaW5lcnRpYSIsInNwZWVkIiwicm5kIiwicmFuZG9tIiwibSIsInJlcXVpcmUiLCJHYW1lIiwiZ2FtZSIsInJ1biJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7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LEtBQUtpRCxNQUFMLEtBQWdCQyxDQUFsQixDQUFOO0FBQUEsQ0FBYixDOzs7Ozs7Ozs7Ozs7OztBQ0FBLG1CQUFBQyxDQUFRLGlDQUFSO0FBQ0EsSUFBSUMsT0FBTyxtQkFBQUQsQ0FBUSxpREFBUixDQUFYOztBQUdBekYsT0FBTzJGLElBQVAsR0FBYyxJQUFJRCxJQUFKLEVBQWQ7QUFDQW5HLFNBQVNVLGdCQUFULENBQTBCLGtCQUExQixFQUE4QztBQUFBLFNBQU0wRixLQUFLQyxHQUFMLEVBQU47QUFBQSxDQUE5QyxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICAgICAgcnVuKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpOyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50IFxyXG4gICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSk7IC8vIEdlbmVyYXRlIHRoZSBCQUJZTE9OIDNEIGVuZ2luZVxyXG4gICAgICAgICAgICB0aGlzLnNjZW5lID0gdGhpcy5jcmVhdGVTY2VuZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZVNjZW5lKCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBzY2VuZSBzcGFjZVxyXG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgYSBjYW1lcmEgdG8gdGhlIHNjZW5lIGFuZCBhdHRhY2ggaXQgdG8gdGhlIGNhbnZhc1xyXG4gICAgICAgICAgICAvLyB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIE1hdGguUEkgLyAyLCBNYXRoLlBJIC8gMiwgMiwgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyAvLyBBZGQgbGlnaHRzIHRvIHRoZSBzY2VuZVxyXG4gICAgICAgICAgICB2YXIgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIC8vICB2YXIgbGlnaHQyID0gbmV3IEJBQllMT04uUG9pbnRMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIC0xKSwgc2NlbmUpO1xyXG4gICAgICAgICAgICAvLyAgICAgc2NlbmUuY3JlYXRlRGVmYXVsdENhbWVyYU9yTGlnaHQodHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgYm94ID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVCb3goXCJib3hcIiwge2hlaWdodDogMX0sIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuICAgICAgICAgICAgLy8gdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig1MTIsIGxpZ2h0KTtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhdG9yLnVzZUJsdXJFeHBvbmVudGlhbFNoYWRvd01hcCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGdlbmVyYXRvci5ibHVyS2VybmVsID0gMztcclxuXHJcbiAgICAgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBnZW5lcmF0b3IuYWRkU2hhZG93Q2FzdGVyKHNjZW5lLm1lc2hlc1tpXSk7ICAgIFxyXG4gICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgaGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdEVudmlyb25tZW50KHtcclxuICAgICAgICAgICAgLy8gICAgIGVuYWJsZUdyb3VuZE1pcnJvcjogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgIGdyb3VuZFNoYWRvd0xldmVsOiAwLjc1LFxyXG4gICAgICAgICAgICAvLyB9KTsgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHNjZW5lKTtcclxuICAgICAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICAgICAgbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXBzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmYWNlVVZbaV0gPSBuZXcgQkFCWUxPTi5WZWN0b3I0KC43NSwgMCwgMSwgLjI1KTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgICAgIC8vIDA6IEdyb3VuZFxyXG4gICAgICAgICAgICAvLyAxOlxyXG4gICAgICAgICAgICAvLyAyOlxyXG4gICAgICAgICAgICAvLyAzOiBMYXNlclxyXG4gICAgICAgICAgICAvLyA0OlxyXG4gICAgICAgICAgICAvLyA1OlxyXG4gICAgICAgICAgICAvLyA2OlxyXG4gICAgICAgICAgICAvLyA3OlxyXG4gICAgICAgICAgICAvLyA4OlxyXG4gICAgICAgICAgICAvLyA5OlxyXG4gICAgICAgICAgICAvLyAxMDpcclxuICAgICAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgICAgIC8vIDEyOlxyXG4gICAgICAgICAgICAvLyAxMzpcclxuICAgICAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgICAgIC8vIDE1OlxyXG5cclxuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcclxuICAgICAgICAgICAgICAgIGRlcHRoOiAxLFxyXG4gICAgICAgICAgICAgICAgZmFjZVVWOiBbbWFwc1szXSwgbWFwc1s3XSwgbWFwc1s3XSwgbWFwc1s3XSwgbWFwc1s3XSwgbWFwc1s3XV1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBib3ggPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZUJveCgnYm94Jywgb3B0aW9ucywgc2NlbmUpO1xyXG4gICAgICAgICAgICBib3gubWF0ZXJpYWwgPSBtYXQ7XHJcbiAgICAgICAgICAgIGJveC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCk7XHJcblxyXG4gICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIoc2NlbmUpO1xyXG4gICAgICAgICAgICBib3guYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKGZ1bmN0aW9uIChtZXNoKSB7XHJcbiAgICAgICAgICAgICAgICBib3gucm90YXRpb24ueSA9IGJveC5yb3RhdGlvbi55IC0gTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgICAgIH0pLmJpbmQodGhpcywgYm94KSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aWxlZEdyb3VuZCA9IG5ldyBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVRpbGVkR3JvdW5kKFwiVGlsZWQgR3JvdW5kXCIsIHtcclxuICAgICAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgICAgIHhtYXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnaCc6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgc2NlbmUpO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS51U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFYgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgICAgICB0aWxlZEdyb3VuZC5tYXRlcmlhbCA9IGdyb3VuZG1hdDtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYW1lcmEgPSBzY2VuZS5hY3RpdmVDYW1lcmE7XHJcbiAgICAgICAgICAgIGlmIChjYW1lcmEuY29udHJvbGxlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS5jb250cm9sbGVycy5mb3JFYWNoKChncCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzaCA9IGdwLmhhbmQgPT09ICdyaWdodCcgPyByaWdodEJveCA6IGxlZnRCb3g7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdwLm9uUGFkVmFsdWVzQ2hhbmdlZE9ic2VydmFibGUuYWRkKGZ1bmN0aW9uIChzdGF0ZU9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgciA9IChzdGF0ZU9iamVjdC54ICsgMSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZyA9IChzdGF0ZU9iamVjdC55ICsgMSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLm1hdGVyaWFsLmRpZmZ1c2VDb2xvci5jb3B5RnJvbUZsb2F0cyhyLCBnLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBncC5vblRyaWdnZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlLmFkZChmdW5jdGlvbiAoc3RhdGVPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMiAtIHN0YXRlT2JqZWN0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLnNjYWxpbmcueCA9IHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9jdWx1cyBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgLypncC5vblNlY29uZGFyeVRyaWdnZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlLmFkZChmdW5jdGlvbiAoc3RhdGVPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gMiAtIHN0YXRlT2JqZWN0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNoLnNjYWxpbmcueiA9IHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyovXHJcbiAgICAgICAgICAgICAgICAgICAgZ3AuYXR0YWNoVG9NZXNoKG1lc2gpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Qm94ID0gQkFCWUxPTi5NZXNoLkNyZWF0ZUJveChcInNwaGVyZTFcIiwgMC4xLCBzY2VuZSk7XHJcbiAgICAgICAgICAgICAgICByaWdodEJveC5zY2FsaW5nLmNvcHlGcm9tRmxvYXRzKDIsIDEsIDIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRCb3ggPSBCQUJZTE9OLk1lc2guQ3JlYXRlQm94KFwic3BoZXJlMVwiLCAwLjEsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIGxlZnRCb3guc2NhbGluZy5jb3B5RnJvbUZsb2F0cygyLCAxLCAyKTtcclxuXHJcbiAgICAgICAgICAgICAgICByaWdodEJveC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoJ3JpZ2h0Jywgc2NlbmUpO1xyXG4gICAgICAgICAgICAgICAgbGVmdEJveC5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoJ3JpZ2h0Jywgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IFwiVGlsZWQgR3JvdW5kXCJcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuaW5lcnRpYSA9IDAuNjtcclxuICAgICAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTsiLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7IiwicmVxdWlyZSgnLi9nbG9iYWwnKTtcclxubGV0IEdhbWUgPSByZXF1aXJlKCcuL2dhbWUuY29tcG9uZW50Jyk7XHJcblxyXG5cclxud2luZG93LmdhbWUgPSBuZXcgR2FtZSgpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBnYW1lLnJ1bigpKTsiXSwic291cmNlUm9vdCI6IiJ9