(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subSansong/pages/sansong/waybillList"],{

/***/ 383:
/*!***************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/main.js?{"page":"subSansong%2Fpages%2Fsansong%2FwaybillList"} ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _waybillList = _interopRequireDefault(__webpack_require__(/*! ./subSansong/pages/sansong/waybillList.vue */ 384));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_waybillList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 384:
/*!******************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./waybillList.vue?vue&type=template&id=89fe393a& */ 385);
/* harmony import */ var _waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./waybillList.vue?vue&type=script&lang=js& */ 387);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./waybillList.vue?vue&type=style&index=0&lang=scss& */ 389);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subSansong/pages/sansong/waybillList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 385:
/*!*************************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=template&id=89fe393a& ***!
  \*************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./waybillList.vue?vue&type=template&id=89fe393a& */ 386);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_template_id_89fe393a___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 386:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=template&id=89fe393a& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uEmpty: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-empty/u-empty */ "static/uview/components/u-empty/u-empty").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-empty/u-empty.vue */ 636))
    },
    uLine: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-line/u-line */ "static/uview/components/u-line/u-line").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-line/u-line.vue */ 629))
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
  var g0 = _vm.searchVal != "" && _vm.type == 1 ? _vm.dataList.length : null
  var g1 =
    _vm.searchVal != "" && _vm.type == 1 && g0 == 0
      ? _vm.gtCommon.getOssImg("index/empty.png")
      : null
  var l0 =
    _vm.searchVal != "" && _vm.type == 1 && !(g0 == 0)
      ? _vm.__map(_vm.dataList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g2 = _vm.gtCommon.getOssImg("order/copy.png")
          var g3 =
            item.is_yuyue == 1
              ? _vm.$u.timeFormat(item.yuyue_time, "mm月dd日 hh:MM")
              : null
          var g4 = !(item.is_yuyue == 1)
            ? _vm.$u.timeFormat(item.create_time, "mm月dd日 hh:MM")
            : null
          return {
            $orig: $orig,
            g2: g2,
            g3: g3,
            g4: g4,
          }
        })
      : null
  var g5 = _vm.searchVal != "" && _vm.type == 2 ? _vm.dataList.length : null
  var g6 =
    _vm.searchVal != "" && _vm.type == 2 && g5 == 0
      ? _vm.gtCommon.getOssImg("index/empty.png")
      : null
  var l1 =
    _vm.searchVal != "" && _vm.type == 2
      ? _vm.__map(_vm.dataList, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var g7 = _vm.gtCommon.getOssImg("sansong/copy.png")
          var g8 = _vm.gtCommon.formateTime(item.create_time, "MM月DD日 HH:mm")
          return {
            $orig: $orig,
            g7: g7,
            g8: g8,
          }
        })
      : null
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item = _temp2.item
      var _temp, _temp2
      $event.stopPropagation()
      return _vm.gtCommon.copyStr(item.deliver_sn)
    }
    _vm.e1 = function ($event, item) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item = _temp4.item
      var _temp3, _temp4
      return _vm.gtCommon.copyStr(item.waybill_sn)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        l0: l0,
        g5: g5,
        g6: g6,
        l1: l1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 387:
/*!*******************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./waybillList.vue?vue&type=script&lang=js& */ 388);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 388:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _default = {
  data: function data() {
    return {
      searchVal: '',
      historyList: [],
      type: 0,
      dataList: [],
      page: 1,
      size: 10,
      end: false
    };
  },
  onLoad: function onLoad() {
    var gt = this;
    var historyList = uni.getStorageSync('wayBillHistory');
    // console.log(historyList);
    if (!historyList) {
      historyList = [];
    }
    gt.historyList = historyList;
  },
  methods: {
    searcList: function searcList(item) {
      var gt = this;
      gt.searchVal = item;
      gt.orderSearch();
      // gt.historyShow = false;
      // gt.reGetOrderList();
    },
    orderSearch: function orderSearch() {
      var gt = this;
      gt.historyShow = false;
      gt.updateHistory();
      gt.reGetDataList();
    },
    scan: function scan() {
      var gt = this;
      uni.scanCode({
        success: function success(res) {
          console.log(res);
          if (res.errMsg == 'scanCode:ok') {
            gt.searchVal = res.result;
            gt.reGetDataList();
          }
        }
      });
    },
    clearHistory: function clearHistory() {
      var gt = this;
      gt.historyList = [];
      uni.setStorageSync('wayBillHistory', []);
    },
    reGetDataList: function reGetDataList() {
      var gt = this;
      if (gt.searchVal == '') {
        return false;
      }
      gt.dataList = [];
      gt.page = 1;
      gt.size = 10;
      gt.end = false;
      gt.updateHistory();
      gt.getDataList();
    },
    updateHistory: function updateHistory() {
      var gt = this;
      var historyList = uni.getStorageSync('wayBillHistory');
      // console.log(historyList);
      if (!historyList) {
        historyList = [];
      }
      // console.log(historyList);
      if (gt.searchVal == '') {
        return false;
      }
      historyList = historyList.filter(function (item) {
        return item != gt.searchVal;
      });
      historyList.unshift(gt.searchVal);
      // console.log(historyList);
      gt.historyList = historyList;
      uni.setStorageSync('wayBillHistory', historyList);
    },
    getDataList: function getDataList() {
      var gt = this;
      var type = 0;
      if (gt.end) {
        return false;
      }
      if (gt.searchVal != '') {
        var typeStr = gt.searchVal.substr(0, 2);
        if (typeStr == 'SS') {
          type = 1;
        }
        if (typeStr == 'SY') {
          type = 2;
        }
        if (gt.$u.test.carNo(gt.searchVal)) {
          type = 2;
        }
      }
      gt.type = type;
      console.log(type);
      if (type == 1) {
        var url = "/logistics/order/get_order_list";
        var data = {
          search_key: gt.searchVal,
          page: gt.page,
          limit: gt.size
        };
        gt.gtRequest.post(url, data).then(function (res) {
          gt.dataList = gt.dataList.concat(res.list);
          if (res.list.length == gt.size) {
            gt.page = gt.page + 1;
          } else {
            gt.end = true;
          }
        });
      }
      if (type == 2) {
        var url = "/logistics/waybill/get_waybill_list";
        var data = {
          search_key: gt.searchVal,
          page: gt.page,
          limit: gt.size
        };
        gt.gtRequest.post(url, data).then(function (res) {
          gt.dataList = gt.dataList.concat(res.list);
          if (res.list.length == gt.size) {
            gt.page = gt.page + 1;
          } else {
            gt.end = true;
          }
        });
      }
    },
    loadMore: function loadMore() {
      console.log('loadMore');
      var gt = this;
      gt.getDataList();
    },
    goOrderInfo: function goOrderInfo(item) {
      var gt = this;
      uni.navigateTo({
        url: './orderInfo?orderSn=' + item.deliver_sn
      });
    },
    addMoney: function addMoney(item) {
      uni.navigateTo({
        url: '../sansong/addMoney?orderSn=' + item.deliver_sn
      });
      return false;
    },
    confirmCollect: function confirmCollect(item) {
      var gt = this;
      var url = "/logistics/order/confirm_revenue";
      var data = {
        deliver_sn: item.deliver_sn
      };
      gt.gtRequest.post(url, data).then(function (res) {
        gt.$refs.uToast.show({
          title: '揽收成功！',
          type: 'success',
          url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn
        });
      });
    },
    confirmStart: function confirmStart(item) {
      console.log(item);
      var gt = this;
      uni.navigateTo({
        url: '../sansong/loadSend?orderSn=' + item.deliver_sn
      });
      return false;
    },
    confirmArriva: function confirmArriva(item) {
      var gt = this;
      var url = "/logistics/order/confirm_arrival";
      var data = {
        deliver_sn: item.deliver_sn
      };
      gt.gtRequest.post(url, data).then(function (res) {
        gt.$refs.uToast.show({
          title: '到达成功！',
          type: 'success',
          url: 'pages/order/orderInfo?orderSn=' + item.deliver_sn
        });
      });
    },
    confirmSign: function confirmSign(item) {
      uni.navigateTo({
        url: '../sansong/sign?orderSn=' + item.deliver_sn
      });
      return false;
    },
    uploadReceipt: function uploadReceipt(item) {
      uni.navigateTo({
        url: '../sansong/receipt?orderSn=' + item.deliver_sn
      });
      return false;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 389:
/*!****************************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./waybillList.vue?vue&type=style&index=0&lang=scss& */ 390);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_waybillList_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 390:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/subSansong/pages/sansong/waybillList.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[383,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/subSansong/pages/sansong/waybillList.js.map