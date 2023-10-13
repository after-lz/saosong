import App from './App'


import uView from "static/uview/index.js";
Vue.use(uView);


import gtCommon from 'common/gtCommon.js';
Vue.prototype.gtCommon = gtCommon;
Vue.prototype.gtLog = gtCommon.gtLog;


import gtRequest from 'common/gtRequest.js';
Vue.prototype.gtRequest = gtRequest;

Vue.prototype.$onLaunched = new Promise(resolve => {
	Vue.prototype.$isResolve = resolve;
});

import gtWSS from 'common/gtWSS.js' //找好自己的路径
Vue.prototype.gtWSS = gtWSS;

if(uni.getSystemInfoSync().platform != 'devtools'){
	// console.log = () =>{};
}

// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
Vue.filter('telHide', (value)=>{
	 if (!value) {
	 	return ''
	 }else{
	 	let data = value.replace(/(\d{3})\d{4}(\d*)/, '$1****$2')
	 	return data
	 }
})

let mpShare = require('static/uview/libs/mixin/mpShare.js');
Vue.mixin(mpShare)



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
