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

/***/ "./src/classes/Laserbeam.js":
/*!**********************************!*\
  !*** ./src/classes/Laserbeam.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Laserbeam = exports.Laserbeam = function () {

    // laser direction constants:
    // 0 stop progressing
    // 1 turn left
    // 2 turn right
    // 3 hitting target

    function Laserbeam(scene, puzzle) {
        _classCallCheck(this, Laserbeam);

        this.scene = scene;
        this.puzzle = puzzle;
    }

    _createClass(Laserbeam, [{
        key: "drawLaser",
        value: function drawLaser() {
            var start = this.puzzle.find(function (b) {
                return b.type === "start";
            });

            var origin = new (Function.prototype.bind.apply(BABYLON.Vector3, [null].concat(_toConsumableArray(start.pos))))();
            var direction = new BABYLON.Vector3(Math.sin(Math.PI * start.rot / 2), 0, Math.cos(Math.PI * start.rot / 2));
            var length = 100;

            var ray = new BABYLON.Ray(origin, direction, length);
            // let rayHelper = new BABYLON.RayHelper(ray);
            // rayHelper.show(this.scene);
            var hit = this.scene.pickWithRay(ray, this.predicate);

            var target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);
            var laserPoints = [origin];

            if (hit.pickedMesh && hit.pickedMesh.entity) {
                var ref = hit.pickedMesh.getFacetNormal(hit.faceId);
                var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);

                var _direction = hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
                laserPoints.push(hit.pickedMesh.position);
                if (_direction == 1) {
                    var currentPosition = hit.pickedMesh.position;
                    var currentRotation = (start.rot - 1) % 4;

                    var direction2 = new BABYLON.Vector3(Math.sin(Math.PI * currentRotation / 2), 0, Math.cos(Math.PI * currentRotation / 2));

                    var ray2 = new BABYLON.Ray(currentPosition, direction2, length);

                    var rayHelper2 = new BABYLON.RayHelper(ray2);
                    rayHelper2.show(this.scene);

                    var target2 = new BABYLON.Vector3(currentPosition.x + Math.sin(Math.PI * currentRotation / 2) * 100, 0.5, currentPosition.z + Math.cos(Math.PI * currentRotation / 2) * 100);

                    laserPoints.push(target2);
                }
            }

            if (laserPoints.length == 1) {
                laserPoints.push(target);
            }

            if (this.laser) {
                var laserbeamMesh = this.scene.getMeshByName("laserbeam");
                this.scene.removeMesh(laserbeamMesh);
            }
            this.laser = BABYLON.MeshBuilder.CreateTube("laserbeam", {
                path: laserPoints,
                radius: .15
            }, this.scene);

            this.laser.isPickable = false;
        }
    }, {
        key: "predicate",
        value: function predicate(mesh) {
            if (mesh.name == "startLaser" || !mesh.isPickable) {
                return false;
            }
            return true;
        }
    }]);

    return Laserbeam;
}();

/***/ }),

/***/ "./src/classes/entities/entity.js":
/*!****************************************!*\
  !*** ./src/classes/entities/entity.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = exports.Entity = function () {
        function Entity(scene, position) {
                var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "entity";
                var rotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

                _classCallCheck(this, Entity);

                this.name = name;
                this.scene = scene;
                this.position = position;
                this.rotation = rotation;

                this.vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5];
                this.faces = [8, 10, 11, 11, 9, 8, 12, 13, 15, 15, 14, 12, 1, 3, 7, 7, 5, 1, 17, 16, 18, 18, 19, 17, 2, 0, 4, 4, 6, 2];
                this.uvs = [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0];

                this.mesh = new BABYLON.Mesh(this.name, this.scene);

                this.mat = new BABYLON.StandardMaterial("mat", this.scene);
                var texture = new BABYLON.Texture("tiles.png", this.scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
                this.mat.diffuseTexture = texture;
                this.onPick = function () {};
                this.onPicked = function () {};
        }

        _createClass(Entity, [{
                key: "render",
                value: function render() {}
        }, {
                key: "onHitByLaser",
                value: function onHitByLaser(faceId, angle) {
                        return 0; // stop
                }
        }, {
                key: "buildMesh",
                value: function buildMesh() {

                        //Create a vertexData object
                        var vertexData = new BABYLON.VertexData();
                        this.normals = [];

                        //Calculations of normals added
                        BABYLON.VertexData.ComputeNormals(this.vertices, this.faces, this.normals);

                        //Assign positions and indices to vertexData
                        vertexData.positions = this.vertices;
                        vertexData.indices = this.faces;
                        vertexData.normals = this.normals;
                        vertexData.uvs = this.uvs;

                        //Apply vertexData to custom mesh
                        vertexData.applyToMesh(this.mesh);
                        this.mesh.material = this.mat;
                        this.mesh.material.backFaceCulling = false;
                        this.mesh.position = new (Function.prototype.bind.apply(BABYLON.Vector3, [null].concat(_toConsumableArray(this.position))))();

                        this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
                        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                                this.onPick(this);
                                this.onPicked(this);
                        }.bind(this, this.mesh)));

                        this.mesh.entity = this;

                        return this.mesh;
                }
        }]);

        return Entity;
}();

/***/ }),

/***/ "./src/classes/entities/laser.js":
/*!***************************************!*\
  !*** ./src/classes/entities/laser.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.Laser = undefined;

var _entity = __webpack_require__(/*! ./entity */ "./src/classes/entities/entity.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Laser = exports.Laser = function (_Entity) {
        _inherits(Laser, _Entity);

        function Laser(scene, position, isStart, rotation) {
                _classCallCheck(this, Laser);

                var _this = _possibleConstructorReturn(this, (Laser.__proto__ || Object.getPrototypeOf(Laser)).call(this, scene, position, isStart ? "startLaser" : "endLaser", rotation));

                _this.isStart = !!isStart;

                _this.vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5];
                _this.faces = [0, 2, 3, 3, 1, 0, 4, 5, 7, 7, 6, 4, 16, 17, 19, 19, 18, 16, 13, 12, 14, 14, 15, 13, 9, 8, 10, 10, 11, 9];
                _this.uvs = [0.5, 0.75, 0.25, 0.75, 0.5, 1.0, 0.25, 1.0, 0.25, 0.75, 0.5, 0.75, 0.25, 1.0, 0.5, 1.0, 0.5, 0.75, 0.5, 1.0, 0.25, 0.75, 0.25, 1.0, 0.5, 1.0, 0.75, 1.0, 0.5, 0.75, 0.75, 0.75, 0.25, 0.75, 0.25, 1.0, 0.0, 0.75, 0.0, 1.0];

                _this.buildMesh();

                _this.onPick = function () {
                        return _this.mesh.rotation.y = _this.mesh.rotation.y + Math.PI / 2;
                };
                return _this;
        }

        return Laser;
}(_entity.Entity);

/***/ }),

/***/ "./src/classes/entities/mirror.js":
/*!****************************************!*\
  !*** ./src/classes/entities/mirror.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mirror = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(/*! ./entity */ "./src/classes/entities/entity.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mirror = exports.Mirror = function (_Entity) {
    _inherits(Mirror, _Entity);

    function Mirror(scene, position, rotation) {
        _classCallCheck(this, Mirror);

        var _this = _possibleConstructorReturn(this, (Mirror.__proto__ || Object.getPrototypeOf(Mirror)).call(this, scene, position, "mirror", rotation));

        _this.vertices = [-0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5];
        _this.faces = [6, 8, 9, 9, 7, 6, 4, 1, 3, 3, 5, 4, 11, 10, 12, 2, 0, 4, 4, 5, 2];
        _this.uvs = [0.0, 0.75, 0.25, 0.5, 0.25, 0.75, 0.25, 0.75, 0.0, 0.5, 0.25, 0.5, 0.5, 0.25, 0.25, 0.25, 0.5, 0.5, 0.25, 0.5, 0.0, 0.75, 0.25, 0.75, 0.25, 0.5];

        _this.buildMesh();

        _this.onPick = function () {
            _this.rotation = (_this.rotation + 1) % 4;
            _this.mesh.rotation.y = Math.PI * _this.rotation / 2;
        };
        return _this;
    }

    _createClass(Mirror, [{
        key: "onHitByLaser",
        value: function onHitByLaser(faceId, angle) {
            if (faceId == 1) {
                this.mesh.getFacetNormal(faceId);
                if (angle > 0) return 1; // left
                if (angle < 0) return 2; // right
            } else {
                return 0; //stop
            }
        }
    }]);

    return Mirror;
}(_entity.Entity);

/***/ }),

/***/ "./src/classes/entities/wall.js":
/*!**************************************!*\
  !*** ./src/classes/entities/wall.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Wall = undefined;

var _entity = __webpack_require__(/*! ./entity */ "./src/classes/entities/entity.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wall = exports.Wall = function (_Entity) {
    _inherits(Wall, _Entity);

    function Wall(scene, position) {
        _classCallCheck(this, Wall);

        var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, scene, position, "wall"));

        _this.uvs = [0.25, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.5, 0.0, 0.25, 0.0, 0.25, 0.0, 0.5, 0.0, 0.5, 0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5, 0.0, 0.25, 0.25, 0.25, 0.0, 0.5, 0.25, 0.5, 0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5];

        _this.buildMesh();
        return _this;
    }

    return Wall;
}(_entity.Entity);

/***/ }),

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
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puzzle = __webpack_require__(/*! ./puzzle */ "./src/classes/puzzle.js");

var _wall = __webpack_require__(/*! ./entities/wall */ "./src/classes/entities/wall.js");

var _mirror = __webpack_require__(/*! ./entities/mirror */ "./src/classes/entities/mirror.js");

var _laser = __webpack_require__(/*! ./entities/laser */ "./src/classes/entities/laser.js");

var _ground = __webpack_require__(/*! ./ground */ "./src/classes/ground.js");

var _Laserbeam = __webpack_require__(/*! ./Laserbeam */ "./src/classes/Laserbeam.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game(scene) {
        _classCallCheck(this, Game);

        this.scene = scene;
        this.maps = this.initMaps();
        this.puzzle = new _puzzle.Puzzle().puzzle;
        this.laserbeam = new _Laserbeam.Laserbeam(this.scene, this.puzzle);
    }

    _createClass(Game, [{
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
        value: function createScene(scene) {
            var _this = this;

            var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);

            var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-2, -3, 1), scene);
            light.position = new BABYLON.Vector3(6, 9, 3);

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

            for (var i = 0; i < this.puzzle.length; i++) {
                switch (this.puzzle[i].type) {
                    case 'start':
                        var startLaser = new _laser.Laser(this.scene, this.puzzle[i].pos, true, this.puzzle[i].rot);
                        startLaser.onPicked = function () {
                            var start = _this.puzzle.find(function (b) {
                                return b.type === "start";
                            });
                            start.rot = (start.rot + 1) % 4;
                            _this.laserbeam.drawLaser();
                        };
                        break;
                    case 'end':
                        new _laser.Laser(this.scene, this.puzzle[i].pos, false, this.puzzle[i].rot);
                        break;
                    case 'mirror':
                        new _mirror.Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        break;
                    case 'wall':
                        new _wall.Wall(this.scene, this.puzzle[i].pos);
                        break;
                }
            }

            var ground = new _ground.Ground(this.scene);

            scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

            this.vrHelper.enableInteractions();
            this.vrHelper.enableTeleportation({
                floorMeshName: ground.name
            });

            scene.activeCamera.inertia = 0.6;
            scene.activeCamera.speed = 0.5;
            scene.activeCamera.applyGravity = true;
            scene.activeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;

            this.laserbeam.drawLaser();
        }
    }]);

    return Game;
}();

/***/ }),

/***/ "./src/classes/ground.js":
/*!*******************************!*\
  !*** ./src/classes/ground.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ground = exports.Ground = function Ground(scene) {
    _classCallCheck(this, Ground);

    this.scene = scene;

    this.mesh = new BABYLON.MeshBuilder.CreateTiledGround("Tiled Ground", {
        xmin: -10,
        zmin: -10,
        xmax: 10,
        zmax: 10,
        subdivisions: {
            'h': 20,
            'w': 20
        }
    }, this.scene);

    var texture = new BABYLON.Texture("tiles.png", this.scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
    var groundmat = new BABYLON.StandardMaterial("groundmat", this.scene);
    groundmat.diffuseTexture = texture;
    groundmat.diffuseTexture.uScale = 0.249;
    groundmat.diffuseTexture.vScale = 0.249;
    groundmat.diffuseTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
    groundmat.diffuseTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
    groundmat.specularColor = new BABYLON.Color3(0, 0, 0);
    this.mesh.material = groundmat;
    this.mesh.checkCollisions = true;
};

/***/ }),

/***/ "./src/classes/puzzle.js":
/*!*******************************!*\
  !*** ./src/classes/puzzle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Puzzle = exports.Puzzle = function Puzzle() {
    _classCallCheck(this, Puzzle);

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
};

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

window.rotate = function (v, degrees) {
    var ca = Math.cos(degrees);
    var sa = Math.sin(degrees);
    return new BABYLON.Vector3(ca * v.x - sa * v.z, 0, -sa * v.x + ca * v.z);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offline = function Offline() {
        var _this = this;

        _classCallCheck(this, Offline);

        this.canvas = document.getElementById("renderCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        //this.scene.debugLayer.show();
        window.game = new _game.Game(this.scene);

        game.createScene(this.scene);

        this.engine.runRenderLoop(function () {
                return _this.scene.render();
        });

        window.addEventListener("resize", function () {
                return _this.engine.resize();
        });
};

new Offline();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGFzZXJiZWFtIiwic2NlbmUiLCJwdXp6bGUiLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwiTWF0aCIsInNpbiIsIlBJIiwicm90IiwiY29zIiwibGVuZ3RoIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJwcmVkaWNhdGUiLCJ0YXJnZXQiLCJsYXNlclBvaW50cyIsInBpY2tlZE1lc2giLCJlbnRpdHkiLCJyZWYiLCJnZXRGYWNldE5vcm1hbCIsImZhY2VJZCIsImFuZ2xlIiwicm91bmQiLCJhc2luIiwiQ3Jvc3MiLCJ5Iiwib25IaXRCeUxhc2VyIiwicHVzaCIsInBvc2l0aW9uIiwiY3VycmVudFBvc2l0aW9uIiwiY3VycmVudFJvdGF0aW9uIiwiZGlyZWN0aW9uMiIsInJheTIiLCJyYXlIZWxwZXIyIiwiUmF5SGVscGVyIiwic2hvdyIsInRhcmdldDIiLCJ4IiwieiIsImxhc2VyIiwibGFzZXJiZWFtTWVzaCIsImdldE1lc2hCeU5hbWUiLCJyZW1vdmVNZXNoIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUdWJlIiwicGF0aCIsInJhZGl1cyIsImlzUGlja2FibGUiLCJtZXNoIiwibmFtZSIsIkVudGl0eSIsInJvdGF0aW9uIiwidmVydGljZXMiLCJmYWNlcyIsInV2cyIsIk1lc2giLCJtYXQiLCJTdGFuZGFyZE1hdGVyaWFsIiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsIm1hdGVyaWFsIiwiYmFja0ZhY2VDdWxsaW5nIiwiYWN0aW9uTWFuYWdlciIsIkFjdGlvbk1hbmFnZXIiLCJyZWdpc3RlckFjdGlvbiIsIkV4ZWN1dGVDb2RlQWN0aW9uIiwiT25QaWNrVHJpZ2dlciIsImJpbmQiLCJMYXNlciIsImlzU3RhcnQiLCJidWlsZE1lc2giLCJNaXJyb3IiLCJXYWxsIiwiR2FtZSIsIm1hcHMiLCJpbml0TWFwcyIsIlB1enpsZSIsImxhc2VyYmVhbSIsImkiLCJqIiwiVmVjdG9yNCIsImxpZ2h0MSIsIkhlbWlzcGhlcmljTGlnaHQiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ2ckhlbHBlciIsImNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UiLCJzdGFydExhc2VyIiwiZHJhd0xhc2VyIiwiZ3JvdW5kIiwiR3JvdW5kIiwiZ3Jhdml0eSIsImVuYWJsZUludGVyYWN0aW9ucyIsImVuYWJsZVRlbGVwb3J0YXRpb24iLCJmbG9vck1lc2hOYW1lIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwiY29sbGlzaW9uc0VuYWJsZWQiLCJjaGVja0NvbGxpc2lvbnMiLCJDcmVhdGVUaWxlZEdyb3VuZCIsInhtaW4iLCJ6bWluIiwieG1heCIsInptYXgiLCJzdWJkaXZpc2lvbnMiLCJncm91bmRtYXQiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwic3BlY3VsYXJDb2xvciIsIkNvbG9yMyIsIndpbmRvdyIsInJuZCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsInJlbmRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsRmFBLFMsV0FBQUEsUzs7QUFFVDtBQUNBO0FB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LFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS1AsTUFBTCxDQUFZUSxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVosT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdMYXNlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5zdGFydC5wb3MpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSwgMCwgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpKTtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gMTAwO1xyXG5cclxuICAgICAgICB2YXIgcmF5ID0gbmV3IEJBQllMT04uUmF5KG9yaWdpbiwgZGlyZWN0aW9uLCBsZW5ndGgpO1xyXG4gICAgICAgIC8vIGxldCByYXlIZWxwZXIgPSBuZXcgQkFCWUxPTi5SYXlIZWxwZXIocmF5KTtcclxuICAgICAgICAvLyByYXlIZWxwZXIuc2hvdyh0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksIHRoaXMucHJlZGljYXRlKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoc3RhcnQucG9zWzBdICsgTWF0aC5zaW4oTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwLCAwLjUsIHN0YXJ0LnBvc1syXSArIE1hdGguY29zKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCk7XHJcbiAgICAgICAgdmFyIGxhc2VyUG9pbnRzID0gW29yaWdpbl07XHJcblxyXG4gICAgICAgIGlmIChoaXQucGlja2VkTWVzaCAmJiBoaXQucGlja2VkTWVzaC5lbnRpdHkpIHtcclxuICAgICAgICAgICAgbGV0IHJlZiA9IGhpdC5waWNrZWRNZXNoLmdldEZhY2V0Tm9ybWFsKGhpdC5mYWNlSWQpO1xyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXNpbihCQUJZTE9OLlZlY3RvcjMuQ3Jvc3MocmVmLCByYXkuZGlyZWN0aW9uKS55KSAqIDE4MCAvIE1hdGguUEkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpcmVjdGlvbiA9IGhpdC5waWNrZWRNZXNoLmVudGl0eS5vbkhpdEJ5TGFzZXIoaGl0LmZhY2VJZCwgYW5nbGUpO1xyXG4gICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gaGl0LnBpY2tlZE1lc2gucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFJvdGF0aW9uID0gKHN0YXJ0LnJvdCAtIDEpICUgNDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGlyZWN0aW9uMiA9XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogY3VycmVudFJvdGF0aW9uIC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBjdXJyZW50Um90YXRpb24gLyAyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHJheTIgPSBuZXcgQkFCWUxPTi5SYXkoY3VycmVudFBvc2l0aW9uLCBkaXJlY3Rpb24yLCBsZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByYXlIZWxwZXIyID0gbmV3IEJBQllMT04uUmF5SGVscGVyKHJheTIpO1xyXG4gICAgICAgICAgICAgICAgcmF5SGVscGVyMi5zaG93KHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQyID0gbmV3IEJBQllMT04uVmVjdG9yMyhjdXJyZW50UG9zaXRpb24ueCArIE1hdGguc2luKE1hdGguUEkgKiBjdXJyZW50Um90YXRpb24gLyAyKSAqIDEwMCwgMC41LCBjdXJyZW50UG9zaXRpb24ueiArIE1hdGguY29zKE1hdGguUEkgKiBjdXJyZW50Um90YXRpb24gLyAyKSAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGFzZXJQb2ludHMucHVzaCh0YXJnZXQyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxhc2VyUG9pbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB2YXIgbGFzZXJiZWFtTWVzaCA9IHRoaXMuc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImxhc2VyYmVhbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKGxhc2VyYmVhbU1lc2gpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXNlciA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVHViZShcImxhc2VyYmVhbVwiLCB7XHJcbiAgICAgICAgICAgIHBhdGg6IGxhc2VyUG9pbnRzLFxyXG4gICAgICAgICAgICByYWRpdXM6IC4xNVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmxhc2VyLmlzUGlja2FibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVkaWNhdGUobWVzaCkge1xyXG4gICAgICAgIGlmIChtZXNoLm5hbWUgPT0gXCJzdGFydExhc2VyXCIgfHwgIW1lc2guaXNQaWNrYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBuYW1lID0gXCJlbnRpdHlcIiwgcm90YXRpb24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs4LCAxMCwgMTEsIDExLCA5LCA4LCAxMiwgMTMsIDE1LCAxNSwgMTQsIDEyLCAxLCAzLCA3LCA3LCA1LCAxLCAxNywgMTYsIDE4LCAxOCwgMTksIDE3LCAyLCAwLCA0LCA0LCA2LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFsxLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaCh0aGlzLm5hbWUsIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLm1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHRoaXMubWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMub25QaWNrZWQgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7fVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7IC8vIHN0b3BcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1lc2goKSB7XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICB2YXIgdmVydGV4RGF0YSA9IG5ldyBCQUJZTE9OLlZlcnRleERhdGEoKTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGlvbnMgb2Ygbm9ybWFscyBhZGRlZFxyXG4gICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyh0aGlzLnZlcnRpY2VzLCB0aGlzLmZhY2VzLCB0aGlzLm5vcm1hbHMpO1xyXG5cclxuICAgICAgICAvL0Fzc2lnbiBwb3NpdGlvbnMgYW5kIGluZGljZXMgdG8gdmVydGV4RGF0YVxyXG4gICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy52ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLmZhY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IHRoaXMubm9ybWFscztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnV2cyA9IHRoaXMudXZzO1xyXG5cclxuICAgICAgICAvL0FwcGx5IHZlcnRleERhdGEgdG8gY3VzdG9tIG1lc2hcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmFwcGx5VG9NZXNoKHRoaXMubWVzaCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gdGhpcy5tYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4udGhpcy5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyID0gbmV3IEJBQllMT04uQWN0aW9uTWFuYWdlcih0aGlzLnNjZW5lKTtcclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKGZ1bmN0aW9uIChtZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKHRoaXMpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcywgdGhpcy5tZXNoKSkpO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2guZW50aXR5ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaDtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFzZXIgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQgPyBcInN0YXJ0TGFzZXJcIiA6IFwiZW5kTGFzZXJcIiwgcm90YXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmlzU3RhcnQgPSAhIWlzU3RhcnQ7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbMCwgMiwgMywgMywgMSwgMCwgNCwgNSwgNywgNywgNiwgNCwgMTYsIDE3LCAxOSwgMTksIDE4LCAxNiwgMTMsIDEyLCAxNCwgMTQsIDE1LCAxMywgOSwgOCwgMTAsIDEwLCAxMSwgOV07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC41LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjUsIDAuNzUsIDAuMjUsIDEuMCwgMC41LCAxLjAsIDAuNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC41LCAxLjAsIDAuNzUsIDEuMCwgMC41LCAwLjc1LCAwLjc1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuMCwgMC43NSwgMC4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHRoaXMubWVzaC5yb3RhdGlvbi55ID0gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKyBNYXRoLlBJIC8gMjtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBcIm1pcnJvclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs2LCA4LCA5LCA5LCA3LCA2LCA0LCAxLCAzLCAzLCA1LCA0LCAxMSwgMTAsIDEyLCAyLCAwLCA0LCA0LCA1LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjAsIDAuNzUsIDAuMjUsIDAuNSwgMC4yNSwgMC43NSwgMC4yNSwgMC43NSwgMC4wLCAwLjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjI1LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC41LCAwLjAsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNV07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5yb3RhdGlvbi55ID0gTWF0aC5QSSAqIHRoaXMucm90YXRpb24gLyAyO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoZmFjZUlkID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLmdldEZhY2V0Tm9ybWFsKGZhY2VJZCk7XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA+IDApIHJldHVybiAxOyAvLyBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IDApIHJldHVybiAyOyAvLyByaWdodFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvL3N0b3BcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGwgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLHBvc2l0aW9uLFwid2FsbFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjI1LDAuMjUsIDAuMjUsMC4yNSwgMC4yNSwwLjUsIDAuMjUsMC41LCAwLjAsMC4yNSwgMC4wLDAuMjUsIDAuMCwwLjUsIDAuMCwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjAsMC4yNSwgMC4yNSwwLjI1LCAwLjAsMC41LCAwLjI1LDAuNSwgMC4yNSwwLjI1LCAwLjAsMC4yNSwgMC4yNSwwLjUsIDAuMCwwLjVdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIFB1enpsZVxyXG59IGZyb20gXCIuL3B1enpsZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBuZXcgUHV6emxlKCkucHV6emxlO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtID0gbmV3IExhc2VyYmVhbSh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcHMoKSB7XHJcbiAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwcztcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTY2VuZShzY2VuZSkge1xyXG4gICAgICAgIHZhciBsaWdodDEgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwibGlnaHQxXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcblxyXG4gICAgIFxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydC5yb3QgPSAoc3RhcnQucm90ICsgMSkgJSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCBmYWxzZSwgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pcnJvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2FsbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ3JvdW5kID0gbmV3IEdyb3VuZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTkuODEsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IGdyb3VuZC5uYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5pbmVydGlhID0gMC42O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5zcGVlZCA9IDAuNTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIH1cclxufVxyXG4gICAgIiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pO1xyXG5cclxud2luZG93LnJvdGF0ZSA9ICh2LCBkZWdyZWVzKSA9PiB7XHJcbiAgICB2YXIgY2EgPSBNYXRoLmNvcyhkZWdyZWVzKTtcclxuICAgIHZhciBzYSA9IE1hdGguc2luKGRlZ3JlZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBCQUJZTE9OLlZlY3RvcjMoY2EgKiB2LnggLSBzYSAqIHYueiwgMCwgLXNhICogdi54ICsgY2EgKiB2LnopO1xyXG59IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbmNsYXNzIE9mZmxpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUodGhpcy5lbmdpbmUpO1xyXG4gICAgICAgIC8vdGhpcy5zY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBnYW1lLmNyZWF0ZVNjZW5lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHRoaXMuc2NlbmUucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5uZXcgT2ZmbGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=