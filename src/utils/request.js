/**
 * 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi/research.itcas.cn' // 基础路径
})

// 请求拦截器

// 响应拦截器

// 出口
export default request
