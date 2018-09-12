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
        key: "trigger",
        value: function trigger() {
            this.onPick(this);
            this.scene.render();
            this.onPicked(this);
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
            BABYLON.Tags.AddTagsTo(this.mesh, "block");
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
        _classCallCheck(this, Game);

        this.scene = scene;
        this.maps = this.initMaps();
        this.puzzleManager = new _puzzleManager.PuzzleManager();
        this.initPuzzle();
    }

    _createClass(Game, [{
        key: "win",
        value: function win() {
            var meshes = this.scene.getMeshesByTags("entity");
            for (var i = 0; i < meshes.length; i++) {
                this.scene.removeMesh(meshes[i]);
            }
            this.puzzleManager.next();
            this.initPuzzle();
            this.createPuzzle();
            this.updateShadow();
            this.laserbeam.drawLaser();
        }
    }, {
        key: "initPuzzle",
        value: function initPuzzle() {
            this.puzzle = this.puzzleManager.puzzle;
            this.laserbeam = new _Laserbeam.Laserbeam(this.scene, this.puzzle);
            this.laserbeam.onWin = this.win.bind(this);
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
            var self = this;
            self.selectedMesh = {};
            self.needsUnpressing = false;
            this.vrHelper.onControllerMeshLoaded.add(function (webVRController) {
                // var controllerMesh = webVRController.mesh;
                webVRController.onTriggerStateChangedObservable.add(function (a) {

                    if (a.pressed && !self.needsUnpressing) {
                        self.needsUnpressing = true;
                        if (self.selectedMesh.entity) self.selectedMesh.entity.trigger();
                    } else if (!a.pressed && self.needsUnpressing) {
                        self.needsUnpressing = false;
                    }
                });
            });
            this.vrHelper.onNewMeshSelected.add(function (mesh) {
                self.selectedMesh = mesh;
            });
            this.vrHelper.onSelectedMeshUnselected.add(function (mesh) {
                self.selectedMesh = {};
            });

            this.vrHelper.meshSelectionPredicate = function (mesh) {
                if (BABYLON.Tags.MatchesQuery(mesh, "block") || mesh.name == ground.name) {
                    //.name.indexOf("Entity") !== -1) {
                    console.log(mesh.name);
                    return true;
                }
                return false;
            };
            scene.activeCamera.inertia = 0.6;
            scene.activeCamera.speed = 0.5;
            scene.activeCamera.minZ = .1;
            scene.activeCamera.applyGravity = true;
            scene.activeCamera.ellipsoid = new BABYLON.Vector3(.25, .75, .25);
            scene.collisionsEnabled = true;
            scene.activeCamera.checkCollisions = true;

            var textureResolution = 512;
            var textureGround = new BABYLON.DynamicTexture("dynamic texture", {
                width: 512,
                height: 256
            }, scene);
            var textureContext = textureGround.getContext();
            textureGround.hasAlpha = true;
            var materialGround = new BABYLON.StandardMaterial("Mat", scene);
            materialGround.opacityTexture = textureGround;

            //Add text to dynamic texture
            var font = "bold 44px monospace";
            textureGround.drawText("Grass", 75, 135, font, "green", null, true, true);
            var sphere = BABYLON.MeshBuilder.CreatePlane("sphere1", {
                height: 1,
                width: 1
            }, scene);
            sphere.material = materialGround;
            sphere.position.y = 1.5;
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
            var _this = this;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGVNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxhc2VyYmVhbSIsInNjZW5lIiwicHV6emxlIiwib25XaW4iLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImxlbmd0aCIsImxhc2VyIiwibGFzZXJiZWFtTWVzaCIsImdldE1lc2hCeU5hbWUiLCJyZW1vdmVNZXNoIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUdWJlIiwicGF0aCIsInJhZGl1cyIsIlRhZ3MiLCJBZGRUYWdzVG8iLCJtYXRlcmlhbCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJnbCIsIkdsb3dMYXllciIsImN1c3RvbUVtaXNzaXZlQ29sb3JTZWxlY3RvciIsIm1lc2giLCJzdWJNZXNoIiwicmVzdWx0IiwiaW50ZW5zaXR5IiwibmFtZSIsInNldCIsImlzUGlja2FibGUiLCJyYXlEaXJlY3Rpb24iLCJyYXkiLCJSYXkiLCJoaXQiLCJwaWNrV2l0aFJheSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJyZW5kZXIiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsImJhY2tGYWNlQ3VsbGluZyIsImNoZWNrQ29sbGlzaW9ucyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJwdXp6bGVNYW5hZ2VyIiwiUHV6emxlTWFuYWdlciIsImluaXRQdXp6bGUiLCJnZXRNZXNoZXNCeVRhZ3MiLCJpIiwibmV4dCIsImNyZWF0ZVB1enpsZSIsInVwZGF0ZVNoYWRvdyIsImxhc2VyYmVhbSIsImRyYXdMYXNlciIsIndpbiIsImoiLCJWZWN0b3I0IiwiaGVtaUxpZ2h0IiwiSGVtaXNwaGVyaWNMaWdodCIsImRpZmZ1c2UiLCJDb2xvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJzaGFkb3dNaW5aIiwic2hhZG93TWF4WiIsImdlbmVyYXRvciIsIlNoYWRvd0dlbmVyYXRvciIsImZvcmNlQmFja0ZhY2VzT25seSIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJlbmFibGVUZWxlcG9ydGF0aW9uIiwiZmxvb3JNZXNoTmFtZSIsInNlbGYiLCJzZWxlY3RlZE1lc2giLCJuZWVkc1VucHJlc3NpbmciLCJvbkNvbnRyb2xsZXJNZXNoTG9hZGVkIiwiYWRkIiwid2ViVlJDb250cm9sbGVyIiwib25UcmlnZ2VyU3RhdGVDaGFuZ2VkT2JzZXJ2YWJsZSIsImEiLCJwcmVzc2VkIiwidHJpZ2dlciIsIm9uTmV3TWVzaFNlbGVjdGVkIiwib25TZWxlY3RlZE1lc2hVbnNlbGVjdGVkIiwibWVzaFNlbGVjdGlvblByZWRpY2F0ZSIsIk1hdGNoZXNRdWVyeSIsImNvbnNvbGUiLCJsb2ciLCJhY3RpdmVDYW1lcmEiLCJpbmVydGlhIiwic3BlZWQiLCJtaW5aIiwiYXBwbHlHcmF2aXR5IiwiZWxsaXBzb2lkIiwiY29sbGlzaW9uc0VuYWJsZWQiLCJ0ZXh0dXJlUmVzb2x1dGlvbiIsInRleHR1cmVHcm91bmQiLCJEeW5hbWljVGV4dHVyZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dHVyZUNvbnRleHQiLCJnZXRDb250ZXh0IiwiaGFzQWxwaGEiLCJtYXRlcmlhbEdyb3VuZCIsIm9wYWNpdHlUZXh0dXJlIiwiZm9udCIsImRyYXdUZXh0Iiwic3BoZXJlIiwiQ3JlYXRlUGxhbmUiLCJfc2hhZG93TWFwIiwicmVuZGVyTGlzdCIsImFkZFNoYWRvd0Nhc3RlciIsInJlY2VpdmVTaGFkb3dzIiwic3RhcnRMYXNlciIsImVuZGxhc2VyIiwibWlycm9yIiwiQ3JlYXRlVGlsZWRHcm91bmQiLCJ4bWluIiwiem1pbiIsInhtYXgiLCJ6bWF4Iiwic3ViZGl2aXNpb25zIiwiZ3JvdW5kbWF0IiwidVNjYWxlIiwidlNjYWxlIiwid3JhcFUiLCJNSVJST1JfQUREUkVTU01PREUiLCJ3cmFwViIsInNwZWN1bGFyVGV4dHVyZSIsInNwZWN1bGFyQ29sb3IiLCJwdXp6bGVzIiwiY3VycmVudFB1enpsZSIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0Iiwicm5kIiwicmFuZG9tIiwibSIsInJvdGF0ZSIsInYiLCJkZWdyZWVzIiwiY2EiLCJzYSIsIk9mZmxpbmUiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZW5naW5lIiwiRW5naW5lIiwiU2NlbmUiLCJnYW1lIiwiY3JlYXRlU2NlbmUiLCJydW5SZW5kZXJMb29wIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2xGYUEsUyxXQUFBQSxTOztBQUVUO0FBQ0E7QUFD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QWI7QUFDQTtBQUNBaEIsZUFBT21CLElBQVAsR0FBYyxJQUFJbEgsVUFBSixDQUFTLEtBQUt4RyxLQUFkLENBQWQ7O0FBRUEwTixhQUFLQyxXQUFMLENBQWlCLEtBQUszTixLQUF0Qjs7QUFFQSxhQUFLdU4sTUFBTCxDQUFZSyxhQUFaLENBQTBCO0FBQUEsdUJBQU0sTUFBSzVOLEtBQUwsQ0FBV21GLE1BQVgsRUFBTjtBQUFBLFNBQTFCOztBQUVBb0gsZUFBT3NCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS04sTUFBTCxDQUFZTyxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVgsT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgICAgIHRoaXMub25XaW4gPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4uc3RhcnQucG9zKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gc3RhcnQucm90O1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHN0YXJ0LnBvc1swXSArIE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCwgMC41LCBzdGFydC5wb3NbMl0gKyBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDApO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxhc2VyUG9pbnRzID0gW29yaWdpbl07XHJcbiAgICAgICAgbGV0IG5leHRUYXJnZXQgPSBvcmlnaW47XHJcbiAgICAgICAgbGV0IG51bWhvcHMgPSAwO1xyXG4gICAgICAgIGxldCBoaXRTdGF0dXMgPSAwO1xyXG4gICAgICAgIGxldCBsYXN0SGl0O1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbnVtaG9wcysrO1xyXG4gICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCxcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXRcclxuICAgICAgICAgICAgfSA9IHRoaXMuY2FsY3VsYXRlQmVhbShuZXh0VGFyZ2V0LCBkaXJlY3Rpb24sIGxhc3RIaXQpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghIW5leHRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2gobmV4dFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldpbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiAtIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoaGl0U3RhdHVzICE9IDAgJiYgbnVtaG9wcyA8IDI1KTtcclxuXHJcbiAgICAgICAgaWYgKGxhc2VyUG9pbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB2YXIgbGFzZXJiZWFtTWVzaCA9IHRoaXMuc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImxhc2VyYmVhbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKGxhc2VyYmVhbU1lc2gpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubGFzZXIsIFwiZW50aXR5XCIpO1xyXG4gICAgICAgIHRoaXMubGFzZXIubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGFzZXJNYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICB2YXIgZ2wgPSBuZXcgQkFCWUxPTi5HbG93TGF5ZXIoXCJnbG93XCIsIHRoaXMuc2NlbmUpO1xyXG5nbC5jdXN0b21FbWlzc2l2ZUNvbG9yU2VsZWN0b3IgPSBmdW5jdGlvbihtZXNoLCBzdWJNZXNoLCBtYXRlcmlhbCwgcmVzdWx0KSB7XHJcbiAgICBnbC5pbnRlbnNpdHkgPSAuNzU7XHJcbiAgICBpZiAobWVzaC5uYW1lID09PSBcImxhc2VyYmVhbVwiKSB7XHJcbiAgICAgICAgcmVzdWx0LnNldCguMywgMSwgLjMsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuc2V0KDAsIDAsIDAsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIuaXNQaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUJlYW0ob3JpZ2luLCBkaXJlY3Rpb24sIGxhc3RIaXQpIHtcclxuICAgICAgICBsZXQgcmF5RGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSk7XHJcbiAgICAgICAgdmFyIHJheSA9IG5ldyBCQUJZTE9OLlJheShvcmlnaW4sIHJheURpcmVjdGlvbiwgMTAwKTtcclxuICAgICAgICAvLyAgbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIC8vICByYXlIZWxwZXIuc2hvdyh0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksIChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtZXNoLm5hbWUuc3RhcnRzV2l0aChcInN0YXJ0TGFzZXJcIikgfHwgIW1lc2guaXNQaWNrYWJsZSB8fCBtZXNoLm5hbWUgPT09IGxhc3RIaXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoICYmIGhpdC5waWNrZWRNZXNoLmVudGl0eSkge1xyXG4gICAgICAgICAgICBsZXQgcmVmID0gaGl0LnBpY2tlZE1lc2guZ2V0RmFjZXROb3JtYWwoaGl0LmZhY2VJZCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hc2luKEJBQllMT04uVmVjdG9yMy5Dcm9zcyhyZWYsIHJheS5kaXJlY3Rpb24pLnkpICogMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBoaXRTdGF0dXMgPSBoaXQucGlja2VkTWVzaC5lbnRpdHkub25IaXRCeUxhc2VyKGhpdC5mYWNlSWQsIGFuZ2xlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQ6IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdDogaGl0LnBpY2tlZE1lc2gubmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0VGFyZ2V0OiBuZXcgQkFCWUxPTi5WZWN0b3IzKG9yaWdpbi54ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwLCAwLjUsIG9yaWdpbi56ICsgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwKSxcclxuICAgICAgICAgICAgaGl0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBsYXN0SGl0OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIG5hbWUgPSBcImVudGl0eVwiLCByb3RhdGlvbiA9IDApIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYCR7bmFtZX1fJHt0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGh9YDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbOCwgMTAsIDExLCAxMSwgOSwgOCwgMTIsIDEzLCAxNSwgMTUsIDE0LCAxMiwgMSwgMywgNywgNywgNSwgMSwgMTcsIDE2LCAxOCwgMTgsIDE5LCAxNywgMiwgMCwgNCwgNCwgNiwgMl07XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMS4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMubWVzaCA9IG5ldyBCQUJZTE9OLk1lc2godGhpcy5uYW1lLCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInRpbGVzLnBuZ1wiLCB0aGlzLnNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICB0aGlzLm1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLm9uUGlja2VkID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge31cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIHJldHVybiAwOyAvLyBzdG9wXHJcbiAgICB9XHJcbnRyaWdnZXIoKXtcclxuICAgIHRoaXMub25QaWNrKHRoaXMpO1xyXG4gICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbn1cclxuICAgIGJ1aWxkTWVzaCgpIHtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMudmVydGljZXMsIHRoaXMuZmFjZXMsIHRoaXMubm9ybWFscyk7XHJcblxyXG4gICAgICAgIC8vQXNzaWduIHBvc2l0aW9ucyBhbmQgaW5kaWNlcyB0byB2ZXJ0ZXhEYXRhXHJcbiAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuZmFjZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG4gICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy51dnM7XHJcblxyXG4gICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2godGhpcy5tZXNoKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSB0aGlzLm1hdDtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi50aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm1lc2guY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCh0aGlzKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMsIHRoaXMubWVzaCkpKTtcclxuICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMucm90YXRpb24gKiBNYXRoLlBJIC8gMjtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubWVzaCwgXCJlbnRpdHlcIik7XHJcbiAgICAgICAgQkFCWUxPTi5UYWdzLkFkZFRhZ3NUbyh0aGlzLm1lc2gsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGhpcy5tZXNoLmVudGl0eSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2g7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhc2VyIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQsIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgcm90YXRpb24gPSAocm90YXRpb24gLSAxKSAlIDQ7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0ID8gXCJzdGFydExhc2VyXCIgOiBcImVuZExhc2VyXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gISFpc1N0YXJ0O1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzAsIDIsIDMsIDMsIDEsIDAsIDQsIDUsIDcsIDcsIDYsIDQsIDE2LCAxNywgMTksIDE5LCAxOCwgMTYsIDEzLCAxMiwgMTQsIDE0LCAxNSwgMTMsIDksIDgsIDEwLCAxMCwgMTEsIDldO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwgMC43NSwgMC4yNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDEuMCwgMC4yNSwgMC43NSwgMC41LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjc1LCAxLjAsIDAuNSwgMC43NSwgMC43NSwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjAsIDAuNzUsIDAuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoKGZhY2VJZCA9PT0gNSB8fCBmYWNlSWQgPT09IDQpICYmICF0aGlzLmlzU3RhcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDM7IC8vIHdpbm5lcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXJyb3IgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIFwibWlycm9yXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzYsIDgsIDksIDksIDcsIDYsIDQsIDEsIDMsIDMsIDUsIDQsIDExLCAxMCwgMTIsIDIsIDAsIDQsIDQsIDUsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMCwgMC43NSwgMC4yNSwgMC41LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjAsIDAuNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuMjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjUsIDAuMCwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMC41XTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSBNYXRoLlBJICogdGhpcy5yb3RhdGlvbiAvIDI7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIGlmIChmYWNlSWQgPT09IDAgfHwgZmFjZUlkID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMCwwLjI1LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41XTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVNYW5hZ2VyXHJcbn0gZnJvbSBcIi4vcHV6emxlTWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm1hcHMgPSB0aGlzLmluaXRNYXBzKCk7XHJcbiAgICAgICAgdGhpcy5wdXp6bGVNYW5hZ2VyID0gbmV3IFB1enpsZU1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRQdXp6bGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgd2luKCkge1xyXG4gICAgICAgIHZhciBtZXNoZXMgPSB0aGlzLnNjZW5lLmdldE1lc2hlc0J5VGFncyhcImVudGl0eVwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZU1lc2gobWVzaGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wdXp6bGVNYW5hZ2VyLm5leHQoKTtcclxuICAgICAgICB0aGlzLmluaXRQdXp6bGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVB1enpsZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFB1enpsZSgpIHtcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHRoaXMucHV6emxlTWFuYWdlci5wdXp6bGU7XHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0gPSBuZXcgTGFzZXJiZWFtKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5vbldpbiA9IHRoaXMud2luLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1hcHMoKSB7XHJcbiAgICAgICAgbGV0IG1hcHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIG1hcHMucHVzaChuZXcgQkFCWUxPTi5WZWN0b3I0KGkgLyA0LCBqIC8gNCwgaSAvIDQgKyAwLjI1LCBqIC8gNCArIDAuMjUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwcztcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTY2VuZShzY2VuZSkge1xyXG4gICAgICAgIHZhciBoZW1pTGlnaHQgPSBuZXcgQkFCWUxPTi5IZW1pc3BoZXJpY0xpZ2h0KFwiSGVtaUxpZ2h0XCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgMSwgMCksIHNjZW5lKTtcclxuICAgICAgICBoZW1pTGlnaHQuZGlmZnVzZSA9IG5ldyBCQUJZTE9OLkNvbG9yMyguMiwgLjQsIC41KTtcclxuXHJcblxyXG4gICAgICAgIHZhciBsaWdodCA9IG5ldyBCQUJZTE9OLkRpcmVjdGlvbmFsTGlnaHQoXCJsaWdodDJcIiwgbmV3IEJBQllMT04uVmVjdG9yMygtMiwgLTMsIDEpLCBzY2VuZSk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDYsIDksIDMpO1xyXG4gICAgICAgIGxpZ2h0LnNoYWRvd01pblogPSAxO1xyXG4gICAgICAgIGxpZ2h0LnNoYWRvd01heFogPSAyMDtcclxuICAgICAgICBsaWdodC5pbnRlbnNpdHkgPSA1O1xyXG5cclxuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gbmV3IEJBQllMT04uU2hhZG93R2VuZXJhdG9yKDIwNDgsIGxpZ2h0KTtcclxuXHJcbiAgICAgICAgZ2VuZXJhdG9yLmZvcmNlQmFja0ZhY2VzT25seSA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAvL1RpbGVzOlxyXG4gICAgICAgIC8vIDA6IEdyb3VuZFxyXG4gICAgICAgIC8vIDE6IFdhbGxcclxuICAgICAgICAvLyAyOlxyXG4gICAgICAgIC8vIDM6IExhc2VyXHJcbiAgICAgICAgLy8gNDpcclxuICAgICAgICAvLyA1OlxyXG4gICAgICAgIC8vIDY6XHJcbiAgICAgICAgLy8gNzpcclxuICAgICAgICAvLyA4OlxyXG4gICAgICAgIC8vIDk6XHJcbiAgICAgICAgLy8gMTA6XHJcbiAgICAgICAgLy8gMTE6XHJcbiAgICAgICAgLy8gMTI6XHJcbiAgICAgICAgLy8gMTM6XHJcbiAgICAgICAgLy8gMTQ6XHJcbiAgICAgICAgLy8gMTU6XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIgPSBzY2VuZS5jcmVhdGVEZWZhdWx0VlJFeHBlcmllbmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY3JlYXRlUHV6emxlKCk7XHJcblxyXG4gICAgICAgIGxldCBncm91bmQgPSBuZXcgR3JvdW5kKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBzY2VuZS5ncmF2aXR5ID0gbmV3IEJBQllMT04uVmVjdG9yMygwLCAtOS44MSwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlSW50ZXJhY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogZ3JvdW5kLm5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2ggPSB7fTtcclxuICAgICAgICBzZWxmLm5lZWRzVW5wcmVzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIub25Db250cm9sbGVyTWVzaExvYWRlZC5hZGQoKHdlYlZSQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyB2YXIgY29udHJvbGxlck1lc2ggPSB3ZWJWUkNvbnRyb2xsZXIubWVzaDtcclxuICAgICAgICAgICAgd2ViVlJDb250cm9sbGVyLm9uVHJpZ2dlclN0YXRlQ2hhbmdlZE9ic2VydmFibGUuYWRkKChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChhLnByZXNzZWQgJiYgIXNlbGYubmVlZHNVbnByZXNzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2VsZWN0ZWRNZXNoLmVudGl0eSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaC5lbnRpdHkudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghYS5wcmVzc2VkICYmIHNlbGYubmVlZHNVbnByZXNzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLm9uTmV3TWVzaFNlbGVjdGVkLmFkZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaCA9IG1lc2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5vblNlbGVjdGVkTWVzaFVuc2VsZWN0ZWQuYWRkKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRNZXNoID0ge307XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIubWVzaFNlbGVjdGlvblByZWRpY2F0ZSA9IChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChCQUJZTE9OLlRhZ3MuTWF0Y2hlc1F1ZXJ5KG1lc2gsIFwiYmxvY2tcIil8fCBtZXNoLm5hbWU9PSBncm91bmQubmFtZSkgeyAvLy5uYW1lLmluZGV4T2YoXCJFbnRpdHlcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNoLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuaW5lcnRpYSA9IDAuNjtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuc3BlZWQgPSAwLjU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLm1pblogPSAuMTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMyguMjUsIC43NSwgLjI1KTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0dXJlUmVzb2x1dGlvbiA9IDUxMjtcclxuICAgICAgICB2YXIgdGV4dHVyZUdyb3VuZCA9IG5ldyBCQUJZTE9OLkR5bmFtaWNUZXh0dXJlKFwiZHluYW1pYyB0ZXh0dXJlXCIsIHtcclxuICAgICAgICAgICAgd2lkdGg6IDUxMixcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTZcclxuICAgICAgICB9LCBzY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmVDb250ZXh0ID0gdGV4dHVyZUdyb3VuZC5nZXRDb250ZXh0KCk7XHJcbiAgICAgICAgdGV4dHVyZUdyb3VuZC5oYXNBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1hdGVyaWFsR3JvdW5kID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIk1hdFwiLCBzY2VuZSk7XHJcbiAgICAgICAgbWF0ZXJpYWxHcm91bmQub3BhY2l0eVRleHR1cmUgPSB0ZXh0dXJlR3JvdW5kO1xyXG5cclxuXHJcbiAgICAgICAgLy9BZGQgdGV4dCB0byBkeW5hbWljIHRleHR1cmVcclxuICAgICAgICB2YXIgZm9udCA9IFwiYm9sZCA0NHB4IG1vbm9zcGFjZVwiO1xyXG4gICAgICAgIHRleHR1cmVHcm91bmQuZHJhd1RleHQoXCJHcmFzc1wiLCA3NSwgMTM1LCBmb250LCBcImdyZWVuXCIsIG51bGwsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVBsYW5lKFwic3BoZXJlMVwiLCB7XHJcbiAgICAgICAgICAgIGhlaWdodDogMSxcclxuICAgICAgICAgICAgd2lkdGg6IDFcclxuICAgICAgICB9LCBzY2VuZSk7XHJcbiAgICAgICAgc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxHcm91bmQ7XHJcbiAgICAgICAgc3BoZXJlLnBvc2l0aW9uLnkgPSAxLjU7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkb3coKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IuX3NoYWRvd01hcC5yZW5kZXJMaXN0ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZS5tZXNoZXNbaV0ubmFtZSAhPSBcIlRpbGVkIEdyb3VuZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIodGhpcy5zY2VuZS5tZXNoZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUubWVzaGVzW2ldLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHV6emxlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0TGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0cnVlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnJvdCA9IChzdGFydC5yb3QgKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRsYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIGZhbHNlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZGxhc2VyLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlycm9yID0gbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWlycm9yLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2FsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdhbGwodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcblxyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHV6emxlcyA9IFtcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOls0LjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAwLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTIuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlstMy4wLCAwLjUsIDUuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIDIuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIDEuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMS4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6WzEuMCwgMC41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAwLjBdLHJvdDoxLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtNC4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMi4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC00LjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOlsyLjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy00LjAsIDAuNSwgLTYuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtNy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOls0LjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzQuMCwgMC41LCAtNi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0zLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtNS4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTYuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC02LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtN10scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC03XSxyb3Q6Mix9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAtMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjEsfSxdLFxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFt7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnZW5kJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFsxLCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gXSxcclxuICAgICAgICAgICAgLy8gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMS41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzMsIDIuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIF1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUgPSAod2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVsxXSB8fCAwKS0xO1xyXG4gICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHV6emxlKys7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSB0aGlzLnB1enpsZXNbdGhpcy5jdXJyZW50UHV6emxlXTtcclxuICAgIH1cclxufSIsIndpbmRvdy5ybmQgPSBtID0+IH5+KE1hdGgucmFuZG9tKCkgKiBtKTtcclxuXHJcbndpbmRvdy5yb3RhdGUgPSAodiwgZGVncmVlcykgPT4ge1xyXG4gICAgdmFyIGNhID0gTWF0aC5jb3MoZGVncmVlcyk7XHJcbiAgICB2YXIgc2EgPSBNYXRoLnNpbihkZWdyZWVzKTtcclxuICAgIHJldHVybiBuZXcgQkFCWUxPTi5WZWN0b3IzKGNhICogdi54IC0gc2EgKiB2LnosIDAsIC1zYSAqIHYueCArIGNhICogdi56KTtcclxufSIsImltcG9ydCAnLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XHJcblxyXG5jbGFzcyBPZmZsaW5lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKHRoaXMuZW5naW5lKTtcclxuICAgICAgICAvL3RoaXMuc2NlbmUuZGVidWdMYXllci5zaG93KCk7XHJcbiAgICAgICAgd2luZG93LmdhbWUgPSBuZXcgR2FtZSh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgZ2FtZS5jcmVhdGVTY2VuZSh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5lbmdpbmUucmVzaXplKCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubmV3IE9mZmxpbmUoKTsiXSwic291cmNlUm9vdCI6IiJ9