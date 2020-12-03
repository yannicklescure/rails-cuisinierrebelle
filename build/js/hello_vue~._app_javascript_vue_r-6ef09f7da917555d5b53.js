/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"hello_vue~._app_javascript_vue_r": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + "-" + {"0":"e6545e55c8c6e912ed2e","1":"81243fb8fdb0352bb57a","2":"cb907252bf80fb27c52f","3":"6c7545383b137b41b675","4":"66bd0bf6cd37a5e22981","5":"5d7738ff64154a25d026","6":"15dc38b889aa6964f38f","7":"7fbfa207d18747ed9793","8":"5e0b9b641e0fbe6718b2","9":"a1f56c971c90a327674c","10":"5027d675419af521f9ae","11":"3278f8191c80984ea67f","12":"2f9fe9a3331089ed6f42","13":"e534f7750155201cdfbe","14":"e86f3b65c7a7dfcd740c","15":"bb9ccf34940444d6a0b5","16":"7c909955ff2d4cd5ff2c","17":"0afdeb7fd61db821f019","18":"0f9d3e08564776aee176","19":"d104812c195c7c15eb5e","20":"1ab2e3ec405ad6ed6e0a","21":"6c80805755b7325933ae","22":"b97ae6e99706e6746669","23":"ef907acf5f970b59687d","24":"62f4878f599cdd919c2a","25":"c598d8637b76dbf8b8ac","26":"00156edab2835443aaac","27":"e1a36c139e8bd022ae7e","28":"9ffd6d8f463015304348","29":"bfe497f224b4b2c59e62","30":"2ff08e2ab4570aec5fd2","31":"965d9341cbeca7c7bc14","32":"f02efbe1055190163d13","33":"933fc76505d9f72c1153","34":"c1f3661cd84b429cdbf5","35":"c5fccd8de870d8ae2d0a","36":"4aedc841f3d757f8e313","37":"ae63fb9d3bf6ec485326","38":"40f07cf6cccf03545d5b","39":"d13cc0899dd2b5072051","40":"eb0afa2e6ae41134de72","41":"8199bcac6f77d7db09a1","42":"150247c57951b7db96e2","43":"29ce5ece1b3204d8f1f7","44":"cf444ddfba064d86dd6b","45":"6b18dfca0711b08bcc93","46":"33f45b776ab5d7e372d8","47":"ad07a93c42ba5630a329","48":"07f12a26b1ee6fc76d81","49":"f72e2b95c83407153277","50":"7d342f0a6ea9e7862b75","51":"351beeb468f9af3841cf","52":"5f78cebbbf91d0e29215","53":"920f5cd1b70ba2e7f259","54":"9683468d50df9acaff4c","55":"4f33dd704b7347277679","56":"7be3ec85b3b65a2b524a","57":"8981f4e486cee0982fb9","58":"5f21a4ff23d087ab7412","59":"590a9fa1db02b497b802","60":"d94a8d140992fc18f29e","61":"aeaec53726b3e10ca6e1","62":"01577eb2c098107dd7c6","63":"54df3ec6a060070d3d0f","64":"54bc77d83985fda3ade5","65":"ec45eddbeb2598524f15","66":"ee1825708f768f76da04","67":"e041e2cca49a499b52fd","68":"423ab7ec015710055adf"}[chunkId] + ".chunk.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./app/javascript/packs/hello_vue.js","vendors~hello_vue~._node_modules_@","vendors~hello_vue~._node_modules_a","vendors~hello_vue~._node_modules_asn1.js_lib_asn1_b","vendors~hello_vue~._node_modules_axios_i","vendors~hello_vue~._node_modules_b","vendors~hello_vue~._node_modules_bn.js_lib_bn.js~399fe23c","vendors~hello_vue~._node_modules_bror","vendors~hello_vue~._node_modules_browserify-rsa_node_modules_bn.js_lib_bn.js~a25cde5e","vendors~hello_vue~._node_modules_browserify-sign_a","vendors~hello_vue~._node_modules_browserify-sign_node_modules_bn.js_lib_bn.js~baee94bb","vendors~hello_vue~._node_modules_browserify-sign_node_modules_readable-stream_lib__stream_p","vendors~hello_vue~._node_modules_browserify-sign_node_modules_readable-stream_lib__stream_readable.j~9e75eaf5","vendors~hello_vue~._node_modules_buffer_index.js~b639400f","vendors~hello_vue~._node_modules_d","vendors~hello_vue~._node_modules_e","vendors~hello_vue~._node_modules_elliptic_l","vendors~hello_vue~._node_modules_elliptic_lib_elliptic.","vendors~hello_vue~._node_modules_elliptic_lib_elliptic_curve_","vendors~hello_vue~._node_modules_elliptic_lib_elliptic_precomputed_secp256k1.js~409b1be7","vendors~hello_vue~._node_modules_h","vendors~hello_vue~._node_modules_hash-base_node_modules_readable-stream_l","vendors~hello_vue~._node_modules_hash-base_node_modules_readable-stream_lib__stream_d","vendors~hello_vue~._node_modules_hash-base_node_modules_readable-stream_lib__stream_readable.js~4250~cc0d0c65","vendors~hello_vue~._node_modules_hash.js_lib_hash.","vendors~hello_vue~._node_modules_j","vendors~hello_vue~._node_modules_l","vendors~hello_vue~._node_modules_m","vendors~hello_vue~._node_modules_mobile-device-detect_dist_index.js~9029fe0a","vendors~hello_vue~._node_modules_p","vendors~hello_vue~._node_modules_re","vendors~hello_vue~._node_modules_readable-stream_l","vendors~hello_vue~._node_modules_readable-stream_lib__stream_readable.js~ad716e80","vendors~hello_vue~._node_modules_s","vendors~hello_vue~._node_modules_sa","vendors~hello_vue~._node_modules_semver_semver.js~8d6127f8","vendors~hello_vue~._node_modules_v","vendors~hello_vue~._node_modules_vue-g","vendors~hello_vue~._node_modules_vue-i18n_dist_vue-i18n.esm.js~a92511cf","vendors~hello_vue~._node_modules_vue-lazyload_vue-lazyload.esm.js~caf92d3d","vendors~hello_vue~._node_modules_vue-meta_dist_vue-meta.esm.js~58ca6a0e","vendors~hello_vue~._node_modules_vue-router_dist_vue-router.esm.js~8c4f598b","vendors~hello_vue~._node_modules_vue_dist_vue.esm.js~a026276e","vendors~hello_vue~._node_modules_vuex_dist_vuex.esm.js~2f6254eb","hello_vue~._a","hello_vue~._app_javascript_a"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/vue/router/index.js":
/*!********************************************!*\
  !*** ./app/javascript/vue/router/index.js ***!
  \********************************************/
/*! exports provided: createRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRouter", function() { return createRouter; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var vue_meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-meta */ "./node_modules/vue-meta/dist/vue-meta.esm.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_3__["default"]);
vue__WEBPACK_IMPORTED_MODULE_2__["default"].use(vue_meta__WEBPACK_IMPORTED_MODULE_4__["default"]); // import { createStore } from '../store'
// import { createRouter } from '../router'
// import { sync } from 'vuex-router-sync'
// create store and router instances
// const store = createStore()
// console.log(store)
// const router = createRouter()
// console.log(router)
// // sync the router with the vuex store.
// // this registers `store.state.route`
// const unsync = sync(store, router)
// // console.log('router')
// unsync()

var Bookmarks = function Bookmarks() {
  return __webpack_require__.e(/*! import() */ 37).then(__webpack_require__.bind(null, /*! ../views/Bookmarks.vue */ "./app/javascript/vue/views/Bookmarks.vue"));
};

var Home = function Home() {
  return __webpack_require__.e(/*! import() */ 38).then(__webpack_require__.bind(null, /*! ../views/Home.vue */ "./app/javascript/vue/views/Home.vue"));
};

var Login = function Login() {
  return __webpack_require__.e(/*! import() */ 39).then(__webpack_require__.bind(null, /*! ../views/Login.vue */ "./app/javascript/vue/views/Login.vue"));
};

var NotFound = function NotFound() {
  return __webpack_require__.e(/*! import() */ 40).then(__webpack_require__.bind(null, /*! ../views/NotFound.vue */ "./app/javascript/vue/views/NotFound.vue"));
};

var Notifications = function Notifications() {
  return __webpack_require__.e(/*! import() */ 41).then(__webpack_require__.bind(null, /*! ../views/Notifications.vue */ "./app/javascript/vue/views/Notifications.vue"));
};

var Recipe = function Recipe() {
  return Promise.all(/*! import() */[__webpack_require__.e(9), __webpack_require__.e(62), __webpack_require__.e(22), __webpack_require__.e(58), __webpack_require__.e(57), __webpack_require__.e(63), __webpack_require__.e(19), __webpack_require__.e(64), __webpack_require__.e(65), __webpack_require__.e(59), __webpack_require__.e(23), __webpack_require__.e(16), __webpack_require__.e(66), __webpack_require__.e(25), __webpack_require__.e(15), __webpack_require__.e(20), __webpack_require__.e(10), __webpack_require__.e(21), __webpack_require__.e(11), __webpack_require__.e(17), __webpack_require__.e(54), __webpack_require__.e(67), __webpack_require__.e(68), __webpack_require__.e(42)]).then(__webpack_require__.bind(null, /*! ../views/Recipe.vue */ "./app/javascript/vue/views/Recipe.vue"));
};

var RecipeEdit = function RecipeEdit() {
  return __webpack_require__.e(/*! import() */ 43).then(__webpack_require__.bind(null, /*! ../views/RecipeEdit.vue */ "./app/javascript/vue/views/RecipeEdit.vue"));
};

var RecipeNew = function RecipeNew() {
  return __webpack_require__.e(/*! import() */ 44).then(__webpack_require__.bind(null, /*! ../views/RecipeNew.vue */ "./app/javascript/vue/views/RecipeNew.vue"));
};

var RegistrationConfirmation = function RegistrationConfirmation() {
  return __webpack_require__.e(/*! import() */ 45).then(__webpack_require__.bind(null, /*! ../views/RegistrationConfirmation.vue */ "./app/javascript/vue/views/RegistrationConfirmation.vue"));
};

var SearchRecipes = function SearchRecipes() {
  return __webpack_require__.e(/*! import() */ 46).then(__webpack_require__.bind(null, /*! ../views/SearchRecipes.vue */ "./app/javascript/vue/views/SearchRecipes.vue"));
};

var Signup = function Signup() {
  return __webpack_require__.e(/*! import() */ 47).then(__webpack_require__.bind(null, /*! ../views/Signup.vue */ "./app/javascript/vue/views/Signup.vue"));
};

var Top100 = function Top100() {
  return __webpack_require__.e(/*! import() */ 48).then(__webpack_require__.bind(null, /*! ../views/Top100.vue */ "./app/javascript/vue/views/Top100.vue"));
};

var UserFollowers = function UserFollowers() {
  return __webpack_require__.e(/*! import() */ 49).then(__webpack_require__.bind(null, /*! ../views/UserFollowers.vue */ "./app/javascript/vue/views/UserFollowers.vue"));
};

var UserFollowing = function UserFollowing() {
  return __webpack_require__.e(/*! import() */ 50).then(__webpack_require__.bind(null, /*! ../views/UserFollowing.vue */ "./app/javascript/vue/views/UserFollowing.vue"));
};

var UserRecipes = function UserRecipes() {
  return __webpack_require__.e(/*! import() */ 51).then(__webpack_require__.bind(null, /*! ../views/UserRecipes.vue */ "./app/javascript/vue/views/UserRecipes.vue"));
};

var UserSettings = function UserSettings() {
  return __webpack_require__.e(/*! import() */ 52).then(__webpack_require__.bind(null, /*! ../views/UserSettings.vue */ "./app/javascript/vue/views/UserSettings.vue"));
};

var ifAuthenticated = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(to, from, next) {
    var vueStore, isAuthenticated;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'));
            isAuthenticated = false;

            if (!vueStore) {
              _context.next = 7;
              break;
            }

            console.log(vueStore);

            if (!vueStore.data.authorization) {
              _context.next = 7;
              break;
            }

            _context.next = 7;
            return axios__WEBPACK_IMPORTED_MODULE_1___default()({
              method: 'get',
              url: "/api/v1/state",
              headers: {
                'Authorization': "Bearer ".concat(vueStore.data.authorization)
              },
              params: {
                query: 'isAuthenticated'
              }
            }).then(function (response) {
              // console.log(response)
              vueStore.data.isAuthenticated = response.data.isAuthenticated;

              if (response.data.isAuthenticated === false) {
                vueStore.data.user = {
                  email: null,
                  authentication_token: null
                };
                vueStore.data.authorization = null;
                vueStore.data.lastUpdated = new Date().getTime() + 1000 * 60 * 3;
              }

              isAuthenticated = response.data.isAuthenticated;
              localStorage.setItem('cuisinier_rebelle', JSON.stringify({
                data: vueStore.data
              }));
            })["catch"](function (error) {
              console.log(error.response);
            });

          case 7:
            // const isAuthenticated = store.getters.isAuthenticated
            console.log("from: ".concat(from.path));
            console.log("to: ".concat(to.path)); // store
            // .dispatch('IS_AUTHENTICATED', {})
            // .then(() => {

            console.log("isAuthenticated: ".concat(isAuthenticated));

            if (to.meta.auth) {
              // console.log(`auth: ${ to.meta.auth }`)
              if (to.name === 'Login' && isAuthenticated) next({
                name: 'Home'
              });
              if (to.name !== 'Login' && !isAuthenticated) next({
                name: 'Login'
              });else {
                // window.location.href = '/login'
                next();
              }
            } else next(); // })


          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ifAuthenticated(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var routes = [// {
//   path: '/:locale',
//   children: []
// },
// {
//   // Include the locales you support between ()
//   path: '/:locale(en|es|fr)?/:id?',
//   // path: '/fr/r/:id',
//   // component: {
//   //   beforeRouteEnter: setLocale,
//   //   beforeRouteUpdate: setLocale,
//   //   // render(h) { return h('router-view'); }
//   // },
//   redirect: to => {
//     console.log(to)
//     const { hash, params, query } = to
//     // if (query.to === 'foo') {
//     //   return { path: '/foo', query: null }
//     // }
//     // if (hash === '#baz') {
//     //   return { name: 'baz', hash: '' }
//     // }
//     if (params.id) {
//       return '/r/:id'
//     } else {
//       return '/'
//     }
//   }
// },
{
  path: '/confirmation',
  name: 'RegistrationConfirmation',
  component: RegistrationConfirmation
}, {
  path: '/s',
  name: 'Search',
  component: SearchRecipes
}, {
  path: '/top100',
  name: 'Top100',
  component: Top100,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/signup',
  name: 'Signup',
  component: Signup,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/notifications',
  name: 'Notifications',
  component: Notifications,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/bookmarks',
  name: 'Bookmarks',
  component: Bookmarks,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/u/:id',
  name: 'UserRecipes',
  component: UserRecipes,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/:locale?/users/:id',
  redirect: '/u/:id'
}, {
  path: '/u/:id/followers',
  name: 'UserFollowers',
  component: UserFollowers,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/u/:id/following',
  name: 'UserFollowing',
  component: UserFollowing,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/u/:id/settings',
  name: 'UserSettings',
  component: UserSettings,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/r/:id/edit',
  name: 'RecipeEdit',
  component: RecipeEdit,
  props: true,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/r/new',
  name: 'RecipeNew',
  component: RecipeNew,
  meta: {
    auth: true // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/r/:id',
  name: 'Recipe',
  component: Recipe,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated
}, {
  path: '/:locale?/recipes/:id',
  redirect: '/r/:id'
}, {
  path: '/:locale/:controller/:id',
  redirect: '/:controller/:id'
}, {
  path: '/:locale?',
  name: 'Home',
  component: Home,
  meta: {
    auth: false // A protected route

  },
  beforeEnter: ifAuthenticated,
  children: []
}, {
  path: "*",
  component: NotFound
}];
var createRouter = function createRouter() {
  return new vue_router__WEBPACK_IMPORTED_MODULE_3__["default"]({
    mode: 'history',
    fallback: false,
    routes: routes,
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  });
};

/***/ }),

/***/ "./app/javascript/vue/store/actions.js":
/*!*********************************************!*\
  !*** ./app/javascript/vue/store/actions.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api */ "./app/javascript/vue/api/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ "./node_modules/jsonwebtoken/index.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }






var fetchStore = function fetchStore(_ref, _ref2) {
  var commit = _ref.commit,
      dispatch = _ref.dispatch,
      state = _ref.state;

  _objectDestructuringEmpty(_ref2);

  console.log('fetch state data');
  return _api__WEBPACK_IMPORTED_MODULE_3__["fetchState"]({
    commit: commit,
    dispatch: dispatch,
    state: state
  }, {}).then(function (response) {
    console.log(response);
    commit("SET_DATA", response.data); // localStorage.setItem('cuisinier_rebelle', JSON.stringify(response.data))
    // console.log(JSON.parse(localStorage.getItem('cuisinier_rebelle')))

    return response.data;
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  SEARCH: function SEARCH(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["search"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("SEARCH", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REPLY_EDIT: function REPLY_EDIT(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["replyEdit"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("REPLY_EDIT", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REPLY_DELETE: function REPLY_DELETE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["replyDelete"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 204) context.commit("REPLY_DELETE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REPLY_LIKE: function REPLY_LIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["replyLike"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("REPLY_LIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REPLY_UNLIKE: function REPLY_UNLIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["replyUnlike"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 204) context.commit("REPLY_UNLIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  COMMENT_LIKE: function COMMENT_LIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["commentLike"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("COMMENT_LIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  COMMENT_UNLIKE: function COMMENT_UNLIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["commentUnlike"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 204) context.commit("COMMENT_UNLIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  COMMENT_DELETE: function COMMENT_DELETE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["commentDelete"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 204) context.commit("COMMENT_DELETE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REPLY_NEW: function REPLY_NEW(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["replyNew"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("REPLY_NEW", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  COMMENT_EDIT: function COMMENT_EDIT(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["commentEdit"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("COMMENT_EDIT", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  COMMENT_NEW: function COMMENT_NEW(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["commentNew"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("COMMENT_NEW", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  BOOKMARK: function BOOKMARK(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["bookmark"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 200) context.commit("BOOKMARK", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  FOLLOWERS: function FOLLOWERS(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["followers"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status)); // if (response.status === 200) context.commit("FOLLOWERS", payload)

      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  UNBOOKMARK: function UNBOOKMARK(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["unbookmark"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      if (response.status === 204) context.commit("UNBOOKMARK", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  FOLLOW: function FOLLOW(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["follow"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      console.log(response);
      if (response.status === 200) context.commit("FOLLOW", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  UNFOLLOW: function UNFOLLOW(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["unfollow"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      console.log(response);
      if (response.status === 200) context.commit("UNFOLLOW", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  LIKE: function LIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["like"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      console.log(response);
      if (response.status === 200) context.commit("LIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  UNLIKE: function UNLIKE(context, payload) {
    // console.log(payload)
    return _api__WEBPACK_IMPORTED_MODULE_3__["unlike"](context, payload).then(function (response) {
      console.log("response.status ".concat(response.status));
      console.log(response);
      if (response.status === 204) context.commit("UNLIKE", payload);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  IS_AUTHENTICATED: function IS_AUTHENTICATED(context, _ref3) {
    _objectDestructuringEmpty(_ref3);

    console.log(context);
    return _api__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"](context, {}).then( /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(response) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(response);
                _context.next = 3;
                return context.commit("IS_AUTHENTICATED", response.data);

              case 3:
                return _context.abrupt("return", response.data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }()); // const vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
    // if (vueStore) {
    //   console.log(vueStore)
    //   // context.commit("IS_AUTHENTICATED", vueStore.data)
    //   context.commit("SET_DATA", vueStore)
    //   return vueStore.data.isAuthenticated
    // } else return false
  },
  SET_STORE: function SET_STORE(context, _ref5) {
    _objectDestructuringEmpty(_ref5);

    // const vueStore = JSON.parse(localStorage.getItem('cuisinier_rebelle'))
    // if (vueStore) {
    //   console.log('vueStore')
    //   console.log(vueStore)
    //   // Remove localStorage prior VueJS
    //   if (vueStore.timestamp && vueStore.timestamp < 1605233042272) {
    //     localStorage.removeItem('cuisinier_rebelle')
    //     return fetchStore(context, {})
    //   }
    //   // Force Update
    //   if (vueStore.data.timestamp && vueStore.data.timestamp < 1605317110896) {
    //     localStorage.removeItem('cuisinier_rebelle')
    //     return fetchStore(context, {})
    //   }
    //   if (vueStore.data.recipes.length > 0 && (new Date().getTime() - vueStore.data.lastUpdated < 1000 * 60 * 3)) {
    //     // if ( vueStore.data.user === null || new Date().getTime() - vueStore.lastUpdated > 1000 * 60 * 3 ) {
    //     //   console.log('fetching server, refresh vueStore')
    //     //   return fetchStore(context, {})
    //     // } else {
    //       console.log('loading vueStore...')
    //       // console.log(vueStore)
    //       context.commit("SET_DATA", vueStore)
    //       return vueStore
    //     // }
    //   } else {
    //     console.log('fetching server, initiate vueStore')
    //     return fetchStore(context, {})
    //   }
    // } else {
    //   console.log('fetching server, initiate vueStore')
    //   return fetchStore(context, {})
    // }
    return fetchStore(context, {});
  },
  USERS: function USERS(context, payload) {
    // console.log(context.state.data.user)
    return _api__WEBPACK_IMPORTED_MODULE_3__["users"](context, payload).then(function (response) {
      if (response.status === 200) context.commit("USERS", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  RECIPE_EDIT: function RECIPE_EDIT(context, payload) {
    // console.log(context.state.data.user)
    return _api__WEBPACK_IMPORTED_MODULE_3__["recipeEdit"](context, payload).then(function (response) {
      // if (response.status === 200) context.commit("RECIPE_EDIT", response)
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  RECIPE_NEW: function RECIPE_NEW(context, payload) {
    // console.log(context.state.data.user)
    return _api__WEBPACK_IMPORTED_MODULE_3__["recipeNew"](context, payload).then(function (response) {
      if (response.status === 200) context.commit("RECIPE_NEW", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  RECIPE: function RECIPE(context, payload) {
    // console.log(context.state.data.user)
    return _api__WEBPACK_IMPORTED_MODULE_3__["recipe"](context, payload).then(function (response) {
      if (response.status === 200) context.commit("RECIPE", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  RECIPES: function RECIPES(context, payload) {
    // console.log(context.state.data.user)
    return _api__WEBPACK_IMPORTED_MODULE_3__["recipes"](context, payload).then(function (response) {
      if (response.status === 200) context.commit("RECIPES", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  RECIPE_LOG: function RECIPE_LOG(context, payload) {
    console.log(context.state.data.user);
    return _api__WEBPACK_IMPORTED_MODULE_3__["recipeLog"](context, payload).then(function (response) {
      if (response.status === 200) context.commit("RECIPE_LOG", {
        data: payload,
        views: response.data.views
      });
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  REGISTRATION_CONFIRMATION: function REGISTRATION_CONFIRMATION(context, payload) {
    return _api__WEBPACK_IMPORTED_MODULE_3__["confirmRegistration"](context, payload).then(function (response) {
      console.log(response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  SIGN_UP: function SIGN_UP(context, user) {
    console.log(context.state.data);
    return _api__WEBPACK_IMPORTED_MODULE_3__["signUp"](context, user).then(function (response) {
      console.log(response); // const token = response.headers.authorization.split('Bearer ')[1]
      // console.log(token)
      // console.log(jwt.decode(token))
      // if (response.status === 200) context.commit("SIGN_UP", response)

      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  LOG_IN: function LOG_IN(context, user) {
    console.log(context.state.data);
    return _api__WEBPACK_IMPORTED_MODULE_3__["login"](context, user).then(function (response) {
      var token = response.headers.authorization.split('Bearer ')[1];
      console.log(token);
      console.log(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default.a.decode(token));
      if (response.status === 200) context.commit("LOG_IN", response);
      return response;
    })["catch"](function (error) {
      // console.log(error)
      return error;
    });
  },
  LOG_OUT: function LOG_OUT(context, _ref6) {
    _objectDestructuringEmpty(_ref6);

    console.log(context.state.data);
    return _api__WEBPACK_IMPORTED_MODULE_3__["logout"](context, context.state.data.user.auth).then(function (response) {
      console.log(response);
      if (response.status === 204) context.commit("LOG_OUT", {});
      return response;
    });
  },
  NAVBAR_HEIGHT: function NAVBAR_HEIGHT(context, navbarHeight) {
    context.commit("NAVBAR_HEIGHT", navbarHeight); // localStorage.setItem('cuisinier_rebelle', JSON.stringify(context.state.data))
  } // // FETCH_PAGES: (context, { id }) => {
  // //   const vueStore = JSON.parse(localStorage.getItem('vueStore'))
  // //   // console.log(vueStore)
  // //   if (vueStore) {
  // //     console.log('vueStore')
  // //     if ( new Date().getTime() - vueStore.lastUpdated > 1000 * 60 * 3 ) {
  // //       console.log('fetching server, refresh vueStore')
  // //       return createVueStorePage(context, { id })
  // //     } else {
  // //       console.log('loading vueStore')
  // //       context.commit("SET_PAGES", vueStore.data)
  // //       return vueStore
  // //     }
  // //   } else {
  // //     console.log('fetching server, initiate vueStore')
  // //     return createVueStorePage(context, { id })
  // //   }
  // // },
  // SEARCH_QUERY: (context, { query }) => {
  //   console.log(query)
  //   console.log('fetch search query')
  //   return context.dispatch('SET_STORE', {})
  //     .then(() => {
  //       return fetchSearchQuery(context, { query })
  //         .then(response => {
  //          console.log(response.data)
  //          context.commit("SET_SEARCH_POSTS", response.data.posts)
  //          // context.dispatch('FETCH_ITEMS', {})
  //          return response
  //         })
  //     })
  // },
  // FETCH_USER_POSTS: (context, { user }) => {
  //   console.log(user)
  //   console.log('fetch posts')
  //   return context.dispatch('SET_STORE', {})
  //     .then(() => {
  //       return fetchUserPosts(context, { user })
  //         .then(response => {
  //          console.log(response.data)
  //          context.commit("SET_USER_POSTS", response.data)
  //          // context.dispatch('FETCH_ITEMS', {})
  //          return response
  //         })
  //     })
  // },
  // ADD_NEW_COMMENT: (context, { ancestry, post }) => {
  //   return addNewComment(context, { ancestry, post })
  //     .then(response => {
  //       console.log(response.data)
  //       context.commit("SET_NEW_COMMENT", response.data)
  //       return response.data
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // ADD_NEW_POST: (context, { post }) => {
  //   return addNewPost(context, { post })
  //     .then(response => {
  //       context.commit("SET_NEW_POST", response.data)
  //       return response.data
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // FORWARD_POST: (context, { post, page }) => {
  //   return forwardPost(context, { post })
  //     .then(response => {
  //       // console.log(response)
  //       context.commit("SET_FORWARD_POST", { payload: response.data, page: page })
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // EDIT_POST: (context, { post }) => {
  //   return editPost(context, { post })
  //     .then(response => {
  //       // console.log(response)
  //       context.commit("SET_EDIT_POST", response.data)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // DELETE_ITEM: (context, { id }) => {
  //   console.log(id)
  //   return deletePost(context, { id })
  //     .then(response => {
  //       console.log(response.data)
  //       context.commit("DELETE_POST", response.data)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // DELETE_COMMENT: (context, { post_id, comment_id }) => {
  //   console.log({ post_id, comment_id })
  //   return deleteComment(context, { id: comment_id })
  //     .then(response => {
  //       context.commit("REMOVE_COMMENT", { post_id, comment_id })
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // PIN_POST: (context, { id }) => {
  //   console.log({ id })
  //   return pin(context, { id: id })
  //     .then(response => {
  //       context.commit("SET_PINNED_POST", response.data)
  //       console.log(response)
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // LIKED_POST: (context, { id }) => {
  //   console.log(id)
  //   return liked(context, { id })
  //     .then(response => {
  //       if (context.state.data.userShow.posts.length > 0) {
  //         context.commit("SET_LIKED_POST_ALT", {
  //           id: id,
  //           status: response.status
  //         })
  //       } else {
  //         context.commit("SET_LIKED_POST", {
  //           id: id,
  //           status: response.status
  //         })
  //       }
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // FOLLOW_USER: (context, { id, type }) => {
  //   console.log(id)
  //   return follow(context, { id, type })
  //     .then(response => {
  //       // if (context.state.data.userShow.posts.length > 0) {
  //         context.commit("SET_FOLLOWING", {
  //           id: id,
  //           data: response.data,
  //           type: type,
  //           status: response.status
  //         })
  //       // } else {
  //       //   context.commit("SET_LIKED_POST", {
  //       //     id: id,
  //       //     status: response.status
  //       //   })
  //       // }
  //       return response
  //     })
  //     .finally(result => {
  //       localStorage.setItem('vueStore', JSON.stringify(context.state))
  //       return result
  //     })
  // },
  // LOG_OUT: (context, {}) => {
  //   context.commit("SET_LOG_OUT", {})
  //   .then(() => {
  //     // localStorage.removeItem('vueStore');
  //     localStorage.setItem('vueStore', JSON.stringify(context.state))
  //   })
  // }

});

/***/ }),

/***/ "./app/javascript/vue/store/getters.js":
/*!*********************************************!*\
  !*** ./app/javascript/vue/store/getters.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// import { sortItemsDesc } from '../util/filters'
// import { filterDate } from '../util/filters'
var metaCsrf = document.querySelector("meta[name='csrf-token']");

var _csrfToken = metaCsrf.getAttribute('content');

/* harmony default export */ __webpack_exports__["default"] = ({
  // pages (state) {
  //   // state.data.pages.filter(page => page.id === this.$route.params.id )[0]
  //   // console.log(state.data.pages)
  //   return state.data.pages
  // },
  // searchPosts (state) {
  //   // console.log(state.data.searchPosts)
  //   return state.data.searchPosts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  csrfToken: function csrfToken(state) {
    return _csrfToken;
  },
  isAuthenticated: function isAuthenticated(state, getters) {
    // return state.data.isAuthenticated
    // console.log(state.data.user)
    return state.data.user.email != null;
  },
  search: function search(state) {
    return state.data.search;
  },
  navbarHeight: function navbarHeight(state) {
    // console.log(state)
    return state.data.render.navbarHeight;
  },
  countRecipeComments: function countRecipeComments(state) {
    return function (item) {
      var counts = item.comments.map(function (comment) {
        return comment.replies.length;
      });
      var sum = counts.length;
      counts.map(function (res) {
        return sum += res;
      });
      return sum;
    };
  },
  bookmarks: function bookmarks(state) {
    return state.data.user.authentication_token ? state.data.user.bookmarks.sort(function (a, b) {
      return new Date(a.created_at).getTime() > new Date(b.created_at).getTime() ? 1 : -1;
    }).reverse().map(function (bookmark) {
      return state.data.recipes.filter(function (item) {
        return item.recipe.id === bookmark.recipe_id;
      })[0];
    }) : [];
  },
  userRecipes: function userRecipes(state) {
    return function (keyword) {
      return state.data.recipes.filter(function (item) {
        return item.user.slug === keyword;
      }).sort(function (a, b) {
        return a.timestamp > b.timestamp ? 1 : -1;
      }).reverse();
    };
  },
  top100: function top100(state) {
    return state.data.recipes.sort(function (a, b) {
      return a.recipe.views > b.recipe.views ? 1 : -1;
    }).reverse().slice(0, 100);
  },
  recipe: function recipe(state) {
    return function (keyword) {
      return state.data.recipes.filter(function (item) {
        return item.recipe.slug === keyword;
      })[0];
    };
  },
  recipes: function recipes(state) {
    return state.data.recipes.sort(function (a, b) {
      return a.timestamp > b.timestamp ? 1 : -1;
    }).reverse();
  },
  usersFilter: function usersFilter(state) {
    return function (keyword) {
      return state.data.users.filter(function (user) {
        return user.slug === keyword;
      })[0];
    };
  },
  currentUser: function currentUser(state) {
    return state.data.user;
  } // userPinnedPost (state) {
  //   return state.data.userShow.posts.filter(item => item.pin === true)
  // },
  // userShow (state, getters) {
  //   const pin = getters.currentUserPinnedPost.length > 0 ? getters.currentUserPinnedPost[0] : false
  //   console.log(pin)
  //   let arr = state.data.userShow.posts
  //   console.log(arr)
  //   if (pin) {
  //     arr.unshift(arr.splice(arr.indexOf(pin), 1)[0])
  //   }
  //   arr = arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   console.log(arr)
  //   return {
  //     user: state.data.userShow,
  //     posts: arr
  //   }
  //   // return state.data.userShow.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // posts (state, getters) {
  //   console.log(state.data.posts)
  //   // let arr = []
  //   // state.data.posts.forEach (post => {
  //   //   arr.push(post)
  //   //   post.forwards.forEach(item => arr.push(item))
  //   // })
  //   // // arr.push(state.data.posts)
  //   // console.log(arr)
  //   // return arr.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  //   return state.data.posts.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1).reverse()
  // },
  // // last24hoursFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(1)))
  // // },
  // // last7daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(7)))
  // // },
  // // last30daysFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > filterDate(30)))
  // // },
  // // todayFeed (state) {
  // //   return sortItemsDesc(state.data.posts.filter(item => item.timestamp > new Date().setHours(0,0,0,0)))
  // // },

});

/***/ })

/******/ });
//# sourceMappingURL=hello_vue~._app_javascript_vue_r-6ef09f7da917555d5b53.js.map