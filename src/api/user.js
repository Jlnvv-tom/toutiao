// 用户相关请求模块
import request from '@/utils/request'

// 在非组件模块中获取store必须通过这种方式

// 这，和在组件中this.$store 是一样的，加载方式区别
// import store from '@/store/'

/**
 * 登录注册
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user'
    // 使用request.js里面的axios请求拦截器，注释这里
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: 'app/v1_0/user/channels'
  })
}
