import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant组件库和css样式
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 自动设置rem基准值（html标签字体大小）
import 'amfe-flexible'

// rem适配将px单位自动转换为rem单位，行内样式没有转换
import 'postcss-pxtorem'

// 全局注册Vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
