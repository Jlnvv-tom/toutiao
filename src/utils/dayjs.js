import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器，就可以在任何组件模板中使用了
// 过滤器：一个可以在模板中调用的函数，在组件的模板中使用 过滤器
// 过滤器使用：{{ xx | relaltiveTime }}
// xx 会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中

Vue.filter('relativeTime', value => {
//   console.log(value)
  return dayjs(value).from(dayjs())
})

// 日期时间格式化
// 打印当前时间
// console.log(dayjs().format('YYYY^MM-DD HH:mm:ss'))

// 打印改时间到当前时间的距离
// console.log(dayjs('2020-05-13 15:38:12').from(dayjs()))
