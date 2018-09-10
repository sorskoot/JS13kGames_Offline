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
        this.onWin = function () {};
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
                    this.onWin();
                    return;
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
            BABYLON.Tags.AddTagsTo(this.laser, "entity");

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

                        BABYLON.Tags.AddTagsTo(this.mesh, "entity");
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

var _puzzleManager = __webpack_require__(/*! ./puzzleManager */ "./src/classes/puzzleManager.js");

var _wall = __webpack_require__(/*! ./entities/wall */ "./src/classes/entities/wall.js");

var _mirror = __webpack_require__(/*! ./entities/mirror */ "./src/classes/entities/mirror.js");

var _laser = __webpack_require__(/*! ./entities/laser */ "./src/classes/entities/laser.js");

var _ground = __webpack_require__(/*! ./ground */ "./src/classes/ground.js");

var _Laserbeam = __webpack_require__(/*! ./Laserbeam */ "./src/classes/Laserbeam.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
    function Game(scene) {
        var _this = this;

        _classCallCheck(this, Game);

        this.scene = scene;
        this.maps = this.initMaps();
        this.puzzleManager = new _puzzleManager.PuzzleManager();
        this.initPuzzle();
        this.laserbeam.onWin = function () {
            var meshes = _this.scene.getMeshesByTags("entity");
            for (var i = 0; i < meshes.length; i++) {
                _this.scene.removeMesh(meshes[i]);
            }
            _this.puzzleManager.next();
            _this.initPuzzle();
            _this.createPuzzle();
            _this.laserbeam.drawLaser();
        };
    }

    _createClass(Game, [{
        key: "initPuzzle",
        value: function initPuzzle() {

            this.puzzle = this.puzzleManager.puzzle;
            this.laserbeam = new _Laserbeam.Laserbeam(this.scene, this.puzzle);
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
        value: function createScene(scene) {
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

            this.createPuzzle();

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
    }, {
        key: "createPuzzle",
        value: function createPuzzle() {
            var _this2 = this;

            for (var i = 0; i < this.puzzle.length; i++) {
                switch (this.puzzle[i].type) {
                    case 'start':
                        var startLaser = new _laser.Laser(this.scene, this.puzzle[i].pos, true, this.puzzle[i].rot);
                        startLaser.onPicked = function () {
                            var start = _this2.puzzle.find(function (b) {
                                return b.type === "start";
                            });
                            start.rot = (start.rot + 1) % 4;
                            _this2.laserbeam.drawLaser();
                        };
                        break;
                    case 'end':
                        var endlaser = new _laser.Laser(this.scene, this.puzzle[i].pos, false, this.puzzle[i].rot);
                        endlaser.onPicked = function () {
                            _this2.laserbeam.drawLaser();
                        };
                        break;
                    case 'mirror':
                        var mirror = new _mirror.Mirror(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        mirror.onPicked = function () {
                            _this2.laserbeam.drawLaser();
                        };
                        break;
                    case 'wall':
                        new _wall.Wall(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        break;
                }
            }
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

/***/ "./src/classes/puzzleManager.js":
/*!**************************************!*\
  !*** ./src/classes/puzzleManager.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PuzzleManager = exports.PuzzleManager = function () {
    function PuzzleManager() {
        _classCallCheck(this, PuzzleManager);

        this.puzzles = [
        // [
        //     {type:'start',pos:[3.0, 0.5, 0.0],rot:1,},
        //     {type:'end',pos:[-3.0, 0.5, 0.0],rot:1,},
        //     {type:'wall',pos:[0.0, 0.5, 0.0],rot:0,},
        //     {type:'mirror',pos:[3.0, 0.5, -5.0],rot:0,},
        //     {type:'mirror',pos:[-3.0, 0.5, -5.0],rot:3,},
        //     {type:'wall',pos:[0.0, 2.5, 0.0],rot:0,},
        //     {type:'wall',pos:[0.0, 1.5, 0.0],rot:0,},
        //     ]


        [{
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
        }], [{
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
        }, {
            type: 'wall',
            pos: [3, 1.5, 5],
            rot: 0
        }, {
            type: 'wall',
            pos: [3, 2.5, 5],
            rot: 0
        }]];
        this.currentPuzzle = -1;
        this.next();
    }

    _createClass(PuzzleManager, [{
        key: 'next',
        value: function next() {
            this.currentPuzzle++;
            this.puzzle = this.puzzles[this.currentPuzzle];
        }
    }]);

    return PuzzleManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGVNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxhc2VyYmVhbSIsInNjZW5lIiwicHV6emxlIiwib25XaW4iLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImxlbmd0aCIsImxhc2VyIiwibGFzZXJiZWFtTWVzaCIsImdldE1lc2hCeU5hbWUiLCJyZW1vdmVNZXNoIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUdWJlIiwicGF0aCIsInJhZGl1cyIsIlRhZ3MiLCJBZGRUYWdzVG8iLCJpc1BpY2thYmxlIiwicmF5RGlyZWN0aW9uIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJtZXNoIiwibmFtZSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwiU3RhbmRhcmRNYXRlcmlhbCIsInRleHR1cmUiLCJUZXh0dXJlIiwiTkVBUkVTVF9TQU1QTElOR01PREUiLCJkaWZmdXNlVGV4dHVyZSIsIm9uUGljayIsIm9uUGlja2VkIiwidmVydGV4RGF0YSIsIlZlcnRleERhdGEiLCJub3JtYWxzIiwiQ29tcHV0ZU5vcm1hbHMiLCJwb3NpdGlvbnMiLCJpbmRpY2VzIiwiYXBwbHlUb01lc2giLCJtYXRlcmlhbCIsImJhY2tGYWNlQ3VsbGluZyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJyZW5kZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJwdXp6bGVNYW5hZ2VyIiwiUHV6emxlTWFuYWdlciIsImluaXRQdXp6bGUiLCJsYXNlcmJlYW0iLCJnZXRNZXNoZXNCeVRhZ3MiLCJpIiwibmV4dCIsImNyZWF0ZVB1enpsZSIsImRyYXdMYXNlciIsImoiLCJWZWN0b3I0IiwibGlnaHQxIiwiSGVtaXNwaGVyaWNMaWdodCIsImxpZ2h0IiwiRGlyZWN0aW9uYWxMaWdodCIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImFjdGl2ZUNhbWVyYSIsImluZXJ0aWEiLCJzcGVlZCIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiY2hlY2tDb2xsaXNpb25zIiwic3RhcnRMYXNlciIsImVuZGxhc2VyIiwibWlycm9yIiwiQ3JlYXRlVGlsZWRHcm91bmQiLCJ4bWluIiwiem1pbiIsInhtYXgiLCJ6bWF4Iiwic3ViZGl2aXNpb25zIiwiZ3JvdW5kbWF0IiwidVNjYWxlIiwidlNjYWxlIiwid3JhcFUiLCJNSVJST1JfQUREUkVTU01PREUiLCJ3cmFwViIsInNwZWN1bGFyQ29sb3IiLCJDb2xvcjMiLCJwdXp6bGVzIiwiY3VycmVudFB1enpsZSIsIndpbmRvdyIsInJuZCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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RCxHQUFNSCxFQUFFaEcsQ0FBUixHQUFZa0csS0FBS0YsRUFBRS9GLENBQS9ELENBQVA7QUFDSCxDQUpELEM7Ozs7Ozs7Ozs7Ozs7O0FDRkE7O0FBQ0E7Ozs7SUFFTW1HLE8sR0FFRixtQkFBYztBQUFBOztBQUFBOztBQUVWLGFBQUtDLE1BQUwsR0FBY0MsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLElBQUl6SixRQUFRMEosTUFBWixDQUFtQixLQUFLSixNQUF4QixFQUFnQyxJQUFoQyxDQUFkO0FBQ0EsYUFBSzlKLEtBQUwsR0FBYSxJQUFJUSxRQUFRMkosS0FBWixDQUFrQixLQUFLRixNQUF2QixDQUFiO0FBQ0E7QUFDQWIsZUFBT2dCLElBQVAsR0FBYyxJQUFJcEUsVUFBSixDQUFTLEtBQUtoRyxLQUFkLENBQWQ7O0FBRUFvSyxhQUFLQyxXQUFMLENBQWlCLEtBQUtySyxLQUF0Qjs7QUFFQSxhQUFLaUssTUFBTCxDQUFZSyxhQUFaLENBQTBCO0FBQUEsdUJBQU0sTUFBS3RLLEtBQUwsQ0FBV3lGLE1BQVgsRUFBTjtBQUFBLFNBQTFCOztBQUVBMkQsZUFBT21CLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS04sTUFBTCxDQUFZTyxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVgsT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgICAgIHRoaXMub25XaW4gPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4uc3RhcnQucG9zKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gc3RhcnQucm90O1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHN0YXJ0LnBvc1swXSArIE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCwgMC41LCBzdGFydC5wb3NbMl0gKyBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDApO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxhc2VyUG9pbnRzID0gW29yaWdpbl07XHJcbiAgICAgICAgbGV0IG5leHRUYXJnZXQgPSBvcmlnaW47XHJcbiAgICAgICAgbGV0IG51bWhvcHMgPSAwO1xyXG4gICAgICAgIGxldCBoaXRTdGF0dXMgPSAwO1xyXG4gICAgICAgIGxldCBsYXN0SGl0O1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbnVtaG9wcysrO1xyXG4gICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCxcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXRcclxuICAgICAgICAgICAgfSA9IHRoaXMuY2FsY3VsYXRlQmVhbShuZXh0VGFyZ2V0LCBkaXJlY3Rpb24sIGxhc3RIaXQpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghIW5leHRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2gobmV4dFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldpbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiAtIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoaGl0U3RhdHVzICE9IDAgJiYgbnVtaG9wcyA8IDI1KTtcclxuXHJcbiAgICAgICAgaWYgKGxhc2VyUG9pbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB2YXIgbGFzZXJiZWFtTWVzaCA9IHRoaXMuc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImxhc2VyYmVhbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKGxhc2VyYmVhbU1lc2gpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubGFzZXIsIFwiZW50aXR5XCIpO1xyXG5cclxuICAgICAgICB0aGlzLmxhc2VyLmlzUGlja2FibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVCZWFtKG9yaWdpbiwgZGlyZWN0aW9uLCBsYXN0SGl0KSB7XHJcbiAgICAgICAgbGV0IHJheURpcmVjdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpLCAwLCBNYXRoLmNvcyhNYXRoLlBJICogZGlyZWN0aW9uIC8gMikpO1xyXG4gICAgICAgIHZhciByYXkgPSBuZXcgQkFCWUxPTi5SYXkob3JpZ2luLCByYXlEaXJlY3Rpb24sIDEwMCk7XHJcbiAgICAgICAgLy8gbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIC8vIHJheUhlbHBlci5zaG93KHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciBoaXQgPSB0aGlzLnNjZW5lLnBpY2tXaXRoUmF5KHJheSwgKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1lc2gubmFtZS5zdGFydHNXaXRoKFwic3RhcnRMYXNlclwiKSB8fCAhbWVzaC5pc1BpY2thYmxlIHx8IG1lc2gubmFtZSA9PT0gbGFzdEhpdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaGl0LnBpY2tlZE1lc2ggJiYgaGl0LnBpY2tlZE1lc2guZW50aXR5KSB7XHJcbiAgICAgICAgICAgIGxldCByZWYgPSBoaXQucGlja2VkTWVzaC5nZXRGYWNldE5vcm1hbChoaXQuZmFjZUlkKTtcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmFzaW4oQkFCWUxPTi5WZWN0b3IzLkNyb3NzKHJlZiwgcmF5LmRpcmVjdGlvbikueSkgKiAxODAgLyBNYXRoLlBJKTtcclxuICAgICAgICAgICAgbGV0IGhpdFN0YXR1cyA9IGhpdC5waWNrZWRNZXNoLmVudGl0eS5vbkhpdEJ5TGFzZXIoaGl0LmZhY2VJZCwgYW5nbGUpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldDogaGl0LnBpY2tlZE1lc2gucG9zaXRpb24sXHJcbiAgICAgICAgICAgICAgICBoaXRTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBsYXN0SGl0OiBoaXQucGlja2VkTWVzaC5uYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5leHRUYXJnZXQ6IG5ldyBCQUJZTE9OLlZlY3RvcjMob3JpZ2luLnggKyBNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMikgKiAxMDAsIDAuNSwgb3JpZ2luLnogKyBNYXRoLmNvcyhNYXRoLlBJICogZGlyZWN0aW9uIC8gMikgKiAxMDApLFxyXG4gICAgICAgICAgICBoaXRTdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIGxhc3RIaXQ6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgbmFtZSA9IFwiZW50aXR5XCIsIHJvdGF0aW9uID0gMCkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBgJHtuYW1lfV8ke3RoaXMuc2NlbmUubWVzaGVzLmxlbmd0aH1gOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs4LCAxMCwgMTEsIDExLCA5LCA4LCAxMiwgMTMsIDE1LCAxNSwgMTQsIDEyLCAxLCAzLCA3LCA3LCA1LCAxLCAxNywgMTYsIDE4LCAxOCwgMTksIDE3LCAyLCAwLCA0LCA0LCA2LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFsxLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaCh0aGlzLm5hbWUsIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLm1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHRoaXMubWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHt9O1xyXG4gICAgICAgIHRoaXMub25QaWNrZWQgPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7fVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7IC8vIHN0b3BcclxuICAgIH1cclxuXHJcbiAgICBidWlsZE1lc2goKSB7XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICB2YXIgdmVydGV4RGF0YSA9IG5ldyBCQUJZTE9OLlZlcnRleERhdGEoKTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGlvbnMgb2Ygbm9ybWFscyBhZGRlZFxyXG4gICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyh0aGlzLnZlcnRpY2VzLCB0aGlzLmZhY2VzLCB0aGlzLm5vcm1hbHMpO1xyXG5cclxuICAgICAgICAvL0Fzc2lnbiBwb3NpdGlvbnMgYW5kIGluZGljZXMgdG8gdmVydGV4RGF0YVxyXG4gICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy52ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLmZhY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IHRoaXMubm9ybWFscztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnV2cyA9IHRoaXMudXZzO1xyXG5cclxuICAgICAgICAvL0FwcGx5IHZlcnRleERhdGEgdG8gY3VzdG9tIG1lc2hcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmFwcGx5VG9NZXNoKHRoaXMubWVzaCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gdGhpcy5tYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4udGhpcy5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyID0gbmV3IEJBQllMT04uQWN0aW9uTWFuYWdlcih0aGlzLnNjZW5lKTtcclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlci5yZWdpc3RlckFjdGlvbihuZXcgQkFCWUxPTi5FeGVjdXRlQ29kZUFjdGlvbihCQUJZTE9OLkFjdGlvbk1hbmFnZXIuT25QaWNrVHJpZ2dlciwgKGZ1bmN0aW9uIChtZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm9uUGlja2VkKHRoaXMpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcywgdGhpcy5tZXNoKSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEJBQllMT04uVGFncy5BZGRUYWdzVG8odGhpcy5tZXNoLCBcImVudGl0eVwiKTtcclxuICAgICAgICB0aGlzLm1lc2guZW50aXR5ID0gdGhpcztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaDtcclxuICAgIH1cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTGFzZXIgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQgPyBcInN0YXJ0TGFzZXJcIiA6IFwiZW5kTGFzZXJcIiwgcm90YXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLmlzU3RhcnQgPSAhIWlzU3RhcnQ7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbMCwgMiwgMywgMywgMSwgMCwgNCwgNSwgNywgNywgNiwgNCwgMTYsIDE3LCAxOSwgMTksIDE4LCAxNiwgMTMsIDEyLCAxNCwgMTQsIDE1LCAxMywgOSwgOCwgMTAsIDEwLCAxMSwgOV07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC41LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjUsIDAuNzUsIDAuMjUsIDEuMCwgMC41LCAxLjAsIDAuNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC41LCAxLjAsIDAuNzUsIDEuMCwgMC41LCAwLjc1LCAwLjc1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuMCwgMC43NSwgMC4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHRoaXMubWVzaC5yb3RhdGlvbi55ID0gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKyBNYXRoLlBJIC8gMjtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIGlmICgoZmFjZUlkID09PSA1IHx8IGZhY2VJZCA9PT0gNCkgJiYgIXRoaXMuaXNTdGFydCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMzsgLy8gd2lubmVyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwOyAvL3N0b3BcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1pcnJvciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCByb3RhdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgXCJtaXJyb3JcIiwgcm90YXRpb24pO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbNiwgOCwgOSwgOSwgNywgNiwgNCwgMSwgMywgMywgNSwgNCwgMTEsIDEwLCAxMiwgMiwgMCwgNCwgNCwgNSwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4wLCAwLjc1LCAwLjI1LCAwLjUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMCwgMC41LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC4yNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuNSwgMC4wLCAwLjc1LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjVdO1xyXG5cclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9ICh0aGlzLnJvdGF0aW9uICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IE1hdGguUEkgKiB0aGlzLnJvdGF0aW9uIC8gMjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKGZhY2VJZCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMCwwLjI1LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVNYW5hZ2VyXHJcbn0gZnJvbSBcIi4vcHV6emxlTWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGVNYW5hZ2VyID0gbmV3IFB1enpsZU1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRQdXp6bGUoKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5vbldpbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdmFyIG1lc2hlcyA9IHRoaXMuc2NlbmUuZ2V0TWVzaGVzQnlUYWdzKFwiZW50aXR5XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKG1lc2hlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wdXp6bGVNYW5hZ2VyLm5leHQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0UHV6emxlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUHV6emxlKCk7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTsgIFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFB1enpsZSgpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHRoaXMucHV6emxlTWFuYWdlci5wdXp6bGU7XHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0gPSBuZXcgTGFzZXJiZWFtKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TWFwcygpIHtcclxuICAgICAgICBsZXQgbWFwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbWFwcy5wdXNoKG5ldyBCQUJZTE9OLlZlY3RvcjQoaSAvIDQsIGogLyA0LCBpIC8gNCArIDAuMjUsIGogLyA0ICsgMC4yNSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBzO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNjZW5lKHNjZW5lKSB7XHJcbiAgICAgICAgdmFyIGxpZ2h0MSA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJsaWdodDFcIiwgbmV3IEJBQllMT04uVmVjdG9yMygxLCAxLCAwKSwgc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgbGlnaHQgPSBuZXcgQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwibGlnaHQxXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoLTIsIC0zLCAxKSwgc2NlbmUpO1xyXG4gICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuXHJcblxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQdXp6bGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGdyb3VuZCA9IG5ldyBHcm91bmQodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC05LjgxLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVJbnRlcmFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZVRlbGVwb3J0YXRpb24oe1xyXG4gICAgICAgICAgICBmbG9vck1lc2hOYW1lOiBncm91bmQubmFtZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuaW5lcnRpYSA9IDAuNjtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuc3BlZWQgPSAwLjU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmFwcGx5R3Jhdml0eSA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmVsbGlwc29pZCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgc2NlbmUuY29sbGlzaW9uc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQdXp6bGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxhc2VyID0gbmV3IExhc2VyKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgZmFsc2UsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kbGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3IgPSBuZXcgTWlycm9yKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBtaXJyb3Iub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2FsbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR3JvdW5ke1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwVSA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHV6emxlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wdXp6bGVzID0gW1xyXG4gICAgICAgICAgICAvLyBbXHJcbiAgICAgICAgICAgIC8vICAgICB7dHlwZTonc3RhcnQnLHBvczpbMy4wLCAwLjUsIDAuMF0scm90OjEsfSxcclxuICAgICAgICAgICAgLy8gICAgIHt0eXBlOidlbmQnLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDoxLH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6MCx9LFxyXG4gICAgICAgICAgICAvLyAgICAge3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTUuMF0scm90OjAsfSxcclxuICAgICAgICAgICAgLy8gICAgIHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAtNS4wXSxyb3Q6Myx9LFxyXG4gICAgICAgICAgICAvLyAgICAge3R5cGU6J3dhbGwnLHBvczpbMC4wLCAyLjUsIDAuMF0scm90OjAsfSxcclxuICAgICAgICAgICAgLy8gICAgIHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAwLjBdLHJvdDowLH0sXHJcbiAgICAgICAgICAgIC8vICAgICBdXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMSwgMC41LCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzMsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFsxLCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvczogWzMsIDEuNSwgNV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3M6IFszLCAyLjUsIDVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUgPSAtMTtcclxuICAgICAgICB0aGlzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0KCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFB1enpsZSsrO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gdGhpcy5wdXp6bGVzW3RoaXMuY3VycmVudFB1enpsZV07XHJcbiAgICB9XHJcbn0iLCJ3aW5kb3cucm5kID0gbSA9PiB+fihNYXRoLnJhbmRvbSgpICogbSk7XHJcblxyXG53aW5kb3cucm90YXRlID0gKHYsIGRlZ3JlZXMpID0+IHtcclxuICAgIHZhciBjYSA9IE1hdGguY29zKGRlZ3JlZXMpO1xyXG4gICAgdmFyIHNhID0gTWF0aC5zaW4oZGVncmVlcyk7XHJcbiAgICByZXR1cm4gbmV3IEJBQllMT04uVmVjdG9yMyhjYSAqIHYueCAtIHNhICogdi56LCAwLCAtc2EgKiB2LnggKyBjYSAqIHYueik7XHJcbn0iLCJpbXBvcnQgJy4vZ2xvYmFsJztcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2NsYXNzZXMvZ2FtZVwiO1xyXG5cclxuY2xhc3MgT2ZmbGluZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZW5kZXJDYW52YXNcIik7XHJcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgQkFCWUxPTi5FbmdpbmUodGhpcy5jYW52YXMsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgQkFCWUxPTi5TY2VuZSh0aGlzLmVuZ2luZSk7XHJcbiAgICAgICAgLy90aGlzLnNjZW5lLmRlYnVnTGF5ZXIuc2hvdygpO1xyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gbmV3IEdhbWUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIGdhbWUuY3JlYXRlU2NlbmUodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMuZW5naW5lLnJ1blJlbmRlckxvb3AoKCkgPT4gdGhpcy5zY2VuZS5yZW5kZXIoKSk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHRoaXMuZW5naW5lLnJlc2l6ZSgpKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbm5ldyBPZmZsaW5lKCk7Il0sInNvdXJjZVJvb3QiOiIifQ==