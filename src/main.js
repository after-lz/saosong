import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* 控制台提示消息 */

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
