import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/user.vue'
import Edit from '../views/Edit.vue'
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
  { path: '/edit', component: Edit, name: 'edit' }
]

const router = new VueRouter({
  routes
})

const token = localStorage.getItem('token')
router.beforeEach(function (to, from, next) {
  const authUrls = ['user', 'edit']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})
export default router
