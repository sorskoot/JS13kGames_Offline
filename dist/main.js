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
            var direction = start.rot;
            var target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);

            var laserPoints = [origin];
            var nextTarget = origin;
            var numhops = 0;
            var hitStatus = 0;
            var lastHit = void 0;
            do {
                numhops++;

                var _calculateBeam = this.calculateBeam(nextTarget, direction, lastHit);

                nextTarget = _calculateBeam.nextTarget;
                hitStatus = _calculateBeam.hitStatus;
                lastHit = _calculateBeam.lastHit;


                if (!!nextTarget) {
                    laserPoints.push(nextTarget);
                }

                if (hitStatus == 3) {
                    console.log("You won!");
                    break;
                }
                if (hitStatus == 1) {
                    direction = (direction - 1) % 4;
                }
                if (hitStatus == 2) {
                    direction = (direction + 1) % 4;
                }
            } while (hitStatus != 0 && numhops < 25);

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
        key: "calculateBeam",
        value: function calculateBeam(origin, direction, lastHit) {
            var rayDirection = new BABYLON.Vector3(Math.sin(Math.PI * direction / 2), 0, Math.cos(Math.PI * direction / 2));
            var ray = new BABYLON.Ray(origin, rayDirection, 100);
            // let rayHelper = new BABYLON.RayHelper(ray);
            // rayHelper.show(this.scene);
            var hit = this.scene.pickWithRay(ray, function (mesh) {
                if (mesh.name.startsWith("startLaser") || !mesh.isPickable || mesh.name === lastHit) {
                    return false;
                }
                return true;
            });

            if (hit.pickedMesh && hit.pickedMesh.entity) {
                var ref = hit.pickedMesh.getFacetNormal(hit.faceId);
                var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);
                var hitStatus = hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
                return {
                    nextTarget: hit.pickedMesh.position,
                    hitStatus: hitStatus,
                    lastHit: hit.pickedMesh.name
                };
            }
            return {
                nextTarget: new BABYLON.Vector3(origin.x + Math.sin(Math.PI * direction / 2) * 100, 0.5, origin.z + Math.cos(Math.PI * direction / 2) * 100),
                hitStatus: 0,
                lastHit: undefined
            };
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

                this.scene = scene;
                this.name = name + "_" + this.scene.meshes.length;
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
                                this.scene.render();
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
                        var mirror = new _mirror.Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        mirror.onPicked = function () {
                            _this.laserbeam.drawLaser();
                        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGFzZXJiZWFtIiwic2NlbmUiLCJwdXp6bGUiLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJsYXNlciIsImxhc2VyYmVhbU1lc2giLCJnZXRNZXNoQnlOYW1lIiwicmVtb3ZlTWVzaCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJpc1BpY2thYmxlIiwicmF5RGlyZWN0aW9uIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJtZXNoIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsIm9uUGljayIsIm9uUGlja2VkIiwidmVydGV4RGF0YSIsIlZlcnRleERhdGEiLCJub3JtYWxzIiwiQ29tcHV0ZU5vcm1hbHMiLCJwb3NpdGlvbnMiLCJpbmRpY2VzIiwiYXBwbHlUb01lc2giLCJtYXRlcmlhbCIsImJhY2tGYWNlQ3VsbGluZyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJyZW5kZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJQdXp6bGUiLCJsYXNlcmJlYW0iLCJpIiwiaiIsIlZlY3RvcjQiLCJsaWdodDEiLCJIZW1pc3BoZXJpY0xpZ2h0IiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwic3RhcnRMYXNlciIsImRyYXdMYXNlciIsIm1pcnJvciIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImFjdGl2ZUNhbWVyYSIsImluZXJ0aWEiLCJzcGVlZCIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiY2hlY2tDb2xsaXNpb25zIiwiQ3JlYXRlVGlsZWRHcm91bmQiLCJ4bWluIiwiem1pbiIsInhtYXgiLCJ6bWF4Iiwic3ViZGl2aXNpb25zIiwiZ3JvdW5kbWF0IiwidVNjYWxlIiwidlNjYWxlIiwid3JhcFUiLCJNSVJST1JfQUREUkVTU01PREUiLCJ3cmFwViIsInNwZWN1bGFyQ29sb3IiLCJDb2xvcjMiLCJ3aW5kb3ciLCJybmQiLCJyYW5kb20iLCJtIiwicm90YXRlIiwidiIsImRlZ3JlZXMiLCJjYSIsInNhIiwiT2ZmbGluZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmdpbmUiLCJFbmdpbmUiLCJTY2VuZSIsImdhbWUiLCJjcmVhdGVTY2VuZSIsInJ1blJlbmRlckxvb3AiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbEZh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RVYsYUFBS0MsTUFBTCxHQUFjQyxTQUFTQyxjQUFULENBQXdCLGNBQXhCLENBQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWMsSUFBSWpKLFFBQVFrSixNQUFaLENBQW1CLEtBQUtKLE1BQXhCLEVBQWdDLElBQWhDLENBQWQ7QUFDQSxhQUFLckosS0FBTCxHQUFhLElBQUlPLFFBQVFtSixLQUFaLENBQWtCLEtBQUtGLE1BQXZCLENBQWI7QUFDQTtBQUNBYixlQUFPZ0IsSUFBUCxHQUFjLElBQUk1RCxVQUFKLENBQVMsS0FBSy9GLEtBQWQsQ0FBZDs7QUFFQTJKLGFBQUtDLFdBQUwsQ0FBaUIsS0FBSzVKLEtBQXRCOztBQUVBLGFBQUt3SixNQUFMLENBQVlLLGFBQVosQ0FBMEI7QUFBQSx1QkFBTSxNQUFLN0osS0FBTCxDQUFXd0YsTUFBWCxFQUFOO0FBQUEsU0FBMUI7O0FBRUFtRCxlQUFPbUIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0M7QUFBQSx1QkFBTSxNQUFLTixNQUFMLENBQVlPLE1BQVosRUFBTjtBQUFBLFNBQWxDO0FBQ0gsQzs7QUFJTCxJQUFJWCxPQUFKLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIExhc2VyYmVhbSB7XHJcblxyXG4gICAgLy8gbGFzZXIgZGlyZWN0aW9uIGNvbnN0YW50czpcclxuICAgIC8vIDAgc3RvcCBwcm9ncmVzc2luZ1xyXG4gICAgLy8gMSB0dXJuIGxlZnRcclxuICAgIC8vIDIgdHVybiByaWdodFxyXG4gICAgLy8gMyBoaXR0aW5nIHRhcmdldFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwdXp6bGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBwdXp6bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0xhc2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcblxyXG4gICAgICAgIGxldCBvcmlnaW4gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnN0YXJ0LnBvcyk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHN0YXJ0LnJvdDtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbmV3IEJBQllMT04uVmVjdG9yMyhzdGFydC5wb3NbMF0gKyBNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDAsIDAuNSwgc3RhcnQucG9zWzJdICsgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBsYXNlclBvaW50cyA9IFtvcmlnaW5dO1xyXG4gICAgICAgIGxldCBuZXh0VGFyZ2V0ID0gb3JpZ2luO1xyXG4gICAgICAgIGxldCBudW1ob3BzID0gMDtcclxuICAgICAgICBsZXQgaGl0U3RhdHVzID0gMDtcclxuICAgICAgICBsZXQgbGFzdEhpdDtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG51bWhvcHMrKztcclxuICAgICAgICAgICAgKHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICBoaXRTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBsYXN0SGl0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLmNhbGN1bGF0ZUJlYW0obmV4dFRhcmdldCwgZGlyZWN0aW9uLCBsYXN0SGl0KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISFuZXh0VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKG5leHRUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHdvbiFcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gLSAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gd2hpbGUgKGhpdFN0YXR1cyAhPSAwICYmIG51bWhvcHMgPCAyNSk7XHJcblxyXG4gICAgICAgIGlmIChsYXNlclBvaW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFzZXIpIHtcclxuICAgICAgICAgICAgdmFyIGxhc2VyYmVhbU1lc2ggPSB0aGlzLnNjZW5lLmdldE1lc2hCeU5hbWUoXCJsYXNlcmJlYW1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChsYXNlcmJlYW1NZXNoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlci5pc1BpY2thYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQmVhbShvcmlnaW4sIGRpcmVjdGlvbiwgbGFzdEhpdCkge1xyXG4gICAgICAgIGxldCByYXlEaXJlY3Rpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKE1hdGguc2luKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSwgMCwgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpKTtcclxuICAgICAgICB2YXIgcmF5ID0gbmV3IEJBQllMT04uUmF5KG9yaWdpbiwgcmF5RGlyZWN0aW9uLCAxMDApO1xyXG4gICAgICAgIC8vIGxldCByYXlIZWxwZXIgPSBuZXcgQkFCWUxPTi5SYXlIZWxwZXIocmF5KTtcclxuICAgICAgICAvLyByYXlIZWxwZXIuc2hvdyh0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksIChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtZXNoLm5hbWUuc3RhcnRzV2l0aChcInN0YXJ0TGFzZXJcIikgfHwgIW1lc2guaXNQaWNrYWJsZSB8fCBtZXNoLm5hbWUgPT09IGxhc3RIaXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoICYmIGhpdC5waWNrZWRNZXNoLmVudGl0eSkge1xyXG4gICAgICAgICAgICBsZXQgcmVmID0gaGl0LnBpY2tlZE1lc2guZ2V0RmFjZXROb3JtYWwoaGl0LmZhY2VJZCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hc2luKEJBQllMT04uVmVjdG9yMy5Dcm9zcyhyZWYsIHJheS5kaXJlY3Rpb24pLnkpICogMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBoaXRTdGF0dXMgPSBoaXQucGlja2VkTWVzaC5lbnRpdHkub25IaXRCeUxhc2VyKGhpdC5mYWNlSWQsIGFuZ2xlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQ6IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdDogaGl0LnBpY2tlZE1lc2gubmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0VGFyZ2V0OiBuZXcgQkFCWUxPTi5WZWN0b3IzKG9yaWdpbi54ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwLCAwLjUsIG9yaWdpbi56ICsgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwKSxcclxuICAgICAgICAgICAgaGl0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBsYXN0SGl0OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIG5hbWUgPSBcImVudGl0eVwiLCByb3RhdGlvbiA9IDApIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYCR7bmFtZX1fJHt0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGh9YDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbOCwgMTAsIDExLCAxMSwgOSwgOCwgMTIsIDEzLCAxNSwgMTUsIDE0LCAxMiwgMSwgMywgNywgNywgNSwgMSwgMTcsIDE2LCAxOCwgMTgsIDE5LCAxNywgMiwgMCwgNCwgNCwgNiwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMS4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMubWVzaCA9IG5ldyBCQUJZTE9OLk1lc2godGhpcy5uYW1lLCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInRpbGVzLnBuZ1wiLCB0aGlzLnNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICB0aGlzLm1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLm9uUGlja2VkID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge31cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIHJldHVybiAwOyAvLyBzdG9wXHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRNZXNoKCkge1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBhIHZlcnRleERhdGEgb2JqZWN0XHJcbiAgICAgICAgdmFyIHZlcnRleERhdGEgPSBuZXcgQkFCWUxPTi5WZXJ0ZXhEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAgIC8vQ2FsY3VsYXRpb25zIG9mIG5vcm1hbHMgYWRkZWRcclxuICAgICAgICBCQUJZTE9OLlZlcnRleERhdGEuQ29tcHV0ZU5vcm1hbHModGhpcy52ZXJ0aWNlcywgdGhpcy5mYWNlcywgdGhpcy5ub3JtYWxzKTtcclxuXHJcbiAgICAgICAgLy9Bc3NpZ24gcG9zaXRpb25zIGFuZCBpbmRpY2VzIHRvIHZlcnRleERhdGFcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHRoaXMudmVydGljZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5pbmRpY2VzID0gdGhpcy5mYWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcbiAgICAgICAgdmVydGV4RGF0YS51dnMgPSB0aGlzLnV2cztcclxuXHJcbiAgICAgICAgLy9BcHBseSB2ZXJ0ZXhEYXRhIHRvIGN1c3RvbSBtZXNoXHJcbiAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaCh0aGlzLm1lc2gpO1xyXG4gICAgICAgIHRoaXMubWVzaC5tYXRlcmlhbCA9IHRoaXMubWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5tYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1lc2gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCh0aGlzKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMsIHRoaXMubWVzaCkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoLmVudGl0eSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2g7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhc2VyIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQsIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0ID8gXCJzdGFydExhc2VyXCIgOiBcImVuZExhc2VyXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gISFpc1N0YXJ0O1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzAsIDIsIDMsIDMsIDEsIDAsIDQsIDUsIDcsIDcsIDYsIDQsIDE2LCAxNywgMTksIDE5LCAxOCwgMTYsIDEzLCAxMiwgMTQsIDE0LCAxNSwgMTMsIDksIDgsIDEwLCAxMCwgMTEsIDldO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwgMC43NSwgMC4yNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDEuMCwgMC4yNSwgMC43NSwgMC41LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjc1LCAxLjAsIDAuNSwgMC43NSwgMC43NSwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjAsIDAuNzUsIDAuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pcnJvciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCByb3RhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgXCJtaXJyb3JcIiwgcm90YXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbNiwgOCwgOSwgOSwgNywgNiwgNCwgMSwgMywgMywgNSwgNCwgMTEsIDEwLCAxMiwgMiwgMCwgNCwgNCwgNSwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4wLCAwLjc1LCAwLjI1LCAwLjUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMCwgMC41LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC4yNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuNSwgMC4wLCAwLjc1LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjVdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IE1hdGguUEkgKiB0aGlzLnJvdGF0aW9uIC8gMjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKGZhY2VJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMCwwLjI1LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVcclxufSBmcm9tIFwiLi9wdXp6bGVcIjtcclxuaW1wb3J0IHtcclxuICAgIFdhbGxcclxufSBmcm9tIFwiLi9lbnRpdGllcy93YWxsXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNaXJyb3JcclxufSBmcm9tIFwiLi9lbnRpdGllcy9taXJyb3JcIjtcclxuaW1wb3J0IHtcclxuICAgIExhc2VyXHJcbn0gZnJvbSBcIi4vZW50aXRpZXMvbGFzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEdyb3VuZFxyXG59IGZyb20gXCIuL2dyb3VuZFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJiZWFtXHJcbn0gZnJvbSBcIi4vTGFzZXJiZWFtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5tYXBzID0gdGhpcy5pbml0TWFwcygpO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gbmV3IFB1enpsZSgpLnB1enpsZTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbSA9IG5ldyBMYXNlcmJlYW0odGhpcy5zY2VuZSwgdGhpcy5wdXp6bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgIGxldCBtYXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoc2NlbmUpIHtcclxuICAgICAgICB2YXIgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDYsIDksIDMpO1xyXG5cclxuICAgICBcclxuICAgICAgICAvL1RpbGVzOlxyXG4gICAgICAgIC8vIDA6IEdyb3VuZFxyXG4gICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIC8vIDM6IExhc2VyXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICAvLyA1OlxyXG4gICAgICAgIC8vIDY6XHJcbiAgICAgICAgLy8gNzpcclxuICAgICAgICAvLyA4OlxyXG4gICAgICAgIC8vIDk6XHJcbiAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgLy8gMTI6XHJcbiAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgLy8gMTU6XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIgPSBzY2VuZS5jcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0TGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0cnVlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGFzZXIub25QaWNrZWQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IExhc2VyKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgZmFsc2UsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3IgPSBuZXcgTWlycm9yKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBtaXJyb3Iub25QaWNrZWQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXYWxsKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtOS44MSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlSW50ZXJhY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogZ3JvdW5kLm5hbWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5hcHBseUdyYXZpdHkgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIHNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR3JvdW5ke1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwVSA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHV6emxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgfVxyXG59XHJcbiAgICAiLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7XHJcblxyXG53aW5kb3cucm90YXRlID0gKHYsIGRlZ3JlZXMpID0+IHtcclxuICAgIHZhciBjYSA9IE1hdGguY29zKGRlZ3JlZXMpO1xyXG4gICAgdmFyIHNhID0gTWF0aC5zaW4oZGVncmVlcyk7XHJcbiAgICByZXR1cm4gbmV3IEJBQllMT04uVmVjdG9yMyhjYSAqIHYueCAtIHNhICogdi56LCAwLCAtc2EgKiB2LnggKyBjYSAqIHYueik7XHJcbn0iLCJpbXBvcnQgJy4vZ2xvYmFsJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2NsYXNzZXMvZ2FtZVwiO1xyXG5cclxuY2xhc3MgT2ZmbGluZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcbiAgICAgICAgLy90aGlzLnNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gbmV3IEdhbWUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIGdhbWUuY3JlYXRlU2NlbmUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm5ldyBPZmZsaW5lKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==