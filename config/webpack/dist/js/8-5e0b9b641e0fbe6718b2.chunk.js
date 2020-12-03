(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./app/javascript/vue/components/buttons/Visit.vue":
/*!*********************************************************!*\
  !*** ./app/javascript/vue/components/buttons/Visit.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Visit.vue?vue&type=template&id=789d7923& */ "./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923&");
/* harmony import */ var _Visit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Visit.vue?vue&type=script&lang=js& */ "./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Visit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "app/javascript/vue/components/buttons/Visit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_6_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Visit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--6-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Visit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_6_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Visit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923&":
/*!****************************************************************************************!*\
  !*** ./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Visit.vue?vue&type=template&id=789d7923& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Visit_vue_vue_type_template_id_789d7923___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--6-0!./node_modules/vue-loader/lib??vue-loader-options!./app/javascript/vue/components/buttons/Visit.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mobile-device-detect */ "./node_modules/mobile-device-detect/dist/index.js");
/* harmony import */ var mobile_device_detect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mobile_device_detect__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
// import { mapGetters } from 'vuex'

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'BtnVisit',
  props: ['item'],
  data: function data() {
    return {
      views: 0
    };
  },
  computed: {
    // ...mapGetters(['isAuthenticated', 'user']),
    mobile: function mobile() {
      return mobile_device_detect__WEBPACK_IMPORTED_MODULE_0__["isMobile"];
    }
  },
  methods: {
    recipeLog: function recipeLog() {
      var _this = this;

      this.$store.dispatch('RECIPE_LOG', this.item).then(function (response) {
        console.log(response);
        _this.views = response.data.views;
      });
    }
  },
  beforeMount: function beforeMount() {// this.recipeLog()
  },
  updated: function updated() {// this.recipeLog()
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./app/javascript/vue/components/buttons/Visit.vue?vue&type=template&id=789d7923& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class: [
        "text-body d-flex align-items-center justify-content-center",
        { "flex-column": _vm.mobile }
      ]
    },
    [
      _c(
        "i",
        { class: ["material-icons btn-visit", _vm.mobile ? "md-24" : "md-18"] },
        [_vm._v("visibility")]
      ),
      _vm._v(" "),
      _c(
        "span",
        {
          class: [
            "text-muted font-weight-lighter small",
            { "ml-1": !_vm.mobile }
          ]
        },
        [_vm._v(_vm._s(_vm.views))]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=8-5e0b9b641e0fbe6718b2.chunk.js.map