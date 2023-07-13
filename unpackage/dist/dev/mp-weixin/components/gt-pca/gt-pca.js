(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/gt-pca/gt-pca"],{

/***/ 650:
/*!******************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gt-pca.vue?vue&type=template&id=78820884& */ 651);
/* harmony import */ var _gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gt-pca.vue?vue&type=script&lang=js& */ 653);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gt-pca.vue?vue&type=style&index=0&lang=scss& */ 655);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["render"],
  _gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/gt-pca/gt-pca.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 651:
/*!*************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=template&id=78820884& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gt-pca.vue?vue&type=template&id=78820884& */ 652);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_template_id_78820884___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 652:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=template&id=78820884& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uSearch: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-search/u-search */ "static/uview/components/u-search/u-search").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-search/u-search.vue */ 601))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-icon/u-icon */ "static/uview/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-icon/u-icon.vue */ 565))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var s0 = _vm.__get_style([_vm.listStyle])
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        s0: s0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 653:
/*!*******************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gt-pca.vue?vue&type=script&lang=js& */ 654);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 654:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = {
  name: "gt-pca",
  props: {
    pcaList2: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    height: {
      type: String,
      default: '100vh'
    },
    show: {
      type: Boolean,
      default: false
    },
    allArea: {
      type: Boolean,
      default: false
    },
    selectedList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      pcaList: [],
      searchVal: '',
      provinceList: [],
      cityList: [],
      areaList: [],
      provinceScrollInto: 0,
      cityScrollInto: 0,
      areaScrollInto: 0,
      provinceSelected: [],
      citySelected: [],
      areaSelected: [],
      break: false
    };
  },
  watch: {
    show: function show(newVal, oldVal) {
      console.log(newVal);
      var gt = this;
      if (newVal) {
        if (gt.selectedList.length > 0 && gt.selectedList.length != 3) {
          var cityList = gt.getChildren(gt.selectedList[0][0]);
          gt.cityList = cityList;
          var areaList = gt.getChildren(gt.selectedList[1][0]);
          gt.areaList = areaList;
          setTimeout(function () {
            for (var i = 0; i < gt.selectedList[2].length; i++) {
              var item = {};
              for (var j = 0; j < gt.areaList.length; j++) {
                if (gt.selectedList[2][i].cityCode == gt.areaList[j].cityCode) {
                  item = gt.areaList[j];
                  gt.selectdPCA(item, true);
                }
              }
            }
          }, 400);
        }
      } else {
        var provinceSelected = [];
        var citySelected = [];
        var areaSelected = [];
        for (var i = 0; i < gt.provinceList.length; i++) {
          if (gt.provinceList[i].selected) {
            provinceSelected.push(gt.provinceList[i]);
          }
        }
        for (var i = 0; i < gt.cityList.length; i++) {
          if (gt.cityList[i].selected) {
            citySelected.push(gt.cityList[i]);
          }
        }
        for (var i = 0; i < gt.areaList.length; i++) {
          if (gt.areaList[i].selected) {
            areaSelected.push(gt.areaList[i]);
          }
        }
        gt.provinceSelected = provinceSelected;
        gt.citySelected = citySelected;
        gt.areaSelected = areaSelected;
        gt.$emit('gtPCASelect', JSON.stringify([provinceSelected, citySelected, areaSelected]));
      }
    },
    pcaList2: function pcaList2(newVal, oldVal) {
      var gt = this;
      console.log(newVal);
      var pcaList = [];
      for (var i = 0; i < newVal.length; i++) {
        var item1 = {};
        item1.city_name = newVal[i].name;
        item1.children = [];
        for (var j = 0; j < newVal[i].child.length; j++) {
          var item2 = {};
          item2.city_name = newVal[i].child[j].name;
          item2.children = [];
          for (var k = 0; k < newVal[i].child[j].child.length; k++) {
            var item3 = {};
            item3.city_name = newVal[i].child[j].child[k].name;
            // console.log(item3);
            item2.children.push(item3);
          }
          item1.children.push(item2);
        }
        pcaList.push(item1);
      }
      console.log(pcaList);
      gt.pcaList = pcaList;

      // console.log('pcaList:', gt.pcaList2);
      // return false;

      gt.init();
    }
  },
  mounted: function mounted() {
    var gt = this;
    // if(pcaList == []){
    var pcaList = uni.getStorageSync('pcaList');
    // }
    gt.pcaList = pcaList;
    gt.init();

    // uni.getStorage({
    // 	key: 'pcaList',
    // 	success: function(res) {
    // 		console.log('pcaList:', res);
    // 		gt.pcaList = res.data;

    // 		gt.init();
    // 	},

    // });

    // console.log('pcaList:', gt.pcaList2);
    // return false;
  },

  computed: {
    listStyle: function listStyle() {
      var gt = this;
      var style = {};
      style.height = "calc(".concat(gt.height, " - 212rpx)");
      return style;
    }
  },
  methods: {
    init: function init() {
      var gt = this;
      var provinceList = gt.pcaList;
      for (var i = 0; i < provinceList.length; i++) {
        var provinceItem = {
          cityCode: provinceList[i].city_code,
          cityName: provinceList[i].city_name,
          cityType: provinceList[i].city_type,
          parentCode: provinceList[i].parent_code,
          selected: false
        };
        gt.provinceList.push(provinceItem);
      }
      if (gt.selectedList.length == 0 || gt.selectedList.length == 3) {
        var firstProvince = {
          cityCode: provinceList[0].city_code,
          cityName: provinceList[0].city_name,
          cityType: provinceList[0].city_type,
          parentCode: provinceList[0].parent_code,
          selected: false
        };
        var firstCity = {
          cityCode: provinceList[0].children[0].city_code,
          cityName: provinceList[0].children[0].city_name,
          cityType: provinceList[0].children[0].city_type,
          parentCode: provinceList[0].children[0].parent_code,
          selected: false
        };
        gt.cityList = gt.getChildren(firstProvince);
        gt.areaList = gt.getChildren(firstCity);
      } else {
        gt.cityList = gt.getChildren(gt.selectedList[0][0]);
        gt.areaList = gt.getChildren(gt.selectedList[1][0]);
      }
    },
    getChildren: function getChildren(item) {
      var gt = this;
      var children = [];
      if (item.cityType == 1) {
        for (var i = 0; i < gt.pcaList.length; i++) {
          if (gt.pcaList[i].city_code == item.cityCode) {
            for (var j = 0; j < gt.pcaList[i].children.length; j++) {
              var cityItem = {
                cityCode: gt.pcaList[i].children[j].city_code,
                cityName: gt.pcaList[i].children[j].city_name,
                cityType: gt.pcaList[i].children[j].city_type,
                parentCode: gt.pcaList[i].children[j].parent_code,
                selected: false
              };
              children.push(cityItem);
            }
            return children;
          }
        }
      }
      if (item.cityType == 2) {
        for (var i = 0; i < gt.pcaList.length; i++) {
          for (var j = 0; j < gt.pcaList[i].children.length; j++) {
            if (gt.pcaList[i].children[j].city_code == item.cityCode) {
              if (gt.allArea) {
                children.push({
                  cityCode: 0,
                  cityName: '全市',
                  cityType: 3,
                  parentCode: item.cityCode,
                  selected: false
                });
              }
              for (var k = 0; k < gt.pcaList[i].children[j].children.length; k++) {
                var areaItem = {
                  cityCode: gt.pcaList[i].children[j].children[k].city_code,
                  cityName: gt.pcaList[i].children[j].children[k].city_name,
                  cityType: gt.pcaList[i].children[j].children[k].city_type,
                  parentCode: gt.pcaList[i].children[j].children[k].parent_code,
                  selected: false
                };
                children.push(areaItem);
              }
              return children;
            }
          }
        }
      }
    },
    getParent: function getParent(item) {
      var gt = this;
      if (item.cityType == 2) {
        for (var i = 0; i < gt.provinceList.length; i++) {
          if (gt.provinceList[i].cityCode == item.parentCode) {
            return gt.provinceList[i];
          }
        }
      }
      if (item.cityType == 3) {
        for (var i = 0; i < gt.cityList.length; i++) {
          if (gt.cityList[i].cityCode == item.parentCode) {
            return gt.cityList[i];
          }
        }
      }
    },
    selectItem: function selectItem(item) {
      var gt = this;
      var selected = !item.selected;
      if (item.cityType == 1) {
        var cityList = gt.getChildren(item);
        gt.cityList = cityList;
        var areaList = gt.getChildren(cityList[0]);
        gt.areaList = areaList;
      }
      if (item.cityType == 2) {
        var areaList = gt.getChildren(item);
        gt.areaList = areaList;
      }
      gt.selectdPCA(item, selected);
    },
    selectdPCA: function selectdPCA(item, selected) {
      var gt = this;
      gt.provinceList.map(function (ite) {
        ite.selected = false;
      });
      gt.cityList.map(function (ite) {
        ite.selected = false;
      });
      if (!gt.allArea) {
        gt.areaList.map(function (ite) {
          ite.selected = false;
        });
      }
      item.selected = selected;
      if (item.cityType == 1) {
        gt.cityList[0].selected = selected;
        if (gt.allArea) {
          gt.areaList[1].selected = selected;
        } else {
          gt.areaList[0].selected = selected;
        }
      }
      if (item.cityType == 2) {
        if (gt.allArea) {
          gt.areaList[1].selected = selected;
        } else {
          gt.areaList[0].selected = selected;
        }
        var provinceItem = gt.getParent(item);
        provinceItem.selected = selected;
      }
      if (item.cityType == 3) {
        var cityItem = gt.getParent(item);
        var provinceItem = gt.getParent(cityItem);
        if (gt.allArea) {
          if (item.cityCode == 0) {
            gt.areaList.map(function (ite) {
              ite.selected = selected;
            });
            cityItem.selected = selected;
            provinceItem.selected = selected;
          } else {
            var num = 0;
            for (var i = 0; i < gt.areaList.length; i++) {
              if (gt.areaList[i].cityCode && gt.areaList[i].selected) {
                num++;
              }
            }
            if (num == gt.areaList.length - 1) {
              gt.areaList[0].selected = true;
            } else {
              gt.areaList[0].selected = false;
            }
            if (num) {
              cityItem.selected = true;
              provinceItem.selected = true;
            } else {
              cityItem.selected = false;
              provinceItem.selected = false;
            }
          }
        } else {
          cityItem.selected = selected;
          provinceItem.selected = selected;
        }
      }
      gt.scrollPCA(item);
    },
    scrollPCA: function scrollPCA(item) {
      var gt = this;
      gt.provinceScrollInto = 'pScroll_0';
      gt.cityScrollInto = 'cScroll_0';
      gt.areaScrollInto = 'aScroll_0';
      setTimeout(function () {
        if (item.cityType == 1) {
          gt.provinceScrollInto = 'pScroll_' + item.cityCode;
          gt.cityScrollInto = 'cScroll_' + gt.cityList[0].cityCode;
          if (gt.allArea) {
            gt.areaScrollInto = 'aScroll_' + gt.areaList[1].cityCode;
          } else {
            gt.areaScrollInto = 'aScroll_' + gt.areaList[0].cityCode;
          }
        }
        if (item.cityType == 2) {
          var provinceItem = gt.getParent(item);
          gt.provinceScrollInto = 'pScroll_' + provinceItem.cityCode;
          gt.cityScrollInto = 'cScroll_' + item.cityCode;
          if (gt.allArea) {
            gt.areaScrollInto = 'aScroll_' + gt.areaList[1].cityCode;
          } else {
            gt.areaScrollInto = 'aScroll_' + gt.areaList[0].cityCode;
          }
        }
        if (item.cityType == 3) {
          var cityItem = gt.getParent(item);
          var provinceItem = gt.getParent(cityItem);
          gt.provinceScrollInto = 'pScroll_' + provinceItem.cityCode;
          gt.cityScrollInto = 'cScroll_' + cityItem.cityCode;
          gt.areaScrollInto = 'aScroll_' + item.cityCode;
        }
      }, 200);
    },
    searchPCA: function searchPCA() {
      var gt = this;
      gt.break = false;
      if (gt.searchVal) {
        gt.provinceList.map(function (ite) {
          ite.selected = false;
        });
        gt.cityList.map(function (ite) {
          ite.selected = false;
        });
        gt.areaList.map(function (ite) {
          ite.selected = false;
        });
        for (var i = 0; i < gt.pcaList.length; i++) {
          if (gt.break) {
            break;
          }
          if (gt.pcaList[i].city_name.includes(gt.searchVal)) {
            var provinceItem = {
              cityCode: gt.pcaList[i].city_code,
              cityName: gt.pcaList[i].city_name,
              cityType: gt.pcaList[i].city_type,
              parentCode: gt.pcaList[i].parent_code,
              selected: false
            };
            gt.cityList = gt.getChildren(provinceItem);
            gt.areaList = gt.getChildren(gt.cityList[0]);
            gt.scrollPCA(provinceItem);
            gt.break = true;
            break;
          }
          for (var j = 0; j < gt.pcaList[i].children.length; j++) {
            if (gt.break) {
              break;
            }
            if (gt.pcaList[i].children[j].city_name.includes(gt.searchVal)) {
              var provinceItem = {
                cityCode: gt.pcaList[i].city_code,
                cityName: gt.pcaList[i].city_name,
                cityType: gt.pcaList[i].city_type,
                parentCode: gt.pcaList[i].parent_code,
                selected: false
              };
              var cityItem = {
                cityCode: gt.pcaList[i].children[j].city_code,
                cityName: gt.pcaList[i].children[j].city_name,
                cityType: gt.pcaList[i].children[j].city_type,
                parentCode: gt.pcaList[i].children[j].parent_code,
                selected: false
              };
              gt.cityList = gt.getChildren(provinceItem);
              gt.areaList = gt.getChildren(cityItem);
              gt.scrollPCA(cityItem);
              gt.break = true;
              break;
            }
            for (var k = 0; k < gt.pcaList[i].children[j].children.length; k++) {
              if (gt.break) {
                break;
              }
              if (gt.pcaList[i].children[j].children[k].city_name.includes(gt.searchVal)) {
                var provinceItem = {
                  cityCode: gt.pcaList[i].city_code,
                  cityName: gt.pcaList[i].city_name,
                  cityType: gt.pcaList[i].city_type,
                  parentCode: gt.pcaList[i].parent_code,
                  selected: false
                };
                var cityItem = {
                  cityCode: gt.pcaList[i].children[j].city_code,
                  cityName: gt.pcaList[i].children[j].city_name,
                  cityType: gt.pcaList[i].children[j].city_type,
                  parentCode: gt.pcaList[i].children[j].parent_code,
                  selected: false
                };
                var areaItem = {
                  cityCode: gt.pcaList[i].children[j].children[k].city_code,
                  cityName: gt.pcaList[i].children[j].children[k].city_name,
                  cityType: gt.pcaList[i].children[j].children[k].city_type,
                  parentCode: gt.pcaList[i].children[j].children[k].parent_code,
                  selected: false
                };
                gt.cityList = gt.getChildren(provinceItem);
                gt.areaList = gt.getChildren(cityItem);
                gt.scrollPCA(areaItem, true);
                gt.break = true;
                break;
              }
            }
          }
        }
      } else {}
    }
  }
};
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 655:
/*!****************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./gt-pca.vue?vue&type=style&index=0&lang=scss& */ 656);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_gt_pca_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 656:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/components/gt-pca/gt-pca.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/gt-pca/gt-pca.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/gt-pca/gt-pca-create-component',
    {
        'components/gt-pca/gt-pca-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(650))
        })
    },
    [['components/gt-pca/gt-pca-create-component']]
]);
