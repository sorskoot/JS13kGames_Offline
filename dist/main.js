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

        _this.uvs = [0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.0, 0.5, 0.25, 0.5, 0.0, 0.25, 0.25, 0.25, 0.0, 0.5, 0.25, 0.5, 0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.5, 0.25, 0.25, 0.0, 0.25, 0.25, 0.5, 0.0, 0.25, 0.25, 0.25, 0.25, 0.5, 0.0, 0.25, 0.25, 0.25];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvTGFzZXJiZWFtLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2VudGl0aWVzL2VudGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9sYXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbnRpdGllcy9taXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZW50aXRpZXMvd2FsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2dyb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wdXp6bGVNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxhc2VyYmVhbSIsInNjZW5lIiwicHV6emxlIiwib25XaW4iLCJzdGFydCIsImZpbmQiLCJiIiwidHlwZSIsIm9yaWdpbiIsIkJBQllMT04iLCJWZWN0b3IzIiwicG9zIiwiZGlyZWN0aW9uIiwicm90IiwidGFyZ2V0IiwiTWF0aCIsInNpbiIsIlBJIiwiY29zIiwibGFzZXJQb2ludHMiLCJuZXh0VGFyZ2V0IiwibnVtaG9wcyIsImhpdFN0YXR1cyIsImxhc3RIaXQiLCJjYWxjdWxhdGVCZWFtIiwicHVzaCIsImxlbmd0aCIsImxhc2VyIiwibGFzZXJiZWFtTWVzaCIsImdldE1lc2hCeU5hbWUiLCJyZW1vdmVNZXNoIiwiTWVzaEJ1aWxkZXIiLCJDcmVhdGVUdWJlIiwicGF0aCIsInJhZGl1cyIsIlRhZ3MiLCJBZGRUYWdzVG8iLCJtYXRlcmlhbCIsIlN0YW5kYXJkTWF0ZXJpYWwiLCJnbCIsIkdsb3dMYXllciIsImN1c3RvbUVtaXNzaXZlQ29sb3JTZWxlY3RvciIsIm1lc2giLCJzdWJNZXNoIiwicmVzdWx0IiwiaW50ZW5zaXR5IiwibmFtZSIsInNldCIsImlzUGlja2FibGUiLCJyYXlEaXJlY3Rpb24iLCJyYXkiLCJSYXkiLCJoaXQiLCJwaWNrV2l0aFJheSIsInN0YXJ0c1dpdGgiLCJwaWNrZWRNZXNoIiwiZW50aXR5IiwicmVmIiwiZ2V0RmFjZXROb3JtYWwiLCJmYWNlSWQiLCJhbmdsZSIsInJvdW5kIiwiYXNpbiIsIkNyb3NzIiwieSIsIm9uSGl0QnlMYXNlciIsInBvc2l0aW9uIiwieCIsInoiLCJ1bmRlZmluZWQiLCJFbnRpdHkiLCJyb3RhdGlvbiIsIm1lc2hlcyIsInZlcnRpY2VzIiwiZmFjZXMiLCJ1dnMiLCJNZXNoIiwibWF0IiwidGV4dHVyZSIsIlRleHR1cmUiLCJORUFSRVNUX1NBTVBMSU5HTU9ERSIsImRpZmZ1c2VUZXh0dXJlIiwib25QaWNrIiwib25QaWNrZWQiLCJyZW5kZXIiLCJ2ZXJ0ZXhEYXRhIiwiVmVydGV4RGF0YSIsIm5vcm1hbHMiLCJDb21wdXRlTm9ybWFscyIsInBvc2l0aW9ucyIsImluZGljZXMiLCJhcHBseVRvTWVzaCIsImJhY2tGYWNlQ3VsbGluZyIsImNoZWNrQ29sbGlzaW9ucyIsImFjdGlvbk1hbmFnZXIiLCJBY3Rpb25NYW5hZ2VyIiwicmVnaXN0ZXJBY3Rpb24iLCJFeGVjdXRlQ29kZUFjdGlvbiIsIk9uUGlja1RyaWdnZXIiLCJiaW5kIiwiTGFzZXIiLCJpc1N0YXJ0IiwiYnVpbGRNZXNoIiwiTWlycm9yIiwiV2FsbCIsIkdhbWUiLCJtYXBzIiwiaW5pdE1hcHMiLCJwdXp6bGVNYW5hZ2VyIiwiUHV6emxlTWFuYWdlciIsImluaXRQdXp6bGUiLCJnZXRNZXNoZXNCeVRhZ3MiLCJpIiwibmV4dCIsImNyZWF0ZVB1enpsZSIsInVwZGF0ZVNoYWRvdyIsImxhc2VyYmVhbSIsImRyYXdMYXNlciIsIndpbiIsImoiLCJWZWN0b3I0IiwiaGVtaUxpZ2h0IiwiSGVtaXNwaGVyaWNMaWdodCIsImRpZmZ1c2UiLCJDb2xvcjMiLCJsaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJzaGFkb3dNaW5aIiwic2hhZG93TWF4WiIsImdlbmVyYXRvciIsIlNoYWRvd0dlbmVyYXRvciIsImZvcmNlQmFja0ZhY2VzT25seSIsInZySGVscGVyIiwiY3JlYXRlRGVmYXVsdFZSRXhwZXJpZW5jZSIsImdyb3VuZCIsIkdyb3VuZCIsImdyYXZpdHkiLCJlbmFibGVJbnRlcmFjdGlvbnMiLCJzZWxmIiwic2VsZWN0ZWRNZXNoIiwibmVlZHNVbnByZXNzaW5nIiwib25Db250cm9sbGVyTWVzaExvYWRlZCIsImFkZCIsIndlYlZSQ29udHJvbGxlciIsIm9uVHJpZ2dlclN0YXRlQ2hhbmdlZE9ic2VydmFibGUiLCJhIiwicHJlc3NlZCIsInRyaWdnZXIiLCJvbk5ld01lc2hTZWxlY3RlZCIsIm9uU2VsZWN0ZWRNZXNoVW5zZWxlY3RlZCIsIm1lc2hTZWxlY3Rpb25QcmVkaWNhdGUiLCJNYXRjaGVzUXVlcnkiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZlQ2FtZXJhIiwiaW5lcnRpYSIsInNwZWVkIiwibWluWiIsImFwcGx5R3Jhdml0eSIsImVsbGlwc29pZCIsImNvbGxpc2lvbnNFbmFibGVkIiwiZW5hYmxlVGVsZXBvcnRhdGlvbiIsImZsb29yTWVzaE5hbWUiLCJ0ZXh0dXJlUmVzb2x1dGlvbiIsInRleHR1cmVHcm91bmQiLCJEeW5hbWljVGV4dHVyZSIsIndpZHRoIiwiaGVpZ2h0IiwidGV4dHVyZUNvbnRleHQiLCJnZXRDb250ZXh0IiwiaGFzQWxwaGEiLCJtYXRlcmlhbEdyb3VuZCIsIm9wYWNpdHlUZXh0dXJlIiwiX3NoYWRvd01hcCIsInJlbmRlckxpc3QiLCJhZGRTaGFkb3dDYXN0ZXIiLCJyZWNlaXZlU2hhZG93cyIsInN0YXJ0TGFzZXIiLCJlbmRsYXNlciIsIm1pcnJvciIsIkNyZWF0ZVRpbGVkR3JvdW5kIiwieG1pbiIsInptaW4iLCJ4bWF4Iiwiem1heCIsInN1YmRpdmlzaW9ucyIsImdyb3VuZG1hdCIsInVTY2FsZSIsInZTY2FsZSIsIndyYXBVIiwiTUlSUk9SX0FERFJFU1NNT0RFIiwid3JhcFYiLCJzcGVjdWxhclRleHR1cmUiLCJzcGVjdWxhckNvbG9yIiwicHV6emxlcyIsImN1cnJlbnRQdXp6bGUiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInJuZCIsInJhbmRvbSIsIm0iLCJyb3RhdGUiLCJ2IiwiZGVncmVlcyIsImNhIiwic2EiLCJPZmZsaW5lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVuZ2luZSIsIkVuZ2luZSIsIlNjZW5lIiwiZ2FtZSIsImNyZWF0ZVNjZW5lIiwicnVuUmVuZGVyTG9vcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsRmFBLFMsV0FBQUEsUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUFZQyxLQUFaLEVBQW1CQyxNQUFu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LE1BQXZCLENBQWI7QUFDQTtBQUNBaEIsZUFBT21CLElBQVAsR0FBYyxJQUFJOUcsVUFBSixDQUFTLEtBQUt4RyxLQUFkLENBQWQ7O0FBRUFzTixhQUFLQyxXQUFMLENBQWlCLEtBQUt2TixLQUF0Qjs7QUFFQSxhQUFLbU4sTUFBTCxDQUFZSyxhQUFaLENBQTBCO0FBQUEsdUJBQU0sTUFBS3hOLEtBQUwsQ0FBV21GLE1BQVgsRUFBTjtBQUFBLFNBQTFCOztBQUVBZ0gsZUFBT3NCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDO0FBQUEsdUJBQU0sTUFBS04sTUFBTCxDQUFZTyxNQUFaLEVBQU47QUFBQSxTQUFsQztBQUNILEM7O0FBSUwsSUFBSVgsT0FBSixHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjbGFzcyBMYXNlcmJlYW0ge1xyXG5cclxuICAgIC8vIGxhc2VyIGRpcmVjdGlvbiBjb25zdGFudHM6XHJcbiAgICAvLyAwIHN0b3AgcHJvZ3Jlc3NpbmdcclxuICAgIC8vIDEgdHVybiBsZWZ0XHJcbiAgICAvLyAyIHR1cm4gcmlnaHRcclxuICAgIC8vIDMgaGl0dGluZyB0YXJnZXRcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcHV6emxlKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gcHV6emxlO1xyXG4gICAgICAgIHRoaXMub25XaW4gPSAoKSA9PiB7fTtcclxuICAgIH1cclxuXHJcbiAgICBkcmF3TGFzZXIoKSB7XHJcbiAgICAgICAgbGV0IHN0YXJ0ID0gdGhpcy5wdXp6bGUuZmluZChiID0+IGIudHlwZSA9PT0gXCJzdGFydFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG9yaWdpbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4uc3RhcnQucG9zKTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gc3RhcnQucm90O1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKHN0YXJ0LnBvc1swXSArIE1hdGguc2luKE1hdGguUEkgKiBzdGFydC5yb3QgLyAyKSAqIDEwMCwgMC41LCBzdGFydC5wb3NbMl0gKyBNYXRoLmNvcyhNYXRoLlBJICogc3RhcnQucm90IC8gMikgKiAxMDApO1xyXG5cclxuXHJcbiAgICAgICAgbGV0IGxhc2VyUG9pbnRzID0gW29yaWdpbl07XHJcbiAgICAgICAgbGV0IG5leHRUYXJnZXQgPSBvcmlnaW47XHJcbiAgICAgICAgbGV0IG51bWhvcHMgPSAwO1xyXG4gICAgICAgIGxldCBoaXRTdGF0dXMgPSAwO1xyXG4gICAgICAgIGxldCBsYXN0SGl0O1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgbnVtaG9wcysrO1xyXG4gICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCxcclxuICAgICAgICAgICAgICAgIGhpdFN0YXR1cyxcclxuICAgICAgICAgICAgICAgIGxhc3RIaXRcclxuICAgICAgICAgICAgfSA9IHRoaXMuY2FsY3VsYXRlQmVhbShuZXh0VGFyZ2V0LCBkaXJlY3Rpb24sIGxhc3RIaXQpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghIW5leHRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2gobmV4dFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbldpbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXRTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gKGRpcmVjdGlvbiAtIDEpICUgNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0U3RhdHVzID09IDIpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSB3aGlsZSAoaGl0U3RhdHVzICE9IDAgJiYgbnVtaG9wcyA8IDI1KTtcclxuXHJcbiAgICAgICAgaWYgKGxhc2VyUG9pbnRzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxhc2VyUG9pbnRzLnB1c2godGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodGhpcy5sYXNlcikge1xyXG4gICAgICAgICAgICB2YXIgbGFzZXJiZWFtTWVzaCA9IHRoaXMuc2NlbmUuZ2V0TWVzaEJ5TmFtZShcImxhc2VyYmVhbVwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmVNZXNoKGxhc2VyYmVhbU1lc2gpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVR1YmUoXCJsYXNlcmJlYW1cIiwge1xyXG4gICAgICAgICAgICBwYXRoOiBsYXNlclBvaW50cyxcclxuICAgICAgICAgICAgcmFkaXVzOiAuMTVcclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuICAgICAgICBCQUJZTE9OLlRhZ3MuQWRkVGFnc1RvKHRoaXMubGFzZXIsIFwiZW50aXR5XCIpO1xyXG4gICAgICAgIHRoaXMubGFzZXIubWF0ZXJpYWwgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwibGFzZXJNYXRcIiwgdGhpcy5zY2VuZSk7XHJcbiAgICAgICAgICB2YXIgZ2wgPSBuZXcgQkFCWUxPTi5HbG93TGF5ZXIoXCJnbG93XCIsIHRoaXMuc2NlbmUpO1xyXG5nbC5jdXN0b21FbWlzc2l2ZUNvbG9yU2VsZWN0b3IgPSBmdW5jdGlvbihtZXNoLCBzdWJNZXNoLCBtYXRlcmlhbCwgcmVzdWx0KSB7XHJcbiAgICBnbC5pbnRlbnNpdHkgPSAuNzU7XHJcbiAgICBpZiAobWVzaC5uYW1lID09PSBcImxhc2VyYmVhbVwiKSB7XHJcbiAgICAgICAgcmVzdWx0LnNldCguMywgMSwgLjMsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXN1bHQuc2V0KDAsIDAsIDAsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG4gICAgICAgIHRoaXMubGFzZXIuaXNQaWNrYWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZUJlYW0ob3JpZ2luLCBkaXJlY3Rpb24sIGxhc3RIaXQpIHtcclxuICAgICAgICBsZXQgcmF5RGlyZWN0aW9uID0gbmV3IEJBQllMT04uVmVjdG9yMyhNYXRoLnNpbihNYXRoLlBJICogZGlyZWN0aW9uIC8gMiksIDAsIE1hdGguY29zKE1hdGguUEkgKiBkaXJlY3Rpb24gLyAyKSk7XHJcbiAgICAgICAgdmFyIHJheSA9IG5ldyBCQUJZTE9OLlJheShvcmlnaW4sIHJheURpcmVjdGlvbiwgMTAwKTtcclxuICAgICAgICAvLyAgbGV0IHJheUhlbHBlciA9IG5ldyBCQUJZTE9OLlJheUhlbHBlcihyYXkpO1xyXG4gICAgICAgIC8vICByYXlIZWxwZXIuc2hvdyh0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgaGl0ID0gdGhpcy5zY2VuZS5waWNrV2l0aFJheShyYXksIChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtZXNoLm5hbWUuc3RhcnRzV2l0aChcInN0YXJ0TGFzZXJcIikgfHwgIW1lc2guaXNQaWNrYWJsZSB8fCBtZXNoLm5hbWUgPT09IGxhc3RIaXQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGhpdC5waWNrZWRNZXNoICYmIGhpdC5waWNrZWRNZXNoLmVudGl0eSkge1xyXG4gICAgICAgICAgICBsZXQgcmVmID0gaGl0LnBpY2tlZE1lc2guZ2V0RmFjZXROb3JtYWwoaGl0LmZhY2VJZCk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGgucm91bmQoTWF0aC5hc2luKEJBQllMT04uVmVjdG9yMy5Dcm9zcyhyZWYsIHJheS5kaXJlY3Rpb24pLnkpICogMTgwIC8gTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGxldCBoaXRTdGF0dXMgPSBoaXQucGlja2VkTWVzaC5lbnRpdHkub25IaXRCeUxhc2VyKGhpdC5mYWNlSWQsIGFuZ2xlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIG5leHRUYXJnZXQ6IGhpdC5waWNrZWRNZXNoLnBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgaGl0U3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgbGFzdEhpdDogaGl0LnBpY2tlZE1lc2gubmFtZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZXh0VGFyZ2V0OiBuZXcgQkFCWUxPTi5WZWN0b3IzKG9yaWdpbi54ICsgTWF0aC5zaW4oTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwLCAwLjUsIG9yaWdpbi56ICsgTWF0aC5jb3MoTWF0aC5QSSAqIGRpcmVjdGlvbiAvIDIpICogMTAwKSxcclxuICAgICAgICAgICAgaGl0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBsYXN0SGl0OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIG5hbWUgPSBcImVudGl0eVwiLCByb3RhdGlvbiA9IDApIHtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gYCR7bmFtZX1fJHt0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGh9YDsgICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LDAuNSwtMC41LDAuNSwtMC41LDAuNSwtMC41LDAuNSwwLjUsLTAuNSwtMC41LDAuNSwwLjUsMC41LDAuNSwwLjUsLTAuNSwwLjUsLTAuNSwwLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LDAuNSwwLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LC0wLjUsMC41LC0wLjUsMC41LDAuNSwwLjUsMC41LDAuNSwtMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsMC41LC0wLjUsLTAuNSwtMC41LC0wLjUsMC41LC0wLjUsLTAuNSwwLjUsMC41LC0wLjUsMC41LC0wLjUsLTAuNSwwLjUsLTAuNSwwLjVdO1xyXG4gICAgICAgIHRoaXMuZmFjZXMgPSBbMCwyLDMsIDMsMSwwLCA4LDksMTEsIDExLDEwLDgsIDE5LDIwLDIxLCAyMSw0LDE5LCAyMiwyMyw3LCA3LDUsMjIsIDEzLDEyLDE0LCAxNCwxNSwxMywgMTcsMTYsMTgsIDE4LDYsMTddO1xyXG4gICAgICAgIHRoaXMudXZzID0gWzEuMCwgMC4wLCAwLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMS4wLCAxLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjAsIDAuMCwgMC4wLCAxLjAsIDEuMCwgMC4wLCAwLjAsIDEuMCwgMS4wLCAwLjAsIDAuMCwgMS4wLCAxLjBdO1xyXG5cclxuICAgICAgICB0aGlzLm1lc2ggPSBuZXcgQkFCWUxPTi5NZXNoKHRoaXMubmFtZSwgdGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWF0ID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIm1hdFwiLCB0aGlzLnNjZW5lKTtcclxuICAgICAgICB2YXIgdGV4dHVyZSA9IG5ldyBCQUJZTE9OLlRleHR1cmUoXCJ0aWxlcy5wbmdcIiwgdGhpcy5zY2VuZSwgZmFsc2UsIHRydWUsIEJBQllMT04uVGV4dHVyZS5ORUFSRVNUX1NBTVBMSU5HTU9ERSk7XHJcbiAgICAgICAgdGhpcy5tYXQuZGlmZnVzZVRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5vblBpY2tlZCA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHt9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICByZXR1cm4gMDsgLy8gc3RvcFxyXG4gICAgfVxyXG50cmlnZ2VyKCl7XHJcbiAgICB0aGlzLm9uUGljayh0aGlzKTtcclxuICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XHJcbiAgICB0aGlzLm9uUGlja2VkKHRoaXMpO1xyXG59XHJcbiAgICBidWlsZE1lc2goKSB7XHJcblxyXG4gICAgICAgIC8vQ3JlYXRlIGEgdmVydGV4RGF0YSBvYmplY3RcclxuICAgICAgICB2YXIgdmVydGV4RGF0YSA9IG5ldyBCQUJZTE9OLlZlcnRleERhdGEoKTtcclxuICAgICAgICB0aGlzLm5vcm1hbHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9DYWxjdWxhdGlvbnMgb2Ygbm9ybWFscyBhZGRlZFxyXG4gICAgICAgIEJBQllMT04uVmVydGV4RGF0YS5Db21wdXRlTm9ybWFscyh0aGlzLnZlcnRpY2VzLCB0aGlzLmZhY2VzLCB0aGlzLm5vcm1hbHMpO1xyXG5cclxuICAgICAgICAvL0Fzc2lnbiBwb3NpdGlvbnMgYW5kIGluZGljZXMgdG8gdmVydGV4RGF0YVxyXG4gICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy52ZXJ0aWNlcztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmluZGljZXMgPSB0aGlzLmZhY2VzO1xyXG4gICAgICAgIHZlcnRleERhdGEubm9ybWFscyA9IHRoaXMubm9ybWFscztcclxuICAgICAgICB2ZXJ0ZXhEYXRhLnV2cyA9IHRoaXMudXZzO1xyXG5cclxuICAgICAgICAvL0FwcGx5IHZlcnRleERhdGEgdG8gY3VzdG9tIG1lc2hcclxuICAgICAgICB2ZXJ0ZXhEYXRhLmFwcGx5VG9NZXNoKHRoaXMubWVzaCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gdGhpcy5tYXQ7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsLmJhY2tGYWNlQ3VsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWVzaC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLi4udGhpcy5wb3NpdGlvbik7XHJcbiAgICAgICAgdGhpcy5tZXNoLmNoZWNrQ29sbGlzaW9ucyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tZXNoLmFjdGlvbk1hbmFnZXIgPSBuZXcgQkFCWUxPTi5BY3Rpb25NYW5hZ2VyKHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIHRoaXMubWVzaC5hY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyQWN0aW9uKG5ldyBCQUJZTE9OLkV4ZWN1dGVDb2RlQWN0aW9uKEJBQllMT04uQWN0aW9uTWFuYWdlci5PblBpY2tUcmlnZ2VyLCAoZnVuY3Rpb24gKG1lc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5vblBpY2sodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVuZGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQodGhpcyk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzLCB0aGlzLm1lc2gpKSk7XHJcbiAgICAgICAgdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLnJvdGF0aW9uICogTWF0aC5QSSAvIDI7XHJcbiAgICAgICAgQkFCWUxPTi5UYWdzLkFkZFRhZ3NUbyh0aGlzLm1lc2gsIFwiZW50aXR5XCIpO1xyXG4gICAgICAgIEJBQllMT04uVGFncy5BZGRUYWdzVG8odGhpcy5tZXNoLCBcImJsb2NrXCIpO1xyXG4gICAgICAgIHRoaXMubWVzaC5lbnRpdHkgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5tZXNoO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtcclxuICAgIEVudGl0eVxyXG59IGZyb20gJy4vZW50aXR5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBMYXNlciBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uLCBpc1N0YXJ0LCByb3RhdGlvbikge1xyXG4gICAgICAgIHJvdGF0aW9uID0gKHJvdGF0aW9uIC0gMSkgJSA0O1xyXG4gICAgICAgIHN1cGVyKHNjZW5lLCBwb3NpdGlvbiwgaXNTdGFydCA/IFwic3RhcnRMYXNlclwiIDogXCJlbmRMYXNlclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMuaXNTdGFydCA9ICEhaXNTdGFydDtcclxuXHJcbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IFstMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAtMC41LCAwLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFswLCAyLCAzLCAzLCAxLCAwLCA0LCA1LCA3LCA3LCA2LCA0LCAxNiwgMTcsIDE5LCAxOSwgMTgsIDE2LCAxMywgMTIsIDE0LCAxNCwgMTUsIDEzLCA5LCA4LCAxMCwgMTAsIDExLCA5XTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuNSwgMS4wLCAwLjI1LCAxLjAsIDAuMjUsIDAuNzUsIDAuNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC41LCAwLjc1LCAwLjUsIDEuMCwgMC4yNSwgMC43NSwgMC4yNSwgMS4wLCAwLjUsIDEuMCwgMC43NSwgMS4wLCAwLjUsIDAuNzUsIDAuNzUsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDEuMCwgMC4wLCAwLjc1LCAwLjAsIDEuMF07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4gdGhpcy5tZXNoLnJvdGF0aW9uLnkgPSB0aGlzLm1lc2gucm90YXRpb24ueSArIE1hdGguUEkgLyAyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSGl0QnlMYXNlcihmYWNlSWQsIGFuZ2xlKSB7XHJcbiAgICAgICAgaWYgKChmYWNlSWQgPT09IDUgfHwgZmFjZUlkID09PSA0KSAmJiAhdGhpcy5pc1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzOyAvLyB3aW5uZXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vc3RvcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCB7XHJcbiAgICBFbnRpdHlcclxufSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTWlycm9yIGV4dGVuZHMgRW50aXR5IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzY2VuZSwgcG9zaXRpb24sIHJvdGF0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUsIHBvc2l0aW9uLCBcIm1pcnJvclwiLCByb3RhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBbLTAuNSwgLTAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIC0wLjUsIDAuNSwgMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAtMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgLTAuNSwgLTAuNSwgLTAuNSwgMC41LCAwLjUsIDAuNSwgMC41LCAtMC41LCAtMC41LCAwLjUsIDAuNSwgMC41LCAwLjUsIC0wLjUsIC0wLjUsIDAuNSwgLTAuNV07XHJcbiAgICAgICAgdGhpcy5mYWNlcyA9IFs2LCA4LCA5LCA5LCA3LCA2LCA0LCAxLCAzLCAzLCA1LCA0LCAxMSwgMTAsIDEyLCAyLCAwLCA0LCA0LCA1LCAyXTtcclxuICAgICAgICB0aGlzLnV2cyA9IFswLjAsIDAuNzUsIDAuMjUsIDAuNSwgMC4yNSwgMC43NSwgMC4yNSwgMC43NSwgMC4wLCAwLjUsIDAuMjUsIDAuNSwgMC41LCAwLjI1LCAwLjI1LCAwLjI1LCAwLjUsIDAuNSwgMC4yNSwgMC41LCAwLjAsIDAuNzUsIDAuMjUsIDAuNzUsIDAuMjUsIDAuNV07XHJcblxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25QaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gKHRoaXMucm90YXRpb24gKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgIHRoaXMubWVzaC5yb3RhdGlvbi55ID0gTWF0aC5QSSAqIHRoaXMucm90YXRpb24gLyAyO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgb25IaXRCeUxhc2VyKGZhY2VJZCwgYW5nbGUpIHtcclxuICAgICAgICBpZiAoZmFjZUlkID09PSAwIHx8IGZhY2VJZCA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc2guZ2V0RmFjZXROb3JtYWwoZmFjZUlkKTtcclxuICAgICAgICAgICAgaWYgKGFuZ2xlID4gMCkgcmV0dXJuIDE7IC8vIGxlZnRcclxuICAgICAgICAgICAgaWYgKGFuZ2xlIDwgMCkgcmV0dXJuIDI7IC8vIHJpZ2h0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7IC8vc3RvcFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFbnRpdHkgfSBmcm9tICcuL2VudGl0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FsbCBleHRlbmRzIEVudGl0eSB7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NlbmUsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIoc2NlbmUscG9zaXRpb24sXCJ3YWxsXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudXZzID0gWzAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjAsMC41LCAwLjAsMC41LCAwLjAsMC41LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4wLDAuNSwgMC4yNSwwLjUsIDAuMjUsMC4yNSwgMC4wLDAuMjUsIDAuMjUsMC41LCAwLjAsMC41LCAwLjI1LDAuMjUsIDAuMCwwLjI1LCAwLjI1LDAuNSwgMC4wLDAuMjUsIDAuMjUsMC4yNSwgMC4yNSwwLjUsIDAuMCwwLjI1LCAwLjI1LDAuMjVdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYnVpbGRNZXNoKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtcclxuICAgIFB1enpsZU1hbmFnZXJcclxufSBmcm9tIFwiLi9wdXp6bGVNYW5hZ2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBXYWxsXHJcbn0gZnJvbSBcIi4vZW50aXRpZXMvd2FsbFwiO1xyXG5pbXBvcnQge1xyXG4gICAgTWlycm9yXHJcbn0gZnJvbSBcIi4vZW50aXRpZXMvbWlycm9yXCI7XHJcbmltcG9ydCB7XHJcbiAgICBMYXNlclxyXG59IGZyb20gXCIuL2VudGl0aWVzL2xhc2VyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBHcm91bmRcclxufSBmcm9tIFwiLi9ncm91bmRcIjtcclxuaW1wb3J0IHtcclxuICAgIExhc2VyYmVhbVxyXG59IGZyb20gXCIuL0xhc2VyYmVhbVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKSB7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgIHRoaXMubWFwcyA9IHRoaXMuaW5pdE1hcHMoKTtcclxuICAgICAgICB0aGlzLnB1enpsZU1hbmFnZXIgPSBuZXcgUHV6emxlTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdFB1enpsZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB3aW4oKSB7XHJcbiAgICAgICAgdmFyIG1lc2hlcyA9IHRoaXMuc2NlbmUuZ2V0TWVzaGVzQnlUYWdzKFwiZW50aXR5XCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVzaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlTWVzaChtZXNoZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnB1enpsZU1hbmFnZXIubmV4dCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFB1enpsZSgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUHV6emxlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UHV6emxlKCkge1xyXG4gICAgICAgIHRoaXMucHV6emxlID0gdGhpcy5wdXp6bGVNYW5hZ2VyLnB1enpsZTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbSA9IG5ldyBMYXNlcmJlYW0odGhpcy5zY2VuZSwgdGhpcy5wdXp6bGUpO1xyXG4gICAgICAgIHRoaXMubGFzZXJiZWFtLm9uV2luID0gdGhpcy53aW4uYmluZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0TWFwcygpIHtcclxuICAgICAgICBsZXQgbWFwcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbWFwcy5wdXNoKG5ldyBCQUJZTE9OLlZlY3RvcjQoaSAvIDQsIGogLyA0LCBpIC8gNCArIDAuMjUsIGogLyA0ICsgMC4yNSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBzO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVNjZW5lKHNjZW5lKSB7XHJcbiAgICAgICAgdmFyIGhlbWlMaWdodCA9IG5ldyBCQUJZTE9OLkhlbWlzcGhlcmljTGlnaHQoXCJIZW1pTGlnaHRcIiwgbmV3IEJBQllMT04uVmVjdG9yMygwLCAxLCAwKSwgc2NlbmUpO1xyXG4gICAgICAgIGhlbWlMaWdodC5kaWZmdXNlID0gbmV3IEJBQllMT04uQ29sb3IzKC4yLCAuNCwgLjUpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGxpZ2h0ID0gbmV3IEJBQllMT04uRGlyZWN0aW9uYWxMaWdodChcImxpZ2h0MlwiLCBuZXcgQkFCWUxPTi5WZWN0b3IzKC0yLCAtMywgMSksIHNjZW5lKTtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbiA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoNiwgOSwgMyk7XHJcbiAgICAgICAgbGlnaHQuc2hhZG93TWluWiA9IDE7XHJcbiAgICAgICAgbGlnaHQuc2hhZG93TWF4WiA9IDIwO1xyXG4gICAgICAgIGxpZ2h0LmludGVuc2l0eSA9IDU7XHJcblxyXG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBuZXcgQkFCWUxPTi5TaGFkb3dHZW5lcmF0b3IoMjA0OCwgbGlnaHQpO1xyXG5cclxuICAgICAgICBnZW5lcmF0b3IuZm9yY2VCYWNrRmFjZXNPbmx5ID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIC8vVGlsZXM6XHJcbiAgICAgICAgLy8gMDogR3JvdW5kXHJcbiAgICAgICAgLy8gMTogV2FsbFxyXG4gICAgICAgIC8vIDI6XHJcbiAgICAgICAgLy8gMzogTGFzZXJcclxuICAgICAgICAvLyA0OlxyXG4gICAgICAgIC8vIDU6XHJcbiAgICAgICAgLy8gNjpcclxuICAgICAgICAvLyA3OlxyXG4gICAgICAgIC8vIDg6XHJcbiAgICAgICAgLy8gOTpcclxuICAgICAgICAvLyAxMDpcclxuICAgICAgICAvLyAxMTpcclxuICAgICAgICAvLyAxMjpcclxuICAgICAgICAvLyAxMzpcclxuICAgICAgICAvLyAxNDpcclxuICAgICAgICAvLyAxNTpcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlciA9IHNjZW5lLmNyZWF0ZURlZmF1bHRWUkV4cGVyaWVuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jcmVhdGVQdXp6bGUoKTtcclxuXHJcbiAgICAgICAgbGV0IGdyb3VuZCA9IG5ldyBHcm91bmQodGhpcy5zY2VuZSk7XHJcblxyXG4gICAgICAgIHNjZW5lLmdyYXZpdHkgPSBuZXcgQkFCWUxPTi5WZWN0b3IzKDAsIC05LjgxLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5lbmFibGVJbnRlcmFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc2VsZWN0ZWRNZXNoID0ge307XHJcbiAgICAgICAgc2VsZi5uZWVkc1VucHJlc3NpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZySGVscGVyLm9uQ29udHJvbGxlck1lc2hMb2FkZWQuYWRkKCh3ZWJWUkNvbnRyb2xsZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gdmFyIGNvbnRyb2xsZXJNZXNoID0gd2ViVlJDb250cm9sbGVyLm1lc2g7XHJcbiAgICAgICAgICAgIHdlYlZSQ29udHJvbGxlci5vblRyaWdnZXJTdGF0ZUNoYW5nZWRPYnNlcnZhYmxlLmFkZCgoYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoYS5wcmVzc2VkICYmICFzZWxmLm5lZWRzVW5wcmVzc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmVlZHNVbnByZXNzaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdGVkTWVzaC5lbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2guZW50aXR5LnRyaWdnZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWEucHJlc3NlZCAmJiBzZWxmLm5lZWRzVW5wcmVzc2luZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmVlZHNVbnByZXNzaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52ckhlbHBlci5vbk5ld01lc2hTZWxlY3RlZC5hZGQoKG1lc2gpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZE1lc2ggPSBtZXNoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudnJIZWxwZXIub25TZWxlY3RlZE1lc2hVbnNlbGVjdGVkLmFkZCgobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkTWVzaCA9IHt9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZySGVscGVyLm1lc2hTZWxlY3Rpb25QcmVkaWNhdGUgPSAobWVzaCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQkFCWUxPTi5UYWdzLk1hdGNoZXNRdWVyeShtZXNoLCBcImJsb2NrXCIpfHwgbWVzaC5uYW1lPT0gZ3JvdW5kLm5hbWUpIHsgLy8ubmFtZS5pbmRleE9mKFwiRW50aXR5XCIpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWVzaC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmluZXJ0aWEgPSAwLjY7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLnNwZWVkID0gMC41O1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5taW5aID0gLjE7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmFwcGx5R3Jhdml0eSA9IHRydWU7XHJcbiAgICAgICAgc2NlbmUuYWN0aXZlQ2FtZXJhLmVsbGlwc29pZCA9IG5ldyBCQUJZTE9OLlZlY3RvcjMoLjI1LCAuNzUsIC4yNSk7XHJcbiAgICAgICAgc2NlbmUuY29sbGlzaW9uc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHNjZW5lLmFjdGl2ZUNhbWVyYS5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudnJIZWxwZXIuZW5hYmxlVGVsZXBvcnRhdGlvbih7XHJcbiAgICAgICAgICAgIGZsb29yTWVzaE5hbWU6IGdyb3VuZC5uYW1lXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0dXJlUmVzb2x1dGlvbiA9IDUxMjtcclxuICAgICAgICB2YXIgdGV4dHVyZUdyb3VuZCA9IG5ldyBCQUJZTE9OLkR5bmFtaWNUZXh0dXJlKFwiZHluYW1pYyB0ZXh0dXJlXCIsIHtcclxuICAgICAgICAgICAgd2lkdGg6IDUxMixcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTZcclxuICAgICAgICB9LCBzY2VuZSk7XHJcbiAgICAgICAgdmFyIHRleHR1cmVDb250ZXh0ID0gdGV4dHVyZUdyb3VuZC5nZXRDb250ZXh0KCk7XHJcbiAgICAgICAgdGV4dHVyZUdyb3VuZC5oYXNBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1hdGVyaWFsR3JvdW5kID0gbmV3IEJBQllMT04uU3RhbmRhcmRNYXRlcmlhbChcIk1hdFwiLCBzY2VuZSk7XHJcbiAgICAgICAgbWF0ZXJpYWxHcm91bmQub3BhY2l0eVRleHR1cmUgPSB0ZXh0dXJlR3JvdW5kO1xyXG5cclxuXHJcbiAgICAgICAgLy9BZGQgdGV4dCB0byBkeW5hbWljIHRleHR1cmVcclxuICAgICAgICAvLyB2YXIgZm9udCA9IFwiYm9sZCA0NHB4IG1vbm9zcGFjZVwiO1xyXG4gICAgICAgIC8vIHRleHR1cmVHcm91bmQuZHJhd1RleHQoXCJHcmFzc1wiLCA3NSwgMTM1LCBmb250LCBcImdyZWVuXCIsIG51bGwsIHRydWUsIHRydWUpO1xyXG4gICAgICAgIC8vIHZhciBzcGhlcmUgPSBCQUJZTE9OLk1lc2hCdWlsZGVyLkNyZWF0ZVBsYW5lKFwic3BoZXJlMVwiLCB7XHJcbiAgICAgICAgLy8gICAgIGhlaWdodDogMSxcclxuICAgICAgICAvLyAgICAgd2lkdGg6IDFcclxuICAgICAgICAvLyB9LCBzY2VuZSk7XHJcbiAgICAgICAgLy8gc3BoZXJlLm1hdGVyaWFsID0gbWF0ZXJpYWxHcm91bmQ7XHJcbiAgICAgICAgLy8gc3BoZXJlLnBvc2l0aW9uLnkgPSAxLjU7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTaGFkb3coKTtcclxuICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTaGFkb3coKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0b3IuX3NoYWRvd01hcC5yZW5kZXJMaXN0ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNjZW5lLm1lc2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZS5tZXNoZXNbaV0ubmFtZSAhPSBcIlRpbGVkIEdyb3VuZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRvci5hZGRTaGFkb3dDYXN0ZXIodGhpcy5zY2VuZS5tZXNoZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2NlbmUubWVzaGVzW2ldLnJlY2VpdmVTaGFkb3dzID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUHV6emxlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wdXp6bGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLnB1enpsZVtpXS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0TGFzZXIgPSBuZXcgTGFzZXIodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0cnVlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TGFzZXIub25QaWNrZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IHRoaXMucHV6emxlLmZpbmQoYiA9PiBiLnR5cGUgPT09IFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0LnJvdCA9IChzdGFydC5yb3QgKyAxKSAlIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzZXJiZWFtLmRyYXdMYXNlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmRsYXNlciA9IG5ldyBMYXNlcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIGZhbHNlLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVuZGxhc2VyLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWlycm9yJzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWlycm9yID0gbmV3IE1pcnJvcih0aGlzLnNjZW5lLCB0aGlzLnB1enpsZVtpXS5wb3MsIHRoaXMucHV6emxlW2ldLnJvdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWlycm9yLm9uUGlja2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc2VyYmVhbS5kcmF3TGFzZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2FsbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFdhbGwodGhpcy5zY2VuZSwgdGhpcy5wdXp6bGVbaV0ucG9zLCB0aGlzLnB1enpsZVtpXS5yb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIEdyb3VuZHtcclxuICAgIGNvbnN0cnVjdG9yKHNjZW5lKXtcclxuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tZXNoID0gbmV3IEJBQllMT04uTWVzaEJ1aWxkZXIuQ3JlYXRlVGlsZWRHcm91bmQoXCJUaWxlZCBHcm91bmRcIiwge1xyXG4gICAgICAgICAgICB4bWluOiAtMTAsXHJcbiAgICAgICAgICAgIHptaW46IC0xMCxcclxuICAgICAgICAgICAgeG1heDogMTAsXHJcbiAgICAgICAgICAgIHptYXg6IDEwLFxyXG4gICAgICAgICAgICBzdWJkaXZpc2lvbnM6IHtcclxuICAgICAgICAgICAgICAgICdoJzogMjAsXHJcbiAgICAgICAgICAgICAgICAndyc6IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdmFyIHRleHR1cmUgPSBuZXcgQkFCWUxPTi5UZXh0dXJlKFwidGlsZXMucG5nXCIsIHRoaXMuc2NlbmUsIGZhbHNlLCB0cnVlLCBCQUJZTE9OLlRleHR1cmUuTkVBUkVTVF9TQU1QTElOR01PREUpO1xyXG4gICAgICAgIHZhciBncm91bmRtYXQgPSBuZXcgQkFCWUxPTi5TdGFuZGFyZE1hdGVyaWFsKFwiZ3JvdW5kbWF0XCIsIHRoaXMuc2NlbmUpO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZSA9IHRleHR1cmU7XHJcbiAgICAgICAgZ3JvdW5kbWF0LmRpZmZ1c2VUZXh0dXJlLnVTY2FsZSA9IDAuMjQ5O1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuZGlmZnVzZVRleHR1cmUud3JhcFUgPSBCQUJZTE9OLlRleHR1cmUuTUlSUk9SX0FERFJFU1NNT0RFO1xyXG4gICAgICAgIGdyb3VuZG1hdC5kaWZmdXNlVGV4dHVyZS53cmFwViA9IEJBQllMT04uVGV4dHVyZS5NSVJST1JfQUREUkVTU01PREU7XHJcblxyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUgPSB0ZXh0dXJlO1xyXG4gICAgICAgIGdyb3VuZG1hdC5zcGVjdWxhclRleHR1cmUudVNjYWxlID0gMC4yNDk7XHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyVGV4dHVyZS52U2NhbGUgPSAwLjI0OTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBVID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuICAgICAgICBncm91bmRtYXQuc3BlY3VsYXJUZXh0dXJlLndyYXBWID0gQkFCWUxPTi5UZXh0dXJlLk1JUlJPUl9BRERSRVNTTU9ERTtcclxuXHJcbiAgICAgICAgZ3JvdW5kbWF0LnNwZWN1bGFyQ29sb3IgPSBuZXcgQkFCWUxPTi5Db2xvcjMoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsID0gZ3JvdW5kbWF0O1xyXG4gICAgICAgIHRoaXMubWVzaC5jaGVja0NvbGxpc2lvbnMgPSB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFB1enpsZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMucHV6emxlcyA9IFtcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOls0LjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAwLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTIuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6WzIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbMi4wLCAwLjUsIC0yLjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlstMy4wLCAwLjUsIDUuMF0scm90OjMsfSx7dHlwZTonZW5kJyxwb3M6WzMuMCwgMC41LCA1LjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCA0LjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMi4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAxLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAxLjUsIDMuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIDEuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0zLjAsIDAuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIDIuMF0scm90OjEsfSxdLFxyXG4gICAgICAgICAgICBbe3R5cGU6J3N0YXJ0Jyxwb3M6Wy0zLjAsIDAuNSwgNS4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIDEuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy0zLjAsIDAuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMS4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDMuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstNC4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy00LjAsIDAuNSwgLTIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMy4wLCAwLjUsIDIuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzMuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0zLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDAuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDIuMF0scm90OjEsfSx7dHlwZTonbWlycm9yJyxwb3M6WzEuMCwgMC41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0yLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMy4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMi41LCAwLjBdLHJvdDoxLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlswLjAsIDAuNSwgMC4wXSxyb3Q6Myx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0xLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAwLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlstMy4wLCAwLjUsIC0yLjBdLHJvdDozLH0se3R5cGU6J21pcnJvcicscG9zOlszLjAsIDAuNSwgLTIuMF0scm90OjMsfSx7dHlwZTonbWlycm9yJyxwb3M6WzMuMCwgMC41LCAtNC4wXSxyb3Q6Myx9LHt0eXBlOidlbmQnLHBvczpbMC4wLCAwLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIC0zLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIC00LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMC41LCAxLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMi4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMy4wLCAwLjUsIC01LjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbMS4wLCAwLjUsIDAuMF0scm90OjMsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC00LjBdLHJvdDozLH0sXSxcclxuICAgICAgICAgICAgW3t0eXBlOidzdGFydCcscG9zOlsyLjAsIDAuNSwgMy4wXSxyb3Q6MSx9LHt0eXBlOidlbmQnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDozLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOlsyLjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6Wy00LjAsIDAuNSwgLTYuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIDMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDAuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAwLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtNy4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoyLH0se3R5cGU6J21pcnJvcicscG9zOls0LjAsIDAuNSwgLTIuMF0scm90OjIsfSx7dHlwZTonbWlycm9yJyxwb3M6WzQuMCwgMC41LCAtNi4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTMuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0zLjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtNC4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTQuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAyLjUsIC01LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAtNS4wXSxyb3Q6Mix9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTYuMF0scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC02LjBdLHJvdDoyLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtN10scm90OjIsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC03XSxyb3Q6Mix9LF0sXHJcbiAgICAgICAgICAgIFt7dHlwZTonc3RhcnQnLHBvczpbLTMuMCwgMC41LCA1LjBdLHJvdDozLH0se3R5cGU6J2VuZCcscG9zOlszLjAsIDAuNSwgNS4wXSxyb3Q6MSx9LHt0eXBlOidtaXJyb3InLHBvczpbLTMuMCwgMC41LCAtMS4wXSxyb3Q6Myx9LHt0eXBlOidtaXJyb3InLHBvczpbMy4wLCAwLjUsIC0xLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAwLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDAuNSwgNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMC41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbMC4wLCAxLjUsIDUuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlswLjAsIDEuNSwgNC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6WzAuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTIuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTMuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTQuMCwgMS41LCAzLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMC41LCAtMi4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgMC4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDEuNSwgLTEuMF0scm90OjEsfSx7dHlwZTond2FsbCcscG9zOlstMS4wLCAxLjUsIC0yLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMS41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAyLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAxLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAwLjBdLHJvdDoxLH0se3R5cGU6J3dhbGwnLHBvczpbLTEuMCwgMi41LCAtMS4wXSxyb3Q6MSx9LHt0eXBlOid3YWxsJyxwb3M6Wy0xLjAsIDIuNSwgLTIuMF0scm90OjEsfSxdLFxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFt7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFs1LCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnZW5kJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFsxLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMSAvLyBQSSAqIHJvdC8yIFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFsxLCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnbWlycm9yJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFs1LCAwLjUsIDFdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMC41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgLy8gXSxcclxuICAgICAgICAgICAgLy8gW3tcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdlbmQnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAxIC8vIFBJICogcm90LzIgXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzEsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICdtaXJyb3InLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzUsIDAuNSwgMV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHR5cGU6ICd3YWxsJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICBwb3M6IFszLCAwLjUsIDVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJvdDogMFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0eXBlOiAnd2FsbCcsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcG9zOiBbMywgMS41LCA1XSxcclxuICAgICAgICAgICAgLy8gICAgICAgICByb3Q6IDBcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdHlwZTogJ3dhbGwnLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHBvczogWzMsIDIuNSwgNV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgcm90OiAwXHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vIF1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmN1cnJlbnRQdXp6bGUgPSAod2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJyMnKVsxXSB8fCAwKS0xO1xyXG4gICAgICAgIHRoaXMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5leHQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UHV6emxlKys7XHJcbiAgICAgICAgdGhpcy5wdXp6bGUgPSB0aGlzLnB1enpsZXNbdGhpcy5jdXJyZW50UHV6emxlXTtcclxuICAgIH1cclxufSIsIndpbmRvdy5ybmQgPSBtID0+IH5+KE1hdGgucmFuZG9tKCkgKiBtKTtcclxuXHJcbndpbmRvdy5yb3RhdGUgPSAodiwgZGVncmVlcykgPT4ge1xyXG4gICAgdmFyIGNhID0gTWF0aC5jb3MoZGVncmVlcyk7XHJcbiAgICB2YXIgc2EgPSBNYXRoLnNpbihkZWdyZWVzKTtcclxuICAgIHJldHVybiBuZXcgQkFCWUxPTi5WZWN0b3IzKGNhICogdi54IC0gc2EgKiB2LnosIDAsIC1zYSAqIHYueCArIGNhICogdi56KTtcclxufSIsImltcG9ydCAnLi9nbG9iYWwnO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vY2xhc3Nlcy9nYW1lXCI7XHJcblxyXG5jbGFzcyBPZmZsaW5lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbmRlckNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBCQUJZTE9OLkVuZ2luZSh0aGlzLmNhbnZhcywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBCQUJZTE9OLlNjZW5lKHRoaXMuZW5naW5lKTtcclxuICAgICAgICAvL3RoaXMuc2NlbmUuZGVidWdMYXllci5zaG93KCk7XHJcbiAgICAgICAgd2luZG93LmdhbWUgPSBuZXcgR2FtZSh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgZ2FtZS5jcmVhdGVTY2VuZSh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmdpbmUucnVuUmVuZGVyTG9vcCgoKSA9PiB0aGlzLnNjZW5lLnJlbmRlcigpKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5lbmdpbmUucmVzaXplKCkpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxubmV3IE9mZmxpbmUoKTsiXSwic291cmNlUm9vdCI6IiJ9