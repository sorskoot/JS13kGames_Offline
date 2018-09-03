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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(Laser, [{
        key: "onHitByLaser",
        value: function onHitByLaser(faceId, angle) {
            if ((faceId === 5 || faceId === 4) && !this.isStart) {
                return 3; // winner;
            } else {
                return 0; //stop
            }
        }
    }]);

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
                        var endlaser = new _laser.Laser(this.scene, this.puzzle[i].pos, false, this.puzzle[i].rot);
                        endlaser.onPicked = function () {
                            _this.laserbeam.drawLaser();
                        };
                        break;
                    case 'mirror':
                        var mirror = new _mirror.Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        mirror.onPicked = function () {
                            _this.laserbeam.drawLaser();
                        };
                        break;
                    case 'wall':
                        new _wall.Wall(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiTGFzZXJiZWFtIiwic2NlbmUiLCJwdXp6bGUiLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiLCJsYXNlciIsImxhc2VyYmVhbU1lc2giLCJnZXRNZXNoQnlOYW1lIiwicmVtb3ZlTWVzaCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJpc1BpY2thYmxlIiwicmF5RGlyZWN0aW9uIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJtZXNoIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsIm9uUGljayIsIm9uUGlja2VkIiwidmVydGV4RGF0YSIsIlZlcnRleERhdGEiLCJub3JtYWxzIiwiQ29tcHV0ZU5vcm1hbHMiLCJwb3NpdGlvbnMiLCJpbmRpY2VzIiwiYXBwbHlUb01lc2giLCJtYXRlcmlhbCIsImJhY2tGYWNlQ3VsbGluZyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJyZW5kZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJQdXp6bGUiLCJsYXNlcmJlYW0iLCJpIiwiaiIsIlZlY3RvcjQiLCJsaWdodDEiLCJIZW1pc3BoZXJpY0xpZ2h0IiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwidnJIZWxwZXIiLCJjcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlIiwic3RhcnRMYXNlciIsImRyYXdMYXNlciIsImVuZGxhc2VyIiwibWlycm9yIiwiZ3JvdW5kIiwiR3JvdW5kIiwiZ3Jhdml0eSIsImVuYWJsZUludGVyYWN0aW9ucyIsImVuYWJsZVRlbGVwb3J0YXRpb24iLCJmbG9vck1lc2hOYW1lIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwiY29sbGlzaW9uc0VuYWJsZWQiLCJjaGVja0NvbGxpc2lvbnMiLCJDcmVhdGVUaWxlZEdyb3VuZCIsInhtaW4iLCJ6bWluIiwieG1heCIsInptYXgiLCJzdWJkaXZpc2lvbnMiLCJncm91bmRtYXQiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwic3BlY3VsYXJDb2xvciIsIkNvbG9yMyIsIndpbmRvdyIsInJuZCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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UUFBSUMsS0FBS3RJLEtBQUtHLEdBQUwsQ0FBU2tJLE9BQVQsQ0FBVDtBQUNBLFFBQUlFLEtBQUt2SSxLQUFLQyxHQUFMLENBQVNvSSxPQUFULENBQVQ7QUFDQSxXQUFPLElBQUkzSSxRQUFRQyxPQUFaLENBQW9CMkksS0FBS0YsRUFBRXpGLENBQVAsR0FBVzRGLEtBQUtILEVBQUV4RixDQUF0QyxFQUF5QyxDQUF6QyxFQUE0QyxDQUFDMkYsRUFBRCxHQUFNSCxFQUFFekYsQ0FBUixHQUFZMkYsS0FBS0YsRUFBRXhGLENBQS9ELENBQVA7QUFDSCxDQUpELEM7Ozs7Ozs7Ozs7Ozs7O0FDRkE7O0FBQ0E7Ozs7SUFFTTRGLE8sR0FFRixtQkFBYztBQUFBOztBQUFBOztBQUVWLGFBQUtDLE1BQUwsR0FBY0MsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLElBQUlsSixRQUFRbUosTUFBWixDQUFtQixLQUFLSixNQUF4QixFQUFnQyxJQUFoQyxDQUFkO0FBQ0EsYUFBS3RKLEtBQUwsR0FBYSxJQUFJTyxRQUFRb0osS0FBWixDQUFrQixLQUFLRixNQUF2QixDQUFiO0FBQ0E7QUFDQWIsZUFBT2dCLElBQVAsR0FBYyxJQUFJN0QsVUFBSixDQUFTLEtBQUsvRixLQUFkLENBQWQ7O0FBRUE0SixhQUFLQyxXQUFMLENBQWlCLEtBQUs3SixLQUF0Qjs7QUFFQSxhQUFLeUosTUFBTCxDQUFZSyxhQUFaLENBQTBCO0FBQUEsdUJBQU0sTUFBSzlKLEtBQUwsQ0FBV3dGLE1BQVgsRUFBTjtBQUFBLFNBQTFCOztBQUVBb0QsZUFBT21CLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS04sTUFBTCxDQUFZTyxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVgsT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdMYXNlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5zdGFydC5wb3MpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBzdGFydC5yb3Q7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoc3RhcnQucG9zWzBdICsgTWF0aC5zaW4oTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwLCAwLjUsIHN0YXJ0LnBvc1syXSArIE1hdGguY29zKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgbGFzZXJQb2ludHMgPSBbb3JpZ2luXTtcclxuICAgICAgICBsZXQgbmV4dFRhcmdldCA9IG9yaWdpbjtcclxuICAgICAgICBsZXQgbnVtaG9wcyA9IDA7XHJcbiAgICAgICAgbGV0IGhpdFN0YXR1cyA9IDA7XHJcbiAgICAgICAgbGV0IGxhc3RIaXQ7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBudW1ob3BzKys7XHJcbiAgICAgICAgICAgICh7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5jYWxjdWxhdGVCZWFtKG5leHRUYXJnZXQsIGRpcmVjdGlvbiwgbGFzdEhpdCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEhbmV4dFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgbGFzZXJQb2ludHMucHVzaChuZXh0VGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSB3b24hXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uIC0gMSkgJSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IHdoaWxlIChoaXRTdGF0dXMgIT0gMCAmJiBudW1ob3BzIDwgMjUpO1xyXG5cclxuICAgICAgICBpZiAobGFzZXJQb2ludHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgbGFzZXJQb2ludHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxhc2VyKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXNlcmJlYW1NZXNoID0gdGhpcy5zY2VuZS5nZXRNZXNoQnlOYW1lKFwibGFzZXJiZWFtXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZU1lc2gobGFzZXJiZWFtTWVzaCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc2VyID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUdWJlKFwibGFzZXJiZWFtXCIsIHtcclxuICAgICAgICAgICAgcGF0aDogbGFzZXJQb2ludHMsXHJcbiAgICAgICAgICAgIHJhZGl1czogLjE1XHJcbiAgICAgICAgfSwgdGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIuaXNQaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUJlYW0ob3JpZ2luLCBkaXJlY3Rpb24sIGxhc3RIaXQpIHtcclxuICAgICAgICBsZXQgcmF5RGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSk7XHJcbiAgICAgICAgdmFyIHJheSA9IG5ldyBCQUJZTE9OLlJheShvcmlnaW4sIHJheURpcmVjdGlvbiwgMTAwKTtcclxuICAgICAgICAvLyBsZXQgcmF5SGVscGVyID0gbmV3IEJBQllMT04uUmF5SGVscGVyKHJheSk7XHJcbiAgICAgICAgLy8gcmF5SGVscGVyLnNob3codGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIGhpdCA9IHRoaXMuc2NlbmUucGlja1dpdGhSYXkocmF5LCAobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWVzaC5uYW1lLnN0YXJ0c1dpdGgoXCJzdGFydExhc2VyXCIpIHx8ICFtZXNoLmlzUGlja2FibGUgfHwgbWVzaC5uYW1lID09PSBsYXN0SGl0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChoaXQucGlja2VkTWVzaCAmJiBoaXQucGlja2VkTWVzaC5lbnRpdHkpIHtcclxuICAgICAgICAgICAgbGV0IHJlZiA9IGhpdC5waWNrZWRNZXNoLmdldEZhY2V0Tm9ybWFsKGhpdC5mYWNlSWQpO1xyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXNpbihCQUJZTE9OLlZlY3RvcjMuQ3Jvc3MocmVmLCByYXkuZGlyZWN0aW9uKS55KSAqIDE4MCAvIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBsZXQgaGl0U3RhdHVzID0gaGl0LnBpY2tlZE1lc2guZW50aXR5Lm9uSGl0QnlMYXNlcihoaXQuZmFjZUlkLCBhbmdsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0OiBoaXQucGlja2VkTWVzaC5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXQ6IGhpdC5waWNrZWRNZXNoLm5hbWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV4dFRhcmdldDogbmV3IEJBQllMT04uVmVjdG9yMyhvcmlnaW4ueCArIE1hdGguc2luKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSAqIDEwMCwgMC41LCBvcmlnaW4ueiArIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSAqIDEwMCksXHJcbiAgICAgICAgICAgIGhpdFN0YXR1czogMCxcclxuICAgICAgICAgICAgbGFzdEhpdDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBuYW1lID0gXCJlbnRpdHlcIiwgcm90YXRpb24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGAke25hbWV9XyR7dGhpcy5zY2VuZS5tZXNoZXMubGVuZ3RofWA7ICAgICAgICBcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzgsIDEwLCAxMSwgMTEsIDksIDgsIDEyLCAxMywgMTUsIDE1LCAxNCwgMTIsIDEsIDMsIDcsIDcsIDUsIDEsIDE3LCAxNiwgMTgsIDE4LCAxOSwgMTcsIDIsIDAsIDQsIDQsIDYsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzEuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoKHRoaXMubmFtZSwgdGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIm1hdFwiLCB0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdGhpcy5tYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5vblBpY2tlZCA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHt9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICByZXR1cm4gMDsgLy8gc3RvcFxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWVzaCgpIHtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMudmVydGljZXMsIHRoaXMuZmFjZXMsIHRoaXMubm9ybWFscyk7XHJcblxyXG4gICAgICAgIC8vQXNzaWduIHBvc2l0aW9ucyBhbmQgaW5kaWNlcyB0byB2ZXJ0ZXhEYXRhXHJcbiAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuZmFjZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG4gICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy51dnM7XHJcblxyXG4gICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2godGhpcy5tZXNoKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSB0aGlzLm1hdDtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi50aGlzLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzLCB0aGlzLm1lc2gpKSk7XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5lbnRpdHkgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXNlciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0LCByb3RhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCA/IFwic3RhcnRMYXNlclwiIDogXCJlbmRMYXNlclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9ICEhaXNTdGFydDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFswLCAyLCAzLCAzLCAxLCAwLCA0LCA1LCA3LCA3LCA2LCA0LCAxNiwgMTcsIDE5LCAxOSwgMTgsIDE2LCAxMywgMTIsIDE0LCAxNCwgMTUsIDEzLCA5LCA4LCAxMCwgMTAsIDExLCA5XTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAxLjAsIDAuMjUsIDAuNzUsIDAuNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC41LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC43NSwgMS4wLCAwLjUsIDAuNzUsIDAuNzUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC4wLCAwLjc1LCAwLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4gdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLm1lc2gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKChmYWNlSWQgPT09IDUgfHwgZmFjZUlkID09PSA0KSAmJiAhdGhpcy5pc1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzOyAvLyB3aW5uZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vc3RvcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBcIm1pcnJvclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs2LCA4LCA5LCA5LCA3LCA2LCA0LCAxLCAzLCAzLCA1LCA0LCAxMSwgMTAsIDEyLCAyLCAwLCA0LCA0LCA1LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjAsIDAuNzUsIDAuMjUsIDAuNSwgMC4yNSwgMC43NSwgMC4yNSwgMC43NSwgMC4wLCAwLjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjI1LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC41LCAwLjAsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNV07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5yb3RhdGlvbi55ID0gTWF0aC5QSSAqIHRoaXMucm90YXRpb24gLyAyO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoZmFjZUlkID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLmdldEZhY2V0Tm9ybWFsKGZhY2VJZCk7XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA+IDApIHJldHVybiAxOyAvLyBsZWZ0XHJcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IDApIHJldHVybiAyOyAvLyByaWdodFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvL3N0b3BcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRW50aXR5IH0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhbGwgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLHBvc2l0aW9uLFwid2FsbFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjI1LDAuMjUsIDAuMjUsMC4yNSwgMC4yNSwwLjUsIDAuMjUsMC41LCAwLjAsMC4yNSwgMC4wLDAuMjUsIDAuMCwwLjUsIDAuMCwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjAsMC4yNSwgMC4yNSwwLjI1LCAwLjAsMC41LCAwLjI1LDAuNSwgMC4yNSwwLjI1LCAwLjAsMC4yNSwgMC4yNSwwLjUsIDAuMCwwLjVdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIFB1enpsZVxyXG59IGZyb20gXCIuL3B1enpsZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBuZXcgUHV6emxlKCkucHV6emxlO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtID0gbmV3IExhc2VyYmVhbSh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcHMoKSB7XHJcbiAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwcztcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTY2VuZShzY2VuZSkge1xyXG4gICAgICAgIHZhciBsaWdodDEgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwibGlnaHQxXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MVwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcblxyXG4gICAgIFxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydC5yb3QgPSAoc3RhcnQucm90ICsgMSkgJSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kbGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCBmYWxzZSwgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBlbmRsYXNlci5vblBpY2tlZCA9ICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlycm9yID0gbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWlycm9yLm9uUGlja2VkID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2FsbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtOS44MSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlSW50ZXJhY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogZ3JvdW5kLm5hbWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5hcHBseUdyYXZpdHkgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5lbGxpcHNvaWQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIHNjZW5lLmNvbGxpc2lvbnNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR3JvdW5ke1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwVSA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHV6emxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgfVxyXG59XHJcbiAgICAiLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7XHJcblxyXG53aW5kb3cucm90YXRlID0gKHYsIGRlZ3JlZXMpID0+IHtcclxuICAgIHZhciBjYSA9IE1hdGguY29zKGRlZ3JlZXMpO1xyXG4gICAgdmFyIHNhID0gTWF0aC5zaW4oZGVncmVlcyk7XHJcbiAgICByZXR1cm4gbmV3IEJBQllMT04uVmVjdG9yMyhjYSAqIHYueCAtIHNhICogdi56LCAwLCAtc2EgKiB2LnggKyBjYSAqIHYueik7XHJcbn0iLCJpbXBvcnQgJy4vZ2xvYmFsJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2NsYXNzZXMvZ2FtZVwiO1xyXG5cclxuY2xhc3MgT2ZmbGluZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcbiAgICAgICAgLy90aGlzLnNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gbmV3IEdhbWUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIGdhbWUuY3JlYXRlU2NlbmUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm5ldyBPZmZsaW5lKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==