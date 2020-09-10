import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './styles/base.less'
import './styles/iconfont.css'
import newsheader from './components/newsheader.vue'
import newslogo from './components/newslogo.vue'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import newsnav from './components/newsnav.vue'
import moment from 'moment'
import newspost from './components/newspost.vue'
import newscomment from './components/newscomment.vue'
import floor from './components/floor.vue'
// 引入axios,并挂载到Vue原型上
import axios from 'axios'
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL基准地址
const URL = axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return URL + url
  }
}

Vue.use(Vant)

//  moment插件修改语言
moment.locale('zh-CN')
// 定义全局过滤器moment
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('now', input => {
  return moment(input).fromNow()
})

// 给axios配置拦截器
axios.interceptors.request.use(function (config) {
  // config指的是请求的配置信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail('用户验证失败')
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userid')
  }
  return response
})

// 控制台提示消息
Vue.config.productionTip = false

Vue.component('news-header', newsheader)
Vue.component('news-logo', newslogo)
Vue.component('news-nav', newsnav)
Vue.component('news-post', newspost)
Vue.component('news-comment', newscomment)
Vue.component('news-floor', floor)
const bus = new Vue()
Vue.prototype.$bus = bus
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
