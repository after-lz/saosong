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
