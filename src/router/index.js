import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/user.vue'
import Edit from '../views/Edit.vue'
import Attention from '../views/Attention.vue'
import Comment from '../views/Comment.vue'
import Collect from '../views/Collect.vue'
import Index from '../views/index/index.vue'
import Tablist from '../views/index/tablist.vue'
import News from '../views/index/news.vue'
import Search from '../views/index/search.vue'
Vue.use(VueRouter)

// 因为重复调用login导致页面报错,手动添加catch方法覆盖原先的路由的push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/attention', component: Attention, name: 'attention' },
  { path: '/comment', component: Comment, name: 'comment' },
  { path: '/collect', component: Collect, name: 'collect' },
  { path: '/', component: Index, name: 'index' },
  { path: '/tablist', component: Tablist, name: 'tablist' },
  { path: '/news/:id', component: News, name: 'news' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
})

const token = localStorage.getItem('token')
router.beforeEach(function (to, from, next) {
  const authUrls = ['user', 'edit', 'attention', 'comment', 'collect']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
