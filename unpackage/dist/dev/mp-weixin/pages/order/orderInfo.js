(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/orderInfo"],{

/***/ 122:
/*!**********************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/main.js?{"page":"pages%2Forder%2ForderInfo"} ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _orderInfo = _interopRequireDefault(__webpack_require__(/*! ./pages/order/orderInfo.vue */ 123));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_orderInfo.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 123:
/*!***************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orderInfo.vue?vue&type=template&id=2d9a229c& */ 124);
/* harmony import */ var _orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderInfo.vue?vue&type=script&lang=js& */ 126);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orderInfo.vue?vue&type=style&index=0&lang=scss& */ 129);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/orderInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 124:
/*!**********************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=template&id=2d9a229c& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderInfo.vue?vue&type=template&id=2d9a229c& */ 125);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_template_id_2d9a229c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 125:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=template&id=2d9a229c& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uToast: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-toast/u-toast */ "static/uview/components/u-toast/u-toast").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-toast/u-toast.vue */ 537))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-icon/u-icon */ "static/uview/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-icon/u-icon.vue */ 565))
    },
    uLine: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-line/u-line */ "static/uview/components/u-line/u-line").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-line/u-line.vue */ 629))
    },
    uReadMore: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-read-more/u-read-more */ "static/uview/components/u-read-more/u-read-more").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-read-more/u-read-more.vue */ 643))
    },
    uPopup: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-popup/u-popup */ "static/uview/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-popup/u-popup.vue */ 558))
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
  var g0 = _vm.gtCommon.hiddenMobile4to7(_vm.cargoInfo.mobile)
  var g1 = _vm.gtCommon.hiddenMobile4to7(_vm.dataInfo.pickup_mobile)
  var g2 = _vm.gtCommon.hiddenMobile4to7(_vm.dataInfo.receive_mobile)
  var g3 = _vm.gtCommon.formateTime(
    _vm.dataInfo.create_time,
    "YYYY年MM月DD日 HH:mm"
  )
  var g4 = _vm.sendInfo.length
  var g5 = _vm.signImgList.length
  var g6 = _vm.receiptList.length
  var g7 = _vm.gtCommon.getOssImg("order/logoImg.png")
  var l0 = _vm.__map(_vm.trajectoryList, function (item, index) {
    var $orig = _vm.__get_orig(item)
    var g8 = _vm.$u.timeFormat(item.create_time, "mm-dd hh:MM:ss")
    return {
      $orig: $orig,
      g8: g8,
    }
  })
  if (!_vm._isMounted) {
    _vm.e0 = function ($event, item1) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        item1 = _temp2.item1
      var _temp, _temp2
      return _vm.gtCommon.previewImg(item1 + "?x-oss-process=style/sansong_app")
    }
    _vm.e1 = function ($event, item1) {
      var _temp3 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp4 = _temp3.eventParams || _temp3["event-params"],
        item1 = _temp4.item1
      var _temp3, _temp4
      return _vm.gtCommon.previewImg(item1 + "?x-oss-process=style/sansong_app")
    }
    _vm.e2 = function ($event) {
      return _vm.gtCommon.callMobile(_vm.cargoInfo.mobile)
    }
    _vm.e3 = function ($event) {
      return _vm.gtCommon.copyStr(_vm.dataInfo.waybill_sn)
    }
    _vm.e4 = function ($event) {
      return _vm.gtCommon.copyStr(_vm.dataInfo.deliver_sn)
    }
    _vm.e5 = function ($event, item) {
      var _temp5 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp6 = _temp5.eventParams || _temp5["event-params"],
        item = _temp6.item
      var _temp5, _temp6
      return _vm.gtCommon.previewImg(item + "?x-oss-process=style/sansong_app")
    }
    _vm.e6 = function ($event) {
      return _vm.gtCommon.callMobile(_vm.dataInfo.outlets_mobile)
    }
    _vm.e7 = function ($event, item1) {
      var _temp7 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp8 = _temp7.eventParams || _temp7["event-params"],
        item1 = _temp8.item1
      var _temp7, _temp8
      return _vm.gtCommon.previewImg(item1 + "?x-oss-process=style/sansong_app")
    }
    _vm.e8 = function ($event, item1) {
      var _temp9 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp10 = _temp9.eventParams || _temp9["event-params"],
        item1 = _temp10.item1
      var _temp9, _temp10
      return _vm.gtCommon.previewImg(item1 + "?x-oss-process=style/sansong_app")
    }
    _vm.e9 = function ($event) {
      return _vm.gtCommon.copyStr(_vm.sendInfo.waybill_sn)
    }
    _vm.e10 = function ($event, item) {
      var _temp11 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp12 = _temp11.eventParams || _temp11["event-params"],
        item = _temp12.item
      var _temp11, _temp12
      return _vm.gtCommon.previewImg(
        item.img_path + "?x-oss-process=style/sansong_app"
      )
    }
    _vm.e11 = function ($event, item) {
      var _temp13 = arguments[arguments.length - 1].currentTarget.dataset,
        _temp14 = _temp13.eventParams || _temp13["event-params"],
        item = _temp14.item
      var _temp13, _temp14
      return _vm.gtCommon.previewImg(
        item.img_path + "?x-oss-process=style/sansong_app"
      )
    }
    _vm.e12 = function ($event) {
      return _vm.gtCommon.goLicence(_vm.licencesObj.yunshu_xieyi_url)
    }
    _vm.e13 = function ($event) {
      return _vm.gtCommon.copyStr(_vm.dataInfo.deliver_sn)
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
        g1: g1,
        g2: g2,
        g3: g3,
        g4: g4,
        g5: g5,
        g6: g6,
        g7: g7,
        l0: l0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 126:
/*!****************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderInfo.vue?vue&type=script&lang=js& */ 127);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 127:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _gtCommon = _interopRequireDefault(__webpack_require__(/*! ../../common/gtCommon.js */ 62));
var _qqmapWxJssdk = _interopRequireDefault(__webpack_require__(/*! ../../static/qqmap/qqmap-wx-jssdk.js */ 128));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var tMap = new _qqmapWxJssdk.default({
  key: 'OLGBZ-PMQ64-TVHUY-DDVGK-42GOF-Z5FP4' //腾讯地图开发者密钥
});

//
var _default = {
  data: function data() {
    return {
      intoFrom: 'A',
      includePoints: [],
      id: 0,
      //使用marker点击事件需要填写id
      title: 'map',
      latitude: 31.574729,
      longitude: 120.301663,
      polyline: [],
      covers: [],
      // sCover: {},
      // eCover: {},

      companyLat: '',
      companyLng: '',
      companyHeadImg: '',
      orderSn: '',
      dataInfo: {},
      cargoInfo: {},
      sendInfo: {},
      payBillList: [],
      unPayBillList: [],
      payTotalMoney: 0,
      unPayTotalMoney: 0,
      signImgList: [],
      receiptList: [],
      screenHeight: 0,
      moveX: 0,
      moveY: 150,
      scrollY: false,
      trajectoryList: [],
      trajectoryShow: false,
      licencesObj: {}
    };
  },
  onLoad: function onLoad(options) {
    var gt = this;
    gt.licencesObj = uni.getStorageSync('licencesObj');
    gt.orderSn = options.orderSn;
    // if(options.intoFrom){
    // 	gt.intoFrom = options.intoFrom;
    // }

    var companyInfo = uni.getStorageSync('companyInfo');
    gt.companyLat = companyInfo.latitude;
    gt.companyLng = companyInfo.longitude;
    gt.companyHeadImg = companyInfo.company_pic;
    uni.getSystemInfo({
      success: function success(res) {
        console.log(res);
        gt.screenHeight = res.screenHeight;
        gt.moveY = res.screenHeight * 0.6;
      },
      fail: function fail(res) {
        console.log(res);
      },
      complete: function complete(res) {
        console.log(res);
      }
    });
  },
  onShow: function onShow() {
    var gt = this;
    gt.getDataInfo();
  },
  methods: {
    scoverImgLoad: function scoverImgLoad(res) {
      console.log('scoverImgLoad:', res);
    },
    scoverImgFail: function scoverImgFail(res) {
      console.log('scoverImgFail:', res);
    },
    ecoverImgLoad: function ecoverImgLoad(res) {
      console.log('ecoverImgLoad:', res);
    },
    ecoverImgFail: function ecoverImgFail(res) {
      console.log('ecoverImgFail:', res);
    },
    writeLine: function writeLine() {
      console.log('writeLine');
      var gt = this;
      var from = '0,0';
      var to = '0,0';

      // gt.covers = [];
      if (gt.intoFrom == 'A') {
        if (gt.dataInfo.status == 5 && gt.dataInfo.jiaohuo_type == 1) {
          // 待自送
          from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
          to = gt.companyLat + ',' + gt.companyLng;
          var coverItem = {
            id: 1,
            latitude: gt.dataInfo.pickup_latitude,
            longitude: gt.dataInfo.pickup_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.cargoInfo.headerpic,
            text: '待发货人自送'
          };
          // gt.sCover = coverItem;
          gt.covers.push(coverItem);
          var coverItem = {
            id: 2,
            latitude: gt.companyLat,
            longitude: gt.companyLng,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.companyHeadImg
          };
          // gt.eCover = coverItem;
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 5 && gt.dataInfo.jiaohuo_type == 2) {
          // 待揽收
          from = gt.companyLat + ',' + gt.companyLng;
          to = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
          var coverItem = {
            id: 2,
            latitude: gt.companyLat,
            longitude: gt.companyLng,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.companyHeadImg,
            text: ''
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 1,
            latitude: gt.dataInfo.pickup_latitude,
            longitude: gt.dataInfo.pickup_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.cargoInfo.headerpic,
            // text: '据X公里',
            text: ''
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 7) {
          // 已入库
          from = '0,0';
          to = '0,0';
          var coverItem = {
            id: 2,
            latitude: gt.companyLat,
            longitude: gt.companyLng,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.companyHeadImg,
            text: '已入库,等待发车'
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 9) {
          // 运输中
          from = gt.companyLat + ',' + gt.companyLng;
          to = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
          var coverItem = {
            id: 2,
            latitude: gt.companyLat,
            longitude: gt.companyLng,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.companyHeadImg,
            text: '发货网点：' + gt.dataInfo.pickup_city
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '收货网点：' + gt.dataInfo.receive_city
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 1) {
          // 待派送
          from = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
          to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '等待派送，距X公里'
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.receive_latitude,
            longitude: gt.dataInfo.receive_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/receiveIcon.png'),
            text: ''
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 2) {
          // 待自提
          from = '0,0';
          to = '0,0';
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '待收货人取货'
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 13) {
          from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
          to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;
          var coverItem = {
            id: 1,
            latitude: gt.dataInfo.pickup_latitude,
            longitude: gt.dataInfo.pickup_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.cargoInfo.headerpic,
            text: ''
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.receive_latitude,
            longitude: gt.dataInfo.receive_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/receiveIcon.png'),
            text: '已签收'
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 15) {
          from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
          to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;
          var coverItem = {
            id: 1,
            latitude: gt.dataInfo.pickup_latitude,
            longitude: gt.dataInfo.pickup_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.cargoInfo.headerpic,
            text: ''
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.receive_latitude,
            longitude: gt.dataInfo.receive_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/receiveIcon.png'),
            text: '已签收'
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 20) {
          from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
          to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;
          var coverItem = {
            id: 1,
            latitude: gt.dataInfo.pickup_latitude,
            longitude: gt.dataInfo.pickup_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.cargoInfo.headerpic,
            text: ''
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.receive_latitude,
            longitude: gt.dataInfo.receive_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/receiveIcon.png'),
            text: '已签收'
          };
          gt.covers.push(coverItem);
        }
      }
      if (gt.intoFrom == 'B') {
        if (gt.dataInfo.status == 9) {
          // 运输中
          from = gt.companyLat + ',' + gt.companyLng;
          to = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
          var coverItem = {
            id: 2,
            latitude: gt.companyLat,
            longitude: gt.companyLng,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: gt.companyHeadImg,
            text: '发货网点：' + gt.dataInfo.pickup_city
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '收货网点：' + gt.dataInfo.receive_city
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 1) {
          // 待派送
          from = gt.dataInfo.outlets_latitude + ',' + gt.dataInfo.outlets_longitude;
          to = gt.dataInfo.receive_latitude + ',' + gt.dataInfo.receive_longitude;
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '等待派送，距X公里'
          };
          gt.covers.push(coverItem);
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.receive_latitude,
            longitude: gt.dataInfo.receive_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/receiveIcon.png'),
            text: ''
          };
          gt.covers.push(coverItem);
        }
        if (gt.dataInfo.status == 11 && gt.dataInfo.peisong_type == 2) {
          // 待自提
          from = '0,0';
          to = '0,0';
          var coverItem = {
            id: 3,
            latitude: gt.dataInfo.outlets_latitude,
            longitude: gt.dataInfo.outlets_longitude,
            iconPath: _gtCommon.default.getOssImg('order/mapCoverIcon.png'),
            width: 30,
            height: 16,
            customCallout: {
              display: 'ALWAYS',
              anchorX: 0,
              anchorY: 0
            },
            img: _gtCommon.default.getOssImg('order/compnayBIcon.png'),
            text: '待收货人取货'
          };
          gt.covers.push(coverItem);
        }
      }

      // var from = gt.dataInfo.pickup_latitude + ',' + gt.dataInfo.pickup_longitude;
      // var to = 

      console.log('from:', from);
      console.log('to:', to);
      if (from != '0,0') {
        tMap.direction({
          mode: 'driving',
          //可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
          //from参数不填默认当前地址
          from: from,
          //起点经纬度
          // waypoints: '39.951004,106.571980', //起点经纬度
          to: to,
          //终点经纬度
          success: function success(res) {
            // console.log(1091, res);
            var ret = res;
            var coors = ret.result.routes[0].polyline,
              pl = [];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            // console.log(coors);

            for (var i = 0; i < coors.length; i += 2) {
              pl.push({
                latitude: coors[i],
                longitude: coors[i + 1]
              });
            }
            // console.log(pl)

            //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
            // console.log(pl.length);

            // var index = Math.round(pl.length / 2);
            // console.log(index);

            gt.latitude = pl[0].latitude;
            gt.longitude = pl[0].longitude;
            gt.polyline.push({
              points: pl,
              color: '#30A265',
              // 线的填充色
              width: 6,
              // 折现宽度
              dottedLine: false,
              // 是否是 虚线
              arrowLine: true // 沿线路方向显示箭头
            });

            var MapContext = wx.createMapContext('myMap');
            console.log(MapContext);
            MapContext.includePoints({
              points: pl,
              // 缩放视野展示所有经纬度 [上,右,下,左]  
              padding: [40, 40, gt.screenHeight * 0.4, 40],
              success: function success(rs) {
                console.log(rs);
              }
            });
            // gt.includePoints = pl;

            // gt.setIncludePoints();
          },

          fail: function fail(error) {
            console.error(error);
          },
          complete: function complete(res) {
            // console.log(res);
          }
        });
      } else {
        gt.latitude = gt.covers[0].latitude;
        gt.longitude = gt.covers[0].longitude;
      }
    },
    setIncludePoints: function setIncludePoints() {
      var gt = this;
      var MapContext = wx.createMapContext('myMap');
      var points = gt.includePoints;
      MapContext.includePoints({
        points: points,
        padding: [60, 40, gt.screenHeight * 0.4, 40],
        //被你发现了,可以设置上右下左的间距(px).不其实只能用第一个值100.
        success: function success(e) {
          console.log(e);
        },
        fail: function fail(e) {
          console.log(e);
        }
      });
    },
    getDataInfo: function getDataInfo() {
      var gt = this;
      var url = "/logistics/order/get_order_detail";
      var data = {
        deliver_sn: gt.orderSn
      };
      gt.gtRequest.post(url, data).then(function (res) {
        gt.cargoInfo = res.cargo_info;
        if (res.order_info.pack_imgs) {
          res.order_info.pack_imgs = res.order_info.pack_imgs.split('||');
        }
        gt.dataInfo = res.order_info;
        gt.sendInfo = res.waybill_info;
        var payBillList = [];
        var unPayBillList = [];
        var payTotalMoney = 0;
        var unPayTotalMoney = 0;
        for (var i = 0; i < res.fee_detail.length; i++) {
          if (res.fee_detail[i].status == 2) {
            if (res.fee_detail[i].fee_pic) {
              res.fee_detail[i].picArr = res.fee_detail[i].fee_pic.split('||');
            }
            payBillList.push(res.fee_detail[i]);
            payTotalMoney = ((payTotalMoney * 100 + res.fee_detail[i].money * 100) / 100).toFixed(2);
          } else {
            if (res.fee_detail[i].fee_pic) {
              res.fee_detail[i].picArr = res.fee_detail[i].fee_pic.split('||');
            }
            unPayBillList.push(res.fee_detail[i]);
            unPayTotalMoney = ((unPayTotalMoney * 100 + res.fee_detail[i].money * 100) / 100).toFixed(2);
          }
        }
        payBillList.sort(function (x, y) {
          return y.create_time - x.create_time;
        });
        unPayBillList.sort(function (x, y) {
          return y.create_time - x.create_time;
        });
        gt.payBillList = payBillList;
        gt.unPayBillList = unPayBillList;
        gt.unPayTotalMoney = unPayTotalMoney;
        gt.payTotalMoney = payTotalMoney;

        // console.log(res.image_list.img_15);
        // return false;
        if (res.image_list.img_15) {
          gt.signImgList = res.image_list.img_15;
        }
        if (res.image_list.img_16) {
          gt.signImgList = gt.signImgList.concat(res.image_list.img_16);
        }
        if (res.image_list.img_13) {
          gt.receiptList = res.image_list.img_13;
        }

        // gt.signImgList.contact(gt.image_list.img_15);\
        // if(gt.image_list.img_15[0]){
        // 	gt.signImgList = 
        // }
        // gt.signImgList = gt.image_list.img_15.contact(gt.image_list.img_16);

        gt.getTrajectory();
        gt.writeLine();
      });
    },
    goBillDetail: function goBillDetail() {
      var gt = this;
      uni.navigateTo({
        url: './billDetail?orderSn=' + gt.orderSn
      });
      return false;
    },
    getTrajectory: function getTrajectory() {
      var gt = this;
      var url = "/logistics/order/get_order_logistics";
      var data = {
        deliver_sn: gt.orderSn
      };
      gt.gtRequest.post(url, data).then(function (res) {
        gt.trajectoryList = res.order_logistics_list;
      });
    },
    movableViewChange: function movableViewChange(res) {
      // console.log(res);
      var gt = this;
      if (res.detail.y == 0) {
        gt.scrollY = true;
      } else {
        gt.scrollY = false;
      }
    },
    showTrajectory: function showTrajectory() {
      var gt = this;
      gt.trajectoryShow = true;
    },
    hideTrajectory: function hideTrajectory() {
      var gt = this;
      gt.trajectoryShow = false;
    },
    clickBtn: function clickBtn(action) {
      var gt = this;
      if (action == 'addMoney') {
        uni.navigateTo({
          url: '/subSansong/pages/sansong/addMoney?orderSn=' + gt.dataInfo.deliver_sn
        });
        return false;
      }
      if (action == 'confirmCollect') {
        var url = "/logistics/order/confirm_revenue";
        var data = {
          deliver_sn: gt.dataInfo.deliver_sn
        };
        gt.gtRequest.post(url, data).then(function (res) {
          gt.getDataInfo();
          gt.$refs.uToast.show({
            title: '揽收成功！',
            type: 'success'
          });
        });
      }
      if (action == 'offlineCollection') {
        var url = "/logistics/order/confirm_pay_main";
        var data = {
          deliver_sn: gt.dataInfo.deliver_sn
        };
        gt.gtRequest.post(url, data).then(function (res) {
          gt.getDataInfo();
          gt.$refs.uToast.show({
            title: '收款成功！',
            type: 'success'
          });
        });
      }
      if (action == 'confirmStart') {
        uni.navigateTo({
          url: '/subSansong/pages/sansong/loadSend?orderSn=' + gt.dataInfo.deliver_sn
        });
        return false;
      }
      if (action == 'confirmArrive') {
        var url = "/logistics/order/confirm_arrival";
        var data = {
          deliver_sn: gt.dataInfo.deliver_sn
        };
        gt.gtRequest.post(url, data).then(function (res) {
          gt.getDataInfo();
          gt.$refs.uToast.show({
            title: '到达成功！',
            type: 'success'
          });
        });
      }
      if (action == 'confirmSign') {
        uni.navigateTo({
          url: '/subSansong/pages/sansong/sign?orderSn=' + gt.dataInfo.deliver_sn
        });
        return false;
      }
      if (action == 'uploadReceipt') {
        uni.navigateTo({
          url: '/subSansong/pages/sansong/receipt?orderSn=' + gt.dataInfo.deliver_sn
        });
        return false;
      }
      if (action == 'goSendInfo') {
        uni.navigateTo({
          url: '/subSansong/pages/sansong/sendInfo?orderSn=' + gt.sendInfo.waybill_sn
        });
        return false;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ }),

/***/ 129:
/*!*************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./orderInfo.vue?vue&type=style&index=0&lang=scss& */ 130);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_orderInfo_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 130:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/orderInfo.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[122,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/orderInfo.js.map