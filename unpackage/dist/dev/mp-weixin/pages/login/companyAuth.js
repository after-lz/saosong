(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/login/companyAuth"],{

/***/ 139:
/*!************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/main.js?{"page":"pages%2Flogin%2FcompanyAuth"} ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _companyAuth = _interopRequireDefault(__webpack_require__(/*! ./pages/login/companyAuth.vue */ 140));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_companyAuth.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 140:
/*!*****************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./companyAuth.vue?vue&type=template&id=1a41fb76& */ 141);
/* harmony import */ var _companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./companyAuth.vue?vue&type=script&lang=js& */ 143);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./companyAuth.vue?vue&type=style&index=0&lang=scss& */ 145);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs





/* normalize component */

var component = Object(_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["render"],
  _companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/login/companyAuth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 141:
/*!************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=template&id=1a41fb76& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./companyAuth.vue?vue&type=template&id=1a41fb76& */ 142);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_template_id_1a41fb76___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 142:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=template&id=1a41fb76& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
    uUpload: function () {
      return Promise.all(/*! import() | static/uview/components/u-upload/u-upload */[__webpack_require__.e("common/vendor"), __webpack_require__.e("static/uview/components/u-upload/u-upload")]).then(__webpack_require__.bind(null, /*! @/static/uview/components/u-upload/u-upload.vue */ 657))
    },
    uInput: function () {
      return Promise.all(/*! import() | static/uview/components/u-input/u-input */[__webpack_require__.e("common/vendor"), __webpack_require__.e("static/uview/components/u-input/u-input")]).then(__webpack_require__.bind(null, /*! @/static/uview/components/u-input/u-input.vue */ 572))
    },
    uLine: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-line/u-line */ "static/uview/components/u-line/u-line").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-line/u-line.vue */ 629))
    },
    uIcon: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-icon/u-icon */ "static/uview/components/u-icon/u-icon").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-icon/u-icon.vue */ 565))
    },
    uSelect: function () {
      return __webpack_require__.e(/*! import() | static/uview/components/u-select/u-select */ "static/uview/components/u-select/u-select").then(__webpack_require__.bind(null, /*! @/static/uview/components/u-select/u-select.vue */ 615))
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
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      return _vm.$u.throttle(_vm.submitForm, 1000)
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 143:
/*!******************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./companyAuth.vue?vue&type=script&lang=js& */ 144);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 144:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _default = {
  data: function data() {
    return {
      checkStatus: -1,
      checkRemark: '',
      fileList: [],
      imgPath: '',
      licenceSn: '',
      inchargeName: '',
      name: '',
      contact: '',
      mobile: '',
      address: '',
      lng: '',
      lat: '',
      provinceCityAreaList: [],
      pca: '',
      areaShow: false,
      provinceIndex: 0,
      cityIndex: 0,
      areaIndex: 0,
      provinceStr: '',
      provinceCode: '',
      cityStr: '',
      cityCode: '',
      areaStr: '',
      areaCode: ''
    };
  },
  onLoad: function onLoad() {
    var gt = this;
    var list = uni.getStorageSync('pcaList');
    gt.provinceCityAreaList = list;
    gt.getAuthInfo();
  },
  onShow: function onShow() {
    var gt = this;
  },
  methods: {
    getAuthInfo: function getAuthInfo() {
      var gt = this;
      var url = "/logistics/company/get_company_approve_info";
      gt.gtRequest.post(url).then(function (res) {
        console.log(res);
        if (res.company_approve_info.status !== undefined) {
          // console.log(res.company_approve_info.status);
          gt.checkStatus = res.company_approve_info.status;
          gt.checkRemark = res.company_approve_info.audit_remark;
          gt.fileList = [{
            url: res.company_approve_info.license_pic
          }];
          gt.imgPath = res.company_approve_info.license_pic;
          gt.name = res.company_approve_info.company_name;
          gt.contact = res.company_approve_info.contact;
          gt.mobile = res.company_approve_info.mobile;
          gt.address = res.company_approve_info.address;
          gt.lng = res.company_approve_info.longitude;
          gt.lat = res.company_approve_info.latitude;
          gt.pca = res.company_approve_info.province + '-' + res.company_approve_info.city + '-' + res.company_approve_info.county;
        }
      });
    },
    previewImg: function previewImg(url) {
      uni.previewImage({
        urls: [url]
      });
    },
    chooseImg: function chooseImg(item) {
      console.log(item);
      var gt = this;
      var file = item.fileInfo;
      gt.gtRequest.upload(file).then(function (res) {
        console.log(res);
        if (res.src) {
          gt.imgPath = res.src;
          gt.licenceOcr(res.src);
        } else {
          gt.removeImg();
        }
      }).catch(function (res) {
        console.log(res);
        gt.$refs.uUpload.remove(0);
        gt.$refs.uToast.show({
          title: res,
          type: 'error'
        });
        return false;
      });
    },
    licenceOcr: function licenceOcr(path) {
      var gt = this;
      var url = "/logistics/company/identify_business_license";
      var data = {
        license_pic: path
      };
      gt.gtRequest.post(url, data).then(function (res) {
        console.log(res);
        gt.name = res.license_info.company_name;
        gt.licenceSn = res.license_info.license_no;
        gt.inchargeName = res.license_info.legal_truename;
        gt.contact = res.license_info.legal_truename;
      });
    },
    removeImg: function removeImg() {
      console.log('removeImg');
      var gt = this;
      gt.imgPath = '';
      gt.fileList = [];
    },
    chooseLocation: function chooseLocation() {
      console.log('chooseLocation');
      var gt = this;
      if (gt.checkStatus != -1) {
        uni.openLocation({
          latitude: Number(gt.lat),
          longitude: Number(gt.lng),
          complete: function complete(res) {
            console.log(res);
          }
        });
      } else {
        uni.chooseLocation({
          success: function success(res) {
            console.log(res);
            if (res.errMsg == 'chooseLocation:ok') {
              gt.address = res.address;
              gt.lng = res.longitude;
              gt.lat = res.latitude;
            }
          }
        });
      }
    },
    showPCA: function showPCA() {
      var gt = this;
      if (gt.checkStatus != -1) {
        return false;
      }
      gt.areaShow = true;
    },
    confirmArea: function confirmArea(e) {
      // console.log(e);
      var gt = this;
      gt.provinceStr = e[0].label;
      gt.provinceCode = e[0].value;
      gt.cityStr = e[1].label;
      gt.cityCode = e[1].value;
      gt.areaStr = e[2].label;
      gt.areaCode = e[2].value;
      gt.pca = e[0].label + '-' + e[1].label + '-' + e[2].label;
      var provinceList = gt.provinceCityAreaList;
      for (var i = 0; i < provinceList.length; i++) {
        // console.log(i);
        if (provinceList[i].city_code == e[0].value) {
          var cityList = provinceList[i].children;
          // console.log(i);
          gt.provinceIndex = i;
          break;
        }
      }
      // console.log(cityList);
      for (var j = 0; j < cityList.length; j++) {
        if (cityList[j].city_code == e[1].value) {
          var areaList = cityList[j].children;
          gt.cityIndex = j;
          break;
        }
      }
      for (var m = 0; m < areaList.length; m++) {
        // console.log(m);
        if (areaList[m].city_code == e[2].value) {
          gt.areaIndex = m;
          // console.log(m);
          break;
        }
      }

      // console.log(provinceList);
      // console.log(cityList);
    },
    submitForm: function submitForm() {
      var gt = this;
      if (gt.checkStatus == 2) {
        gt.checkStatus = -1;
        return false;
      }
      if (gt.checkStatus != -1) {
        return false;
      }
      if (gt.$u.test.isEmpty(gt.imgPath)) {
        gt.$refs.uToast.show({
          title: '请上传营业执照',
          type: 'error'
        });
        return false;
      }
      if (gt.$u.test.isEmpty(gt.name)) {
        gt.$refs.uToast.show({
          title: '公司名称不能为空',
          type: 'error'
        });
        return false;
      }
      if (gt.$u.test.isEmpty(gt.contact)) {
        gt.$refs.uToast.show({
          title: '联系人姓名不能为空',
          type: 'error'
        });
        return false;
      }
      if (gt.$u.test.isEmpty(gt.mobile)) {
        gt.$refs.uToast.show({
          title: '联系电话不能为空',
          type: 'error'
        });
        return false;
      }
      if (!gt.$u.test.mobile(gt.mobile)) {
        gt.$refs.uToast.show({
          title: '联系电话格式不正确',
          type: 'error'
        });
        return false;
      }
      if (gt.$u.test.isEmpty(gt.address)) {
        gt.$refs.uToast.show({
          title: '公司地址不能为空',
          type: 'error'
        });
        return false;
      }
      if (gt.$u.test.isEmpty(gt.pca)) {
        gt.$refs.uToast.show({
          title: '所在城市不能为空',
          type: 'error'
        });
        return false;
      }
      var url = "/logistics/company/apply_company_approve";
      var data = {
        license_pic: gt.imgPath,
        company_name: gt.name,
        license_no: gt.licenceSn,
        legal_truename: gt.inchargeName,
        contact: gt.contact,
        mobile: gt.mobile,
        province: gt.provinceStr,
        city: gt.cityStr,
        county: gt.areaStr,
        address: gt.address,
        latitude: gt.lat,
        longitude: gt.lng
      };
      gt.gtRequest.post(url, data).then(function (res) {
        gt.checkStatus = 0;

        // uni.setStorageSync('companyAuth', 1);

        var pages = getCurrentPages();
        var url = pages[0].$page.fullPath;
        gt.$refs.uToast.show({
          title: '申请完成，等待审核',
          type: 'success',
          url: url,
          isTab: true
        });
        return false;
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 145:
/*!***************************************************************************************************!*\
  !*** C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./companyAuth.vue?vue&type=style&index=0&lang=scss& */ 146);
/* harmony import */ var _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_lz_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_lz_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_lz_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_lz_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_lz_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_companyAuth_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 146:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/001/Desktop/20230708/pages/login/companyAuth.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[139,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/companyAuth.js.map