import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa', // 问答子路由
        name: 'qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: 'video', // 视频子路由
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my', // 我的子路由
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
