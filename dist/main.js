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
var Game = __webpack_require__(/*! ./game.component */ "./src/game.component.js");

var game = new Game();
document.addEventListener("DOMContentLoaded", function () {
  return game.run();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiQkFCWUxPTiIsIkVuZ2luZSIsInNjZW5lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwicmVuZGVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSIsIlNjZW5lIiwiY2FtZXJhIiwiQXJjUm90YXRlQ2FtZXJhIiwiTWF0aCIsIlBJIiwiVmVjdG9yMyIsIlplcm8iLCJhdHRhY2hDb250cm9sIiwibGlnaHQxIiwiSGVtaXNwaGVyaWNMaWdodCIsImxpZ2h0MiIsIlBvaW50TGlnaHQiLCJzcGhlcmUiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVNwaGVyZSIsImRpYW1ldGVyIiwicm5kIiwicmFuZG9tIiwibSIsInJlcXVpcmUiLCJHYW1lIiwiZ2FtZSIsInJ1biJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVA7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHNDQUVVO0FBQUE7O0FBQ0YsNkJBQUtDLE1BQUwsR0FBY0MsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFkLENBREUsQ0FDcUQ7QUFDdkQsNkJBQUtDLE1BQUwsR0FBYyxJQUFJQyxRQUFRQyxNQUFaLENBQW1CLEtBQUtMLE1BQXhCLEVBQWdDLElBQWhDLENBQWQsQ0FGRSxDQUVtRDtBQUNyRCw2QkFBS00sS0FBTCxHQUFhLEtBQUtDLFdBQUwsRUFBYjs7QUFFQSw2QkFBS0osTUFBTCxDQUFZSyxhQUFaLENBQTBCO0FBQUEsdUNBQU0sTUFBS0YsS0FBTCxDQUFXRyxNQUFYLEVBQU47QUFBQSx5QkFBMUI7O0FBRUFDLCtCQUFPQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQztBQUFBLHVDQUFNLE1BQUtSLE1BQUwsQ0FBWVMsTUFBWixFQUFOO0FBQUEseUJBQWxDO0FBQ0g7QUFWTDtBQUFBO0FBQUEsOENBWWtCOztBQUVWO0FBQ0EsNEJBQUlOLFFBQVEsSUFBSUYsUUFBUVMsS0FBWixDQUFrQixLQUFLVixNQUF2QixDQUFaOztBQUVBO0FBQ0EsNEJBQUlXLFNBQVMsSUFBSVYsUUFBUVcsZUFBWixDQUE0QixRQUE1QixFQUFzQ0MsS0FBS0MsRUFBTCxHQUFVLENBQWhELEVBQW1ERCxLQUFLQyxFQUFMLEdBQVUsQ0FBN0QsRUFBZ0UsQ0FBaEUsRUFBbUViLFFBQVFjLE9BQVIsQ0FBZ0JDLElBQWhCLEVBQW5FLEVBQTJGYixLQUEzRixDQUFiO0FBQ0FRLCtCQUFPTSxhQUFQLENBQXFCLEtBQUtwQixNQUExQixFQUFrQyxJQUFsQzs7QUFFQTtBQUNBLDRCQUFJcUIsU0FBUyxJQUFJakIsUUFBUWtCLGdCQUFaLENBQTZCLFFBQTdCLEVBQXVDLElBQUlsQixRQUFRYyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQXZDLEVBQXFFWixLQUFyRSxDQUFiO0FBQ0EsNEJBQUlpQixTQUFTLElBQUluQixRQUFRb0IsVUFBWixDQUF1QixRQUF2QixFQUFpQyxJQUFJcEIsUUFBUWMsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUFDLENBQTNCLENBQWpDLEVBQWdFWixLQUFoRSxDQUFiOztBQUdBO0FBQ0EsNEJBQUltQixTQUFTckIsUUFBUXNCLFdBQVIsQ0FBb0JDLFlBQXBCLENBQWlDLFFBQWpDLEVBQTJDO0FBQ3BEQywwQ0FBVTtBQUQwQyx5QkFBM0MsRUFFVnRCLEtBRlUsQ0FBYjs7QUFJQSwrQkFBT0EsS0FBUDtBQUNIO0FBaENMOztBQUFBO0FBQUEsSTs7Ozs7Ozs7Ozs7Ozs7QUNGQUksT0FBT21CLEdBQVAsR0FBYTtBQUFBLFNBQUssQ0FBQyxFQUFFYixLQUFLYyxNQUFMLEtBQWdCQyxDQUFsQixDQUFOO0FBQUEsQ0FBYixDOzs7Ozs7Ozs7Ozs7OztBQ0FBLG1CQUFBQyxDQUFRLGlDQUFSO0FBQ0EsSUFBSUMsT0FBTyxtQkFBQUQsQ0FBUSxpREFBUixDQUFYOztBQUdBLElBQUlFLE9BQU8sSUFBSUQsSUFBSixFQUFYO0FBQ0FoQyxTQUFTVSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEM7QUFBQSxTQUFNdUIsS0FBS0MsR0FBTCxFQUFOO0FBQUEsQ0FBOUMsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEdhbWUge1xyXG5cclxuICAgIHJ1bigpIHtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpOyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50IFxyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTsgLy8gR2VuZXJhdGUgdGhlIEJBQllMT04gM0QgZW5naW5lXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHRoaXMuY3JlYXRlU2NlbmUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuICAgICBcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgc2NlbmUgc3BhY2VcclxuICAgICAgICB2YXIgc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBhIGNhbWVyYSB0byB0aGUgc2NlbmUgYW5kIGF0dGFjaCBpdCB0byB0aGUgY2FudmFzXHJcbiAgICAgICAgdmFyIGNhbWVyYSA9IG5ldyBCQUJZTE9OLkFyY1JvdGF0ZUNhbWVyYShcIkNhbWVyYVwiLCBNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDIsIDIsIEJBQllMT04uVmVjdG9yMy5aZXJvKCksIHNjZW5lKTtcclxuICAgICAgICBjYW1lcmEuYXR0YWNoQ29udHJvbCh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaWdodHMgdG8gdGhlIHNjZW5lXHJcbiAgICAgICAgdmFyIGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgIHZhciBsaWdodDIgPSBuZXcgQkFCWUxPTi5Qb2ludExpZ2h0KFwibGlnaHQyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgLTEpLCBzY2VuZSk7XHJcblxyXG5cclxuICAgICAgICAvLyBBZGQgYW5kIG1hbmlwdWxhdGUgbWVzaGVzIGluIHRoZSBzY2VuZVxyXG4gICAgICAgIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVNwaGVyZShcInNwaGVyZVwiLCB7XHJcbiAgICAgICAgICAgIGRpYW1ldGVyOiAyXHJcbiAgICAgICAgfSwgc2NlbmUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9O1xyXG59OyIsIndpbmRvdy5ybmQgPSBtID0+IH5+KE1hdGgucmFuZG9tKCkgKiBtKTsiLCJyZXF1aXJlKCcuL2dsb2JhbCcpO1xyXG5sZXQgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5jb21wb25lbnQnKTtcclxuXHJcblxyXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGdhbWUucnVuKCkpOyJdLCJzb3VyY2VSb290IjoiIn0=