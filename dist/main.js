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
            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(this.scene);
            var hit = this.scene.pickWithRay(ray, this.predicate);

            var target = new BABYLON.Vector3(start.pos[0] + Math.sin(Math.PI * start.rot / 2) * 100, 0.5, start.pos[2] + Math.cos(Math.PI * start.rot / 2) * 100);

            if (hit.pickedMesh && hit.pickedMesh.entity) {
                var ref = hit.pickedMesh.getFacetNormal(hit.faceId);
                var angle = Math.round(Math.asin(BABYLON.Vector3.Cross(ref, ray.direction).y) * 180 / Math.PI);

                hit.pickedMesh.entity.onHitByLaser(hit.faceId, angle);
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
                value: function onHitByLaser(faceId, angle) {}
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
                if (angle > 0) console.log("Laser hit mirror, laser turns left");
                if (angle < 0) console.log("Laser hit mirror, laser turns right");
            } else {
                console.log("Laser bounce");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGFzZXJiZWFtIiwic2NlbmUiLCJwdXp6bGUiLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwiTWF0aCIsInNpbiIsIlBJIiwicm90IiwiY29zIiwibGVuZ3RoIiwicmF5IiwiUmF5IiwicmF5SGVscGVyIiwiUmF5SGVscGVyIiwic2hvdyIsImhpdCIsInBpY2tXaXRoUmF5IiwicHJlZGljYXRlIiwidGFyZ2V0IiwicGlja2VkTWVzaCIsImVudGl0eSIsInJlZiIsImdldEZhY2V0Tm9ybWFsIiwiZmFjZUlkIiwiYW5nbGUiLCJyb3VuZCIsImFzaW4iLCJDcm9zcyIsInkiLCJvbkhpdEJ5TGFzZXIiLCJwb3NpdGlvbiIsIm15UG9pbnRzIiwibGFzZXIiLCJNZXNoQnVpbGRlciIsIkNyZWF0ZVR1YmUiLCJwYXRoIiwicmFkaXVzIiwiaW5zdGFuY2UiLCJ1cGRhdGFibGUiLCJpc1BpY2thYmxlIiwibWVzaCIsIm5hbWUiLCJFbnRpdHkiLCJyb3RhdGlvbiIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsIm9uUGljayIsIm9uUGlja2VkIiwidmVydGV4RGF0YSIsIlZlcnRleERhdGEiLCJub3JtYWxzIiwiQ29tcHV0ZU5vcm1hbHMiLCJwb3NpdGlvbnMiLCJpbmRpY2VzIiwiYXBwbHlUb01lc2giLCJtYXRlcmlhbCIsImJhY2tGYWNlQ3VsbGluZyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiY29uc29sZSIsImxvZyIsIldhbGwiLCJHYW1lIiwibWFwcyIsImluaXRNYXBzIiwiUHV6emxlIiwibGFzZXJiZWFtIiwiaSIsImoiLCJwdXNoIiwiVmVjdG9yNCIsImxpZ2h0MSIsIkhlbWlzcGhlcmljTGlnaHQiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJ2ckhlbHBlciIsImNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UiLCJzdGFydExhc2VyIiwiZHJhd0xhc2VyIiwiZ3JvdW5kIiwiR3JvdW5kIiwiZ3Jhdml0eSIsImVuYWJsZUludGVyYWN0aW9ucyIsImVuYWJsZVRlbGVwb3J0YXRpb24iLCJmbG9vck1lc2hOYW1lIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwiY29sbGlzaW9uc0VuYWJsZWQiLCJjaGVja0NvbGxpc2lvbnMiLCJDcmVhdGVUaWxlZEdyb3VuZCIsInhtaW4iLCJ6bWluIiwieG1heCIsInptYXgiLCJzdWJkaXZpc2lvbnMiLCJncm91bmRtYXQiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwic3BlY3VsYXJDb2xvciIsIkNvbG9yMyIsIndpbmRvdyIsInJuZCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJ4IiwieiIsIk9mZmxpbmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiRW5naW5lIiwiU2NlbmUiLCJnYW1lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwicmVuZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2xGYUEsUyxXQUFBQSxTO0FBRVQsdUJBQVlDLEtBQVosRUFBbUJDLE1BQW5CLEVBQTJCO0FBQUE7O0FBQ3ZCLGFBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtDLE1BQUwsR0FB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ZUFBT3NCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS1AsTUFBTCxDQUFZUSxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVosT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwdXp6bGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBwdXp6bGU7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0xhc2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcblxyXG4gICAgICAgIGxldCBvcmlnaW4gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnN0YXJ0LnBvcyk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoTWF0aC5zaW4oTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpLCAwLCBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikpO1xyXG4gICAgICAgIGxldCBsZW5ndGggPSAxMDA7XHJcblxyXG4gICAgICAgIHZhciByYXkgPSBuZXcgQkFCWUxPTi5SYXkob3JpZ2luLCBkaXJlY3Rpb24sIGxlbmd0aCk7XHJcbiAgICAgICAgbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIHJheUhlbHBlci5zaG93KHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciBoaXQgPSB0aGlzLnNjZW5lLnBpY2tXaXRoUmF5KHJheSwgdGhpcy5wcmVkaWNhdGUpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbmV3IEJBQllMT04uVmVjdG9yMyhzdGFydC5wb3NbMF0gKyBNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDAsIDAuNSwgc3RhcnQucG9zWzJdICsgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwKVxyXG5cclxuICAgICAgICBpZiAoaGl0LnBpY2tlZE1lc2ggJiYgaGl0LnBpY2tlZE1lc2guZW50aXR5KSB7XHJcbiAgICAgICAgICAgIGxldCByZWYgPSBoaXQucGlja2VkTWVzaC5nZXRGYWNldE5vcm1hbChoaXQuZmFjZUlkKTtcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmFzaW4oQkFCWUxPTi5WZWN0b3IzLkNyb3NzKHJlZiwgcmF5LmRpcmVjdGlvbikueSkgKiAxODAgLyBNYXRoLlBJKTtcclxuXHJcbiAgICAgICAgICAgIGhpdC5waWNrZWRNZXNoLmVudGl0eS5vbkhpdEJ5TGFzZXIoaGl0LmZhY2VJZCwgYW5nbGUpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBoaXQucGlja2VkTWVzaC5wb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBteVBvaW50cyA9IFtcclxuICAgICAgICAgICAgb3JpZ2luLFxyXG4gICAgICAgICAgICB0YXJnZXRcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB0aGlzLmxhc2VyID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUdWJlKFwibGluZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgcGF0aDogbXlQb2ludHMsXHJcbiAgICAgICAgICAgICAgICByYWRpdXM6IC4xNSxcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiB0aGlzLmxhc2VyXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsaW5lc1wiLCB7XHJcbiAgICAgICAgICAgICAgICBwYXRoOiBteVBvaW50cyxcclxuICAgICAgICAgICAgICAgIHVwZGF0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHJhZGl1czogLjE1XHJcbiAgICAgICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc2VyLmlzUGlja2FibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVkaWNhdGUobWVzaCkge1xyXG4gICAgICAgIGlmIChtZXNoLm5hbWUgPT0gXCJzdGFydExhc2VyXCIgfHwgIW1lc2guaXNQaWNrYWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBuYW1lID0gXCJlbnRpdHlcIiwgcm90YXRpb24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs4LCAxMCwgMTEsIDExLCA5LCA4LCAxMiwgMTMsIDE1LCAxNSwgMTQsIDEyLCAxLCAzLCA3LCA3LCA1LCAxLCAxNywgMTYsIDE4LCAxOCwgMTksIDE3LCAyLCAwLCA0LCA0LCA2LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFsxLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaCh0aGlzLm5hbWUsIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLm1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHRoaXMubWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMub25QaWNrZWQgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7fVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWVzaCgpIHtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMudmVydGljZXMsIHRoaXMuZmFjZXMsIHRoaXMubm9ybWFscyk7XHJcblxyXG4gICAgICAgIC8vQXNzaWduIHBvc2l0aW9ucyBhbmQgaW5kaWNlcyB0byB2ZXJ0ZXhEYXRhXHJcbiAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuZmFjZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG4gICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy51dnM7XHJcblxyXG4gICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2godGhpcy5tZXNoKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSB0aGlzLm1hdDtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi50aGlzLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzLCB0aGlzLm1lc2gpKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5lbnRpdHkgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXNlciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0LCByb3RhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCA/IFwic3RhcnRMYXNlclwiIDogXCJlbmRMYXNlclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9ICEhaXNTdGFydDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFswLCAyLCAzLCAzLCAxLCAwLCA0LCA1LCA3LCA3LCA2LCA0LCAxNiwgMTcsIDE5LCAxOSwgMTgsIDE2LCAxMywgMTIsIDE0LCAxNCwgMTUsIDEzLCA5LCA4LCAxMCwgMTAsIDExLCA5XTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAxLjAsIDAuMjUsIDAuNzUsIDAuNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC41LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC43NSwgMS4wLCAwLjUsIDAuNzUsIDAuNzUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC4wLCAwLjc1LCAwLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4gdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLm1lc2gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXJyb3IgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIFwibWlycm9yXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzYsIDgsIDksIDksIDcsIDYsIDQsIDEsIDMsIDMsIDUsIDQsIDExLCAxMCwgMTIsIDIsIDAsIDQsIDQsIDUsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMCwgMC43NSwgMC4yNSwgMC41LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjAsIDAuNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuMjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjUsIDAuMCwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMC41XTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSBNYXRoLlBJICogdGhpcy5yb3RhdGlvbiAvIDI7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKGZhY2VJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSBjb25zb2xlLmxvZyhgTGFzZXIgaGl0IG1pcnJvciwgbGFzZXIgdHVybnMgbGVmdGApO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSBjb25zb2xlLmxvZyhgTGFzZXIgaGl0IG1pcnJvciwgbGFzZXIgdHVybnMgcmlnaHRgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxhc2VyIGJvdW5jZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGwgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLHBvc2l0aW9uLFwid2FsbFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjI1LDAuMjUsIDAuMjUsMC4yNSwgMC4yNSwwLjUsIDAuMjUsMC41LCAwLjAsMC4yNSwgMC4wLDAuMjUsIDAuMCwwLjUsIDAuMCwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjAsMC4yNSwgMC4yNSwwLjI1LCAwLjAsMC41LCAwLjI1LDAuNSwgMC4yNSwwLjI1LCAwLjAsMC4yNSwgMC4yNSwwLjUsIDAuMCwwLjVdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIFB1enpsZVxyXG59IGZyb20gXCIuL3B1enpsZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBuZXcgUHV6emxlKCkucHV6emxlO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtID0gbmV3IExhc2VyYmVhbSh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcHMoKSB7XHJcbiAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwcztcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTY2VuZShzY2VuZSkge1xyXG4gICAgICAgIHZhciBsaWdodDEgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwibGlnaHQxXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcblxyXG4gICAgIFxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydC5yb3QgPSAoc3RhcnQucm90ICsgMSkgJSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCBmYWxzZSwgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pcnJvcic6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2FsbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZ3JvdW5kID0gbmV3IEdyb3VuZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTkuODEsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IGdyb3VuZC5uYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5pbmVydGlhID0gMC42O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5zcGVlZCA9IDAuNTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIH1cclxufVxyXG4gICAgIiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pO1xyXG5cclxud2luZG93LnJvdGF0ZSA9ICh2LCBkZWdyZWVzKSA9PiB7XHJcbiAgICB2YXIgY2EgPSBNYXRoLmNvcyhkZWdyZWVzKTtcclxuICAgIHZhciBzYSA9IE1hdGguc2luKGRlZ3JlZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBCQUJZTE9OLlZlY3RvcjMoY2EgKiB2LnggLSBzYSAqIHYueiwgMCwgLXNhICogdi54ICsgY2EgKiB2LnopO1xyXG59IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbmNsYXNzIE9mZmxpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUodGhpcy5lbmdpbmUpO1xyXG4gICAgICAgIC8vdGhpcy5zY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBnYW1lLmNyZWF0ZVNjZW5lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHRoaXMuc2NlbmUucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5uZXcgT2ZmbGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=