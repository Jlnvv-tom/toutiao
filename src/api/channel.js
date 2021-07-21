/**
 * 获取所有频道列表的请求模块
 */

import request from '@/utils/request'

// 获取文章列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
