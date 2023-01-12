import Vue from 'vue'
import VueRouter from 'vue-router'
import userRoute from '@/router/module/user'
import store from '@/store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  ...userRoute,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 判断是否要登录
  if (to.meta.auth) {
    // 判断用户是否登录
    if (store.state.userModule.token) {
      // 这里要判断 token 的有效性
      // 比如有没有过期 需要后台发放 token 的时候 带上 token 的有效期
      // 如果 token 无效 需要请求 token
      next()
    } else {
      router.push({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
