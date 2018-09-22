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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvcG9ydGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL3dhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9ncm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvcHV6emxlTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMYXNlcmJlYW0iLCJzY2VuZSIsInB1enpsZSIsIm9uV2luIiwic3RhcnQiLCJmaW5kIiwiYiIsInR5cGUiLCJvcmlnaW4iLCJCQUJZTE9OIiwiVmVjdG9yMyIsInBvcyIsImRpcmVjdGlvbiIsInJvdCIsInRhcmdldCIsIk1hdGgiLCJzaW4iLCJQSSIsImNvcyIsImxhc2VyUG9pbnRzIiwibmV4dFRhcmdldCIsIm51bWhvcHMiLCJoaXRTdGF0dXMiLCJsYXN0SGl0IiwiY2FsY3VsYXRlQmVhbSIsInB1c2giLCJsZW5ndGgiLCJsYXNlciIsImxhc2VyYmVhbU1lc2giLCJnZXRNZXNoQnlOYW1lIiwicmVtb3ZlTWVzaCIsIk1lc2hCdWlsZGVyIiwiQ3JlYXRlVHViZSIsInBhdGgiLCJyYWRpdXMiLCJUYWdzIiwiQWRkVGFnc1RvIiwibWF0ZXJpYWwiLCJTdGFuZGFyZE1hdGVyaWFsIiwiZ2wiLCJHbG93TGF5ZXIiLCJjdXN0b21FbWlzc2l2ZUNvbG9yU2VsZWN0b3IiLCJtZXNoIiwic3ViTWVzaCIsInJlc3VsdCIsImludGVuc2l0eSIsIm5hbWUiLCJzZXQiLCJpc1BpY2thYmxlIiwicmF5RGlyZWN0aW9uIiwicmF5IiwiUmF5IiwiaGl0IiwicGlja1dpdGhSYXkiLCJzdGFydHNXaXRoIiwicGlja2VkTWVzaCIsImVudGl0eSIsInJlZiIsImdldEZhY2V0Tm9ybWFsIiwiZmFjZUlkIiwiYW5nbGUiLCJyb3VuZCIsImFzaW4iLCJDcm9zcyIsInkiLCJvbkhpdEJ5TGFzZXIiLCJwb3NpdGlvbiIsInBpY2tlZFBvaW50IiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJyZW5kZXIiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsImJhY2tGYWNlQ3VsbGluZyIsImNoZWNrQ29sbGlzaW9ucyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiUG9ydGFsIiwiV2FsbCIsInJuZCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJwdXp6bGVNYW5hZ2VyIiwiUHV6emxlTWFuYWdlciIsImluaXRQdXp6bGUiLCJnZXRNZXNoZXNCeVRhZ3MiLCJpIiwibmV4dCIsImNyZWF0ZVB1enpsZSIsInVwZGF0ZVNoYWRvdyIsImxhc2VyYmVhbSIsImRyYXdMYXNlciIsIndpbiIsImoiLCJWZWN0b3I0IiwiaGVtaUxpZ2h0IiwiSGVtaXNwaGVyaWNMaWdodCIsImRpZmZ1c2UiLCJDb2xvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJzaGFkb3dNaW5aIiwic2hhZG93TWF4WiIsImdlbmVyYXRvciIsIlNoYWRvd0dlbmVyYXRvciIsImZvcmNlQmFja0ZhY2VzT25seSIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJzZWxmIiwic2VsZWN0ZWRNZXNoIiwibmVlZHNVbnByZXNzaW5nIiwib25Db250cm9sbGVyTWVzaExvYWRlZCIsImFkZCIsIndlYlZSQ29udHJvbGxlciIsIm9uVHJpZ2dlclN0YXRlQ2hhbmdlZE9ic2VydmFibGUiLCJhIiwicHJlc3NlZCIsInRyaWdnZXIiLCJvbk5ld01lc2hTZWxlY3RlZCIsIm9uU2VsZWN0ZWRNZXNoVW5zZWxlY3RlZCIsIm1lc2hTZWxlY3Rpb25QcmVkaWNhdGUiLCJNYXRjaGVzUXVlcnkiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwibWluWiIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiZW5hYmxlVGVsZXBvcnRhdGlvbiIsImZsb29yTWVzaE5hbWUiLCJ0ZXh0dXJlUmVzb2x1dGlvbiIsInRleHR1cmVHcm91bmQiLCJEeW5hbWljVGV4dHVyZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dHVyZUNvbnRleHQiLCJnZXRDb250ZXh0IiwiaGFzQWxwaGEiLCJtYXRlcmlhbEdyb3VuZCIsIm9wYWNpdHlUZXh0dXJlIiwiX3NoYWRvd01hcCIsInJlbmRlckxpc3QiLCJhZGRTaGFkb3dDYXN0ZXIiLCJyZWNlaXZlU2hhZG93cyIsInN0YXJ0TGFzZXIiLCJlbmRsYXNlciIsIm1pcnJvciIsInBvcnRhbCIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsImdyb3VuZG1hdCIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhclRleHR1cmUiLCJzcGVjdWxhckNvbG9yIiwicHV6emxlcyIsImN1cnJlbnRQdXp6bGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsRmFBLFMsV0FBQUEsUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUFZQyxLQUFaLEVBQW1CQyxNQUFuQixFQUEyQjtBQUFBOztBQUN2QixhQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxhQUFLQyxLQUFMLEdBQWEsWUFBTSxDQUFFLENBQXJCO0FBQ0g7Ozs7b0NBRVc7QUFDUixnQkFBSUMsUUFBUSxLQUFLRixNQUFMLENBQVlHLElBQVosQ0FBaUI7QUFBQSx1QkFBS0MsRUFBRUMsSUFBRixLQUFXLE9BQWhCO0FBQUEsYUFBakIsQ0FBWjs7QUFFQSxnQkFBSUMsNENBQWFDLFFBQVFDLE9BQXJCLG1DQUFnQ04sTUFBTU8sR0FBdEMsTUFBSjtBQUNBLGdCQUFJQyxZQUFZUixNQUFNUyxHQUF0QjtBQUNBLGdCQUFJQyxTQUFTLElBQUlMLFFBQVFDLE9BQVosQ0FBb0JOLE1BQU1PLEdBQU4sQ0FBVSxDQUFWLElBQWVJLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsRUFBTCxHQUFVYixNQUFNUyxHQUFoQixHQUFzQixDQUEvQixJQUFvQyxHQUF2RSxFQUE0RSxHQUE1RSxFQUFpRlQsTUFBTU8sR0FBTixDQUFVLENBQVYsSUFBZUksS0FBS0csR0FBTCxDQUFTSCxLQUFLRSxFQUFMLEdBQVViLE1BQU1TLEdBQWhCLEdBQXNCLENBQS9CLElBQW9DLEdBQXBJLENBQWI7O0FBR0EsZ0JBQUlNLGNBQWMsQ0FBQ1gsTUFBRCxDQUFsQjtBQUNBLGdCQUFJWSxhQUFhWixNQUFqQjtBQUNBLGdCQUFJYSxVQUFVLENBQWQ7QUFDQSxnQkFBSUMsWUFBWSxDQUFoQjtBQUNBLGdCQUFJQyxnQkFBSjtBQUNBLGVBQUc7QUFDQ0Y7O0FBREQscUNBTUssS0FBS0csYUFBTCxDQUFtQkosVUFBbkIsRUFBK0JSLFNBQS9CLEVBQTBDVyxPQUExQyxDQU5MOztBQUdLSCwwQkFITCxrQkFHS0EsVUFITDtBQUlLRSx5QkFKTCxrQkFJS0EsU0FKTDtBQUtLQyx1QkFMTCxrQkFLS0EsT0FMTDs7O0FBUUMsb0JBQUksQ0FBQyxDQUFDSCxVQUFOLEVBQWtCO0FBQ2RELGdDQUFZTSxJQUFaLENBQWlCTCxVQUFqQjtBQUNIOztBQUVELG9CQUFJRSxhQUFhLENBQWpCLEVBQW9CO0FBQ2hCLHlCQUFLbkIsS0FBTDtBQUNBO0FBQ0g7QUFDRCxvQkFBSW1CLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEJWLGdDQUFZLENBQUNBLFlBQVksQ0FBYixJQUFrQixDQUE5QjtBQUNIO0FBQ0Qsb0JBQUlVLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEJWLGdDQUFZLENBQUNBLFlBQVksQ0FBYixJQUFrQixDQUE5QjtBQUNIO0FBRUosYUF2QkQsUUF1QlNVLGFBQWEsQ0FBYixJQUFrQkQsVUFBVSxFQXZCckM7O0FBeUJBLGdCQUFJRixZQUFZTyxNQUFaLElBQXNCLENBQTFCLEVBQTZCO0FBQ3pCUCw0QkFBWU0sSUFBWixDQUFpQlgsTUFBakI7QUFDSDs7QUFHRCxnQkFBSSxLQUFLYSxLQUFULEVBQWdCO0FBQ1osb0JBQUlDLGdCQUFnQixLQUFLM0IsS0FBTCxDQUFXNEIsYUFBWCxDQUF5QixXQUF6QixDQUFwQjtBQUNBLHFCQUFLNUIsS0FBTCxDQUFXNkIsVUFBWCxDQUFzQkYsYUFBdEI7QUFFSDs7QUFFRCxpQkFBS0QsS0FBTCxHQUFhbEIsUUFBUXNCLFdBQVIsQ0FBb0JDLFVBQXBCLENBQStCLFdBQS9CLEVBQTRDO0FBQ3JEQyxzQkFBTWQsV0FEK0M7QUFFckRlLHdCQUFRO0FBRjZDLGFBQTVDLEVBR1YsS0FBS2pDLEtBSEssQ0FBYjtBQUlBUSxvQkFBUTBCLElBQVIsQ0FBYUMsU0FBYixDQUF1QixLQUFLVCxLQUE1QixFQUFtQyxRQUFuQztBQUNBLGlCQUFLQSxLQUFMLENBQVdVLFFBQVgsR0FBc0IsSUFBSTVCLFFBQVE2QixnQkFBWixDQUE2QixVQUE3QixFQUF5QyxLQUFLckMsS0FBOUMsQ0FBdEI7QUFDRSxnQkFBSXNDLEtBQUssSUFBSTlCLFFBQVErQixTQUFaLENBQXNCLE1BQXRCLEVBQThCLEtBQUt2QyxLQUFuQyxDQUFUO0FBQ1ZzQyxlQUFHRSwyQkFBSCxHQUFpQyxVQUFTQyxJQUFULEVBQWVDLE9BQWYsRUFBd0JOLFFBQXhCLEVBQWtDTyxNQUFsQyxFQUEwQztBQUN2RUwsbUJBQUdNLFNBQUgsR0FBZSxHQUFmO0FBQ0Esb0JBQUlILEtBQUtJLElBQUwsS0FBYyxXQUFsQixFQUErQjtBQUMzQkYsMkJBQU9HLEdBQVAsQ0FBVyxFQUFYLEVBQWUsQ0FBZixFQUFrQixFQUFsQixFQUFzQixDQUF0QjtBQUNILGlCQUZELE1BRU87QUFDSEgsMkJBQU9HLEdBQVAsQ0FBVyxDQUFYLEVBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixDQUFwQjtBQUNIO0FBQ0osYUFQRDs7QUFTUSxpQkFBS3BCLEtBQUwsQ0FBV3FCLFVBQVgsR0FBd0IsS0FBeEI7QUFDSDs7O3NDQUVheEMsTSxFQUFRSSxTLEVBQVdXLE8sRUFBUztBQUN0QyxnQkFBSTBCLGVBQWUsSUFBSXhDLFFBQVFDLE9BQVosQ0FBb0JLLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS0UsRUFBTCxHQUFVTCxTQUFWLEdBQXNCLENBQS9CLENBQXBCLEVBQXVELENBQXZELEVBQTBERyxLQUFLRyxHQUFMLENBQVNILEtBQUtFLEVBQUwsR0FBVUwsU0FBVixHQUFzQixDQUEvQixDQUExRCxDQUFuQjtBQUNBLGdCQUFJc0MsTUFBTSxJQUFJekMsUUFBUTBDLEdBQVosQ0FBZ0IzQyxNQUFoQixFQUF3QnlDLFlBQXhCLEVBQXNDLEdBQXRDLENBQVY7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlHLE1BQU0sS0FBS25ELEtBQUwsQ0FBV29ELFdBQVgsQ0FBdUJILEdBQXZCLEVBQTRCLFVBQUNSLElBQUQsRUFBVTtBQUM1QyxvQkFBSUEsS0FBS0ksSUFBTCxDQUFVUSxVQUFWLENBQXFCLFlBQXJCLEtBQXNDLENBQUNaLEtBQUtNLFVBQTVDLElBQTBETixLQUFLSSxJQUFMLEtBQWN2QixPQUE1RSxFQUFxRjtBQUNqRiwyQkFBTyxLQUFQO0FBQ0g7QUFDRCx1QkFBTyxJQUFQO0FBQ0gsYUFMUyxDQUFWOztBQU9BLGdCQUFJNkIsSUFBSUcsVUFBSixJQUFrQkgsSUFBSUcsVUFBSixDQUFlQyxNQUFyQyxFQUE2QztBQUN6QyxvQkFBSUMsTUFBTUwsSUFBSUcsVUFBSixDQUFlRyxjQUFmLENBQThCTixJQUFJTyxNQUFsQyxDQUFWO0FBQ0Esb0JBQUlDLFFBQVE3QyxLQUFLOEMsS0FBTCxDQUFXOUMsS0FBSytDLElBQUwsQ0FBVXJELFFBQVFDLE9BQVIsQ0FBZ0JxRCxLQUFoQixDQUFzQk4sR0FBdEIsRUFBMkJQLElBQUl0QyxTQUEvQixFQUEwQ29ELENBQXBELElBQXlELEdBQXpELEdBQStEakQsS0FBS0UsRUFBL0UsQ0FBWjtBQUNBLG9CQUFJSyxZQUFZOEIsSUFBSUcsVUFBSixDQUFlQyxNQUFmLENBQXNCUyxZQUF0QixDQUFtQ2IsSUFBSU8sTUFBdkMsRUFBK0NDLEtBQS9DLENBQWhCO0FBQ0Esb0JBQUl4QyxhQUFhZ0MsSUFBSUcsVUFBSixDQUFlVyxRQUFoQztBQUNBLG9CQUFHNUMsY0FBYyxDQUFqQixFQUFvQjtBQUNoQkYsaUNBQWFnQyxJQUFJZSxXQUFqQjtBQUNIO0FBQ0QsdUJBQU87QUFDSC9DLGdDQUFZQSxVQURUO0FBRUhFLHdDQUZHO0FBR0hDLDZCQUFTNkIsSUFBSUcsVUFBSixDQUFlVDtBQUhyQixpQkFBUDtBQUtIO0FBQ0QsbUJBQU87QUFDSDFCLDRCQUFZLElBQUlYLFFBQVFDLE9BQVosQ0FBb0JGLE9BQU80RCxDQUFQLEdBQVdyRCxLQUFLQyxHQUFMLENBQVNELEtBQUtFLEVBQUwsR0FBVUwsU0FBVixHQUFzQixDQUEvQixJQUFvQyxHQUFuRSxFQUF3RSxHQUF4RSxFQUE2RUosT0FBTzZELENBQVAsR0FBV3RELEtBQUtHLEdBQUwsQ0FBU0gsS0FBS0UsRUFBTCxHQUFVTCxTQUFWLEdBQXNCLENBQS9CLElBQW9DLEdBQTVILENBRFQ7QUFFSFUsMkJBQVcsQ0FGUjtBQUdIQyx5QkFBUytDO0FBSE4sYUFBUDtBQUtIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDakhRQyxNLFdBQUFBLE07QUFFVCxvQkFBWXRFLEtBQVosRUFBbUJpRSxRQUFuQixFQUE0RDtBQUFBLFlBQS9CcEIsSUFBK0IsdUVBQXhCLFFBQXdCO0FBQUEsWUFBZDBCLFFBQWMsdUVBQUgsQ0FBRzs7QUFBQTs7QUFDeEQsYUFBS3ZFLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUs2QyxJQUFMLEdBQWVBLElBQWYsU0FBdUIsS0FBSzdDLEtBQUwsQ0FBV3dFLE1BQVgsQ0FBa0IvQyxNQUF6QztBQUNBLGFBQUt3QyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGFBQUtNLFFBQUwsR0FBZ0JBLFFBQWhCOztBQUVBLGFBQUtFLFFBQUwsR0FBZ0IsQ0FBQyxDQUFDLEdBQUYsRUFBTSxDQUFDLEdBQVAsRUFBVyxDQUFDLEdBQVosRUFBZ0IsR0FBaEIsRUFBb0IsQ0FBQyxHQUFyQixFQUF5QixDQUFDLEdBQTFCLEVBQThCLENBQUMsR0FBL0IsRUFBbUMsQ0FBQyxHQUFwQyxFQUF3QyxHQUF4QyxFQUE0QyxHQUE1QyxFQUFnRCxDQUFDLEdBQWpELEVBQXFELEdBQXJELEVBQXlELENBQUMsR0FBMUQsRUFBOEQsR0FBOUQsRUFBa0UsQ0FBQyxHQUFuRSxFQUF1RSxHQUF2RSxFQUEyRSxHQUEzRSxFQUErRSxDQUFDLEdBQWhGLEVBQW9GLENBQUMsR0FBckYsRUFBeUYsR0FBekYsRUFBNkYsR0FBN0YsRUFBaUcsR0FBakcsRUFBcUcsR0FBckcsRUFBeUcsR0FBekcsRUFBNkcsQ0FBQyxHQUE5RyxFQUFrSCxHQUFsSCxFQUFzSCxDQUFDLEdBQXZILEVBQTJILEdBQTNILEVBQStILEdBQS9ILEVBQW1JLENBQUMsR0FBcEksRUFBd0ksQ0FBQyxHQUF6SSxFQUE2SSxHQUE3SSxFQUFpSixHQUFqSixFQUFxSixHQUFySixFQUF5SixHQUF6SixFQUE2SixHQUE3SixFQUFpSyxDQUFDLEdBQWxLLEVBQXNLLENBQUMsR0FBdkssRUFBMkssR0FBM0ssRUFBK0ssR0FBL0ssRUFBbUwsQ0FBQyxHQUFwTCxFQUF3TCxHQUF4TCxFQUE0TCxDQUFDLEdBQTdMLEVBQWlNLEdBQWpNLEVBQXFNLEdBQXJNLEVBQXlNLEdBQXpNLEVBQTZNLEdBQTdNLEVBQWlOLEdBQWpOLEVBQXFOLENBQUMsR0FBdE4sRUFBME4sQ0FBQyxHQUEzTixFQUErTixDQUFDLEdBQWhPLEVBQW9PLENBQUMsR0FBck8sRUFBeU8sQ0FBQyxHQUExTyxFQUE4TyxHQUE5TyxFQUFrUCxDQUFDLEdBQW5QLEVBQXVQLEdBQXZQLEVBQTJQLENBQUMsR0FBNVAsRUFBZ1EsQ0FBQyxHQUFqUSxFQUFxUSxDQUFDLEdBQXRRLEVBQTBRLENBQUMsR0FBM1EsRUFBK1EsR0FBL1EsRUFBbVIsQ0FBQyxHQUFwUixFQUF3UixDQUFDLEdBQXpSLEVBQTZSLEdBQTdSLEVBQWlTLEdBQWpTLEVBQXFTLENBQUMsR0FBdFMsRUFBMFMsR0FBMVMsRUFBOFMsQ0FBQyxHQUEvUyxFQUFtVCxDQUFDLEdBQXBULEVBQXdULEdBQXhULEVBQTRULENBQUMsR0FBN1QsRUFBaVUsR0FBalUsQ0FBaEI7QUFDQSxhQUFLQyxLQUFMLEdBQWEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBUSxDQUFSLEVBQVUsQ0FBVixFQUFZLENBQVosRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXVCLEVBQXZCLEVBQTBCLEVBQTFCLEVBQTZCLENBQTdCLEVBQWdDLEVBQWhDLEVBQW1DLEVBQW5DLEVBQXNDLEVBQXRDLEVBQTBDLEVBQTFDLEVBQTZDLENBQTdDLEVBQStDLEVBQS9DLEVBQW1ELEVBQW5ELEVBQXNELEVBQXRELEVBQXlELENBQXpELEVBQTRELENBQTVELEVBQThELENBQTlELEVBQWdFLEVBQWhFLEVBQW9FLEVBQXBFLEVBQXVFLEVBQXZFLEVBQTBFLEVBQTFFLEVBQThFLEVBQTlFLEVBQWlGLEVBQWpGLEVBQW9GLEVBQXBGLEVBQXdGLEVBQXhGLEVBQTJGLEVBQTNGLEVBQThGLEVBQTlGLEVBQWtHLEVBQWxHLEVBQXFHLENBQXJHLEVBQXVHLEVBQXZHLENBQWI7QUFDQSxhQUFLQyxHQUFMLEdBQVcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsR0FBcEMsRUFBeUMsR0FBekMsRUFBOEMsR0FBOUMsRUFBbUQsR0FBbkQsRUFBd0QsR0FBeEQsRUFBNkQsR0FBN0QsRUFBa0UsR0FBbEUsRUFBdUUsR0FBdkUsRUFBNEUsR0FBNUUsRUFBaUYsR0FBakYsRUFBc0YsR0FBdEYsRUFBMkYsR0FBM0YsRUFBZ0csR0FBaEcsRUFBcUcsR0FBckcsRUFBMEcsR0FBMUcsRUFBK0csR0FBL0csRUFBb0gsR0FBcEgsRUFBeUgsR0FBekgsRUFBOEgsR0FBOUgsRUFBbUksR0FBbkksRUFBd0ksR0FBeEksRUFBNkksR0FBN0ksRUFBa0osR0FBbEosRUFBdUosR0FBdkosRUFBNEosR0FBNUosRUFBaUssR0FBakssRUFBc0ssR0FBdEssRUFBMkssR0FBM0ssRUFBZ0wsR0FBaEwsRUFBcUwsR0FBckwsRUFBMEwsR0FBMUwsRUFBK0wsR0FBL0wsRUFBb00sR0FBcE0sRUFBeU0sR0FBek0sRUFBOE0sR0FBOU0sRUFBbU4sR0FBbk4sRUFBd04sR0FBeE4sRUFBNk4sR0FBN04sRUFBa08sR0FBbE8sRUFBdU8sR0FBdk8sRUFBNE8sR0FBNU8sRUFBaVAsR0FBalAsRUFBc1AsR0FBdFAsRUFBMlAsR0FBM1AsRUFBZ1EsR0FBaFEsRUFBcVEsR0FBclEsRUFBMFEsR0FBMVEsRUFBK1EsR0FBL1EsRUFBb1IsR0FBcFIsRUFBeVIsR0FBelIsRUFBOFIsR0FBOVIsRUFBbVMsR0FBblMsRUFBd1MsR0FBeFMsQ0FBWDs7QUFFQSxhQUFLbEMsSUFBTCxHQUFZLElBQUlqQyxRQUFRb0UsSUFBWixDQUFpQixLQUFLL0IsSUFBdEIsRUFBNEIsS0FBSzdDLEtBQWpDLENBQVo7O0FBRUEsYUFBSzZFLEdBQUwsR0FBVyxJQUFJckUsUUFBUTZCLGdCQUFaLENBQTZCLEtBQTdCLEVBQW9DLEtBQUtyQyxLQUF6QyxDQUFYO0FBQ0EsWUFBSThFLFVBQVUsSUFBSXRFLFFBQVF1RSxPQUFaLENBQW9CLFdBQXBCLEVBQWlDLEtBQUsvRSxLQUF0QyxFQUE2QyxLQUE3QyxFQUFvRCxJQUFwRCxFQUEwRFEsUUFBUXVFLE9BQVIsQ0FBZ0JDLG9CQUExRSxDQUFkO0FBQ0EsYUFBS0gsR0FBTCxDQUFTSSxjQUFULEdBQTBCSCxPQUExQjtBQUNBLGFBQUtJLE1BQUwsR0FBYyxZQUFNLENBQUUsQ0FBdEI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLFlBQU0sQ0FBRSxDQUF4QjtBQUNIOzs7O2lDQUVRLENBQUU7OztxQ0FFRXpCLE0sRUFBUUMsSyxFQUFPO0FBQ3hCLG1CQUFPLENBQVAsQ0FEd0IsQ0FDZDtBQUNiOzs7a0NBQ0k7QUFDTCxpQkFBS3VCLE1BQUwsQ0FBWSxJQUFaO0FBQ0EsaUJBQUtsRixLQUFMLENBQVdvRixNQUFYO0FBQ0EsaUJBQUtELFFBQUwsQ0FBYyxJQUFkO0FBQ0g7OztvQ0FDZTs7QUFFUjtBQUNBLGdCQUFJRSxhQUFhLElBQUk3RSxRQUFROEUsVUFBWixFQUFqQjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUsRUFBZjs7QUFFQTtBQUNBL0Usb0JBQVE4RSxVQUFSLENBQW1CRSxjQUFuQixDQUFrQyxLQUFLZixRQUF2QyxFQUFpRCxLQUFLQyxLQUF0RCxFQUE2RCxLQUFLYSxPQUFsRTs7QUFFQTtBQUNBRix1QkFBV0ksU0FBWCxHQUF1QixLQUFLaEIsUUFBNUI7QUFDQVksdUJBQVdLLE9BQVgsR0FBcUIsS0FBS2hCLEtBQTFCO0FBQ0FXLHVCQUFXRSxPQUFYLEdBQXFCLEtBQUtBLE9BQTFCO0FBQ0FGLHVCQUFXVixHQUFYLEdBQWlCLEtBQUtBLEdBQXRCOztBQUVBO0FBQ0FVLHVCQUFXTSxXQUFYLENBQXVCLEtBQUtsRCxJQUE1QjtBQUNBLGlCQUFLQSxJQUFMLENBQVVMLFFBQVYsR0FBcUIsS0FBS3lDLEdBQTFCO0FBQ0EsaUJBQUtwQyxJQUFMLENBQVVMLFFBQVYsQ0FBbUJ3RCxlQUFuQixHQUFxQyxLQUFyQztBQUNBLGlCQUFLbkQsSUFBTCxDQUFVd0IsUUFBVixzQ0FBeUJ6RCxRQUFRQyxPQUFqQyxtQ0FBNEMsS0FBS3dELFFBQWpEO0FBQ0EsaUJBQUt4QixJQUFMLENBQVVvRCxlQUFWLEdBQTRCLElBQTVCO0FBQ0EsaUJBQUtwRCxJQUFMLENBQVVxRCxhQUFWLEdBQTBCLElBQUl0RixRQUFRdUYsYUFBWixDQUEwQixLQUFLL0YsS0FBL0IsQ0FBMUI7QUFDQSxpQkFBS3lDLElBQUwsQ0FBVXFELGFBQVYsQ0FBd0JFLGNBQXhCLENBQXVDLElBQUl4RixRQUFReUYsaUJBQVosQ0FBOEJ6RixRQUFRdUYsYUFBUixDQUFzQkcsYUFBcEQsRUFBb0UsVUFBVXpELElBQVYsRUFBZ0I7QUFDdkgscUJBQUt5QyxNQUFMLENBQVksSUFBWjtBQUNBLHFCQUFLbEYsS0FBTCxDQUFXb0YsTUFBWDtBQUNBLHFCQUFLRCxRQUFMLENBQWMsSUFBZDtBQUNILGFBSnlHLENBSXZHZ0IsSUFKdUcsQ0FJbEcsSUFKa0csRUFJNUYsS0FBSzFELElBSnVGLENBQW5FLENBQXZDO0FBS0EsaUJBQUtBLElBQUwsQ0FBVThCLFFBQVYsQ0FBbUJSLENBQW5CLEdBQXVCLEtBQUtRLFFBQUwsR0FBZ0J6RCxLQUFLRSxFQUFyQixHQUEwQixDQUFqRDtBQUNBUixvQkFBUTBCLElBQVIsQ0FBYUMsU0FBYixDQUF1QixLQUFLTSxJQUE1QixFQUFrQyxRQUFsQztBQUNBakMsb0JBQVEwQixJQUFSLENBQWFDLFNBQWIsQ0FBdUIsS0FBS00sSUFBNUIsRUFBa0MsT0FBbEM7QUFDQSxpQkFBS0EsSUFBTCxDQUFVYyxNQUFWLEdBQW1CLElBQW5COztBQUVBLG1CQUFPLEtBQUtkLElBQVo7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFTDs7Ozs7Ozs7SUFJYTJELEssV0FBQUEsSzs7O0FBRVQsbUJBQVlwRyxLQUFaLEVBQW1CaUUsUUFBbkIsRUFBNkJvQyxPQUE3QixFQUFzQzlCLFFBQXRDLEVBQWdEO0FBQUE7O0FBQzVDQSxtQkFBVyxDQUFDQSxXQUFXLENBQVosSUFBaUIsQ0FBNUI7O0FBRDRDLGtIQUV0Q3ZFLEtBRnNDLEVBRS9CaUUsUUFGK0IsRUFFckJvQyxVQUFVLFlBQVYsR0FBeUIsVUFGSixFQUVnQjlCLFFBRmhCOztBQUk1QyxjQUFLOEIsT0FBTCxHQUFlLENBQUMsQ0FBQ0EsT0FBakI7O0FBRUEsY0FBSzVCLFFBQUwsR0FBZ0IsQ0FBQyxDQUFDLEdBQUYsRUFBTyxDQUFDLEdBQVIsRUFBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCLENBQUMsR0FBeEIsRUFBNkIsR0FBN0IsRUFBa0MsQ0FBQyxHQUFuQyxFQUF3QyxHQUF4QyxFQUE2QyxHQUE3QyxFQUFrRCxHQUFsRCxFQUF1RCxHQUF2RCxFQUE0RCxHQUE1RCxFQUFpRSxDQUFDLEdBQWxFLEVBQXVFLENBQUMsR0FBeEUsRUFBNkUsQ0FBQyxHQUE5RSxFQUFtRixHQUFuRixFQUF3RixDQUFDLEdBQXpGLEVBQThGLENBQUMsR0FBL0YsRUFBb0csQ0FBQyxHQUFyRyxFQUEwRyxHQUExRyxFQUErRyxDQUFDLEdBQWhILEVBQXFILEdBQXJILEVBQTBILEdBQTFILEVBQStILENBQUMsR0FBaEksRUFBcUksQ0FBQyxHQUF0SSxFQUEySSxDQUFDLEdBQTVJLEVBQWlKLEdBQWpKLEVBQXNKLENBQUMsR0FBdkosRUFBNEosR0FBNUosRUFBaUssR0FBakssRUFBc0ssQ0FBQyxHQUF2SyxFQUE0SyxDQUFDLEdBQTdLLEVBQWtMLENBQUMsR0FBbkwsRUFBd0wsQ0FBQyxHQUF6TCxFQUE4TCxHQUE5TCxFQUFtTSxDQUFDLEdBQXBNLEVBQXlNLENBQUMsR0FBMU0sRUFBK00sR0FBL00sRUFBb04sR0FBcE4sRUFBeU4sR0FBek4sRUFBOE4sR0FBOU4sRUFBbU8sR0FBbk8sRUFBd08sQ0FBQyxHQUF6TyxFQUE4TyxHQUE5TyxFQUFtUCxDQUFDLEdBQXBQLEVBQXlQLEdBQXpQLEVBQThQLEdBQTlQLEVBQW1RLENBQUMsR0FBcFEsRUFBeVEsR0FBelEsRUFBOFEsQ0FBQyxHQUEvUSxFQUFvUixHQUFwUixFQUF5UixHQUF6UixFQUE4UixHQUE5UixFQUFtUyxHQUFuUyxFQUF3UyxHQUF4UyxFQUE2UyxDQUFDLEdBQTlTLEVBQW1ULENBQUMsR0FBcFQsRUFBeVQsR0FBelQsRUFBOFQsR0FBOVQsRUFBbVUsQ0FBQyxHQUFwVSxDQUFoQjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CLEVBQWtDLENBQWxDLEVBQXFDLEVBQXJDLEVBQXlDLEVBQXpDLEVBQTZDLEVBQTdDLEVBQWlELEVBQWpELEVBQXFELEVBQXJELEVBQXlELEVBQXpELEVBQTZELEVBQTdELEVBQWlFLEVBQWpFLEVBQXFFLEVBQXJFLEVBQXlFLEVBQXpFLEVBQTZFLEVBQTdFLEVBQWlGLEVBQWpGLEVBQXFGLENBQXJGLEVBQXdGLENBQXhGLEVBQTJGLEVBQTNGLEVBQStGLEVBQS9GLEVBQW1HLEVBQW5HLEVBQXVHLENBQXZHLENBQWI7QUFDQSxjQUFLQyxHQUFMLEdBQVcsQ0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsR0FBeEIsRUFBNkIsR0FBN0IsRUFBa0MsSUFBbEMsRUFBd0MsR0FBeEMsRUFBNkMsSUFBN0MsRUFBbUQsSUFBbkQsRUFBeUQsR0FBekQsRUFBOEQsSUFBOUQsRUFBb0UsSUFBcEUsRUFBMEUsR0FBMUUsRUFBK0UsR0FBL0UsRUFBb0YsR0FBcEYsRUFBeUYsR0FBekYsRUFBOEYsSUFBOUYsRUFBb0csR0FBcEcsRUFBeUcsR0FBekcsRUFBOEcsSUFBOUcsRUFBb0gsSUFBcEgsRUFBMEgsSUFBMUgsRUFBZ0ksR0FBaEksRUFBcUksR0FBckksRUFBMEksR0FBMUksRUFBK0ksSUFBL0ksRUFBcUosR0FBckosRUFBMEosR0FBMUosRUFBK0osSUFBL0osRUFBcUssSUFBckssRUFBMkssSUFBM0ssRUFBaUwsSUFBakwsRUFBdUwsSUFBdkwsRUFBNkwsSUFBN0wsRUFBbU0sR0FBbk0sRUFBd00sR0FBeE0sRUFBNk0sSUFBN00sRUFBbU4sR0FBbk4sRUFBd04sR0FBeE4sQ0FBWDs7QUFFQSxjQUFLMkIsU0FBTDs7QUFFQSxjQUFLcEIsTUFBTCxHQUFjO0FBQUEsbUJBQU0sTUFBS3pDLElBQUwsQ0FBVThCLFFBQVYsQ0FBbUJSLENBQW5CLEdBQXVCLE1BQUt0QixJQUFMLENBQVU4QixRQUFWLENBQW1CUixDQUFuQixHQUF1QmpELEtBQUtFLEVBQUwsR0FBVSxDQUE5RDtBQUFBLFNBQWQ7QUFaNEM7QUFhL0M7Ozs7cUNBRVkwQyxNLEVBQVFDLEssRUFBTztBQUN4QixnQkFBSSxDQUFDRCxXQUFXLENBQVgsSUFBZ0JBLFdBQVcsQ0FBNUIsS0FBa0MsQ0FBQyxLQUFLMkMsT0FBNUMsRUFBcUQ7QUFDakQsdUJBQU8sQ0FBUCxDQURpRCxDQUN2QztBQUNiLGFBRkQsTUFFTztBQUNILHVCQUFPLENBQVAsQ0FERyxDQUNPO0FBQ2I7QUFFSjs7OztFQXhCc0IvQixjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKM0I7Ozs7Ozs7O0lBSWFpQyxNLFdBQUFBLE07OztBQUVULG9CQUFZdkcsS0FBWixFQUFtQmlFLFFBQW5CLEVBQTZCTSxRQUE3QixFQUF1QztBQUFBOztBQUFBLG9IQUM3QnZFLEtBRDZCLEVBQ3RCaUUsUUFEc0IsRUFDWixRQURZLEVBQ0ZNLFFBREU7O0FBR25DLGNBQUtFLFFBQUwsR0FBZ0IsQ0FBQyxDQUFDLEdBQUYsRUFBTyxDQUFDLEdBQVIsRUFBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQXVCLENBQUMsR0FBeEIsRUFBNkIsQ0FBQyxHQUE5QixFQUFtQyxDQUFDLEdBQXBDLEVBQXlDLEdBQXpDLEVBQThDLEdBQTlDLEVBQW1ELEdBQW5ELEVBQXdELEdBQXhELEVBQTZELENBQUMsR0FBOUQsRUFBbUUsQ0FBQyxHQUFwRSxFQUF5RSxDQUFDLEdBQTFFLEVBQStFLENBQUMsR0FBaEYsRUFBcUYsQ0FBQyxHQUF0RixFQUEyRixHQUEzRixFQUFnRyxDQUFDLEdBQWpHLEVBQXNHLENBQUMsR0FBdkcsRUFBNEcsQ0FBQyxHQUE3RyxFQUFrSCxHQUFsSCxFQUF1SCxHQUF2SCxFQUE0SCxDQUFDLEdBQTdILEVBQWtJLENBQUMsR0FBbkksRUFBd0ksQ0FBQyxHQUF6SSxFQUE4SSxHQUE5SSxFQUFtSixHQUFuSixFQUF3SixHQUF4SixFQUE2SixHQUE3SixFQUFrSyxDQUFDLEdBQW5LLEVBQXdLLENBQUMsR0FBekssRUFBOEssR0FBOUssRUFBbUwsR0FBbkwsRUFBd0wsR0FBeEwsRUFBNkwsR0FBN0wsRUFBa00sQ0FBQyxHQUFuTSxFQUF3TSxDQUFDLEdBQXpNLEVBQThNLEdBQTlNLEVBQW1OLENBQUMsR0FBcE4sQ0FBaEI7QUFDQSxjQUFLQyxLQUFMLEdBQWEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixFQUErQixDQUEvQixFQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxFQUF6QyxFQUE2QyxFQUE3QyxFQUFpRCxDQUFqRCxFQUFvRCxDQUFwRCxFQUF1RCxDQUF2RCxFQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxFQUFnRSxDQUFoRSxDQUFiO0FBQ0EsY0FBS0MsR0FBTCxHQUFXLENBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxJQUFaLEVBQWtCLEdBQWxCLEVBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLEVBQStDLEdBQS9DLEVBQW9ELEdBQXBELEVBQXlELElBQXpELEVBQStELEdBQS9ELEVBQW9FLEdBQXBFLEVBQXlFLElBQXpFLEVBQStFLElBQS9FLEVBQXFGLElBQXJGLEVBQTJGLEdBQTNGLEVBQWdHLEdBQWhHLEVBQXFHLElBQXJHLEVBQTJHLEdBQTNHLEVBQWdILEdBQWhILEVBQXFILElBQXJILEVBQTJILElBQTNILEVBQWlJLElBQWpJLEVBQXVJLElBQXZJLEVBQTZJLEdBQTdJLENBQVg7O0FBRUEsY0FBSzJCLFNBQUw7O0FBRUEsY0FBS3BCLE1BQUwsR0FBYyxZQUFNO0FBQ2hCLGtCQUFLWCxRQUFMLEdBQWdCLENBQUMsTUFBS0EsUUFBTCxHQUFnQixDQUFqQixJQUFzQixDQUF0QztBQUNBLGtCQUFLOUIsSUFBTCxDQUFVOEIsUUFBVixDQUFtQlIsQ0FBbkIsR0FBdUJqRCxLQUFLRSxFQUFMLEdBQVUsTUFBS3VELFFBQWYsR0FBMEIsQ0FBakQ7QUFDSCxTQUhEO0FBVG1DO0FBYXRDOzs7O3FDQUVZYixNLEVBQVFDLEssRUFBTztBQUN4QixnQkFBSUQsV0FBVyxDQUFYLElBQWdCQSxXQUFXLENBQS9CLEVBQWtDO0FBQzlCLHFCQUFLakIsSUFBTCxDQUFVZ0IsY0FBVixDQUF5QkMsTUFBekI7QUFDQSxvQkFBSUMsUUFBUSxDQUFaLEVBQWUsT0FBTyxDQUFQLENBRmUsQ0FFTDtBQUN6QixvQkFBSUEsUUFBUSxDQUFaLEVBQWUsT0FBTyxDQUFQLENBSGUsQ0FHTDtBQUM1QixhQUpELE1BSU87QUFDSCx1QkFBTyxDQUFQLENBREcsQ0FDTztBQUNiO0FBRUo7Ozs7RUExQnVCVyxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSjVCOzs7Ozs7OztJQUVha0MsTSxXQUFBQSxNOzs7QUFFVCxvQkFBWXhHLEtBQVosRUFBbUJpRSxRQUFuQixFQUE2Qk0sUUFBN0IsRUFBdUM7QUFBQTs7QUFBQSxvSEFDN0J2RSxLQUQ2QixFQUN2QmlFLFFBRHVCLEVBQ2QsUUFEYyxFQUNKTSxRQURJOztBQUduQyxjQUFLSSxHQUFMLEdBQVcsQ0FBQyxHQUFELEVBQUssSUFBTCxFQUFXLElBQVgsRUFBZ0IsSUFBaEIsRUFBc0IsR0FBdEIsRUFBMEIsR0FBMUIsRUFBK0IsSUFBL0IsRUFBb0MsR0FBcEMsRUFBeUMsSUFBekMsRUFBOEMsR0FBOUMsRUFBbUQsSUFBbkQsRUFBd0QsR0FBeEQsRUFBNkQsSUFBN0QsRUFBa0UsSUFBbEUsRUFBd0UsR0FBeEUsRUFBNEUsR0FBNUUsRUFBaUYsSUFBakYsRUFBc0YsSUFBdEYsRUFBNEYsR0FBNUYsRUFBZ0csSUFBaEcsRUFBc0csSUFBdEcsRUFBMkcsR0FBM0csRUFBZ0gsR0FBaEgsRUFBb0gsR0FBcEgsRUFBeUgsR0FBekgsRUFBNkgsSUFBN0gsRUFBbUksSUFBbkksRUFBd0ksSUFBeEksRUFBOEksR0FBOUksRUFBa0osR0FBbEosRUFBdUosSUFBdkosRUFBNEosR0FBNUosRUFBaUssR0FBakssRUFBcUssR0FBckssRUFBMEssSUFBMUssRUFBK0ssR0FBL0ssRUFBb0wsR0FBcEwsRUFBd0wsSUFBeEwsRUFBOEwsSUFBOUwsRUFBbU0sSUFBbk0sRUFBeU0sR0FBek0sRUFBNk0sSUFBN00sRUFBbU4sR0FBbk4sRUFBdU4sR0FBdk4sRUFBNE4sSUFBNU4sRUFBaU8sSUFBak8sRUFBdU8sR0FBdk8sRUFBMk8sSUFBM08sQ0FBWDs7QUFFQSxjQUFLMkIsU0FBTDs7QUFFQSxjQUFLcEIsTUFBTCxHQUFjO0FBQUEsbUJBQU0sTUFBS3pDLElBQUwsQ0FBVThCLFFBQVYsQ0FBbUJSLENBQW5CLEdBQXVCLE1BQUt0QixJQUFMLENBQVU4QixRQUFWLENBQW1CUixDQUFuQixHQUF1QmpELEtBQUtFLEVBQUwsR0FBVSxDQUE5RDtBQUFBLFNBQWQ7QUFQbUM7QUFRdEM7OztFQVZ1QnNELGM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGNUI7Ozs7Ozs7O0lBRWFtQyxJLFdBQUFBLEk7OztBQUVULGtCQUFZekcsS0FBWixFQUFtQmlFLFFBQW5CLEVBQTZCO0FBQUE7O0FBQUEsZ0hBQ25CakUsS0FEbUIsRUFDYmlFLFFBRGEsRUFDSixNQURJOztBQUd6QixjQUFLVSxHQUFMLEdBQVcsQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFZLEdBQVosRUFBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsR0FBaEMsRUFBb0MsR0FBcEMsRUFBeUMsR0FBekMsRUFBNkMsR0FBN0MsRUFBa0QsSUFBbEQsRUFBdUQsSUFBdkQsRUFBNkQsSUFBN0QsRUFBa0UsSUFBbEUsRUFBd0UsR0FBeEUsRUFBNEUsSUFBNUUsRUFBa0YsR0FBbEYsRUFBc0YsSUFBdEYsRUFBNEYsSUFBNUYsRUFBaUcsSUFBakcsRUFBdUcsR0FBdkcsRUFBMkcsR0FBM0csRUFBZ0gsSUFBaEgsRUFBcUgsR0FBckgsRUFBMEgsSUFBMUgsRUFBK0gsSUFBL0gsRUFBcUksR0FBckksRUFBeUksSUFBekksRUFBK0ksSUFBL0ksRUFBb0osR0FBcEosRUFBeUosR0FBekosRUFBNkosR0FBN0osRUFBa0ssR0FBbEssRUFBc0ssR0FBdEssRUFBMkssSUFBM0ssRUFBZ0wsR0FBaEwsRUFBcUwsR0FBckwsRUFBeUwsSUFBekwsRUFBK0wsR0FBL0wsRUFBbU0sSUFBbk0sRUFBeU0sSUFBek0sRUFBOE0sSUFBOU0sRUFBb04sSUFBcE4sRUFBeU4sR0FBek4sRUFBOE4sSUFBOU4sRUFBbU8sR0FBbk8sRUFBd08sR0FBeE8sRUFBNE8sR0FBNU8sQ0FBWDtBQUNBLGNBQUtKLFFBQUwsR0FBZ0JtQyxJQUFJLENBQUosQ0FBaEI7QUFDQSxjQUFLSixTQUFMO0FBTHlCO0FBTTVCOzs7RUFScUJoQyxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGMUI7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7O0FBR0E7Ozs7SUFFYXFDLEksV0FBQUEsSTtBQUVULGtCQUFZM0csS0FBWixFQUFtQjtBQUFBOztBQUNmLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUs0RyxJQUFMLEdBQVksS0FBS0MsUUFBTCxFQUFaO0FBQ0EsYUFBS0MsYUFBTCxHQUFxQixJQUFJQyw0QkFBSixFQUFyQjtBQUNBLGFBQUtDLFVBQUw7QUFFSDs7Ozs4QkFFSztBQUNGLGdCQUFJeEMsU0FBUyxLQUFLeEUsS0FBTCxDQUFXaUgsZUFBWCxDQUEyQixRQUEzQixDQUFiO0FBQ0EsaUJBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMUMsT0FBTy9DLE1BQTNCLEVBQW1DeUYsR0FBbkMsRUFBd0M7QUFDcEMscUJBQUtsSCxLQUFMLENBQVc2QixVQUFYLENBQXNCMkMsT0FBTzBDLENBQVAsQ0FBdEI7QUFDSDtBQUNELGlCQUFLSixhQUFMLENBQW1CSyxJQUFuQjtBQUNBLGlCQUFLSCxVQUFMO0FBQ0EsaUJBQUtJLFlBQUw7QUFDQSxpQkFBS0MsWUFBTDtBQUNBLGlCQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDSDs7O3FDQUVZO0FBQ1QsaUJBQUt0SCxNQUFMLEdBQWMsS0FBSzZHLGFBQUwsQ0FBbUI3RyxNQUFqQztBQUNBLGlCQUFLcUgsU0FBTCxHQUFpQixJQUFJdkgsb0JBQUosQ0FBYyxLQUFLQyxLQUFuQixFQUEwQixLQUFLQyxNQUEvQixDQUFqQjtBQUNBLGlCQUFLcUgsU0FBTCxDQUFlcEgsS0FBZixHQUF1QixLQUFLc0gsR0FBTCxDQUFTckIsSUFBVCxDQUFjLElBQWQsQ0FBdkI7QUFDSDs7O21DQUVVO0FBQ1AsZ0JBQUlTLE9BQU8sRUFBWDs7QUFFQSxpQkFBSyxJQUFJTSxJQUFJLENBQWIsRUFBZ0JBLElBQUksQ0FBcEIsRUFBdUJBLEdBQXZCLEVBQTRCO0FBQ3hCLHFCQUFLLElBQUlPLElBQUksQ0FBYixFQUFnQkEsSUFBSSxDQUFwQixFQUF1QkEsR0FBdkIsRUFBNEI7QUFDeEJiLHlCQUFLcEYsSUFBTCxDQUFVLElBQUloQixRQUFRa0gsT0FBWixDQUFvQlIsSUFBSSxDQUF4QixFQUEyQk8sSUFBSSxDQUEvQixFQUFrQ1AsSUFBSSxDQUFKLEdBQVEsSUFBMUMsRUFBZ0RPLElBQUksQ0FBSixHQUFRLElBQXhELENBQVY7QUFDSDtBQUNKO0FBQ0QsbUJBQU9iLElBQVA7QUFDSDs7O29DQUVXNUcsSyxFQUFPO0FBQ2YsZ0JBQUkySCxZQUFZLElBQUluSCxRQUFRb0gsZ0JBQVosQ0FBNkIsV0FBN0IsRUFBMEMsSUFBSXBILFFBQVFDLE9BQVosQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsQ0FBMUMsRUFBd0VULEtBQXhFLENBQWhCO0FBQ0EySCxzQkFBVUUsT0FBVixHQUFvQixJQUFJckgsUUFBUXNILE1BQVosQ0FBbUIsRUFBbkIsRUFBdUIsRUFBdkIsRUFBMkIsRUFBM0IsQ0FBcEI7O0FBR0EsZ0JBQUlDLFFBQVEsSUFBSXZILFFBQVF3SCxnQkFBWixDQUE2QixRQUE3QixFQUF1QyxJQUFJeEgsUUFBUUMsT0FBWixDQUFvQixDQUFDLENBQXJCLEVBQXdCLENBQUMsQ0FBekIsRUFBNEIsQ0FBNUIsQ0FBdkMsRUFBdUVULEtBQXZFLENBQVo7QUFDQStILGtCQUFNOUQsUUFBTixHQUFpQixJQUFJekQsUUFBUUMsT0FBWixDQUFvQixDQUFwQixFQUF1QixDQUF2QixFQUEwQixDQUExQixDQUFqQjtBQUNBc0gsa0JBQU1FLFVBQU4sR0FBbUIsQ0FBbkI7QUFDQUYsa0JBQU1HLFVBQU4sR0FBbUIsRUFBbkI7QUFDQUgsa0JBQU1uRixTQUFOLEdBQWtCLENBQWxCOztBQUVBLGdCQUFJdUYsWUFBWSxJQUFJM0gsUUFBUTRILGVBQVosQ0FBNEIsSUFBNUIsRUFBa0NMLEtBQWxDLENBQWhCOztBQUVBSSxzQkFBVUUsa0JBQVYsR0FBK0IsSUFBL0I7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBS0MsUUFBTCxHQUFnQnRJLE1BQU11SSx5QkFBTixFQUFoQjs7QUFFQSxpQkFBS25CLFlBQUw7O0FBRUEsZ0JBQUlvQixTQUFTLElBQUlDLGNBQUosQ0FBVyxLQUFLekksS0FBaEIsQ0FBYjs7QUFFQUEsa0JBQU0wSSxPQUFOLEdBQWdCLElBQUlsSSxRQUFRQyxPQUFaLENBQW9CLENBQXBCLEVBQXVCLENBQUMsSUFBeEIsRUFBOEIsQ0FBOUIsQ0FBaEI7O0FBRUEsaUJBQUs2SCxRQUFMLENBQWNLLGtCQUFkOztBQUVBLGdCQUFJQyxPQUFPLElBQVg7QUFDQUEsaUJBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQUQsaUJBQUtFLGVBQUwsR0FBdUIsS0FBdkI7QUFDQSxpQkFBS1IsUUFBTCxDQUFjUyxzQkFBZCxDQUFxQ0MsR0FBckMsQ0FBeUMsVUFBQ0MsZUFBRCxFQUFxQjtBQUMxRDtBQUNBQSxnQ0FBZ0JDLCtCQUFoQixDQUFnREYsR0FBaEQsQ0FBb0QsVUFBQ0csQ0FBRCxFQUFPOztBQUV2RCx3QkFBSUEsRUFBRUMsT0FBRixJQUFhLENBQUNSLEtBQUtFLGVBQXZCLEVBQXdDO0FBQ3BDRiw2QkFBS0UsZUFBTCxHQUF1QixJQUF2QjtBQUNBLDRCQUFHRixLQUFLQyxZQUFMLENBQWtCdEYsTUFBckIsRUFDQXFGLEtBQUtDLFlBQUwsQ0FBa0J0RixNQUFsQixDQUF5QjhGLE9BQXpCO0FBQ0gscUJBSkQsTUFJTyxJQUFJLENBQUNGLEVBQUVDLE9BQUgsSUFBY1IsS0FBS0UsZUFBdkIsRUFBd0M7QUFDM0NGLDZCQUFLRSxlQUFMLEdBQXVCLEtBQXZCO0FBQ0g7QUFHSixpQkFYRDtBQVlILGFBZEQ7QUFlQSxpQkFBS1IsUUFBTCxDQUFjZ0IsaUJBQWQsQ0FBZ0NOLEdBQWhDLENBQW9DLFVBQUN2RyxJQUFELEVBQVU7QUFDMUNtRyxxQkFBS0MsWUFBTCxHQUFvQnBHLElBQXBCO0FBQ0gsYUFGRDtBQUdBLGlCQUFLNkYsUUFBTCxDQUFjaUIsd0JBQWQsQ0FBdUNQLEdBQXZDLENBQTJDLFVBQUN2RyxJQUFELEVBQVU7QUFDakRtRyxxQkFBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNILGFBRkQ7O0FBSUEsaUJBQUtQLFFBQUwsQ0FBY2tCLHNCQUFkLEdBQXVDLFVBQUMvRyxJQUFELEVBQVU7QUFDN0Msb0JBQUlqQyxRQUFRMEIsSUFBUixDQUFhdUgsWUFBYixDQUEwQmhILElBQTFCLEVBQWdDLE9BQWhDLEtBQTJDQSxLQUFLSSxJQUFMLElBQVkyRixPQUFPM0YsSUFBbEUsRUFBd0U7QUFBRTtBQUN0RTZHLDRCQUFRQyxHQUFSLENBQVlsSCxLQUFLSSxJQUFqQjtBQUNBLDJCQUFPLElBQVA7QUFFSDtBQUNELHVCQUFPLEtBQVA7QUFDSCxhQVBEO0FBUUE3QyxrQkFBTTRKLFlBQU4sQ0FBbUJDLE9BQW5CLEdBQTZCLEdBQTdCO0FBQ0E3SixrQkFBTTRKLFlBQU4sQ0FBbUJFLEtBQW5CLEdBQTJCLEdBQTNCO0FBQ0E5SixrQkFBTTRKLFlBQU4sQ0FBbUJHLElBQW5CLEdBQTBCLEVBQTFCO0FBQ0EvSixrQkFBTTRKLFlBQU4sQ0FBbUJJLFlBQW5CLEdBQWtDLElBQWxDO0FBQ0FoSyxrQkFBTTRKLFlBQU4sQ0FBbUJLLFNBQW5CLEdBQStCLElBQUl6SixRQUFRQyxPQUFaLENBQW9CLEdBQXBCLEVBQXlCLEdBQXpCLEVBQThCLEdBQTlCLENBQS9CO0FBQ0FULGtCQUFNa0ssaUJBQU4sR0FBMEIsSUFBMUI7QUFDQWxLLGtCQUFNNEosWUFBTixDQUFtQi9ELGVBQW5CLEdBQXFDLElBQXJDOztBQUVBLGlCQUFLeUMsUUFBTCxDQUFjNkIsbUJBQWQsQ0FBa0M7QUFDOUJDLCtCQUFlNUIsT0FBTzNGO0FBRFEsYUFBbEM7O0FBSUEsZ0JBQUl3SCxvQkFBb0IsR0FBeEI7QUFDQSxnQkFBSUMsZ0JBQWdCLElBQUk5SixRQUFRK0osY0FBWixDQUEyQixpQkFBM0IsRUFBOEM7QUFDOURDLHVCQUFPLEdBRHVEO0FBRTlEQyx3QkFBUTtBQUZzRCxhQUE5QyxFQUdqQnpLLEtBSGlCLENBQXBCO0FBSUEsZ0JBQUkwSyxpQkFBaUJKLGNBQWNLLFVBQWQsRUFBckI7QUFDQUwsMEJBQWNNLFFBQWQsR0FBeUIsSUFBekI7QUFDQSxnQkFBSUMsaUJBQWlCLElBQUlySyxRQUFRNkIsZ0JBQVosQ0FBNkIsS0FBN0IsRUFBb0NyQyxLQUFwQyxDQUFyQjtBQUNBNkssMkJBQWVDLGNBQWYsR0FBZ0NSLGFBQWhDOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFLbkMsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxpQkFBS2QsWUFBTDtBQUNBLGlCQUFLQyxTQUFMLENBQWVDLFNBQWY7QUFDSDs7O3VDQUVjO0FBQ1gsaUJBQUtZLFNBQUwsQ0FBZTRDLFVBQWYsQ0FBMEJDLFVBQTFCLEdBQXVDLEVBQXZDO0FBQ0EsaUJBQUssSUFBSTlELElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLbEgsS0FBTCxDQUFXd0UsTUFBWCxDQUFrQi9DLE1BQXRDLEVBQThDeUYsR0FBOUMsRUFBbUQ7QUFDL0Msb0JBQUksS0FBS2xILEtBQUwsQ0FBV3dFLE1BQVgsQ0FBa0IwQyxDQUFsQixFQUFxQnJFLElBQXJCLElBQTZCLGNBQWpDLEVBQWlEO0FBQzdDLHlCQUFLc0YsU0FBTCxDQUFlOEMsZUFBZixDQUErQixLQUFLakwsS0FBTCxDQUFXd0UsTUFBWCxDQUFrQjBDLENBQWxCLENBQS9CO0FBQ0g7QUFDRCxxQkFBS2xILEtBQUwsQ0FBV3dFLE1BQVgsQ0FBa0IwQyxDQUFsQixFQUFxQmdFLGNBQXJCLEdBQXNDLElBQXRDO0FBQ0g7QUFDSjs7O3VDQUVjO0FBQUE7O0FBQ1gsaUJBQUssSUFBSWhFLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLakgsTUFBTCxDQUFZd0IsTUFBaEMsRUFBd0N5RixHQUF4QyxFQUE2QztBQUN6Qyx3QkFBUSxLQUFLakgsTUFBTCxDQUFZaUgsQ0FBWixFQUFlNUcsSUFBdkI7QUFDSSx5QkFBSyxPQUFMO0FBQ0ksNEJBQUk2SyxhQUFhLElBQUkvRSxZQUFKLENBQVUsS0FBS3BHLEtBQWYsRUFBc0IsS0FBS0MsTUFBTCxDQUFZaUgsQ0FBWixFQUFleEcsR0FBckMsRUFBMEMsSUFBMUMsRUFBZ0QsS0FBS1QsTUFBTCxDQUFZaUgsQ0FBWixFQUFldEcsR0FBL0QsQ0FBakI7QUFDQXVLLG1DQUFXaEcsUUFBWCxHQUFzQixZQUFNO0FBQ3hCLGdDQUFJaEYsUUFBUSxNQUFLRixNQUFMLENBQVlHLElBQVosQ0FBaUI7QUFBQSx1Q0FBS0MsRUFBRUMsSUFBRixLQUFXLE9BQWhCO0FBQUEsNkJBQWpCLENBQVo7QUFDQUgsa0NBQU1TLEdBQU4sR0FBWSxDQUFDVCxNQUFNUyxHQUFOLEdBQVksQ0FBYixJQUFrQixDQUE5QjtBQUNBLGtDQUFLMEcsU0FBTCxDQUFlQyxTQUFmO0FBQ0gseUJBSkQ7QUFLQTtBQUNKLHlCQUFLLEtBQUw7QUFDSSw0QkFBSTZELFdBQVcsSUFBSWhGLFlBQUosQ0FBVSxLQUFLcEcsS0FBZixFQUFzQixLQUFLQyxNQUFMLENBQVlpSCxDQUFaLEVBQWV4RyxHQUFyQyxFQUEwQyxLQUExQyxFQUFpRCxLQUFLVCxNQUFMLENBQVlpSCxDQUFaLEVBQWV0RyxHQUFoRSxDQUFmO0FBQ0F3SyxpQ0FBU2pHLFFBQVQsR0FBb0IsWUFBTTtBQUN0QixrQ0FBS21DLFNBQUwsQ0FBZUMsU0FBZjtBQUNILHlCQUZEO0FBR0E7QUFDSix5QkFBSyxRQUFMO0FBQ0ksNEJBQUk4RCxTQUFTLElBQUk5RSxjQUFKLENBQVcsS0FBS3ZHLEtBQWhCLEVBQXVCLEtBQUtDLE1BQUwsQ0FBWWlILENBQVosRUFBZXhHLEdBQXRDLEVBQTJDLEtBQUtULE1BQUwsQ0FBWWlILENBQVosRUFBZXRHLEdBQTFELENBQWI7QUFDQXlLLCtCQUFPbEcsUUFBUCxHQUFrQixZQUFNO0FBQ3BCLGtDQUFLbUMsU0FBTCxDQUFlQyxTQUFmO0FBQ0gseUJBRkQ7QUFHQTtBQUNKLHlCQUFLLFFBQUw7QUFDSSw0QkFBSStELFNBQVMsSUFBSTlFLGNBQUosQ0FBVyxLQUFLeEcsS0FBaEIsRUFBdUIsS0FBS0MsTUFBTCxDQUFZaUgsQ0FBWixFQUFleEcsR0FBdEMsRUFBMkMsS0FBS1QsTUFBTCxDQUFZaUgsQ0FBWixFQUFldEcsR0FBMUQsQ0FBYjtBQUNBO0FBQ0oseUJBQUssTUFBTDtBQUNJLDRCQUFJNkYsVUFBSixDQUFTLEtBQUt6RyxLQUFkLEVBQXFCLEtBQUtDLE1BQUwsQ0FBWWlILENBQVosRUFBZXhHLEdBQXBDLEVBQXlDLEtBQUtULE1BQUwsQ0FBWWlILENBQVosRUFBZXRHLEdBQXhEO0FBQ0E7QUExQlI7QUE0Qkg7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDdE5RNkgsTSxXQUFBQSxNLEdBQ1QsZ0JBQVl6SSxLQUFaLEVBQWtCO0FBQUE7O0FBQ2QsU0FBS0EsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFNBQUt5QyxJQUFMLEdBQVksSUFBSWpDLFFBQVFzQixXQUFSLENBQW9CeUosaUJBQXhCLENBQTBDLGNBQTFDLEVBQTBEO0FBQ2xFQyxjQUFNLENBQUMsRUFEMkQ7QUFFbEVDLGNBQU0sQ0FBQyxFQUYyRDtBQUdsRUMsY0FBTSxFQUg0RDtBQUlsRUMsY0FBTSxFQUo0RDtBQUtsRUMsc0JBQWM7QUFDVixpQkFBSyxFQURLO0FBRVYsaUJBQUs7QUFGSztBQUxvRCxLQUExRCxFQVNULEtBQUs1TCxLQVRJLENBQVo7O0FBV0EsUUFBSThFLFVBQVUsSUFBSXRFLFFBQVF1RSxPQUFaLENBQW9CLFdBQXBCLEVBQWlDLEtBQUsvRSxLQUF0QyxFQUE2QyxLQUE3QyxFQUFvRCxJQUFwRCxFQUEwRFEsUUFBUXVFLE9BQVIsQ0FBZ0JDLG9CQUExRSxDQUFkO0FBQ0EsUUFBSTZHLFlBQVksSUFBSXJMLFFBQVE2QixnQkFBWixDQUE2QixXQUE3QixFQUEwQyxLQUFLckMsS0FBL0MsQ0FBaEI7QUFDQTZMLGNBQVU1RyxjQUFWLEdBQTJCSCxPQUEzQjtBQUNBK0csY0FBVTVHLGNBQVYsQ0FBeUI2RyxNQUF6QixHQUFrQyxLQUFsQztBQUNBRCxjQUFVNUcsY0FBVixDQUF5QjhHLE1BQXpCLEdBQWtDLEtBQWxDO0FBQ0FGLGNBQVU1RyxjQUFWLENBQXlCK0csS0FBekIsR0FBaUN4TCxRQUFRdUUsT0FBUixDQUFnQmtILGtCQUFqRDtBQUNBSixjQUFVNUcsY0FBVixDQUF5QmlILEtBQXpCLEdBQWlDMUwsUUFBUXVFLE9BQVIsQ0FBZ0JrSCxrQkFBakQ7O0FBRUFKLGNBQVVNLGVBQVYsR0FBNEJySCxPQUE1QjtBQUNBK0csY0FBVU0sZUFBVixDQUEwQkwsTUFBMUIsR0FBbUMsS0FBbkM7QUFDQUQsY0FBVU0sZUFBVixDQUEwQkosTUFBMUIsR0FBbUMsS0FBbkM7QUFDQUYsY0FBVU0sZUFBVixDQUEwQkgsS0FBMUIsR0FBa0N4TCxRQUFRdUUsT0FBUixDQUFnQmtILGtCQUFsRDtBQUNBSixjQUFVTSxlQUFWLENBQTBCRCxLQUExQixHQUFrQzFMLFFBQVF1RSxPQUFSLENBQWdCa0gsa0JBQWxEOztBQUVBSixjQUFVTyxhQUFWLEdBQTBCLElBQUk1TCxRQUFRc0gsTUFBWixDQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixDQUExQjtBQUNBLFNBQUtyRixJQUFMLENBQVVMLFFBQVYsR0FBcUJ5SixTQUFyQjtBQUNBLFNBQUtwSixJQUFMLENBQVVvRCxlQUFWLEdBQTRCLElBQTVCO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hDUWtCLGEsV0FBQUEsYTtBQUNULDZCQUFjO0FBQUE7O0FBRVYsYUFBS3NGLE9BQUwsR0FBZSxDQUNYLENBQUMsRUFBQy9MLE1BQUssT0FBTixFQUFjSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWxCLEVBQWtDRSxLQUFJLENBQXRDLEVBQUQsRUFBMkMsRUFBQ04sTUFBSyxLQUFOLEVBQVlJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFoQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUEzQyxDQURXLEVBRVgsQ0FBQyxFQUFDTixNQUFLLE9BQU4sRUFBY0ksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFsQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFELEVBQTJDLEVBQUNOLE1BQUssS0FBTixFQUFZSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBaEIsRUFBaUNFLEtBQUksQ0FBckMsRUFBM0MsRUFBb0YsRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFuQixFQUFvQ0UsS0FBSSxDQUF4QyxFQUFwRixDQUZXLEVBR1gsQ0FBQyxFQUFDTixNQUFLLE9BQU4sRUFBY0ksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFsQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFELEVBQTJDLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFuQixFQUFxQ0UsS0FBSSxDQUF6QyxFQUEzQyxFQUF3RixFQUFDTixNQUFLLEtBQU4sRUFBWUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWhCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhGLEVBQWlJLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWpJLEVBQTBLLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBbkIsRUFBb0NFLEtBQUksQ0FBeEMsRUFBMUssQ0FIVyxFQUlYLENBQUMsRUFBQ04sTUFBSyxPQUFOLEVBQWNJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFsQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFELEVBQTRDLEVBQUNOLE1BQUssS0FBTixFQUFZSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWhCLEVBQWdDRSxLQUFJLENBQXBDLEVBQTVDLEVBQW9GLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFuQixFQUFxQ0UsS0FBSSxDQUF6QyxFQUFwRixFQUFpSSxFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQWpJLEVBQTZLLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQTdLLEVBQXNOLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXROLEVBQStQLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQS9QLEVBQXdTLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBeFMsRUFBa1YsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFsVixFQUE0WCxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTVYLEVBQXNhLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXRhLEVBQStjLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQS9jLEVBQXdmLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhmLEVBQWlpQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQWppQixFQUEya0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUEza0IsRUFBcW5CLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBcm5CLEVBQStwQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQS9wQixDQUpXLEVBS1gsQ0FBQyxFQUFDTixNQUFLLE9BQU4sRUFBY0ksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWxCLEVBQW1DRSxLQUFJLENBQXZDLEVBQUQsRUFBNEMsRUFBQ04sTUFBSyxLQUFOLEVBQVlJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFoQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUE1QyxFQUFxRixFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQXJGLEVBQWlJLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQW5CLEVBQW1DRSxLQUFJLENBQXZDLEVBQWpJLEVBQTRLLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBNUssRUFBc04sRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFuQixFQUFvQ0UsS0FBSSxDQUF4QyxFQUF0TixFQUFrUSxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBbFEsRUFBNlMsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBN1MsRUFBc1YsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBdFYsRUFBK1gsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUEvWCxFQUF5YSxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQXphLEVBQW1kLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQW5kLEVBQTRmLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQTVmLENBTFcsRUFNWCxDQUFDLEVBQUNOLE1BQUssT0FBTixFQUFjSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBbEIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBRCxFQUE0QyxFQUFDTixNQUFLLEtBQU4sRUFBWUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFoQixFQUFnQ0UsS0FBSSxDQUFwQyxFQUE1QyxFQUFvRixFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQXBGLEVBQWdJLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQW5CLEVBQW1DRSxLQUFJLENBQXZDLEVBQWhJLEVBQTJLLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBM0ssRUFBcU4sRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQWpCLEVBQW1DRSxLQUFJLENBQXZDLEVBQXJOLEVBQWdRLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWhRLEVBQXlTLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXpTLEVBQWtWLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFsVixFQUE2WCxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTdYLEVBQXVhLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXZhLEVBQWdkLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWhkLEVBQXlmLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFuQixFQUFxQ0UsS0FBSSxDQUF6QyxFQUF6ZixFQUFzaUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBdGlCLEVBQStrQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQUFqQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUEva0IsRUFBd25CLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhuQixFQUFpcUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBanFCLEVBQTBzQixFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQTFzQixFQUFzdkIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUF0dkIsRUFBZ3lCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBaHlCLEVBQTAwQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTEwQixFQUFvM0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFwM0IsRUFBODVCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBOTVCLEVBQXc4QixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQXg4QixFQUFrL0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFsL0IsRUFBNGhDLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBNWhDLEVBQXNrQyxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQXRrQyxFQUFnbkMsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBaG5DLENBTlcsRUFPWCxDQUFDLEVBQUNOLE1BQUssT0FBTixFQUFjSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWxCLEVBQWtDRSxLQUFJLENBQXRDLEVBQUQsRUFBMkMsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBM0MsRUFBb0YsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFwRixFQUE4SCxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTlILEVBQXdLLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhLLEVBQWlOLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWpOLEVBQTBQLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBbkIsRUFBb0NFLEtBQUksQ0FBeEMsRUFBMVAsRUFBc1MsRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQW5CLEVBQXFDRSxLQUFJLENBQXpDLEVBQXRTLEVBQW1WLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBbkIsRUFBb0NFLEtBQUksQ0FBeEMsRUFBblYsRUFBK1gsRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFuQixFQUFvQ0UsS0FBSSxDQUF4QyxFQUEvWCxFQUEyYSxFQUFDTixNQUFLLEtBQU4sRUFBWUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWhCLEVBQWlDRSxLQUFJLENBQXJDLEVBQTNhLEVBQW9kLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBcGQsRUFBOGYsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUE5ZixFQUF3aUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUF4aUIsRUFBa2xCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBbGxCLEVBQTRuQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTVuQixFQUFzcUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUF0cUIsRUFBZ3RCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBaHRCLEVBQTB2QixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTF2QixFQUFveUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFweUIsRUFBODBCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBOTBCLEVBQXczQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQXgzQixFQUFrNkIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBakIsRUFBaUNFLEtBQUksQ0FBckMsRUFBbDZCLEVBQTI4QixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBMzhCLENBUFcsRUFRWCxDQUFDLEVBQUNOLE1BQUssT0FBTixFQUFjSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWxCLEVBQWtDRSxLQUFJLENBQXRDLEVBQUQsRUFBMkMsRUFBQ04sTUFBSyxLQUFOLEVBQVlJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFoQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUEzQyxFQUFvRixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQXBGLEVBQThILEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxDQUFDLEdBQVosQ0FBbkIsRUFBb0NFLEtBQUksQ0FBeEMsRUFBOUgsRUFBMEssRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQW5CLEVBQXFDRSxLQUFJLENBQXpDLEVBQTFLLEVBQXVOLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBdk4sRUFBaVEsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFqUSxFQUEyUyxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBM1MsRUFBc1YsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQWpCLEVBQW1DRSxLQUFJLENBQXZDLEVBQXRWLEVBQWlZLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFqWSxFQUE0YSxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBNWEsRUFBdWQsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQWpCLEVBQW1DRSxLQUFJLENBQXZDLEVBQXZkLEVBQWtnQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBbGdCLEVBQTZpQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBN2lCLEVBQXdsQixFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQXhsQixFQUFvb0IsRUFBQ04sTUFBSyxRQUFOLEVBQWVJLEtBQUksQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLENBQUMsR0FBWixDQUFuQixFQUFvQ0UsS0FBSSxDQUF4QyxFQUFwb0IsRUFBZ3JCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFockIsRUFBMnRCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUEzdEIsRUFBc3dCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUF0d0IsRUFBaXpCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFqekIsRUFBNDFCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUE1MUIsRUFBdTRCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUF2NEIsRUFBazdCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFsN0IsRUFBNjlCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUE3OUIsRUFBd2dDLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsQ0FBYixDQUFqQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUF4Z0MsRUFBaWpDLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsQ0FBYixDQUFqQixFQUFpQ0UsS0FBSSxDQUFyQyxFQUFqakMsQ0FSVyxFQVNYLENBQUMsRUFBQ04sTUFBSyxPQUFOLEVBQWNJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFsQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFELEVBQTRDLEVBQUNOLE1BQUssS0FBTixFQUFZSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWhCLEVBQWdDRSxLQUFJLENBQXBDLEVBQTVDLEVBQW9GLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFuQixFQUFxQ0UsS0FBSSxDQUF6QyxFQUFwRixFQUFpSSxFQUFDTixNQUFLLFFBQU4sRUFBZUksS0FBSSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsQ0FBQyxHQUFaLENBQW5CLEVBQW9DRSxLQUFJLENBQXhDLEVBQWpJLEVBQTZLLEVBQUNOLE1BQUssUUFBTixFQUFlSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQW5CLEVBQW1DRSxLQUFJLENBQXZDLEVBQTdLLEVBQXdOLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhOLEVBQWlRLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWpRLEVBQTBTLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBMVMsRUFBb1YsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUFwVixFQUE4WCxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTlYLEVBQXdhLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQXhhLEVBQWlkLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQWpkLEVBQTBmLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQWpCLEVBQWlDRSxLQUFJLENBQXJDLEVBQTFmLEVBQW1pQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQW5pQixFQUE2a0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUE3a0IsRUFBdW5CLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBdm5CLEVBQWlxQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQWpxQixFQUEyc0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUEzc0IsRUFBcXZCLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBcnZCLEVBQSt4QixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxDQUFDLEdBQWIsQ0FBakIsRUFBbUNFLEtBQUksQ0FBdkMsRUFBL3hCLEVBQTAwQixFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTEwQixFQUFvM0IsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQWpCLEVBQW1DRSxLQUFJLENBQXZDLEVBQXAzQixFQUErNUIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksQ0FBQyxHQUFiLENBQWpCLEVBQW1DRSxLQUFJLENBQXZDLEVBQS81QixFQUEwOEIsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUExOEIsRUFBby9CLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLEdBQVosQ0FBakIsRUFBa0NFLEtBQUksQ0FBdEMsRUFBcC9CLEVBQThoQyxFQUFDTixNQUFLLE1BQU4sRUFBYUksS0FBSSxDQUFDLENBQUMsR0FBRixFQUFPLEdBQVAsRUFBWSxHQUFaLENBQWpCLEVBQWtDRSxLQUFJLENBQXRDLEVBQTloQyxFQUF3a0MsRUFBQ04sTUFBSyxNQUFOLEVBQWFJLEtBQUksQ0FBQyxDQUFDLEdBQUYsRUFBTyxHQUFQLEVBQVksR0FBWixDQUFqQixFQUFrQ0UsS0FBSSxDQUF0QyxFQUF4a0MsRUFBa25DLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUFsbkMsRUFBNnBDLEVBQUNOLE1BQUssTUFBTixFQUFhSSxLQUFJLENBQUMsQ0FBQyxHQUFGLEVBQU8sR0FBUCxFQUFZLENBQUMsR0FBYixDQUFqQixFQUFtQ0UsS0FBSSxDQUF2QyxFQUE3cEMsQ0FUVyxDQUFmOztBQThFQSxhQUFLMEwsYUFBTCxHQUFxQixDQUFDQyxPQUFPQyxRQUFQLENBQWdCQyxJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsS0FBc0MsQ0FBdkMsSUFBMEMsQ0FBL0Q7QUFDQSxhQUFLdkYsSUFBTDtBQUNIOzs7OytCQUVNO0FBQ0gsaUJBQUttRixhQUFMO0FBQ0EsaUJBQUtyTSxNQUFMLEdBQWMsS0FBS29NLE9BQUwsQ0FBYSxLQUFLQyxhQUFsQixDQUFkO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGTEMsT0FBTzdGLEdBQVAsR0FBYTtBQUFBLFdBQUssQ0FBQyxFQUFFNUYsS0FBSzZMLE1BQUwsS0FBZ0JDLENBQWxCLENBQU47QUFBQSxDQUFiOztBQUVBTCxPQUFPTSxNQUFQLEdBQWdCLFVBQUNDLENBQUQsRUFBSUMsT0FBSixFQUFnQjtBQUM1QixRQUFJQyxLQUFLbE0sS0FBS0csR0FBTCxDQUFTOEwsT0FBVCxDQUFUO0FBQ0EsUUFBSUUsS0FBS25NLEtBQUtDLEdBQUwsQ0FBU2dNLE9BQVQsQ0FBVDtBQUNBLFdBQU8sSUFBSXZNLFFBQVFDLE9BQVosQ0FBb0J1TSxLQUFLRixFQUFFM0ksQ0FBUCxHQUFXOEksS0FBS0gsRUFBRTFJLENBQXRDLEVBQXlDLENBQXpDLEVBQTRDLENBQUM2SSxFQUFELEdBQU1ILEVBQUUzSSxDQUFSLEdBQVk2SSxLQUFLRixFQUFFMUksQ0FBL0QsQ0FBUDtBQUNILENBSkQsQzs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7QUFDQTs7OztJQUVNOEksTyxHQUVGLG1CQUFjO0FBQUE7O0FBQUE7O0FBRVYsYUFBS0MsTUFBTCxHQUFjQyxTQUFTQyxjQUFULENBQXdCLGNBQXhCLENBQWQ7QUFDQSxhQUFLQyxNQUFMLEdBQWMsSUFBSTlNLFFBQVErTSxNQUFaLENBQW1CLEtBQUtKLE1BQXhCLEVBQWdDLElBQWhDLENBQWQ7QUFDQSxhQUFLbk4sS0FBTCxHQUFhLElBQUlRLFFBQVFnTixLQUFaLENBQWtCLEtBQUtGLE1BQXZCLENBQWI7QUFDQTtBQUNBZixlQUFPa0IsSUFBUCxHQUFjLElBQUk5RyxVQUFKLENBQVMsS0FBSzNHLEtBQWQsQ0FBZDs7QUFFQXlOLGFBQUtDLFdBQUwsQ0FBaUIsS0FBSzFOLEtBQXRCOztBQUVBLGFBQUtzTixNQUFMLENBQVlLLGFBQVosQ0FBMEI7QUFBQSx1QkFBTSxNQUFLM04sS0FBTCxDQUFXb0YsTUFBWCxFQUFOO0FBQUEsU0FBMUI7O0FBRUFtSCxlQUFPcUIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0M7QUFBQSx1QkFBTSxNQUFLTixNQUFMLENBQVlPLE1BQVosRUFBTjtBQUFBLFNBQWxDO0FBQ0gsQzs7QUFJTCxJQUFJWCxPQUFKLEciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIExhc2VyYmVhbSB7XHJcblxyXG4gICAgLy8gbGFzZXIgZGlyZWN0aW9uIGNvbnN0YW50czpcclxuICAgIC8vIDAgc3RvcCBwcm9ncmVzc2luZ1xyXG4gICAgLy8gMSB0dXJuIGxlZnRcclxuICAgIC8vIDIgdHVybiByaWdodFxyXG4gICAgLy8gMyBoaXR0aW5nIHRhcmdldFxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwdXp6bGUpIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSBwdXp6bGU7XHJcbiAgICAgICAgdGhpcy5vbldpbiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdMYXNlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnQgPSB0aGlzLnB1enpsZS5maW5kKGIgPT4gYi50eXBlID09PSBcInN0YXJ0XCIpO1xyXG5cclxuICAgICAgICBsZXQgb3JpZ2luID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi5zdGFydC5wb3MpO1xyXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBzdGFydC5yb3Q7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoc3RhcnQucG9zWzBdICsgTWF0aC5zaW4oTWF0aC5QSSAqIHN0YXJ0LnJvdCAvIDIpICogMTAwLCAwLjUsIHN0YXJ0LnBvc1syXSArIE1hdGguY29zKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCk7XHJcblxyXG5cclxuICAgICAgICBsZXQgbGFzZXJQb2ludHMgPSBbb3JpZ2luXTtcclxuICAgICAgICBsZXQgbmV4dFRhcmdldCA9IG9yaWdpbjtcclxuICAgICAgICBsZXQgbnVtaG9wcyA9IDA7XHJcbiAgICAgICAgbGV0IGhpdFN0YXR1cyA9IDA7XHJcbiAgICAgICAgbGV0IGxhc3RIaXQ7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBudW1ob3BzKys7XHJcbiAgICAgICAgICAgICh7XHJcbiAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0LFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdFxyXG4gICAgICAgICAgICB9ID0gdGhpcy5jYWxjdWxhdGVCZWFtKG5leHRUYXJnZXQsIGRpcmVjdGlvbiwgbGFzdEhpdCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEhbmV4dFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgbGFzZXJQb2ludHMucHVzaChuZXh0VGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uV2luKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhpdFN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAoZGlyZWN0aW9uIC0gMSkgJSA0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IHdoaWxlIChoaXRTdGF0dXMgIT0gMCAmJiBudW1ob3BzIDwgMjUpO1xyXG5cclxuICAgICAgICBpZiAobGFzZXJQb2ludHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgbGFzZXJQb2ludHMucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxhc2VyKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXNlcmJlYW1NZXNoID0gdGhpcy5zY2VuZS5nZXRNZXNoQnlOYW1lKFwibGFzZXJiZWFtXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZU1lc2gobGFzZXJiZWFtTWVzaCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXNlciA9IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVHViZShcImxhc2VyYmVhbVwiLCB7XHJcbiAgICAgICAgICAgIHBhdGg6IGxhc2VyUG9pbnRzLFxyXG4gICAgICAgICAgICByYWRpdXM6IC4xNVxyXG4gICAgICAgIH0sIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIEJBQllMT04uVGFncy5BZGRUYWdzVG8odGhpcy5sYXNlciwgXCJlbnRpdHlcIik7XHJcbiAgICAgICAgdGhpcy5sYXNlci5tYXRlcmlhbCA9IG5ldyBCQUJZTE9OLlN0YW5kYXJkTWF0ZXJpYWwoXCJsYXNlck1hdFwiLCB0aGlzLnNjZW5lKTtcclxuICAgICAgICAgIHZhciBnbCA9IG5ldyBCQUJZTE9OLkdsb3dMYXllcihcImdsb3dcIiwgdGhpcy5zY2VuZSk7XHJcbmdsLmN1c3RvbUVtaXNzaXZlQ29sb3JTZWxlY3RvciA9IGZ1bmN0aW9uKG1lc2gsIHN1Yk1lc2gsIG1hdGVyaWFsLCByZXN1bHQpIHtcclxuICAgIGdsLmludGVuc2l0eSA9IC43NTtcclxuICAgIGlmIChtZXNoLm5hbWUgPT09IFwibGFzZXJiZWFtXCIpIHtcclxuICAgICAgICByZXN1bHQuc2V0KC4zLCAxLCAuMywgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5zZXQoMCwgMCwgMCwgMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiAgICAgICAgdGhpcy5sYXNlci5pc1BpY2thYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlQmVhbShvcmlnaW4sIGRpcmVjdGlvbiwgbGFzdEhpdCkge1xyXG4gICAgICAgIGxldCByYXlEaXJlY3Rpb24gPSBuZXcgQkFCWUxPTi5WZWN0b3IzKE1hdGguc2luKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSwgMCwgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpKTtcclxuICAgICAgICB2YXIgcmF5ID0gbmV3IEJBQllMT04uUmF5KG9yaWdpbiwgcmF5RGlyZWN0aW9uLCAxMDApO1xyXG4gICAgICAgIC8vICBsZXQgcmF5SGVscGVyID0gbmV3IEJBQllMT04uUmF5SGVscGVyKHJheSk7XHJcbiAgICAgICAgLy8gIHJheUhlbHBlci5zaG93KHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciBoaXQgPSB0aGlzLnNjZW5lLnBpY2tXaXRoUmF5KHJheSwgKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1lc2gubmFtZS5zdGFydHNXaXRoKFwic3RhcnRMYXNlclwiKSB8fCAhbWVzaC5pc1BpY2thYmxlIHx8IG1lc2gubmFtZSA9PT0gbGFzdEhpdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaGl0LnBpY2tlZE1lc2ggJiYgaGl0LnBpY2tlZE1lc2guZW50aXR5KSB7XHJcbiAgICAgICAgICAgIGxldCByZWYgPSBoaXQucGlja2VkTWVzaC5nZXRGYWNldE5vcm1hbChoaXQuZmFjZUlkKTtcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5yb3VuZChNYXRoLmFzaW4oQkFCWUxPTi5WZWN0b3IzLkNyb3NzKHJlZiwgcmF5LmRpcmVjdGlvbikueSkgKiAxODAgLyBNYXRoLlBJKTtcclxuICAgICAgICAgICAgbGV0IGhpdFN0YXR1cyA9IGhpdC5waWNrZWRNZXNoLmVudGl0eS5vbkhpdEJ5TGFzZXIoaGl0LmZhY2VJZCwgYW5nbGUpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFRhcmdldCA9IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBpZihoaXRTdGF0dXMgPT09IDAgKXtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQgPSBoaXQucGlja2VkUG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQ6IG5leHRUYXJnZXQsXHJcbiAgICAgICAgICAgICAgICBoaXRTdGF0dXMsXHJcbiAgICAgICAgICAgICAgICBsYXN0SGl0OiBoaXQucGlja2VkTWVzaC5uYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5leHRUYXJnZXQ6IG5ldyBCQUJZTE9OLlZlY3RvcjMob3JpZ2luLnggKyBNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMikgKiAxMDAsIDAuNSwgb3JpZ2luLnogKyBNYXRoLmNvcyhNYXRoLlBJICogZGlyZWN0aW9uIC8gMikgKiAxMDApLFxyXG4gICAgICAgICAgICBoaXRTdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIGxhc3RIaXQ6IHVuZGVmaW5lZFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG5cclxufSIsImV4cG9ydCBjbGFzcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgbmFtZSA9IFwiZW50aXR5XCIsIHJvdGF0aW9uID0gMCkge1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBgJHtuYW1lfV8ke3RoaXMuc2NlbmUubWVzaGVzLmxlbmd0aH1gOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwtMC41LC0wLjUsLTAuNSwwLjUsMC41LC0wLjUsMC41LC0wLjUsMC41LC0wLjUsMC41LDAuNSwtMC41LC0wLjUsMC41LDAuNSwwLjUsMC41LDAuNSwtMC41LDAuNSwtMC41LDAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsMC41LDAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsLTAuNSwwLjUsLTAuNSwwLjUsMC41LDAuNSwwLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwwLjUsLTAuNSwtMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsLTAuNSwwLjUsLTAuNSwtMC41LDAuNSwtMC41LDAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFswLDIsMywgMywxLDAsIDgsOSwxMSwgMTEsMTAsOCwgMTksMjAsMjEsIDIxLDQsMTksIDIyLDIzLDcsIDcsNSwyMiwgMTMsMTIsMTQsIDE0LDE1LDEzLCAxNywxNiwxOCwgMTgsNiwxN107XHJcbiAgICAgICAgdGhpcy51dnMgPSBbMS4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMubWVzaCA9IG5ldyBCQUJZTE9OLk1lc2godGhpcy5uYW1lLCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHZhciB0ZXh0dXJlID0gbmV3IEJBQllMT04uVGV4dHVyZShcInRpbGVzLnBuZ1wiLCB0aGlzLnNjZW5lLCBmYWxzZSwgdHJ1ZSwgQkFCWUxPTi5UZXh0dXJlLk5FQVJFU1RfU0FNUExJTkdNT0RFKTtcclxuICAgICAgICB0aGlzLm1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLm9uUGlja2VkID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge31cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIHJldHVybiAwOyAvLyBzdG9wXHJcbiAgICB9XHJcbnRyaWdnZXIoKXtcclxuICAgIHRoaXMub25QaWNrKHRoaXMpO1xyXG4gICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbn1cclxuICAgIGJ1aWxkTWVzaCgpIHtcclxuXHJcbiAgICAgICAgLy9DcmVhdGUgYSB2ZXJ0ZXhEYXRhIG9iamVjdFxyXG4gICAgICAgIHZhciB2ZXJ0ZXhEYXRhID0gbmV3IEJBQllMT04uVmVydGV4RGF0YSgpO1xyXG4gICAgICAgIHRoaXMubm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgICAvL0NhbGN1bGF0aW9ucyBvZiBub3JtYWxzIGFkZGVkXHJcbiAgICAgICAgQkFCWUxPTi5WZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMudmVydGljZXMsIHRoaXMuZmFjZXMsIHRoaXMubm9ybWFscyk7XHJcblxyXG4gICAgICAgIC8vQXNzaWduIHBvc2l0aW9ucyBhbmQgaW5kaWNlcyB0byB2ZXJ0ZXhEYXRhXHJcbiAgICAgICAgdmVydGV4RGF0YS5wb3NpdGlvbnMgPSB0aGlzLnZlcnRpY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEuaW5kaWNlcyA9IHRoaXMuZmFjZXM7XHJcbiAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5ub3JtYWxzO1xyXG4gICAgICAgIHZlcnRleERhdGEudXZzID0gdGhpcy51dnM7XHJcblxyXG4gICAgICAgIC8vQXBwbHkgdmVydGV4RGF0YSB0byBjdXN0b20gbWVzaFxyXG4gICAgICAgIHZlcnRleERhdGEuYXBwbHlUb01lc2godGhpcy5tZXNoKTtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwgPSB0aGlzLm1hdDtcclxuICAgICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuYmFja0ZhY2VDdWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZXNoLnBvc2l0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyguLi50aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm1lc2guY2hlY2tDb2xsaXNpb25zID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1lc2guYWN0aW9uTWFuYWdlciA9IG5ldyBCQUJZTE9OLkFjdGlvbk1hbmFnZXIodGhpcy5zY2VuZSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIucmVnaXN0ZXJBY3Rpb24obmV3IEJBQllMT04uRXhlY3V0ZUNvZGVBY3Rpb24oQkFCWUxPTi5BY3Rpb25NYW5hZ2VyLk9uUGlja1RyaWdnZXIsIChmdW5jdGlvbiAobWVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2tlZCh0aGlzKTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMsIHRoaXMubWVzaCkpKTtcclxuICAgICAgICB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMucm90YXRpb24gKiBNYXRoLlBJIC8gMjtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubWVzaCwgXCJlbnRpdHlcIik7XHJcbiAgICAgICAgQkFCWUxPTi5UYWdzLkFkZFRhZ3NUbyh0aGlzLm1lc2gsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgdGhpcy5tZXNoLmVudGl0eSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc2g7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1xyXG4gICAgRW50aXR5XHJcbn0gZnJvbSAnLi9lbnRpdHknO1xyXG5cclxuZXhwb3J0IGNsYXNzIExhc2VyIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIGlzU3RhcnQsIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgcm90YXRpb24gPSAocm90YXRpb24gLSAxKSAlIDQ7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0ID8gXCJzdGFydExhc2VyXCIgOiBcImVuZExhc2VyXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ID0gISFpc1N0YXJ0O1xyXG5cclxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gWy0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIDAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzAsIDIsIDMsIDMsIDEsIDAsIDQsIDUsIDcsIDcsIDYsIDQsIDE2LCAxNywgMTksIDE5LCAxOCwgMTYsIDEzLCAxMiwgMTQsIDE0LCAxNSwgMTMsIDksIDgsIDEwLCAxMCwgMTEsIDldO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuNSwgMC43NSwgMC4yNSwgMC43NSwgMC41LCAxLjAsIDAuMjUsIDEuMCwgMC4yNSwgMC43NSwgMC41LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAwLjc1LCAwLjI1LCAxLjAsIDAuNSwgMS4wLCAwLjc1LCAxLjAsIDAuNSwgMC43NSwgMC43NSwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjAsIDAuNzUsIDAuMCwgMS4wXTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB0aGlzLm1lc2gucm90YXRpb24ueSA9IHRoaXMubWVzaC5yb3RhdGlvbi55ICsgTWF0aC5QSSAvIDI7XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoKGZhY2VJZCA9PT0gNSB8fCBmYWNlSWQgPT09IDQpICYmICF0aGlzLmlzU3RhcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDM7IC8vIHdpbm5lcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaXJyb3IgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSwgcG9zaXRpb24sIFwibWlycm9yXCIsIHJvdGF0aW9uKTtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41XTtcclxuICAgICAgICB0aGlzLmZhY2VzID0gWzYsIDgsIDksIDksIDcsIDYsIDQsIDEsIDMsIDMsIDUsIDQsIDExLCAxMCwgMTIsIDIsIDAsIDQsIDQsIDUsIDJdO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMCwgMC43NSwgMC4yNSwgMC41LCAwLjI1LCAwLjc1LCAwLjI1LCAwLjc1LCAwLjAsIDAuNSwgMC4yNSwgMC41LCAwLjUsIDAuMjUsIDAuMjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjUsIDAuMCwgMC43NSwgMC4yNSwgMC43NSwgMC4yNSwgMC41XTtcclxuXHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblBpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAodGhpcy5yb3RhdGlvbiArIDEpICUgNDtcclxuICAgICAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSBNYXRoLlBJICogdGhpcy5yb3RhdGlvbiAvIDI7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhpdEJ5TGFzZXIoZmFjZUlkLCBhbmdsZSkge1xyXG4gICAgICAgIGlmIChmYWNlSWQgPT09IDAgfHwgZmFjZUlkID09PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5nZXRGYWNldE5vcm1hbChmYWNlSWQpO1xyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPiAwKSByZXR1cm4gMTsgLy8gbGVmdFxyXG4gICAgICAgICAgICBpZiAoYW5nbGUgPCAwKSByZXR1cm4gMjsgLy8gcmlnaHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMDsgLy9zdG9wXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudGl0eSB9IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBFbnRpdHkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lLCBwb3NpdGlvbiwgcm90YXRpb24pIHtcclxuICAgICAgICBzdXBlcihzY2VuZSxwb3NpdGlvbixcInBvcnRhbFwiLCByb3RhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy51dnMgPSBbMC41LDAuNzUsIDAuMjUsMC43NSwgMC41LDEuMCwgMC4yNSwxLjAsIDAuMjUsMS4wLCAwLjI1LDEuMCwgMC4yNSwwLjc1LCAwLjUsMS4wLCAwLjI1LDAuNzUsIDAuNSwwLjc1LCAwLjI1LDEuMCwgMC41LDEuMCwgMC41LDAuNzUsIDAuMjUsMC43NSwgMC41LDEuMCwgMC4yNSwxLjAsIDAuNSwwLjUsIDAuMjUsMC41LCAwLjUsMC43NSwgMC4yNSwwLjc1LCAwLjUsMC43NSwgMC41LDEuMCwgMC4yNSwwLjc1LCAwLjUsMC43NV07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmJ1aWxkTWVzaCgpO1xyXG5cclxuICAgICAgICB0aGlzLm9uUGljayA9ICgpID0+IHRoaXMubWVzaC5yb3RhdGlvbi55ID0gdGhpcy5tZXNoLnJvdGF0aW9uLnkgKyBNYXRoLlBJIC8gMjtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FsbCBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUscG9zaXRpb24sXCJ3YWxsXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMjUsMC4yNSwgMC41LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuMjUsIDAuMCwwLjUsIDAuMjUsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuNSwgMC41LDAuMCwgMC4yNSwwLjAsIDAuNSwwLjI1LCAwLjAsMC4yNSwgMC4yNSwwLjI1LCAwLjI1LDAuNSwgMC4yNSwwLjAsIDAuNSwwLjBdO1xyXG4gICAgICAgIHRoaXMucm90YXRpb24gPSBybmQoNCk7XHJcbiAgICAgICAgdGhpcy5idWlsZE1lc2goKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQge1xyXG4gICAgUHV6emxlTWFuYWdlclxyXG59IGZyb20gXCIuL3B1enpsZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIFdhbGxcclxufSBmcm9tIFwiLi9lbnRpdGllcy93YWxsXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNaXJyb3JcclxufSBmcm9tIFwiLi9lbnRpdGllcy9taXJyb3JcIjtcclxuaW1wb3J0IHtcclxuICAgIExhc2VyXHJcbn0gZnJvbSBcIi4vZW50aXRpZXMvbGFzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEdyb3VuZFxyXG59IGZyb20gXCIuL2dyb3VuZFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTGFzZXJiZWFtXHJcbn0gZnJvbSBcIi4vTGFzZXJiZWFtXCI7XHJcbmltcG9ydCB7IFBvcnRhbCB9IGZyb20gXCIuL2VudGl0aWVzL3BvcnRhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubWFwcyA9IHRoaXMuaW5pdE1hcHMoKTtcclxuICAgICAgICB0aGlzLnB1enpsZU1hbmFnZXIgPSBuZXcgUHV6emxlTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFB1enpsZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3aW4oKSB7XHJcbiAgICAgICAgdmFyIG1lc2hlcyA9IHRoaXMuc2NlbmUuZ2V0TWVzaGVzQnlUYWdzKFwiZW50aXR5XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChtZXNoZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1enpsZU1hbmFnZXIubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFB1enpsZSgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUHV6emxlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UHV6emxlKCkge1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gdGhpcy5wdXp6bGVNYW5hZ2VyLnB1enpsZTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbSA9IG5ldyBMYXNlcmJlYW0odGhpcy5zY2VuZSwgdGhpcy5wdXp6bGUpO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLm9uV2luID0gdGhpcy53aW4uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TWFwcygpIHtcclxuICAgICAgICBsZXQgbWFwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbWFwcy5wdXNoKG5ldyBCQUJZTE9OLlZlY3RvcjQoaSAvIDQsIGogLyA0LCBpIC8gNCArIDAuMjUsIGogLyA0ICsgMC4yNSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBzO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNjZW5lKHNjZW5lKSB7XHJcbiAgICAgICAgdmFyIGhlbWlMaWdodCA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJIZW1pTGlnaHRcIiwgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgIGhlbWlMaWdodC5kaWZmdXNlID0gbmV3IEJBQllMT04uQ29sb3IzKC4yLCAuNCwgLjUpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcbiAgICAgICAgbGlnaHQuc2hhZG93TWluWiA9IDE7XHJcbiAgICAgICAgbGlnaHQuc2hhZG93TWF4WiA9IDIwO1xyXG4gICAgICAgIGxpZ2h0LmludGVuc2l0eSA9IDU7XHJcblxyXG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBuZXcgQkFCWUxPTi5TaGFkb3dHZW5lcmF0b3IoNDA5NiwgbGlnaHQpO1xyXG5cclxuICAgICAgICBnZW5lcmF0b3IuZm9yY2VCYWNrRmFjZXNPbmx5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQdXp6bGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGdyb3VuZCA9IG5ldyBHcm91bmQodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC05LjgxLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVJbnRlcmFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VsZWN0ZWRNZXNoID0ge307XHJcbiAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLm9uQ29udHJvbGxlck1lc2hMb2FkZWQuYWRkKCh3ZWJWUkNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gdmFyIGNvbnRyb2xsZXJNZXNoID0gd2ViVlJDb250cm9sbGVyLm1lc2g7XHJcbiAgICAgICAgICAgIHdlYlZSQ29udHJvbGxlci5vblRyaWdnZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlLmFkZCgoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoYS5wcmVzc2VkICYmICFzZWxmLm5lZWRzVW5wcmVzc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmVlZHNVbnByZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdGVkTWVzaC5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2guZW50aXR5LnRyaWdnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWEucHJlc3NlZCAmJiBzZWxmLm5lZWRzVW5wcmVzc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmVlZHNVbnByZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5vbk5ld01lc2hTZWxlY3RlZC5hZGQoKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2ggPSBtZXNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIub25TZWxlY3RlZE1lc2hVbnNlbGVjdGVkLmFkZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaCA9IHt9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLm1lc2hTZWxlY3Rpb25QcmVkaWNhdGUgPSAobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQkFCWUxPTi5UYWdzLk1hdGNoZXNRdWVyeShtZXNoLCBcImJsb2NrXCIpfHwgbWVzaC5uYW1lPT0gZ3JvdW5kLm5hbWUpIHsgLy8ubmFtZS5pbmRleE9mKFwiRW50aXR5XCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzaC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5taW5aID0gLjE7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmFwcGx5R3Jhdml0eSA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmVsbGlwc29pZCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLjI1LCAuNzUsIC4yNSk7XHJcbiAgICAgICAgc2NlbmUuY29sbGlzaW9uc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IGdyb3VuZC5uYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0dXJlUmVzb2x1dGlvbiA9IDUxMjtcclxuICAgICAgICB2YXIgdGV4dHVyZUdyb3VuZCA9IG5ldyBCQUJZTE9OLkR5bmFtaWNUZXh0dXJlKFwiZHluYW1pYyB0ZXh0dXJlXCIsIHtcclxuICAgICAgICAgICAgd2lkdGg6IDUxMixcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTZcclxuICAgICAgICB9LCBzY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmVDb250ZXh0ID0gdGV4dHVyZUdyb3VuZC5nZXRDb250ZXh0KCk7XHJcbiAgICAgICAgdGV4dHVyZUdyb3VuZC5oYXNBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1hdGVyaWFsR3JvdW5kID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIk1hdFwiLCBzY2VuZSk7XHJcbiAgICAgICAgbWF0ZXJpYWxHcm91bmQub3BhY2l0eVRleHR1cmUgPSB0ZXh0dXJlR3JvdW5kO1xyXG5cclxuXHJcbiAgICAgICAgLy9BZGQgdGV4dCB0byBkeW5hbWljIHRleHR1cmVcclxuICAgICAgICAvLyB2YXIgZm9udCA9IFwiYm9sZCA0NHB4IG1vbm9zcGFjZVwiO1xyXG4gICAgICAgIC8vIHRleHR1cmVHcm91bmQuZHJhd1RleHQoXCJHcmFzc1wiLCA3NSwgMTM1LCBmb250LCBcImdyZWVuXCIsIG51bGwsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIC8vIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVBsYW5lKFwic3BoZXJlMVwiLCB7XHJcbiAgICAgICAgLy8gICAgIGhlaWdodDogMSxcclxuICAgICAgICAvLyAgICAgd2lkdGg6IDFcclxuICAgICAgICAvLyB9LCBzY2VuZSk7XHJcbiAgICAgICAgLy8gc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxHcm91bmQ7XHJcbiAgICAgICAgLy8gc3BoZXJlLnBvc2l0aW9uLnkgPSAxLjU7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkb3coKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IuX3NoYWRvd01hcC5yZW5kZXJMaXN0ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZS5tZXNoZXNbaV0ubmFtZSAhPSBcIlRpbGVkIEdyb3VuZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIodGhpcy5zY2VuZS5tZXNoZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUubWVzaGVzW2ldLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHV6emxlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0TGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0cnVlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnJvdCA9IChzdGFydC5yb3QgKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRsYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIGZhbHNlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZGxhc2VyLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlycm9yID0gbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWlycm9yLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncG9ydGFsJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9ydGFsID0gbmV3IFBvcnRhbCh0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2FsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdhbGwodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcblxyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHV6emxlcyA9IFtcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOls0LjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAwLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTIuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlstMy4wLCAwLjUsIDUuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIDIuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIDEuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMS4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6WzEuMCwgMC41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAwLjBdLHJvdDoxLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtNC4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMi4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC00LjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOlsyLjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy00LjAsIDAuNSwgLTYuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtNy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOls0LjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzQuMCwgMC41LCAtNi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0zLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtNS4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTYuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC02LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtN10scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC03XSxyb3Q6Mix9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAtMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3BvcnRhbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LF0sXHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgICAgICAvLyBbe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ2VuZCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDEgLy8gUEkgKiByb3QvMiBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ21pcnJvcicsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbNSwgMC41LCAxXSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzMsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAxLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMi41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gXVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY3VycmVudFB1enpsZSA9ICh3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzFdIHx8IDApLTE7XHJcbiAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUrKztcclxuICAgICAgICB0aGlzLnB1enpsZSA9IHRoaXMucHV6emxlc1t0aGlzLmN1cnJlbnRQdXp6bGVdO1xyXG4gICAgfVxyXG59Iiwid2luZG93LnJuZCA9IG0gPT4gfn4oTWF0aC5yYW5kb20oKSAqIG0pO1xyXG5cclxud2luZG93LnJvdGF0ZSA9ICh2LCBkZWdyZWVzKSA9PiB7XHJcbiAgICB2YXIgY2EgPSBNYXRoLmNvcyhkZWdyZWVzKTtcclxuICAgIHZhciBzYSA9IE1hdGguc2luKGRlZ3JlZXMpO1xyXG4gICAgcmV0dXJuIG5ldyBCQUJZTE9OLlZlY3RvcjMoY2EgKiB2LnggLSBzYSAqIHYueiwgMCwgLXNhICogdi54ICsgY2EgKiB2LnopO1xyXG59IiwiaW1wb3J0ICcuL2dsb2JhbCc7XHJcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9jbGFzc2VzL2dhbWVcIjtcclxuXHJcbmNsYXNzIE9mZmxpbmUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVuZGVyQ2FudmFzXCIpO1xyXG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEJBQllMT04uRW5naW5lKHRoaXMuY2FudmFzLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IEJBQllMT04uU2NlbmUodGhpcy5lbmdpbmUpO1xyXG4gICAgICAgIC8vdGhpcy5zY2VuZS5kZWJ1Z0xheWVyLnNob3coKTtcclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IG5ldyBHYW1lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICBnYW1lLmNyZWF0ZVNjZW5lKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmVuZ2luZS5ydW5SZW5kZXJMb29wKCgpID0+IHRoaXMuc2NlbmUucmVuZGVyKCkpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLmVuZ2luZS5yZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5uZXcgT2ZmbGluZSgpOyJdLCJzb3VyY2VSb290IjoiIn0=