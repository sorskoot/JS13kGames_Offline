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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {

    var canvas = document.getElementById("renderCanvas"); // Get the canvas element 

    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    /******* Add the create scene function ******/
    var createScene = function createScene() {

        // Create the scene space
        var scene = new BABYLON.Scene(engine);

        // Add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Add lights to the scene
        var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

        // Add and manipulate meshes in the scene
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: 2
        }, scene);

        return scene;
    };

    /******* End of the create scene function ******/

    var scene = createScene(); //Call the createScene function

    engine.runRenderLoop(function () {
        // Register a render loop to repeatedly render the scene
        scene.render();
    });

    window.addEventListener("resize", function () {
        // Watch for browser/canvas resize events
        engine.resize();
    });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmdpbmUiLCJCQUJZTE9OIiwiRW5naW5lIiwiY3JlYXRlU2NlbmUiLCJzY2VuZSIsIlNjZW5lIiwiY2FtZXJhIiwiQXJjUm90YXRlQ2FtZXJhIiwiTWF0aCIsIlBJIiwiVmVjdG9yMyIsIlplcm8iLCJhdHRhY2hDb250cm9sIiwibGlnaHQxIiwiSGVtaXNwaGVyaWNMaWdodCIsImxpZ2h0MiIsIlBvaW50TGlnaHQiLCJzcGhlcmUiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVNwaGVyZSIsImRpYW1ldGVyIiwicnVuUmVuZGVyTG9vcCIsInJlbmRlciIsIndpbmRvdyIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBQSxTQUFTQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsVUFBVUMsS0FBVixFQUFpQjs7QUFFM0QsUUFBSUMsU0FBU0gsU0FBU0ksY0FBVCxDQUF3QixjQUF4QixDQUFiLENBRjJELENBRUw7O0FBRXRELFFBQUlDLFNBQVMsSUFBSUMsUUFBUUMsTUFBWixDQUFtQkosTUFBbkIsRUFBMkIsSUFBM0IsQ0FBYixDQUoyRCxDQUlaOztBQUUvQztBQUNBLFFBQUlLLGNBQWMsU0FBZEEsV0FBYyxHQUFZOztBQUUxQjtBQUNBLFlBQUlDLFFBQVEsSUFBSUgsUUFBUUksS0FBWixDQUFrQkwsTUFBbEIsQ0FBWjs7QUFFQTtBQUNBLFlBQUlNLFNBQVMsSUFBSUwsUUFBUU0sZUFBWixDQUE0QixRQUE1QixFQUFzQ0MsS0FBS0MsRUFBTCxHQUFVLENBQWhELEVBQW1ERCxLQUFLQyxFQUFMLEdBQVUsQ0FBN0QsRUFBZ0UsQ0FBaEUsRUFBbUVSLFFBQVFTLE9BQVIsQ0FBZ0JDLElBQWhCLEVBQW5FLEVBQTJGUCxLQUEzRixDQUFiO0FBQ0FFLGVBQU9NLGFBQVAsQ0FBcUJkLE1BQXJCLEVBQTZCLElBQTdCOztBQUVBO0FBQ0EsWUFBSWUsU0FBUyxJQUFJWixRQUFRYSxnQkFBWixDQUE2QixRQUE3QixFQUF1QyxJQUFJYixRQUFRUyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQXZCLEVBQTBCLENBQTFCLENBQXZDLEVBQXFFTixLQUFyRSxDQUFiO0FBQ0EsWUFBSVcsU0FBUyxJQUFJZCxRQUFRZSxVQUFaLENBQXVCLFFBQXZCLEVBQWlDLElBQUlmLFFBQVFTLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBQyxDQUEzQixDQUFqQyxFQUFnRU4sS0FBaEUsQ0FBYjs7QUFHQTtBQUNBLFlBQUlhLFNBQVNoQixRQUFRaUIsV0FBUixDQUFvQkMsWUFBcEIsQ0FBaUMsUUFBakMsRUFBMkM7QUFDcERDLHNCQUFVO0FBRDBDLFNBQTNDLEVBRVZoQixLQUZVLENBQWI7O0FBSUEsZUFBT0EsS0FBUDtBQUNILEtBcEJEOztBQXNCQTs7QUFFQSxRQUFJQSxRQUFRRCxhQUFaLENBL0IyRCxDQStCaEM7O0FBRTNCSCxXQUFPcUIsYUFBUCxDQUFxQixZQUFZO0FBQUU7QUFDL0JqQixjQUFNa0IsTUFBTjtBQUNILEtBRkQ7O0FBS0FDLFdBQU8zQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFZO0FBQUU7QUFDNUNJLGVBQU93QixNQUFQO0FBQ0gsS0FGRDtBQUdILENBekNELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpOyAvLyBHZXQgdGhlIGNhbnZhcyBlbGVtZW50IFxyXG5cclxuICAgIHZhciBlbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUoY2FudmFzLCB0cnVlKTsgLy8gR2VuZXJhdGUgdGhlIEJBQllMT04gM0QgZW5naW5lXHJcblxyXG4gICAgLyoqKioqKiogQWRkIHRoZSBjcmVhdGUgc2NlbmUgZnVuY3Rpb24gKioqKioqL1xyXG4gICAgdmFyIGNyZWF0ZVNjZW5lID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNjZW5lIHNwYWNlXHJcbiAgICAgICAgdmFyIHNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUoZW5naW5lKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGEgY2FtZXJhIHRvIHRoZSBzY2VuZSBhbmQgYXR0YWNoIGl0IHRvIHRoZSBjYW52YXNcclxuICAgICAgICB2YXIgY2FtZXJhID0gbmV3IEJBQllMT04uQXJjUm90YXRlQ2FtZXJhKFwiQ2FtZXJhXCIsIE1hdGguUEkgLyAyLCBNYXRoLlBJIC8gMiwgMiwgQkFCWUxPTi5WZWN0b3IzLlplcm8oKSwgc2NlbmUpO1xyXG4gICAgICAgIGNhbWVyYS5hdHRhY2hDb250cm9sKGNhbnZhcywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBsaWdodHMgdG8gdGhlIHNjZW5lXHJcbiAgICAgICAgdmFyIGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgIHZhciBsaWdodDIgPSBuZXcgQkFCWUxPTi5Qb2ludExpZ2h0KFwibGlnaHQyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgLTEpLCBzY2VuZSk7XHJcblxyXG5cclxuICAgICAgICAvLyBBZGQgYW5kIG1hbmlwdWxhdGUgbWVzaGVzIGluIHRoZSBzY2VuZVxyXG4gICAgICAgIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVNwaGVyZShcInNwaGVyZVwiLCB7XHJcbiAgICAgICAgICAgIGRpYW1ldGVyOiAyXHJcbiAgICAgICAgfSwgc2NlbmUpO1xyXG5cclxuICAgICAgICByZXR1cm4gc2NlbmU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKioqKioqIEVuZCBvZiB0aGUgY3JlYXRlIHNjZW5lIGZ1bmN0aW9uICoqKioqKi9cclxuXHJcbiAgICB2YXIgc2NlbmUgPSBjcmVhdGVTY2VuZSgpOyAvL0NhbGwgdGhlIGNyZWF0ZVNjZW5lIGZ1bmN0aW9uXHJcblxyXG4gICAgZW5naW5lLnJ1blJlbmRlckxvb3AoZnVuY3Rpb24gKCkgeyAvLyBSZWdpc3RlciBhIHJlbmRlciBsb29wIHRvIHJlcGVhdGVkbHkgcmVuZGVyIHRoZSBzY2VuZVxyXG4gICAgICAgIHNjZW5lLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGZ1bmN0aW9uICgpIHsgLy8gV2F0Y2ggZm9yIGJyb3dzZXIvY2FudmFzIHJlc2l6ZSBldmVudHNcclxuICAgICAgICBlbmdpbmUucmVzaXplKCk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==