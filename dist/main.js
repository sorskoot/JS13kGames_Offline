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
    // 4 hitting portal

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
                var nextTarget = hit.pickedMesh.position;
                if (hitStatus === 0) {
                    nextTarget = hit.pickedPoint;
                }
                return {
                    nextTarget: nextTarget,
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

        this.vertices = [-0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5];
        this.faces = [0, 2, 3, 3, 1, 0, 8, 9, 11, 11, 10, 8, 19, 20, 21, 21, 4, 19, 22, 23, 7, 7, 5, 22, 13, 12, 14, 14, 15, 13, 17, 16, 18, 18, 6, 17];
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

/***/ "./src/classes/entities/portal.js":
/*!****************************************!*\
  !*** ./src/classes/entities/portal.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Portal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(/*! ./entity */ "./src/classes/entities/entity.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Portal = exports.Portal = function (_Entity) {
    _inherits(Portal, _Entity);

    function Portal(scene, position, rotation) {
        _classCallCheck(this, Portal);

        var _this = _possibleConstructorReturn(this, (Portal.__proto__ || Object.getPrototypeOf(Portal)).call(this, scene, position, "portal", rotation));

        _this.uvs = [0.5, 0.75, 0.25, 0.75, 0.5, 1.0, 0.25, 1.0, 0.25, 1.0, 0.25, 1.0, 0.25, 0.75, 0.5, 1.0, 0.25, 0.75, 0.5, 0.75, 0.25, 1.0, 0.5, 1.0, 0.5, 0.75, 0.25, 0.75, 0.5, 1.0, 0.25, 1.0, 0.5, 0.5, 0.25, 0.5, 0.5, 0.75, 0.25, 0.75, 0.5, 0.75, 0.5, 1.0, 0.25, 0.75, 0.5, 0.75];

        _this.buildMesh();

        _this.onPick = function () {
            return _this.mesh.rotation.y = _this.mesh.rotation.y + Math.PI / 2;
        };
        return _this;
    }

    _createClass(Portal, [{
        key: 'onHitByLaser',
        value: function onHitByLaser(faceId) {
            if (faceId === 10 || faceId === 11) {
                console.log('hit portal');
                //return 4; //portal
                return 0;
            } else {
                return 0; //stop
            }
        }
    }]);

    return Portal;
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

        _this.uvs = [0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5, 0.0, 0.5, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.0, 0.25, 0.25, 0.25, 0.0, 0.5, 0.25, 0.5, 0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5, 0.5, 0.0, 0.25, 0.0, 0.5, 0.25, 0.0, 0.25, 0.25, 0.25, 0.25, 0.5, 0.25, 0.0, 0.5, 0.0];
        _this.rotation = rnd(4);
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

var _portal = __webpack_require__(/*! ./entities/portal */ "./src/classes/entities/portal.js");

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

            var generator = new BABYLON.ShadowGenerator(4096, light);

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

            this.vrHelper.enableTeleportation({
                floorMeshName: ground.name
            });

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
            // var font = "bold 44px monospace";
            // textureGround.drawText("Grass", 75, 135, font, "green", null, true, true);
            // var sphere = BABYLON.MeshBuilder.CreatePlane("sphere1", {
            //     height: 1,
            //     width: 1
            // }, scene);
            // sphere.material = materialGround;
            // sphere.position.y = 1.5;
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
                    case 'portal':
                        var portal = new _portal.Portal(this.scene, this.puzzle[i].pos, this.puzzle[i].rot);
                        portal.onPicked = function () {
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

        this.puzzles = [[{ type: 'start', pos: [4.0, 0.5, 0.0], rot: 1 }, { type: 'end', pos: [-4.0, 0.5, 0.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'end', pos: [-2.0, 0.5, 0.0], rot: 3 }, { type: 'mirror', pos: [-2.0, 0.5, 3.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [-2.0, 0.5, -2.0], rot: 3 }, { type: 'end', pos: [-2.0, 0.5, 3.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [2.0, 0.5, -2.0], rot: 3 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-3.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 1.5, 3.0], rot: 1 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, -1.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, 1.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 2.0], rot: 1 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, 1.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'mirror', pos: [1.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [-3.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [3.0, 0.5, 2.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -3.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 0.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 1.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 2.0], rot: 1 }, { type: 'mirror', pos: [1.0, 0.5, -3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, -4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, -2.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, -1.0], rot: 1 }, { type: 'wall', pos: [0.0, 2.5, 0.0], rot: 1 }], [{ type: 'start', pos: [0.0, 0.5, 0.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -1.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -1.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, 0.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, 1.0], rot: 3 }, { type: 'mirror', pos: [-3.0, 0.5, 0.0], rot: 3 }, { type: 'mirror', pos: [-3.0, 0.5, -2.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -2.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -4.0], rot: 3 }, { type: 'end', pos: [0.0, 0.5, -4.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -3.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -5.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [0.0, 0.5, -3.0], rot: 3 }, { type: 'wall', pos: [0.0, 1.5, -4.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [-2.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [-3.0, 0.5, 1.0], rot: 3 }, { type: 'wall', pos: [1.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [2.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [3.0, 0.5, -5.0], rot: 3 }, { type: 'wall', pos: [1.0, 0.5, 0.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, -4.0], rot: 3 }], [{ type: 'start', pos: [2.0, 0.5, 3.0], rot: 1 }, { type: 'end', pos: [-4.0, 0.5, 3.0], rot: 3 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 2 }, { type: 'mirror', pos: [2.0, 0.5, -2.0], rot: 2 }, { type: 'mirror', pos: [-4.0, 0.5, -6.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -2.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 0.5, -7.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -2.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -2.0], rot: 2 }, { type: 'mirror', pos: [4.0, 0.5, -2.0], rot: 2 }, { type: 'mirror', pos: [4.0, 0.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -3.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -4.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -5.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -6.0], rot: 2 }, { type: 'wall', pos: [-1.0, 2.5, -7], rot: 2 }, { type: 'wall', pos: [-1.0, 1.5, -7], rot: 2 }], [{ type: 'start', pos: [-3.0, 0.5, 5.0], rot: 3 }, { type: 'end', pos: [3.0, 0.5, 5.0], rot: 1 }, { type: 'mirror', pos: [-3.0, 0.5, -1.0], rot: 3 }, { type: 'mirror', pos: [3.0, 0.5, -1.0], rot: 1 }, { type: 'portal', pos: [0.0, 0.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 0.5, 3.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 5.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 4.0], rot: 1 }, { type: 'wall', pos: [0.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-2.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-3.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-4.0, 1.5, 3.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 0.5, -2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, -1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, -2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 1.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 2.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, 0.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, -1.0], rot: 1 }, { type: 'wall', pos: [-1.0, 2.5, -2.0], rot: 1 }]];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvcG9ydGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcHV6emxlTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMYXNlcmJlYW0iLCJzY2VuZSIsInB1enpsZSIsIm9uV2luIiwic3RhcnQiLCJmaW5kIiwiYiIsInR5cGUiLCJvcmlnaW4iLCJCQUJZTE9OIiwiVmVjdG9yMyIsInBvcyIsImRpcmVjdGlvbiIsInJvdCIsInRhcmdldCIsIk1hdGgiLCJzaW4iLCJQSSIsImNvcyIsImxhc2VyUG9pbnRzIiwibmV4dFRhcmdldCIsIm51bWhvcHMiLCJoaXRTdGF0dXMiLCJsYXN0SGl0IiwiY2FsY3VsYXRlQmVhbSIsInB1c2giLCJsZW5ndGgiLCJsYXNlciIsImxhc2VyYmVhbU1lc2giLCJnZXRNZXNoQnlOYW1lIiwicmVtb3ZlTWVzaCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJUYWdzIiwiQWRkVGFnc1RvIiwibWF0ZXJpYWwiLCJTdGFuZGFyZE1hdGVyaWFsIiwiZ2wiLCJHbG93TGF5ZXIiLCJjdXN0b21FbWlzc2l2ZUNvbG9yU2VsZWN0b3IiLCJtZXNoIiwic3ViTWVzaCIsInJlc3VsdCIsImludGVuc2l0eSIsIm5hbWUiLCJzZXQiLCJpc1BpY2thYmxlIiwicmF5RGlyZWN0aW9uIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJzdGFydHNXaXRoIiwicGlja2VkTWVzaCIsImVudGl0eSIsInJlZiIsImdldEZhY2V0Tm9ybWFsIiwiZmFjZUlkIiwiYW5nbGUiLCJyb3VuZCIsImFzaW4iLCJDcm9zcyIsInkiLCJvbkhpdEJ5TGFzZXIiLCJwb3NpdGlvbiIsInBpY2tlZFBvaW50IiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJyZW5kZXIiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsImJhY2tGYWNlQ3VsbGluZyIsImNoZWNrQ29sbGlzaW9ucyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiUG9ydGFsIiwiY29uc29sZSIsImxvZyIsIldhbGwiLCJybmQiLCJHYW1lIiwibWFwcyIsImluaXRNYXBzIiwicHV6emxlTWFuYWdlciIsIlB1enpsZU1hbmFnZXIiLCJpbml0UHV6emxlIiwiZ2V0TWVzaGVzQnlUYWdzIiwiaSIsIm5leHQiLCJjcmVhdGVQdXp6bGUiLCJ1cGRhdGVTaGFkb3ciLCJsYXNlcmJlYW0iLCJkcmF3TGFzZXIiLCJ3aW4iLCJqIiwiVmVjdG9yNCIsImhlbWlMaWdodCIsIkhlbWlzcGhlcmljTGlnaHQiLCJkaWZmdXNlIiwiQ29sb3IzIiwibGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0Iiwic2hhZG93TWluWiIsInNoYWRvd01heFoiLCJnZW5lcmF0b3IiLCJTaGFkb3dHZW5lcmF0b3IiLCJmb3JjZUJhY2tGYWNlc09ubHkiLCJ2ckhlbHBlciIsImNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UiLCJncm91bmQiLCJHcm91bmQiLCJncmF2aXR5IiwiZW5hYmxlSW50ZXJhY3Rpb25zIiwic2VsZiIsInNlbGVjdGVkTWVzaCIsIm5lZWRzVW5wcmVzc2luZyIsIm9uQ29udHJvbGxlck1lc2hMb2FkZWQiLCJhZGQiLCJ3ZWJWUkNvbnRyb2xsZXIiLCJvblRyaWdnZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlIiwiYSIsInByZXNzZWQiLCJ0cmlnZ2VyIiwib25OZXdNZXNoU2VsZWN0ZWQiLCJvblNlbGVjdGVkTWVzaFVuc2VsZWN0ZWQiLCJtZXNoU2VsZWN0aW9uUHJlZGljYXRlIiwiTWF0Y2hlc1F1ZXJ5IiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwibWluWiIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiZW5hYmxlVGVsZXBvcnRhdGlvbiIsImZsb29yTWVzaE5hbWUiLCJ0ZXh0dXJlUmVzb2x1dGlvbiIsInRleHR1cmVHcm91bmQiLCJEeW5hbWljVGV4dHVyZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dHVyZUNvbnRleHQiLCJnZXRDb250ZXh0IiwiaGFzQWxwaGEiLCJtYXRlcmlhbEdyb3VuZCIsIm9wYWNpdHlUZXh0dXJlIiwiX3NoYWRvd01hcCIsInJlbmRlckxpc3QiLCJhZGRTaGFkb3dDYXN0ZXIiLCJyZWNlaXZlU2hhZG93cyIsInN0YXJ0TGFzZXIiLCJlbmRsYXNlciIsIm1pcnJvciIsInBvcnRhbCIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsImdyb3VuZG1hdCIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhclRleHR1cmUiLCJzcGVjdWxhckNvbG9yIiwicHV6emxlcyIsImN1cnJlbnRQdXp6bGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LEVBQWtDO0FBQUEsdUJBQU0sTUFBS04sTUFBTCxDQUFZTyxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVgsT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuICAgIC8vIDQgaGl0dGluZyBwb3J0YWxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgICAgIHRoaXMub25XaW4gPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4uc3RhcnQucG9zKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gc3RhcnQucm90O1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHN0YXJ0LnBvc1swXSArIE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCwgMC41LCBzdGFydC5wb3NbMl0gKyBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDApO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxhc2VyUG9pbnRzID0gW29yaWdpbl07XHJcbiAgICAgICAgbGV0IG5leHRUYXJnZXQgPSBvcmlnaW47XHJcbiAgICAgICAgbGV0IG51bWhvcHMgPSAwO1xyXG4gICAgICAgIGxldCBoaXRTdGF0dXMgPSAwO1xyXG4gICAgICAgIGxldCBsYXN0SGl0O1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbnVtaG9wcysrO1xyXG4gICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCxcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXRcclxuICAgICAgICAgICAgfSA9IHRoaXMuY2FsY3VsYXRlQmVhbShuZXh0VGFyZ2V0LCBkaXJlY3Rpb24sIGxhc3RIaXQpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghIW5leHRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2gobmV4dFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldpbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiAtIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoaGl0U3RhdHVzICE9IDAgJiYgbnVtaG9wcyA8IDI1KTtcclxuXHJcbiAgICAgICAgaWYgKGxhc2VyUG9pbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB2YXIgbGFzZXJiZWFtTWVzaCA9IHRoaXMuc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImxhc2VyYmVhbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKGxhc2VyYmVhbU1lc2gpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubGFzZXIsIFwiZW50aXR5XCIpO1xyXG4gICAgICAgIHRoaXMubGFzZXIubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGFzZXJNYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICB2YXIgZ2wgPSBuZXcgQkFCWUxPTi5HbG93TGF5ZXIoXCJnbG93XCIsIHRoaXMuc2NlbmUpO1xyXG5nbC5jdXN0b21FbWlzc2l2ZUNvbG9yU2VsZWN0b3IgPSBmdW5jdGlvbihtZXNoLCBzdWJNZXNoLCBtYXRlcmlhbCwgcmVzdWx0KSB7XHJcbiAgICBnbC5pbnRlbnNpdHkgPSAuNzU7XHJcbiAgICBpZiAobWVzaC5uYW1lID09PSBcImxhc2VyYmVhbVwiKSB7XHJcbiAgICAgICAgcmVzdWx0LnNldCguMywgMSwgLjMsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuc2V0KDAsIDAsIDAsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIuaXNQaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUJlYW0ob3JpZ2luLCBkaXJlY3Rpb24sIGxhc3RIaXQpIHtcclxuICAgICAgICBsZXQgcmF5RGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSk7XHJcbiAgICAgICAgdmFyIHJheSA9IG5ldyBCQUJZTE9OLlJheShvcmlnaW4sIHJheURpcmVjdGlvbiwgMTAwKTtcclxuICAgICAgICAvLyAgbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIC8vICByYXlIZWxwZXIuc2hvdyh0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksIChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtZXNoLm5hbWUuc3RhcnRzV2l0aChcInN0YXJ0TGFzZXJcIikgfHwgIW1lc2guaXNQaWNrYWJsZSB8fCBtZXNoLm5hbWUgPT09IGxhc3RIaXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoICYmIGhpdC5waWNrZWRNZXNoLmVudGl0eSkge1xyXG4gICAgICAgICAgICBsZXQgcmVmID0gaGl0LnBpY2tlZE1lc2guZ2V0RmFjZXROb3JtYWwoaGl0LmZhY2VJZCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hc2luKEJBQllMT04uVmVjdG9yMy5Dcm9zcyhyZWYsIHJheS5kaXJlY3Rpb24pLnkpICogMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBoaXRTdGF0dXMgPSBoaXQucGlja2VkTWVzaC5lbnRpdHkub25IaXRCeUxhc2VyKGhpdC5mYWNlSWQsIGFuZ2xlKTtcclxuICAgICAgICAgICAgbGV0IG5leHRUYXJnZXQgPSBoaXQucGlja2VkTWVzaC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgaWYoaGl0U3RhdHVzID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0ID0gaGl0LnBpY2tlZFBvaW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0OiBuZXh0VGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdDogaGl0LnBpY2tlZE1lc2gubmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0VGFyZ2V0OiBuZXcgQkFCWUxPTi5WZWN0b3IzKG9yaWdpbi54ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwLCAwLjUsIG9yaWdpbi56ICsgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwKSxcclxuICAgICAgICAgICAgaGl0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBsYXN0SGl0OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIG5hbWUgPSBcImVudGl0eVwiLCByb3RhdGlvbiA9IDApIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYCR7bmFtZX1fJHt0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGh9YDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LDAuNSwtMC41LDAuNSwtMC41LDAuNSwtMC41LDAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsMC41LDAuNSwwLjUsLTAuNSwwLjUsLTAuNSwwLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LDAuNSwwLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LC0wLjUsMC41LC0wLjUsMC41LDAuNSwwLjUsMC41LDAuNSwtMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LC0wLjUsMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwwLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbMCwyLDMsIDMsMSwwLCA4LDksMTEsIDExLDEwLDgsIDE5LDIwLDIxLCAyMSw0LDE5LCAyMiwyMyw3LCA3LDUsMjIsIDEzLDEyLDE0LCAxNCwxNSwxMywgMTcsMTYsMTgsIDE4LDYsMTddO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzEuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoKHRoaXMubmFtZSwgdGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIm1hdFwiLCB0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdGhpcy5tYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5vblBpY2tlZCA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHt9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICByZXR1cm4gMDsgLy8gc3RvcFxyXG4gICAgfVxyXG50cmlnZ2VyKCl7XHJcbiAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XHJcbiAgICB0aGlzLm9uUGlja2VkKHRoaXMpO1xyXG59XHJcbiAgICBidWlsZE1lc2goKSB7XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICB2YXIgdmVydGV4RGF0YSA9IG5ldyBCQUJZTE9OLlZlcnRleERhdGEoKTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGlvbnMgb2Ygbm9ybWFscyBhZGRlZFxyXG4gICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyh0aGlzLnZlcnRpY2VzLCB0aGlzLmZhY2VzLCB0aGlzLm5vcm1hbHMpO1xyXG5cclxuICAgICAgICAvL0Fzc2lnbiBwb3NpdGlvbnMgYW5kIGluZGljZXMgdG8gdmVydGV4RGF0YVxyXG4gICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy52ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLmZhY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IHRoaXMubm9ybWFscztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnV2cyA9IHRoaXMudXZzO1xyXG5cclxuICAgICAgICAvL0FwcGx5IHZlcnRleERhdGEgdG8gY3VzdG9tIG1lc2hcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmFwcGx5VG9NZXNoKHRoaXMubWVzaCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gdGhpcy5tYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4udGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzLCB0aGlzLm1lc2gpKSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLnJvdGF0aW9uICogTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgQkFCWUxPTi5UYWdzLkFkZFRhZ3NUbyh0aGlzLm1lc2gsIFwiZW50aXR5XCIpO1xyXG4gICAgICAgIEJBQllMT04uVGFncy5BZGRUYWdzVG8odGhpcy5tZXNoLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRoaXMubWVzaC5lbnRpdHkgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXNlciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0LCByb3RhdGlvbikge1xyXG4gICAgICAgIHJvdGF0aW9uID0gKHJvdGF0aW9uIC0gMSkgJSA0O1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCA/IFwic3RhcnRMYXNlclwiIDogXCJlbmRMYXNlclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9ICEhaXNTdGFydDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFswLCAyLCAzLCAzLCAxLCAwLCA0LCA1LCA3LCA3LCA2LCA0LCAxNiwgMTcsIDE5LCAxOSwgMTgsIDE2LCAxMywgMTIsIDE0LCAxNCwgMTUsIDEzLCA5LCA4LCAxMCwgMTAsIDExLCA5XTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAxLjAsIDAuMjUsIDAuNzUsIDAuNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC41LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC43NSwgMS4wLCAwLjUsIDAuNzUsIDAuNzUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC4wLCAwLjc1LCAwLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4gdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLm1lc2gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKChmYWNlSWQgPT09IDUgfHwgZmFjZUlkID09PSA0KSAmJiAhdGhpcy5pc1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzOyAvLyB3aW5uZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vc3RvcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBcIm1pcnJvclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs2LCA4LCA5LCA5LCA3LCA2LCA0LCAxLCAzLCAzLCA1LCA0LCAxMSwgMTAsIDEyLCAyLCAwLCA0LCA0LCA1LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjAsIDAuNzUsIDAuMjUsIDAuNSwgMC4yNSwgMC43NSwgMC4yNSwgMC43NSwgMC4wLCAwLjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjI1LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC41LCAwLjAsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNV07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5yb3RhdGlvbi55ID0gTWF0aC5QSSAqIHRoaXMucm90YXRpb24gLyAyO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoZmFjZUlkID09PSAwIHx8IGZhY2VJZCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc2guZ2V0RmFjZXROb3JtYWwoZmFjZUlkKTtcclxuICAgICAgICAgICAgaWYgKGFuZ2xlID4gMCkgcmV0dXJuIDE7IC8vIGxlZnRcclxuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgMCkgcmV0dXJuIDI7IC8vIHJpZ2h0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vc3RvcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUscG9zaXRpb24sXCJwb3J0YWxcIiwgcm90YXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwwLjc1LCAwLjI1LDAuNzUsIDAuNSwxLjAsIDAuMjUsMS4wLCAwLjI1LDEuMCwgMC4yNSwxLjAsIDAuMjUsMC43NSwgMC41LDEuMCwgMC4yNSwwLjc1LCAwLjUsMC43NSwgMC4yNSwxLjAsIDAuNSwxLjAsIDAuNSwwLjc1LCAwLjI1LDAuNzUsIDAuNSwxLjAsIDAuMjUsMS4wLCAwLjUsMC41LCAwLjI1LDAuNSwgMC41LDAuNzUsIDAuMjUsMC43NSwgMC41LDAuNzUsIDAuNSwxLjAsIDAuMjUsMC43NSwgMC41LDAuNzVdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkKSB7XHJcbiAgICAgICAgaWYgKGZhY2VJZCA9PT0gMTAgfHwgZmFjZUlkID09PSAxMSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2hpdCBwb3J0YWwnKTtcclxuICAgICAgICAgIC8vcmV0dXJuIDQ7IC8vcG9ydGFsXHJcbiAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWxsIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcIndhbGxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC4yNSwwLjI1LCAwLjAsMC4yNSwgMC4yNSwwLjUsIDAuMCwwLjUsIDAuMCwwLjUsIDAuMjUsMC4yNSwgMC4yNSwwLjI1LCAwLjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjUsMC4wLCAwLjI1LDAuMCwgMC41LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuMjUsIDAuMjUsMC41LCAwLjI1LDAuMCwgMC41LDAuMF07XHJcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IHJuZCg0KTtcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBQdXp6bGVNYW5hZ2VyXHJcbn0gZnJvbSBcIi4vcHV6emxlTWFuYWdlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgV2FsbFxyXG59IGZyb20gXCIuL2VudGl0aWVzL3dhbGxcIjtcclxuaW1wb3J0IHtcclxuICAgIE1pcnJvclxyXG59IGZyb20gXCIuL2VudGl0aWVzL21pcnJvclwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJcclxufSBmcm9tIFwiLi9lbnRpdGllcy9sYXNlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgR3JvdW5kXHJcbn0gZnJvbSBcIi4vZ3JvdW5kXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlcmJlYW1cclxufSBmcm9tIFwiLi9MYXNlcmJlYW1cIjtcclxuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSBcIi4vZW50aXRpZXMvcG9ydGFsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5tYXBzID0gdGhpcy5pbml0TWFwcygpO1xyXG4gICAgICAgIHRoaXMucHV6emxlTWFuYWdlciA9IG5ldyBQdXp6bGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0UHV6emxlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdpbigpIHtcclxuICAgICAgICB2YXIgbWVzaGVzID0gdGhpcy5zY2VuZS5nZXRNZXNoZXNCeVRhZ3MoXCJlbnRpdHlcIik7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZXNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKG1lc2hlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHV6emxlTWFuYWdlci5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0UHV6emxlKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQdXp6bGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQdXp6bGUoKSB7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSB0aGlzLnB1enpsZU1hbmFnZXIucHV6emxlO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtID0gbmV3IExhc2VyYmVhbSh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZSk7XHJcbiAgICAgICAgdGhpcy5sYXNlcmJlYW0ub25XaW4gPSB0aGlzLndpbi5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRNYXBzKCkge1xyXG4gICAgICAgIGxldCBtYXBzID0gW107XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBzLnB1c2gobmV3IEJBQllMT04uVmVjdG9yNChpIC8gNCwgaiAvIDQsIGkgLyA0ICsgMC4yNSwgaiAvIDQgKyAwLjI1KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1hcHM7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU2NlbmUoc2NlbmUpIHtcclxuICAgICAgICB2YXIgaGVtaUxpZ2h0ID0gbmV3IEJBQllMT04uSGVtaXNwaGVyaWNMaWdodChcIkhlbWlMaWdodFwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIDEsIDApLCBzY2VuZSk7XHJcbiAgICAgICAgaGVtaUxpZ2h0LmRpZmZ1c2UgPSBuZXcgQkFCWUxPTi5Db2xvcjMoLjIsIC40LCAuNSk7XHJcblxyXG5cclxuICAgICAgICB2YXIgbGlnaHQgPSBuZXcgQkFCWUxPTi5EaXJlY3Rpb25hbExpZ2h0KFwibGlnaHQyXCIsIG5ldyBCQUJZTE9OLlZlY3RvcjMoLTIsIC0zLCAxKSwgc2NlbmUpO1xyXG4gICAgICAgIGxpZ2h0LnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyg2LCA5LCAzKTtcclxuICAgICAgICBsaWdodC5zaGFkb3dNaW5aID0gMTtcclxuICAgICAgICBsaWdodC5zaGFkb3dNYXhaID0gMjA7XHJcbiAgICAgICAgbGlnaHQuaW50ZW5zaXR5ID0gNTtcclxuXHJcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IG5ldyBCQUJZTE9OLlNoYWRvd0dlbmVyYXRvcig0MDk2LCBsaWdodCk7XHJcblxyXG4gICAgICAgIGdlbmVyYXRvci5mb3JjZUJhY2tGYWNlc09ubHkgPSB0cnVlO1xyXG5cclxuXHJcbiAgICAgICAgLy9UaWxlczpcclxuICAgICAgICAvLyAwOiBHcm91bmRcclxuICAgICAgICAvLyAxOiBXYWxsXHJcbiAgICAgICAgLy8gMjpcclxuICAgICAgICAvLyAzOiBMYXNlclxyXG4gICAgICAgIC8vIDQ6XHJcbiAgICAgICAgLy8gNTpcclxuICAgICAgICAvLyA2OlxyXG4gICAgICAgIC8vIDc6XHJcbiAgICAgICAgLy8gODpcclxuICAgICAgICAvLyA5OlxyXG4gICAgICAgIC8vIDEwOlxyXG4gICAgICAgIC8vIDExOlxyXG4gICAgICAgIC8vIDEyOlxyXG4gICAgICAgIC8vIDEzOlxyXG4gICAgICAgIC8vIDE0OlxyXG4gICAgICAgIC8vIDE1OlxyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyID0gc2NlbmUuY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLmNyZWF0ZVB1enpsZSgpO1xyXG5cclxuICAgICAgICBsZXQgZ3JvdW5kID0gbmV3IEdyb3VuZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgc2NlbmUuZ3Jhdml0eSA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoMCwgLTkuODEsIDApO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLmVuYWJsZUludGVyYWN0aW9ucygpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2ggPSB7fTtcclxuICAgICAgICBzZWxmLm5lZWRzVW5wcmVzc2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIub25Db250cm9sbGVyTWVzaExvYWRlZC5hZGQoKHdlYlZSQ29udHJvbGxlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyB2YXIgY29udHJvbGxlck1lc2ggPSB3ZWJWUkNvbnRyb2xsZXIubWVzaDtcclxuICAgICAgICAgICAgd2ViVlJDb250cm9sbGVyLm9uVHJpZ2dlclN0YXRlQ2hhbmdlZE9ic2VydmFibGUuYWRkKChhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChhLnByZXNzZWQgJiYgIXNlbGYubmVlZHNVbnByZXNzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2VsZWN0ZWRNZXNoLmVudGl0eSlcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaC5lbnRpdHkudHJpZ2dlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghYS5wcmVzc2VkICYmIHNlbGYubmVlZHNVbnByZXNzaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLm9uTmV3TWVzaFNlbGVjdGVkLmFkZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaCA9IG1lc2g7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5vblNlbGVjdGVkTWVzaFVuc2VsZWN0ZWQuYWRkKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRNZXNoID0ge307XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIubWVzaFNlbGVjdGlvblByZWRpY2F0ZSA9IChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChCQUJZTE9OLlRhZ3MuTWF0Y2hlc1F1ZXJ5KG1lc2gsIFwiYmxvY2tcIil8fCBtZXNoLm5hbWU9PSBncm91bmQubmFtZSkgeyAvLy5uYW1lLmluZGV4T2YoXCJFbnRpdHlcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNoLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuaW5lcnRpYSA9IDAuNjtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuc3BlZWQgPSAwLjU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLm1pblogPSAuMTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuYXBwbHlHcmF2aXR5ID0gdHJ1ZTtcclxuICAgICAgICBzY2VuZS5hY3RpdmVDYW1lcmEuZWxsaXBzb2lkID0gbmV3IEJBQllMT04uVmVjdG9yMyguMjUsIC43NSwgLjI1KTtcclxuICAgICAgICBzY2VuZS5jb2xsaXNpb25zRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVUZWxlcG9ydGF0aW9uKHtcclxuICAgICAgICAgICAgZmxvb3JNZXNoTmFtZTogZ3JvdW5kLm5hbWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmVSZXNvbHV0aW9uID0gNTEyO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlR3JvdW5kID0gbmV3IEJBQllMT04uRHluYW1pY1RleHR1cmUoXCJkeW5hbWljIHRleHR1cmVcIiwge1xyXG4gICAgICAgICAgICB3aWR0aDogNTEyLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDI1NlxyXG4gICAgICAgIH0sIHNjZW5lKTtcclxuICAgICAgICB2YXIgdGV4dHVyZUNvbnRleHQgPSB0ZXh0dXJlR3JvdW5kLmdldENvbnRleHQoKTtcclxuICAgICAgICB0ZXh0dXJlR3JvdW5kLmhhc0FscGhhID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbWF0ZXJpYWxHcm91bmQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiTWF0XCIsIHNjZW5lKTtcclxuICAgICAgICBtYXRlcmlhbEdyb3VuZC5vcGFjaXR5VGV4dHVyZSA9IHRleHR1cmVHcm91bmQ7XHJcblxyXG5cclxuICAgICAgICAvL0FkZCB0ZXh0IHRvIGR5bmFtaWMgdGV4dHVyZVxyXG4gICAgICAgIC8vIHZhciBmb250ID0gXCJib2xkIDQ0cHggbW9ub3NwYWNlXCI7XHJcbiAgICAgICAgLy8gdGV4dHVyZUdyb3VuZC5kcmF3VGV4dChcIkdyYXNzXCIsIDc1LCAxMzUsIGZvbnQsIFwiZ3JlZW5cIiwgbnVsbCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgLy8gdmFyIHNwaGVyZSA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlUGxhbmUoXCJzcGhlcmUxXCIsIHtcclxuICAgICAgICAvLyAgICAgaGVpZ2h0OiAxLFxyXG4gICAgICAgIC8vICAgICB3aWR0aDogMVxyXG4gICAgICAgIC8vIH0sIHNjZW5lKTtcclxuICAgICAgICAvLyBzcGhlcmUubWF0ZXJpYWwgPSBtYXRlcmlhbEdyb3VuZDtcclxuICAgICAgICAvLyBzcGhlcmUucG9zaXRpb24ueSA9IDEuNTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRvciA9IGdlbmVyYXRvcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNoYWRvdygpIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRvci5fc2hhZG93TWFwLnJlbmRlckxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2NlbmUubWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lLm1lc2hlc1tpXS5uYW1lICE9IFwiVGlsZWQgR3JvdW5kXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdG9yLmFkZFNoYWRvd0Nhc3Rlcih0aGlzLnNjZW5lLm1lc2hlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5tZXNoZXNbaV0ucmVjZWl2ZVNoYWRvd3MgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVQdXp6bGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnB1enpsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMucHV6emxlW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRMYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRydWUsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRMYXNlci5vblBpY2tlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQucm90ID0gKHN0YXJ0LnJvdCArIDEpICUgNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXNlcmJlYW0uZHJhd0xhc2VyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZGxhc2VyID0gbmV3IExhc2VyKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgZmFsc2UsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5kbGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdtaXJyb3InOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtaXJyb3IgPSBuZXcgTWlycm9yKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTtcclxuICAgICAgICAgICAgICAgICAgICBtaXJyb3Iub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdwb3J0YWwnOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3J0YWwgPSBuZXcgUG9ydGFsKHRoaXMuc2NlbmUsIHRoaXMucHV6emxlW2ldLnBvcywgdGhpcy5wdXp6bGVbaV0ucm90KTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydGFsLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2FsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdhbGwodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcblxyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHV6emxlcyA9IFtcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOls0LjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAwLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTIuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlstMy4wLCAwLjUsIDUuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIDIuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIDEuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMS4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6WzEuMCwgMC41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAwLjBdLHJvdDoxLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtNC4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMi4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC00LjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOlsyLjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy00LjAsIDAuNSwgLTYuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtNy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOls0LjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzQuMCwgMC41LCAtNi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0zLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtNS4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTYuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC02LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtN10scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC03XSxyb3Q6Mix9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAtMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3BvcnRhbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LF0sXHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgICAgICAvLyBbe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzMsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAxLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMi41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gXVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VycmVudFB1enpsZSA9ICh3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8IDApLTE7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUrKztcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHRoaXMucHV6emxlc1t0aGlzLmN1cnJlbnRQdXp6bGVdO1xyXG4gICAgfVxyXG59Iiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pO1xyXG5cclxud2luZG93LnJvdGF0ZSA9ICh2LCBkZWdyZWVzKSA9PiB7XHJcbiAgICB2YXIgY2EgPSBNYXRoLmNvcyhkZWdyZWVzKTtcclxuICAgIHZhciBzYSA9IE1hdGguc2luKGRlZ3JlZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBCQUJZTE9OLlZlY3RvcjMoY2EgKiB2LnggLSBzYSAqIHYueiwgMCwgLXNhICogdi54ICsgY2EgKiB2LnopO1xyXG59IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbmNsYXNzIE9mZmxpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUodGhpcy5lbmdpbmUpO1xyXG4gICAgICAgIC8vdGhpcy5zY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBnYW1lLmNyZWF0ZVNjZW5lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHRoaXMuc2NlbmUucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5uZXcgT2ZmbGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=