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
            this.laser.material = new BABYLON.StandardMaterial("laserMat", this.scene);
            var gl = new BABYLON.GlowLayer("glow", this.scene);
            gl.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                gl.intensity = .75;
                if (mesh.name === "laserbeam") {
                    result.set(.3, 1, .3, 1);
                } else {
                    result.set(0, 0, 0, 0);
                }
            };

            this.laser.isPickable = false;
        }
    }, {
        key: "calculateBeam",
        value: function calculateBeam(origin, direction, lastHit) {
            var rayDirection = new BABYLON.Vector3(Math.sin(Math.PI * direction / 2), 0, Math.cos(Math.PI * direction / 2));
            var ray = new BABYLON.Ray(origin, rayDirection, 100);
            //  let rayHelper = new BABYLON.RayHelper(ray);
            //  rayHelper.show(this.scene);
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
            this.mesh.checkCollisions = true;
            this.mesh.actionManager = new BABYLON.ActionManager(this.scene);
            this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function (mesh) {
                this.onPick(this);
                this.scene.render();
                this.onPicked(this);
            }.bind(this, this.mesh)));
            this.mesh.rotation.y = this.rotation * Math.PI / 2;
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

        rotation = (rotation - 1) % 4;

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
            if (faceId === 0 || faceId === 1) {
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
            _this.updateShadow();
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
            var hemiLight = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
            hemiLight.diffuse = new BABYLON.Color3(.2, .4, .5);

            var light = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(-2, -3, 1), scene);
            light.position = new BABYLON.Vector3(6, 9, 3);
            light.shadowMinZ = 1;
            light.shadowMaxZ = 20;
            light.intensity = 5;

            var generator = new BABYLON.ShadowGenerator(2048, light);

            generator.forceBackFacesOnly = true;

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
            scene.activeCamera.minZ = .1;
            scene.activeCamera.applyGravity = true;
            scene.activeCamera.ellipsoid = new BABYLON.Vector3(.25, .75, .25);
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;

            this.generator = generator;
            this.updateShadow();
            this.laserbeam.drawLaser();
        }
    }, {
        key: "updateShadow",
        value: function updateShadow() {
            this.generator._shadowMap.renderList = [];
            for (var i = 0; i < this.scene.meshes.length; i++) {
                if (this.scene.meshes[i].name != "Tiled Ground") {
                    this.generator.addShadowCaster(this.scene.meshes[i]);
                }
                this.scene.meshes[i].receiveShadows = true;
            }
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

    groundmat.specularTexture = texture;
    groundmat.specularTexture.uScale = 0.249;
    groundmat.specularTexture.vScale = 0.249;
    groundmat.specularTexture.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
    groundmat.specularTexture.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;

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

        this.puzzles = [[{ type: 'start', pos: [4.0, 0.5, 0.0], rot: 1 }, { type: 'end', pos: [-4.0, 0.5, 0.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'end', pos: [-2.0, 0.5, 0.0], rot: 3 }, { type: 'mirror', pos: [-2.0, 0.5, 3.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [-2.0, 0.5, -2.0], rot: 3 }, { type: 'end', pos: [-2.0, 0.5, 3.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [2.0, 0.5, -2.0], rot: 3 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-3.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 1.5, 3.0], rot: 1 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, -1.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, 1.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 2.0], rot: 1 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, 1.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'mirror', pos: [1.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 2.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -3.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 0.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 1.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 2.0], rot: 1 }, { type: 'mirror', pos: [1.0, 0.5, -3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, -4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, 0.0], rot: 1 }], [{ type: 'start', pos: [0.0, 0.5, 0.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -1.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -1.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, 0.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, 1.0], rot: 3 }, { type: 'mirror', pos: [-3.0, 0.5, 0.0], rot: 3 }, { type: 'mirror', pos: [-3.0, 0.5, -2.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -2.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -4.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, -4.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -3.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -5.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -3.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -4.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [-2.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [1.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [2.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [3.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [1.0, 0.5, 0.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, -4.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'end', pos: [-4.0, 0.5, 3.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 2 }, { type: 'mirror', pos: [2.0, 0.5, -2.0], rot: 2 }, { type: 'mirror', pos: [-4.0, 0.5, -6.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -2.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -7.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -2.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -2.0], rot: 2 }, { type: 'mirror', pos: [4.0, 0.5, -2.0], rot: 2 }, { type: 'mirror', pos: [4.0, 0.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -7], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -7], rot: 2 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-3.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, -1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, -2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, -1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, -2.0], rot: 1 }]];

        this.currentPuzzle = (window.location.href.split('#')[1] || 0) - 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGVNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxhc2VyYmVhbSIsInNjZW5lIiwicHV6emxlIiwib25XaW4iLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImxlbmd0aCIsImxhc2VyIiwibGFzZXJiZWFtTWVzaCIsImdldE1lc2hCeU5hbWUiLCJyZW1vdmVNZXNoIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUdWJlIiwicGF0aCIsInJhZGl1cyIsIlRhZ3MiLCJBZGRUYWdzVG8iLCJtYXRlcmlhbCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJnbCIsIkdsb3dMYXllciIsImN1c3RvbUVtaXNzaXZlQ29sb3JTZWxlY3RvciIsIm1lc2giLCJzdWJNZXNoIiwicmVzdWx0IiwiaW50ZW5zaXR5IiwibmFtZSIsInNldCIsImlzUGlja2FibGUiLCJyYXlEaXJlY3Rpb24iLCJyYXkiLCJSYXkiLCJoaXQiLCJwaWNrV2l0aFJheSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsImJhY2tGYWNlQ3VsbGluZyIsImNoZWNrQ29sbGlzaW9ucyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJyZW5kZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJwdXp6bGVNYW5hZ2VyIiwiUHV6emxlTWFuYWdlciIsImluaXRQdXp6bGUiLCJsYXNlcmJlYW0iLCJnZXRNZXNoZXNCeVRhZ3MiLCJpIiwibmV4dCIsImNyZWF0ZVB1enpsZSIsInVwZGF0ZVNoYWRvdyIsImRyYXdMYXNlciIsImoiLCJWZWN0b3I0IiwiaGVtaUxpZ2h0IiwiSGVtaXNwaGVyaWNMaWdodCIsImRpZmZ1c2UiLCJDb2xvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJzaGFkb3dNaW5aIiwic2hhZG93TWF4WiIsImdlbmVyYXRvciIsIlNoYWRvd0dlbmVyYXRvciIsImZvcmNlQmFja0ZhY2VzT25seSIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsImFjdGl2ZUNhbWVyYSIsImluZXJ0aWEiLCJzcGVlZCIsIm1pbloiLCJhcHBseUdyYXZpdHkiLCJlbGxpcHNvaWQiLCJjb2xsaXNpb25zRW5hYmxlZCIsIl9zaGFkb3dNYXAiLCJyZW5kZXJMaXN0IiwiYWRkU2hhZG93Q2FzdGVyIiwicmVjZWl2ZVNoYWRvd3MiLCJzdGFydExhc2VyIiwiZW5kbGFzZXIiLCJtaXJyb3IiLCJDcmVhdGVUaWxlZEdyb3VuZCIsInhtaW4iLCJ6bWluIiwieG1heCIsInptYXgiLCJzdWJkaXZpc2lvbnMiLCJncm91bmRtYXQiLCJ1U2NhbGUiLCJ2U2NhbGUiLCJ3cmFwVSIsIk1JUlJPUl9BRERSRVNTTU9ERSIsIndyYXBWIiwic3BlY3VsYXJUZXh0dXJlIiwic3BlY3VsYXJDb2xvciIsInB1enpsZXMiLCJjdXJyZW50UHV6emxlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3BsaXQiLCJybmQiLCJyYW5kb20iLCJtIiwicm90YXRlIiwidiIsImRlZ3JlZXMiLCJjYSIsInNhIiwiT2ZmbGluZSIsImNhbnZhcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJlbmdpbmUiLCJFbmdpbmUiLCJTY2VuZSIsImdhbWUiLCJjcmVhdGVTY2VuZSIsInJ1blJlbmRlckxvb3AiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QUFMLENBQVNrSyxPQUFULENBQVQ7QUFDQSxXQUFPLElBQUl6SyxRQUFRQyxPQUFaLENBQW9CeUssS0FBS0YsRUFBRTlHLENBQVAsR0FBV2lILEtBQUtILEVBQUU3RyxDQUF0QyxFQUF5QyxDQUF6QyxFQUE0QyxDQUFDZ0gsRUFBRCxHQUFNSCxFQUFFOUcsQ0FBUixHQUFZZ0gsS0FBS0YsRUFBRTdHLENBQS9ELENBQVA7QUFDSCxDQUpELEM7Ozs7Ozs7Ozs7Ozs7O0FDRkE7O0FBQ0E7Ozs7SUFFTWlILE8sR0FFRixtQkFBYztBQUFBOztBQUFBOztBQUVWLGFBQUtDLE1BQUwsR0FBY0MsU0FBU0MsY0FBVCxDQUF3QixjQUF4QixDQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjLElBQUloTCxRQUFRaUwsTUFBWixDQUFtQixLQUFLSixNQUF4QixFQUFnQyxJQUFoQyxDQUFkO0FBQ0EsYUFBS3JMLEtBQUwsR0FBYSxJQUFJUSxRQUFRa0wsS0FBWixDQUFrQixLQUFLRixNQUF2QixDQUFiO0FBQ0E7QUFDQWhCLGVBQU9tQixJQUFQLEdBQWMsSUFBSW5GLFVBQUosQ0FBUyxLQUFLeEcsS0FBZCxDQUFkOztBQUVBMkwsYUFBS0MsV0FBTCxDQUFpQixLQUFLNUwsS0FBdEI7O0FBRUEsYUFBS3dMLE1BQUwsQ0FBWUssYUFBWixDQUEwQjtBQUFBLHVCQUFNLE1BQUs3TCxLQUFMLENBQVdpRyxNQUFYLEVBQU47QUFBQSxTQUExQjs7QUFFQXVFLGVBQU9zQixnQkFBUCxDQUF3QixRQUF4QixFQUFrQztBQUFBLHVCQUFNLE1BQUtOLE1BQUwsQ0FBWU8sTUFBWixFQUFOO0FBQUEsU0FBbEM7QUFDSCxDOztBQUlMLElBQUlYLE9BQUosRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgY2xhc3MgTGFzZXJiZWFtIHtcclxuXHJcbiAgICAvLyBsYXNlciBkaXJlY3Rpb24gY29uc3RhbnRzOlxyXG4gICAgLy8gMCBzdG9wIHByb2dyZXNzaW5nXHJcbiAgICAvLyAxIHR1cm4gbGVmdFxyXG4gICAgLy8gMiB0dXJuIHJpZ2h0XHJcbiAgICAvLyAzIGhpdHRpbmcgdGFyZ2V0XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHB1enpsZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHB1enpsZTtcclxuICAgICAgICB0aGlzLm9uV2luID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd0xhc2VyKCkge1xyXG4gICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcblxyXG4gICAgICAgIGxldCBvcmlnaW4gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKC4uLnN0YXJ0LnBvcyk7XHJcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHN0YXJ0LnJvdDtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gbmV3IEJBQllMT04uVmVjdG9yMyhzdGFydC5wb3NbMF0gKyBNYXRoLnNpbihNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDAsIDAuNSwgc3RhcnQucG9zWzJdICsgTWF0aC5jb3MoTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBsYXNlclBvaW50cyA9IFtvcmlnaW5dO1xyXG4gICAgICAgIGxldCBuZXh0VGFyZ2V0ID0gb3JpZ2luO1xyXG4gICAgICAgIGxldCBudW1ob3BzID0gMDtcclxuICAgICAgICBsZXQgaGl0U3RhdHVzID0gMDtcclxuICAgICAgICBsZXQgbGFzdEhpdDtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIG51bWhvcHMrKztcclxuICAgICAgICAgICAgKHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICBoaXRTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBsYXN0SGl0XHJcbiAgICAgICAgICAgIH0gPSB0aGlzLmNhbGN1bGF0ZUJlYW0obmV4dFRhcmdldCwgZGlyZWN0aW9uLCBsYXN0SGl0KSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoISFuZXh0VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKG5leHRUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25XaW4oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gLSAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uICsgMSkgJSA0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gd2hpbGUgKGhpdFN0YXR1cyAhPSAwICYmIG51bWhvcHMgPCAyNSk7XHJcblxyXG4gICAgICAgIGlmIChsYXNlclBvaW50cy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgICBsYXNlclBvaW50cy5wdXNoKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHRoaXMubGFzZXIpIHtcclxuICAgICAgICAgICAgdmFyIGxhc2VyYmVhbU1lc2ggPSB0aGlzLnNjZW5lLmdldE1lc2hCeU5hbWUoXCJsYXNlcmJlYW1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChsYXNlcmJlYW1NZXNoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxhc2VyID0gQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUdWJlKFwibGFzZXJiZWFtXCIsIHtcclxuICAgICAgICAgICAgcGF0aDogbGFzZXJQb2ludHMsXHJcbiAgICAgICAgICAgIHJhZGl1czogLjE1XHJcbiAgICAgICAgfSwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgQkFCWUxPTi5UYWdzLkFkZFRhZ3NUbyh0aGlzLmxhc2VyLCBcImVudGl0eVwiKTtcclxuICAgICAgICB0aGlzLmxhc2VyLm1hdGVyaWFsID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcImxhc2VyTWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgICAgdmFyIGdsID0gbmV3IEJBQllMT04uR2xvd0xheWVyKFwiZ2xvd1wiLCB0aGlzLnNjZW5lKTtcclxuZ2wuY3VzdG9tRW1pc3NpdmVDb2xvclNlbGVjdG9yID0gZnVuY3Rpb24obWVzaCwgc3ViTWVzaCwgbWF0ZXJpYWwsIHJlc3VsdCkge1xyXG4gICAgZ2wuaW50ZW5zaXR5ID0gLjc1O1xyXG4gICAgaWYgKG1lc2gubmFtZSA9PT0gXCJsYXNlcmJlYW1cIikge1xyXG4gICAgICAgIHJlc3VsdC5zZXQoLjMsIDEsIC4zLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzdWx0LnNldCgwLCAwLCAwLCAwKTtcclxuICAgIH1cclxufVxyXG5cclxuICAgICAgICB0aGlzLmxhc2VyLmlzUGlja2FibGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGVCZWFtKG9yaWdpbiwgZGlyZWN0aW9uLCBsYXN0SGl0KSB7XHJcbiAgICAgICAgbGV0IHJheURpcmVjdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpLCAwLCBNYXRoLmNvcyhNYXRoLlBJICogZGlyZWN0aW9uIC8gMikpO1xyXG4gICAgICAgIHZhciByYXkgPSBuZXcgQkFCWUxPTi5SYXkob3JpZ2luLCByYXlEaXJlY3Rpb24sIDEwMCk7XHJcbiAgICAgICAgLy8gIGxldCByYXlIZWxwZXIgPSBuZXcgQkFCWUxPTi5SYXlIZWxwZXIocmF5KTtcclxuICAgICAgICAvLyAgcmF5SGVscGVyLnNob3codGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdmFyIGhpdCA9IHRoaXMuc2NlbmUucGlja1dpdGhSYXkocmF5LCAobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWVzaC5uYW1lLnN0YXJ0c1dpdGgoXCJzdGFydExhc2VyXCIpIHx8ICFtZXNoLmlzUGlja2FibGUgfHwgbWVzaC5uYW1lID09PSBsYXN0SGl0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChoaXQucGlja2VkTWVzaCAmJiBoaXQucGlja2VkTWVzaC5lbnRpdHkpIHtcclxuICAgICAgICAgICAgbGV0IHJlZiA9IGhpdC5waWNrZWRNZXNoLmdldEZhY2V0Tm9ybWFsKGhpdC5mYWNlSWQpO1xyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXNpbihCQUJZTE9OLlZlY3RvcjMuQ3Jvc3MocmVmLCByYXkuZGlyZWN0aW9uKS55KSAqIDE4MCAvIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBsZXQgaGl0U3RhdHVzID0gaGl0LnBpY2tlZE1lc2guZW50aXR5Lm9uSGl0QnlMYXNlcihoaXQuZmFjZUlkLCBhbmdsZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0OiBoaXQucGlja2VkTWVzaC5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXQ6IGhpdC5waWNrZWRNZXNoLm5hbWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmV4dFRhcmdldDogbmV3IEJBQllMT04uVmVjdG9yMyhvcmlnaW4ueCArIE1hdGguc2luKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSAqIDEwMCwgMC41LCBvcmlnaW4ueiArIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSAqIDEwMCksXHJcbiAgICAgICAgICAgIGhpdFN0YXR1czogMCxcclxuICAgICAgICAgICAgbGFzdEhpdDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiZXhwb3J0IGNsYXNzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBuYW1lID0gXCJlbnRpdHlcIiwgcm90YXRpb24gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IGAke25hbWV9XyR7dGhpcy5zY2VuZS5tZXNoZXMubGVuZ3RofWA7ICAgICAgICBcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzgsIDEwLCAxMSwgMTEsIDksIDgsIDEyLCAxMywgMTUsIDE1LCAxNCwgMTIsIDEsIDMsIDcsIDcsIDUsIDEsIDE3LCAxNiwgMTgsIDE4LCAxOSwgMTcsIDIsIDAsIDQsIDQsIDYsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzEuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoKHRoaXMubmFtZSwgdGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIm1hdFwiLCB0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdGhpcy5tYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5vblBpY2tlZCA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHt9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICByZXR1cm4gMDsgLy8gc3RvcFxyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkTWVzaCgpIHtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMudmVydGljZXMsIHRoaXMuZmFjZXMsIHRoaXMubm9ybWFscyk7XHJcblxyXG4gICAgICAgIC8vQXNzaWduIHBvc2l0aW9ucyBhbmQgaW5kaWNlcyB0byB2ZXJ0ZXhEYXRhXHJcbiAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuZmFjZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG4gICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy51dnM7XHJcblxyXG4gICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2godGhpcy5tZXNoKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSB0aGlzLm1hdDtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi50aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm1lc2guY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCh0aGlzKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMsIHRoaXMubWVzaCkpKTtcclxuICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMucm90YXRpb24gKiBNYXRoLlBJIC8gMjtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubWVzaCwgXCJlbnRpdHlcIik7XHJcbiAgICAgICAgdGhpcy5tZXNoLmVudGl0eSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2g7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhc2VyIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQsIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgcm90YXRpb24gPSAocm90YXRpb24gLSAxKSAlIDQ7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0ID8gXCJzdGFydExhc2VyXCIgOiBcImVuZExhc2VyXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gISFpc1N0YXJ0O1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzAsIDIsIDMsIDMsIDEsIDAsIDQsIDUsIDcsIDcsIDYsIDQsIDE2LCAxNywgMTksIDE5LCAxOCwgMTYsIDEzLCAxMiwgMTQsIDE0LCAxNSwgMTMsIDksIDgsIDEwLCAxMCwgMTEsIDldO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwgMC43NSwgMC4yNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDEuMCwgMC4yNSwgMC43NSwgMC41LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjc1LCAxLjAsIDAuNSwgMC43NSwgMC43NSwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjAsIDAuNzUsIDAuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoKGZhY2VJZCA9PT0gNSB8fCBmYWNlSWQgPT09IDQpICYmICF0aGlzLmlzU3RhcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDM7IC8vIHdpbm5lcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXJyb3IgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIFwibWlycm9yXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzYsIDgsIDksIDksIDcsIDYsIDQsIDEsIDMsIDMsIDUsIDQsIDExLCAxMCwgMTIsIDIsIDAsIDQsIDQsIDUsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMCwgMC43NSwgMC4yNSwgMC41LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjAsIDAuNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuMjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjUsIDAuMCwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMC41XTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSBNYXRoLlBJICogdGhpcy5yb3RhdGlvbiAvIDI7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIGlmIChmYWNlSWQgPT09IDAgfHwgZmFjZUlkID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMCwwLjI1LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVNYW5hZ2VyXHJcbn0gZnJvbSBcIi4vcHV6emxlTWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGVNYW5hZ2VyID0gbmV3IFB1enpsZU1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRQdXp6bGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0ub25XaW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBtZXNoZXMgPSB0aGlzLnNjZW5lLmdldE1lc2hlc0J5VGFncyhcImVudGl0eVwiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChtZXNoZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHV6emxlTWFuYWdlci5uZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFB1enpsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVB1enpsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNoYWRvdygpO1xyXG4gICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQdXp6bGUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHV6emxlID0gdGhpcy5wdXp6bGVNYW5hZ2VyLnB1enpsZTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbSA9IG5ldyBMYXNlcmJlYW0odGhpcy5zY2VuZSwgdGhpcy5wdXp6bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgIGxldCBtYXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoc2NlbmUpIHtcclxuICAgICAgICB2YXIgaGVtaUxpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcIkhlbWlMaWdodFwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgaGVtaUxpZ2h0LmRpZmZ1c2UgPSBuZXcgQkFCWUxPTi5Db2xvcjMoLjIsIC40LCAuNSk7XHJcbiAgICAgIFxyXG5cclxuICAgICAgICB2YXIgbGlnaHQgPSBuZXcgQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwibGlnaHQyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoLTIsIC0zLCAxKSwgc2NlbmUpO1xyXG4gICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuICAgICAgICBsaWdodC5zaGFkb3dNaW5aID0gMTtcclxuICAgICAgICBsaWdodC5zaGFkb3dNYXhaID0gMjA7XHJcbiAgICAgICAgbGlnaHQuaW50ZW5zaXR5ID0gNTtcclxuXHJcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcigyMDQ4LCBsaWdodCk7XHJcbiAgICBcclxuICAgICAgICBnZW5lcmF0b3IuZm9yY2VCYWNrRmFjZXNPbmx5ID0gdHJ1ZTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9UaWxlczpcclxuICAgICAgICAvLyAwOiBHcm91bmRcclxuICAgICAgICAvLyAxOiBXYWxsXHJcbiAgICAgICAgLy8gMjpcclxuICAgICAgICAvLyAzOiBMYXNlclxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgLy8gNTpcclxuICAgICAgICAvLyA2OlxyXG4gICAgICAgIC8vIDc6XHJcbiAgICAgICAgLy8gODpcclxuICAgICAgICAvLyA5OlxyXG4gICAgICAgIC8vIDEwOlxyXG4gICAgICAgIC8vIDExOlxyXG4gICAgICAgIC8vIDEyOlxyXG4gICAgICAgIC8vIDEzOlxyXG4gICAgICAgIC8vIDE0OlxyXG4gICAgICAgIC8vIDE1OlxyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVB1enpsZSgpO1xyXG5cclxuICAgICAgICBsZXQgZ3JvdW5kID0gbmV3IEdyb3VuZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTkuODEsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IGdyb3VuZC5uYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5pbmVydGlhID0gMC42O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5zcGVlZCA9IDAuNTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEubWluWiA9IC4xOyBcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMyguMjUsIC43NSwgLjI1KTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNoYWRvdygpIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRvci5fc2hhZG93TWFwLnJlbmRlckxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lLm1lc2hlc1tpXS5uYW1lICE9IFwiVGlsZWQgR3JvdW5kXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3Rlcih0aGlzLnNjZW5lLm1lc2hlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5tZXNoZXNbaV0ucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQdXp6bGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxhc2VyID0gbmV3IExhc2VyKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgZmFsc2UsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kbGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3IgPSBuZXcgTWlycm9yKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBtaXJyb3Iub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3YWxsJzpcclxuICAgICAgICAgICAgICAgICAgICBuZXcgV2FsbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgR3JvdW5ke1xyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpe1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoQnVpbGRlci5DcmVhdGVUaWxlZEdyb3VuZChcIlRpbGVkIEdyb3VuZFwiLCB7XHJcbiAgICAgICAgICAgIHhtaW46IC0xMCxcclxuICAgICAgICAgICAgem1pbjogLTEwLFxyXG4gICAgICAgICAgICB4bWF4OiAxMCxcclxuICAgICAgICAgICAgem1heDogMTAsXHJcbiAgICAgICAgICAgIHN1YmRpdmlzaW9uczoge1xyXG4gICAgICAgICAgICAgICAgJ2gnOiAyMCxcclxuICAgICAgICAgICAgICAgICd3JzogMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdmFyIGdyb3VuZG1hdCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJncm91bmRtYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlID0gdGV4dHVyZTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwVSA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZS51U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLnZTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUud3JhcFYgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG5cclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJDb2xvciA9IG5ldyBCQUJZTE9OLkNvbG9yMygwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSBncm91bmRtYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgUHV6emxlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5wdXp6bGVzID0gW1xyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzQuMCwgMC41LCAwLjBdLHJvdDoxLH0se3R5cGU6J2VuZCcscG9zOlstNC4wLCAwLjUsIDAuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J2VuZCcscG9zOlstMi4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6Myx9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0yLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlsyLjAsIDAuNSwgLTIuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMy4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgLTEuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDQuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA1LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDQuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDEuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDEuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDEuNSwgMy4wXSxyb3Q6MSx9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlswLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIDEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgMi4wXSxyb3Q6MSx9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlswLjAsIDAuNSwgMS4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlsxLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgLTMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbMS4wLCAwLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC00LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC00LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAyLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAyLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAyLjUsIDAuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzAuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgLTEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgLTEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAxLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtMi4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlswLjAsIDAuNSwgLTQuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgLTMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgLTUuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgLTUuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgLTMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgLTQuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlsxLjAsIDAuNSwgLTUuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlsyLjAsIDAuNSwgLTUuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgLTUuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlsxLjAsIDAuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTQuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J2VuZCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzIuMCwgMC41LCAtMi4wXSxyb3Q6Mix9LHt0eXBlOidtaXJyb3InLHBvczpbLTQuMCwgMC41LCAtNi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0zLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTUuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC03LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzQuMCwgMC41LCAtMi4wXSxyb3Q6Mix9LHt0eXBlOidtaXJyb3InLHBvczpbNC4wLCAwLjUsIC02LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC00LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTUuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtNi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTYuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC03XSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTddLHJvdDoyLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlstMy4wLCAwLjUsIDUuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LF0sXHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgICAgICAvLyBbe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzMsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAxLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMi41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gXVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VycmVudFB1enpsZSA9ICh3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8IDApLTE7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUrKztcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHRoaXMucHV6emxlc1t0aGlzLmN1cnJlbnRQdXp6bGVdO1xyXG4gICAgfVxyXG59Iiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pO1xyXG5cclxud2luZG93LnJvdGF0ZSA9ICh2LCBkZWdyZWVzKSA9PiB7XHJcbiAgICB2YXIgY2EgPSBNYXRoLmNvcyhkZWdyZWVzKTtcclxuICAgIHZhciBzYSA9IE1hdGguc2luKGRlZ3JlZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBCQUJZTE9OLlZlY3RvcjMoY2EgKiB2LnggLSBzYSAqIHYueiwgMCwgLXNhICogdi54ICsgY2EgKiB2LnopO1xyXG59IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbmNsYXNzIE9mZmxpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUodGhpcy5lbmdpbmUpO1xyXG4gICAgICAgIC8vdGhpcy5zY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBnYW1lLmNyZWF0ZVNjZW5lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHRoaXMuc2NlbmUucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5uZXcgT2ZmbGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=