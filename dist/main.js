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
                if (_direction == 0) {
                    target = hit.pickedMesh.position;
                } else {
                    var currentPosition = hit.pickedMesh.position;
                    var currentRotation = void 0;
                    if (_direction == 1) {
                        currentRotation = (start.rot - 1) % 4;
                    }
                    if (_direction == 2) {
                        currentRotation = (start.rot + 1) % 4;
                    }

                    var direction2 = new BABYLON.Vector3(Math.sin(Math.PI * currentRotation / 2), 0, Math.cos(Math.PI * currentRotation / 2));

                    var ray2 = new BABYLON.Ray(currentPosition, direction2, length);

                    // let rayHelper2 = new BABYLON.RayHelper(ray2);
                    // rayHelper2.show(this.scene);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGFzZXJiZWFtIiwic2NlbmUiLCJwdXp6bGUiLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwiTWF0aCIsInNpbiIsIlBJIiwicm90IiwiY29zIiwibGVuZ3RoIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJwcmVkaWNhdGUiLCJ0YXJnZXQiLCJsYXNlclBvaW50cyIsInBpY2tlZE1lc2giLCJlbnRpdHkiLCJyZWYiLCJnZXRGYWNldE5vcm1hbCIsImZhY2VJZCIsImFuZ2xlIiwicm91bmQiLCJhc2luIiwiQ3Jvc3MiLCJ5Iiwib25IaXRCeUxhc2VyIiwicHVzaCIsInBvc2l0aW9uIiwiY3VycmVudFBvc2l0aW9uIiwiY3VycmVudFJvdGF0aW9uIiwiZGlyZWN0aW9uMiIsInJheTIiLCJ0YXJnZXQyIiwieCIsInoiLCJsYXNlciIsImxhc2VyYmVhbU1lc2giLCJnZXRNZXNoQnlOYW1lIiwicmVtb3ZlTWVzaCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJpc1BpY2thYmxlIiwibWVzaCIsIm5hbWUiLCJFbnRpdHkiLCJyb3RhdGlvbiIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsIm9uUGljayIsIm9uUGlja2VkIiwidmVydGV4RGF0YSIsIlZlcnRleERhdGEiLCJub3JtYWxzIiwiQ29tcHV0ZU5vcm1hbHMiLCJwb3NpdGlvbnMiLCJpbmRpY2VzIiwiYXBwbHlUb01lc2giLCJtYXRlcmlhbCIsImJhY2tGYWNlQ3VsbGluZyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJyZW5kZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJQdXp6bGUiLCJsYXNlcmJlYW0iLCJpIiwiaiIsIlZlY3RvcjQiLCJsaWdodDEiLCJIZW1pc3BoZXJpY0xpZ2h0IiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwic3RhcnRMYXNlciIsImRyYXdMYXNlciIsIm1pcnJvciIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImFjdGl2ZUNhbWVyYSIsImluZXJ0aWEiLCJzcGVlZCIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiY2hlY2tDb2xsaXNpb25zIiwiQ3JlYXRlVGlsZWRHcm91bmQiLCJ4bWluIiwiem1pbiIsInhtYXgiLCJ6bWF4Iiwic3ViZGl2aXNpb25zIiwiZ3JvdW5kbWF0IiwidVNjYWxlIiwidlNjYWxlIiwid3JhcFUiLCJNSVJST1JfQUREUkVTU01PREUiLCJ3cmFwViIsInNwZWN1bGFyQ29sb3IiLCJDb2xvcjMiLCJ3aW5kb3ciLCJybmQiLCJyYW5kb20iLCJtIiwicm90YXRlIiwidiIsImRlZ3JlZXMiLCJjYSIsInNhIiwiT2ZmbGluZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmdpbmUiLCJFbmdpbmUiLCJTY2VuZSIsImdhbWUiLCJjcmVhdGVTY2VuZSIsInJ1blJlbmRlckxvb3AiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDbEZhQSxTLFdBQUFBLFM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFB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YixlQUFPZ0IsSUFBUCxHQUFjLElBQUk1RCxVQUFKLENBQVMsS0FBSzFGLEtBQWQsQ0FBZDs7QUFFQXNKLGFBQUtDLFdBQUwsQ0FBaUIsS0FBS3ZKLEtBQXRCOztBQUVBLGFBQUttSixNQUFMLENBQVlLLGFBQVosQ0FBMEI7QUFBQSx1QkFBTSxNQUFLeEosS0FBTCxDQUFXbUYsTUFBWCxFQUFOO0FBQUEsU0FBMUI7O0FBRUFtRCxlQUFPbUIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0M7QUFBQSx1QkFBTSxNQUFLTixNQUFMLENBQVlPLE1BQVosRUFBTjtBQUFBLFNBQWxDO0FBQ0gsQzs7QUFJTCxJQUFJWCxPQUFKLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIExhc2VyYmVhbSB7XHJcblxyXG4gICAgLy8gbGFzZXIgZGlyZWN0aW9uIGNvbnN0YW50czpcclxuICAgIC8vIDAgc3RvcCBwcm9ncmVzc2luZ1xyXG4gICAgLy8gMSB0dXJuIGxlZnRcclxuICAgIC8vIDIgdHVybiByaWdodFxyXG4gICAgLy8gMyBoaXR0aW5nIHRhcmdldFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwdXp6bGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBwdXp6bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0xhc2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcblxyXG4gICAgICAgIGxldCBvcmlnaW4gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnN0YXJ0LnBvcyk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoTWF0aC5zaW4oTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpLCAwLCBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSAxMDA7XHJcblxyXG4gICAgICAgIHZhciByYXkgPSBuZXcgQkFCWUxPTi5SYXkob3JpZ2luLCBkaXJlY3Rpb24sIGxlbmd0aCk7XHJcbiAgICAgICAgLy8gbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIC8vIHJheUhlbHBlci5zaG93KHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciBoaXQgPSB0aGlzLnNjZW5lLnBpY2tXaXRoUmF5KHJheSwgdGhpcy5wcmVkaWNhdGUpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbmV3IEJBQllMT04uVmVjdG9yMyhzdGFydC5wb3NbMF0gKyBNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDAsIDAuNSwgc3RhcnQucG9zWzJdICsgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwKTtcclxuICAgICAgICB2YXIgbGFzZXJQb2ludHMgPSBbb3JpZ2luXTtcclxuXHJcbiAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoICYmIGhpdC5waWNrZWRNZXNoLmVudGl0eSkge1xyXG4gICAgICAgICAgICBsZXQgcmVmID0gaGl0LnBpY2tlZE1lc2guZ2V0RmFjZXROb3JtYWwoaGl0LmZhY2VJZCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hc2luKEJBQllMT04uVmVjdG9yMy5Dcm9zcyhyZWYsIHJheS5kaXJlY3Rpb24pLnkpICogMTgwIC8gTWF0aC5QSSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9uID0gaGl0LnBpY2tlZE1lc2guZW50aXR5Lm9uSGl0QnlMYXNlcihoaXQuZmFjZUlkLCBhbmdsZSk7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2goaGl0LnBpY2tlZE1lc2gucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3RhdGlvbiA9IChzdGFydC5yb3QgLSAxKSAlIDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um90YXRpb24gPSAoc3RhcnQucm90ICsgMSkgJSA0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkaXJlY3Rpb24yID1cclxuICAgICAgICAgICAgICAgICAgICBuZXcgQkFCWUxPTi5WZWN0b3IzKE1hdGguc2luKE1hdGguUEkgKiBjdXJyZW50Um90YXRpb24gLyAyKSwgMCwgTWF0aC5jb3MoTWF0aC5QSSAqIGN1cnJlbnRSb3RhdGlvbiAvIDIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmF5MiA9IG5ldyBCQUJZTE9OLlJheShjdXJyZW50UG9zaXRpb24sIGRpcmVjdGlvbjIsIGxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbGV0IHJheUhlbHBlcjIgPSBuZXcgQkFCWUxPTi5SYXlIZWxwZXIocmF5Mik7XHJcbiAgICAgICAgICAgICAgICAvLyByYXlIZWxwZXIyLnNob3codGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldDIgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKGN1cnJlbnRQb3NpdGlvbi54ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGN1cnJlbnRSb3RhdGlvbiAvIDIpICogMTAwLCAwLjUsIGN1cnJlbnRQb3NpdGlvbi56ICsgTWF0aC5jb3MoTWF0aC5QSSAqIGN1cnJlbnRSb3RhdGlvbiAvIDIpICogMTAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKHRhcmdldDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChsYXNlclBvaW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFzZXIpIHtcclxuICAgICAgICAgICAgdmFyIGxhc2VyYmVhbU1lc2ggPSB0aGlzLnNjZW5lLmdldE1lc2hCeU5hbWUoXCJsYXNlcmJlYW1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChsYXNlcmJlYW1NZXNoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlci5pc1BpY2thYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlZGljYXRlKG1lc2gpIHtcclxuICAgICAgICBpZiAobWVzaC5uYW1lID09IFwic3RhcnRMYXNlclwiIHx8ICFtZXNoLmlzUGlja2FibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgbmFtZSA9IFwiZW50aXR5XCIsIHJvdGF0aW9uID0gMCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbOCwgMTAsIDExLCAxMSwgOSwgOCwgMTIsIDEzLCAxNSwgMTUsIDE0LCAxMiwgMSwgMywgNywgNywgNSwgMSwgMTcsIDE2LCAxOCwgMTgsIDE5LCAxNywgMiwgMCwgNCwgNCwgNiwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMS4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMubWVzaCA9IG5ldyBCQUJZTE9OLk1lc2godGhpcy5uYW1lLCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInRpbGVzLnBuZ1wiLCB0aGlzLnNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICB0aGlzLm1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLm9uUGlja2VkID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge31cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIHJldHVybiAwOyAvLyBzdG9wXHJcbiAgICB9XHJcblxyXG4gICAgYnVpbGRNZXNoKCkge1xyXG5cclxuICAgICAgICAvL0NyZWF0ZSBhIHZlcnRleERhdGEgb2JqZWN0XHJcbiAgICAgICAgdmFyIHZlcnRleERhdGEgPSBuZXcgQkFCWUxPTi5WZXJ0ZXhEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAgIC8vQ2FsY3VsYXRpb25zIG9mIG5vcm1hbHMgYWRkZWRcclxuICAgICAgICBCQUJZTE9OLlZlcnRleERhdGEuQ29tcHV0ZU5vcm1hbHModGhpcy52ZXJ0aWNlcywgdGhpcy5mYWNlcywgdGhpcy5ub3JtYWxzKTtcclxuXHJcbiAgICAgICAgLy9Bc3NpZ24gcG9zaXRpb25zIGFuZCBpbmRpY2VzIHRvIHZlcnRleERhdGFcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnBvc2l0aW9ucyA9IHRoaXMudmVydGljZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5pbmRpY2VzID0gdGhpcy5mYWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSB0aGlzLm5vcm1hbHM7XHJcbiAgICAgICAgdmVydGV4RGF0YS51dnMgPSB0aGlzLnV2cztcclxuXHJcbiAgICAgICAgLy9BcHBseSB2ZXJ0ZXhEYXRhIHRvIGN1c3RvbSBtZXNoXHJcbiAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaCh0aGlzLm1lc2gpO1xyXG4gICAgICAgIHRoaXMubWVzaC5tYXRlcmlhbCA9IHRoaXMubWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5tYXRlcmlhbC5iYWNrRmFjZUN1bGxpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1lc2gucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnRoaXMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCh0aGlzKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMsIHRoaXMubWVzaCkpKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoLmVudGl0eSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2g7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhc2VyIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQsIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0ID8gXCJzdGFydExhc2VyXCIgOiBcImVuZExhc2VyXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gISFpc1N0YXJ0O1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzAsIDIsIDMsIDMsIDEsIDAsIDQsIDUsIDcsIDcsIDYsIDQsIDE2LCAxNywgMTksIDE5LCAxOCwgMTYsIDEzLCAxMiwgMTQsIDE0LCAxNSwgMTMsIDksIDgsIDEwLCAxMCwgMTEsIDldO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwgMC43NSwgMC4yNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDEuMCwgMC4yNSwgMC43NSwgMC41LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjc1LCAxLjAsIDAuNSwgMC43NSwgMC43NSwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjAsIDAuNzUsIDAuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pcnJvciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCByb3RhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgXCJtaXJyb3JcIiwgcm90YXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbNiwgOCwgOSwgOSwgNywgNiwgNCwgMSwgMywgMywgNSwgNCwgMTEsIDEwLCAxMiwgMiwgMCwgNCwgNCwgNSwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4wLCAwLjc1LCAwLjI1LCAwLjUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMCwgMC41LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC4yNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuNSwgMC4wLCAwLjc1LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjVdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IE1hdGguUEkgKiB0aGlzLnJvdGF0aW9uIC8gMjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKGZhY2VJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMCwwLjI1LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVcclxufSBmcm9tIFwiLi9wdXp6bGVcIjtcclxuaW1wb3J0IHtcclxuICAgIFdhbGxcclxufSBmcm9tIFwiLi9lbnRpdGllcy93YWxsXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNaXJyb3JcclxufSBmcm9tIFwiLi9lbnRpdGllcy9taXJyb3JcIjtcclxuaW1wb3J0IHtcclxuICAgIExhc2VyXHJcbn0gZnJvbSBcIi4vZW50aXRpZXMvbGFzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEdyb3VuZFxyXG59IGZyb20gXCIuL2dyb3VuZFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJiZWFtXHJcbn0gZnJvbSBcIi4vTGFzZXJiZWFtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5tYXBzID0gdGhpcy5pbml0TWFwcygpO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gbmV3IFB1enpsZSgpLnB1enpsZTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbSA9IG5ldyBMYXNlcmJlYW0odGhpcy5zY2VuZSwgdGhpcy5wdXp6bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgIGxldCBtYXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoc2NlbmUpIHtcclxuICAgICAgICB2YXIgbGlnaHQxID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDApLCBzY2VuZSk7XHJcblxyXG4gICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDYsIDksIDMpO1xyXG5cclxuICAgICBcclxuICAgICAgICAvL1RpbGVzOlxyXG4gICAgICAgIC8vIDA6IEdyb3VuZFxyXG4gICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIC8vIDM6IExhc2VyXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICAvLyA1OlxyXG4gICAgICAgIC8vIDY6XHJcbiAgICAgICAgLy8gNzpcclxuICAgICAgICAvLyA4OlxyXG4gICAgICAgIC8vIDk6XHJcbiAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgLy8gMTI6XHJcbiAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgLy8gMTU6XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIgPSBzY2VuZS5jcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0TGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0cnVlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGFzZXIub25QaWNrZWQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IExhc2VyKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgZmFsc2UsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3IgPSBuZXcgTWlycm9yKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBtaXJyb3Iub25QaWNrZWQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhbGwnOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBXYWxsKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtOS44MSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlSW50ZXJhY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogZ3JvdW5kLm5hbWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5hcHBseUdyYXZpdHkgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIHNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR3JvdW5ke1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwVSA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHV6emxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgfVxyXG59XHJcbiAgICAiLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7XHJcblxyXG53aW5kb3cucm90YXRlID0gKHYsIGRlZ3JlZXMpID0+IHtcclxuICAgIHZhciBjYSA9IE1hdGguY29zKGRlZ3JlZXMpO1xyXG4gICAgdmFyIHNhID0gTWF0aC5zaW4oZGVncmVlcyk7XHJcbiAgICByZXR1cm4gbmV3IEJBQllMT04uVmVjdG9yMyhjYSAqIHYueCAtIHNhICogdi56LCAwLCAtc2EgKiB2LnggKyBjYSAqIHYueik7XHJcbn0iLCJpbXBvcnQgJy4vZ2xvYmFsJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2NsYXNzZXMvZ2FtZVwiO1xyXG5cclxuY2xhc3MgT2ZmbGluZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcbiAgICAgICAgLy90aGlzLnNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gbmV3IEdhbWUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIGdhbWUuY3JlYXRlU2NlbmUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm5ldyBPZmZsaW5lKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==