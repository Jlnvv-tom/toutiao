/**
 * 请求模块
 */
import axios from 'axios'

// 在非组件模块中获取store必须通过这种方式

// 这，和在组件中this.$store 是一样的，加载方式区别
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi/research.itcas.cn' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log(config)
  const { user } = store.state
  // 如果用户登录，统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

// 出口
export default request
