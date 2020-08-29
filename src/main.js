import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './styles/base.less'
import './styles/iconfont.css'
import newsheader from './components/newsheader.vue'
import newslogo from './components/newslogo.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import newsnav from './components/newsnav.vue'
import moment from 'moment'
// 引入axios,并挂载到Vue原型上
import axios from 'axios'
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL基准地址
axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vant)

// 定义全局过滤器moment
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
// 控制台提示消息
Vue.config.productionTip = false

Vue.component('news-header', newsheader)
Vue.component('news-logo', newslogo)
Vue.component('news-nav', newsnav)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
