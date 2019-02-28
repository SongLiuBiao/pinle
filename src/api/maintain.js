import request from '@/router/axios'
/**
 *     维护管理
 *         用户留言列表
 **/
export function apiGetListComment(query) {
  return request({
    url: '/admin/consumer/listUserFeedback',
    method: 'post',
    data: query
  })
}
/**
 *     维护管理
 *         用户留言删除
 **/
export function apiDeleteComment(query) {
  return request({
    url: '/admin/consumer/deleteUserFeedback',
    method: 'post',
    data: query
  })
}
