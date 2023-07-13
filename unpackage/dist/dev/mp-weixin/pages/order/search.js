(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/search"],{

/***/ 215:
/*!*******************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/main.js?{"page":"pages%2Forder%2Fsearch"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _search = _interopRequireDefault(__webpack_require__(/*! ./pages/order/search.vue */ 216));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_search.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 216:
/*!************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/search.vue ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.vue?vue&type=template&id=30fc97fc& */ 217);
/* harmony import */ var _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.vue?vue&type=script&lang=js& */ 219);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search.vue?vue&type=style&index=0&lang=scss& */ 221);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/search.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 217:
/*!*******************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=template&id=30fc97fc& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=template&id=30fc97fc& */ 218);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_template_id_30fc97fc___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 218:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=template&id=30fc97fc& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 219:
/*!*************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=script&lang=js& */ 220);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 220:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 41));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 43));
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      refreshStatus: false,
      searchVal: '',
      historyShow: false,
      historyList: [],
      screenShow: false,
      calcendarShow: false,
      timeStr: '',
      stime: '',
      etime: '',
      lineList: [],
      lineStr: '',
      lineId: 0,
      lineIndex: 0,
      lineShow: false,
      // lineIndex: 9999,

      // typeList: [{
      // 		name: '全部',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '极速',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '指派',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '实时单',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '预约单',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '快运',
      // 		val: 0,
      // 	},
      // 	{
      // 		name: '普运',
      // 		val: 0,
      // 	},
      // ],
      orderTypeIndex: 9999,
      yuyueTypeIndex: 9999,
      deliverTypeIndex: 9999,
      statusList: [{
        name: '全部',
        val: 0
      }, {
        name: '待付款',
        val: 1
      }, {
        name: '待揽收',
        val: 2
      }, {
        name: '已入库',
        val: 3
      }, {
        name: '运输中',
        val: 4
      }, {
        name: '待签收',
        val: 5
      }, {
        name: '有回单',
        val: 6
      }, {
        name: '已完成',
        val: 7
      }, {
        name: '已取消',
        val: 8
      }],
      statusIndex: 0,
      tabList: [{
        name: '全部',
        val: 0
      }, {
        name: '待付款',
        val: 1
      }, {
        name: '待揽收',
        val: 2
      }, {
        name: '已入库',
        val: 3
      }, {
        name: '运输中',
        val: 4
      }, {
        name: '待签收',
        val: 5
      }, {
        name: '有回单',
        val: 6
      }, {
        name: '已完成',
        val: 7
      }, {
        name: '已取消',
        val: 8
      }],
      currentTab: 0,
      page: 1,
      size: 10,
      end: false,
      dataList: [],
      break: false
    };
  },
  onLoad: function onLoad() {
    var gt = this;
    gt.getLineList();
    var historyList = uni.getStorageSync('orderHistory');
    // console.log(historyList);
    if (!historyList) {
      historyList = [];
    }
    gt.historyList = historyList;
  },
  onShow: function onShow() {
    var gt = this;
    setTimeout(function () {
      gt.reGetOrderList();
    }, 500);
  },
  onHide: function onHide() {
    var gt = this;
    gt.break = false;
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var gt = this;
    gt.reGetOrderList();
    uni.stopPullDownRefresh();
  },
  methods: {
    searcList: function searcList(item) {
      var gt = this;
      gt.searchVal = item;
      gt.orderSearch();
      // gt.historyShow = false;
      // gt.reGetOrderList();
    },
    showHistory: function showHistory() {
      var gt = this;
      // gt.historyShow = true;
      uni.navigateTo({
        url: './search'
      });
    },
    clearHistory: function clearHistory() {
      var gt = this;
      gt.historyList = [];
      uni.setStorageSync('wayBillHistory', []);
    },
    orderSearch: function orderSearch() {
      var gt = this;
      gt.historyShow = false;
      gt.updateHistory();
      // gt.reGetOrderList();

      uni.setStorageSync('orderSearchVal', gt.searchVal);
      uni.navigateBack();
    },
    showScreen: function showScreen() {
      var gt = this;
      gt.screenShow = true;
    },
    showCalcendar: function showCalcendar() {
      console.log('showCalcendar');
      var gt = this;
      gt.calcendarShow = true;
    },
    calcendarChange: function calcendarChange(res) {
      console.log(res);
      var gt = this;
      gt.stime = res.startDate;
      gt.etime = res.endDate;
      gt.timeStr = res.startDate + ' ~ ' + res.endDate;
    },
    showLine: function showLine() {
      var gt = this;
      gt.lineShow = true;
    },
    lineConfirm: function lineConfirm(res) {
      console.log(res);
      var gt = this;
      gt.lineId = res[0].value;
      gt.lineStr = res[0].label;
      gt.lineIndex = res[0].index;
    },
    lineSelect: function lineSelect(index) {
      var gt = this;
      if (index == gt.lineIndex) {
        gt.lineIndex = 9999;
      } else {
        gt.lineIndex = index;
      }
    },
    typeSelect: function typeSelect(type, index) {
      var gt = this;
      if (index == gt[type]) {
        gt[type] = 9999;
      } else {
        gt[type] = index;
      }
    },
    statusSelect: function statusSelect(index) {
      console.log(index);
      var gt = this;
      if (index == gt.statusIndex) {
        gt.statusIndex = 9999;
      } else {
        gt.statusIndex = index;
      }
    },
    resetScreen: function resetScreen() {
      var gt = this;
      gt.stime = '';
      gt.etime = '';
      gt.timeStr = '';
      // gt.lineId = 0;
      // gt.lineStr = '';
      gt.lineIndex = 9999;
      gt.orderTypeIndex = 9999;
      gt.yuyueTypeIndex = 9999;
      gt.deliverTypeIndex = 9999;
      gt.statusIndex = gt.currentTab;
    },
    submitScreen: function submitScreen() {
      console.log('submitScreen');
      var gt = this;
      if (gt.currentTab == gt.statusIndex) {
        gt.reGetOrderList();
      } else {
        gt.currentTab = gt.statusIndex;
      }
      gt.screenShow = false;
    },
    tabsChange: function tabsChange(index) {
      var gt = this;
      gt.currentTab = index;
      gt.statusIndex = index;
      gt.reGetOrderList();
    },
    animationfinish: function animationfinish(item) {
      var gt = this;
      var currentTab = gt.currentTab;
      gt.currentTab = item.detail.current;
      if (currentTab != gt.currentTab) {
        gt.reGetOrderList();
      }
    },
    getLineList: function getLineList() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var gt, token, url, data;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gt = _this;
                _context.next = 3;
                return gt.gtRequest.getToken();
              case 3:
                token = _context.sent;
                console.log(621, token);
                if (!token) {
                  _context.next = 11;
                  break;
                }
                url = "/logistics/specialline/get_special_line_list";
                data = {
                  page: 1,
                  limit: 9999
                };
                gt.gtRequest.post(url, data).then(function (res) {
                  for (var i = 0; i < res.list.length; i++) {
                    res.list[i]['lineName'] = res.list[i].start_city + '-' + res.list[i].end_city;
                  }
                  console.log(res.list);
                  gt.lineList = res.list;
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);
                  // gt.lineList = gt.lineList.concat(res.list);

                  gt.lineList.unshift({
                    line_id: 0,
                    lineName: '全部'
                  });
                });
                _context.next = 14;
                break;
              case 11:
                gt.break = true;
                uni.showModal({
                  title: '请先登录',
                  showCancel: true,
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '../login/login'
                      });
                      return false;
                    }
                  }
                });
                return _context.abrupt("return", false);
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    updateHistory: function updateHistory() {
      var gt = this;
      var historyList = uni.getStorageSync('orderHistory');
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
      uni.setStorageSync('orderHistory', historyList);
    },
    reGetOrderList: function reGetOrderList() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var gt, token;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                gt = _this2;
                console.log('break:', gt.break);
                if (!gt.break) {
                  _context2.next = 6;
                  break;
                }
                return _context2.abrupt("return", false);
              case 6:
                _context2.next = 8;
                return gt.gtRequest.getToken();
              case 8:
                token = _context2.sent;
                console.log(694, token);
                if (!token) {
                  _context2.next = 18;
                  break;
                }
                gt.page = 1;
                gt.size = 10;
                gt.end = false;
                gt.refreshStatus = true;
                gt.getOrderList();
                _context2.next = 20;
                break;
              case 18:
                uni.showModal({
                  title: '请先登录',
                  showCancel: true,
                  success: function success(res) {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '../login/login'
                      });
                      return false;
                    }
                  }
                });
                return _context2.abrupt("return", false);
              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    getOrderList: function getOrderList() {
      var gt = this;
      if (gt.end) {
        return false;
      }
      var url = "/logistics/order/get_order_list";
      var data = {
        page: gt.page,
        limit: gt.size,
        search_key: gt.searchVal
      };
      if (gt.currentTab == 1) {
        data.pay_status = 0;
      }
      if (gt.currentTab == 2) {
        data.status = 5;
      }
      if (gt.currentTab == 3) {
        data.status = 7;
      }
      if (gt.currentTab == 4) {
        data.status = 9;
      }
      if (gt.currentTab == 5) {
        data.status = 11;
      }
      if (gt.currentTab == 6) {
        data.with_receipt = 2;
      }
      if (gt.currentTab == 7) {
        data.status = '20,15';
      }
      if (gt.currentTab == 8) {
        data.status = 99;
      }
      if (gt.timeStr) {
        data.start_time = gt.stime;
        data.end_time = gt.etime;
      }
      // if(gt.lineIndex != 9999){
      // 	data.line_id = gt.lineList[gt.lineIndex].line_id;
      // }
      if (gt.lineId != 0) {
        data.line_id = gt.lineId;
      }
      if (gt.orderTypeIndex != 9999) {
        data.order_type = gt.orderTypeIndex == 0 ? 2 : 1;
      }
      if (gt.yuyueTypeIndex != 9999) {
        data.is_yuyue = gt.yuyueTypeIndex;
      }
      if (gt.deliverTypeIndex != 9999) {
        data.deliver_type = gt.deliverTypeIndex + 1;
      }
      gt.gtRequest.post(url, data).then(function (res) {
        console.log(res);
        if (gt.page == 1) {
          gt.dataList = [];
        }
        gt.dataList = gt.dataList.concat(res.list);
        gt.refreshStatus = false;
        if (res.list.length == gt.size) {
          gt.page = gt.page + 1;
        } else {
          gt.end = true;
        }
      });
    },
    loadMore: function loadMore() {
      console.log('loadMore');
      var gt = this;
      gt.getOrderList();
    },
    goOrderInfo: function goOrderInfo(item) {
      var gt = this;
      uni.navigateTo({
        url: './orderInfo?orderSn=' + item.deliver_sn
      });
    },
    addMoney: function addMoney(item) {
      uni.navigateTo({
        url: '/subSansong/pages/sansong/addMoney?orderSn=' + item.deliver_sn
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
        url: '/subSansong/pages/sansong/loadSend?orderSn=' + item.deliver_sn
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
        url: '/subSansong/pages/sansong/sign?orderSn=' + item.deliver_sn
      });
      return false;
    },
    uploadReceipt: function uploadReceipt(item) {
      uni.navigateTo({
        url: '/subSansong/pages/sansong/receipt?orderSn=' + item.deliver_sn
      });
      return false;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 221:
/*!**********************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=style&index=0&lang=scss& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./search.vue?vue&type=style&index=0&lang=scss& */ 222);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_search_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 222:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/order/search.vue?vue&type=style&index=0&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[215,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/search.js.map