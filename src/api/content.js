import request from '@/router/axios'
/**
 * 内容管理
 *     文件上传
 **/
export function apiUploadImage(query) {
  return request({
    url: '/admin/uploadImage',
    method: 'post',
    data: query
  })
}
/**
 * 资讯列表
 *    列表数据
 **/
export function apiGetListMessage(query) {
  return request({
    url: '/admin/content/listContent',
    method: 'post',
    data: query
  })
}
/**
 * 资讯列表
 *    新增资讯
 **/
export function apiAddMessage(query) {
  return request({
    url: '/admin/content/saveContent',
    method: 'post',
    data: query
  })
}
/**
 * 资讯列表
 *     资讯编辑查询
 **/
export function apiGetMessage(query) {
  return request({
    url: '/admin/content/queryContentById',
    method: 'post',
    data: query
  })
}
/**
 * 资讯列表
 *     资讯编辑查询
 **/
export function apiUpdateMessage(query) {
  return request({
    url: '/admin/content/updateContent',
    method: 'post',
    data: query
  })
}
/**
 * 资讯列表
 *     资讯删除
 **/
export function apiDeleteMessage(query) {
  return request({
    url: '/admin/content/deleteContent',
    method: 'post',
    data: query
  })
}
/**
 * 首页配置
 *    配置列表
 **/
export function apiGetHomeList(query) {
  return request({
    url: '/admin/resource/listHomePage',
    method: 'post',
    data: query
  })
}
/**
 * 首页配置
 *    配置禁用
 **/
export function apiDeleteHomePage(query) {
  return request({
    url: '/admin/resource/deleteHomePage',
    method: 'post',
    data: query
  })
}
/**
 * 首页配置
 *    配置新增
 **/
export function apiAddHomePage(query) {
  return request({
    url: '/admin/resource/saveHomePage',
    method: 'post',
    data: query
  })
}
/**
 * 首页配置
 *    配置编辑查询
 **/
export function apiGetHomePage(query) {
  return request({
    url: '/admin/resource/queryHomePageById',
    method: 'post',
    data: query
  })
}
/**
 * 首页配置
 *    配置编辑修改
 **/
export function apiUpdateHomePage(query) {
  return request({
    url: '/admin/resource/updateHomePage',
    method: 'post',
    data: query
  })
}

