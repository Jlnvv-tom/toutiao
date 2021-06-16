import Vue from 'vue'
import Vuex from 'vuex'
// 引入封装的storage 模块，注释了下面的
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
    // 当前登录用户的登录状态（token等数据）
    // user: JSON.parse(window.localStorage.getItem('user'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新数据丢失，要把数据放到本地存储
      // 这里只是为了持久化数据
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
