import request from '@/router/axios'

/**
 *     系统管理
 *         App版本参数列表
 **/
export function apiUpdateAdminPassWord(query) {
  return request({
    url: '/admin/user/updatePassword',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         App版本参数列表
 **/
export function apiListApp(query) {
  return request({
    url: '/admin/appUpgrade/list',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         App版本编辑获取数据
 **/
export function apiGetApp(query) {
  return request({
    url: '/admin/appUpgrade/getById',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         App版本新增
 **/
export function apiAddApp(query) {
  return request({
    url: '/admin/appUpgrade/save',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         App版本修改
 **/
export function apiUpdateApp(query) {
  return request({
    url: '/admin/appUpgrade/update',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         任务信息列表
 **/
export function apiGetScheduleList(query) {
  return request({
    url: '/daemon/sys/schedule/list',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         新增任务
 **/
export function apiAddSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/save',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         修改任务
 **/
export function apiUpdateSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/update',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         定时任务信息
 **/
export function apiGetScheduleInfo(query) {
  return request({
    url: `/daemon/sys/schedule/info/${query}`,
    method: 'post',
    data: {}
  })
}

/**
 *     系统管理
 *         定时任务信息错误列表
 **/
export function apiGetScheduleLogList(query) {
  return request({
    url: '/daemon/sys/scheduleLog/list',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         运行任务
 **/
export function apiRunSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/run',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         恢复定时任务
 **/
export function apiResumeSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/resume',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         暂停定时任务
 **/
export function apiPauseSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/pause',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         暂停定时任务
 **/
export function apiDeleteSchedule(query) {
  return request({
    url: '/daemon/sys/schedule/delete',
    method: 'post',
    data: query
  })
}

/**
 *     系统管理
 *         配置管理
 **/
export function apiGetListResource(query) {
  return request({
    url: '/admin/resource/listResource',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         新增配置
 **/
export function apiAddResource(query) {
  return request({
    url: '/admin/resource/saveResource',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         修改配置
 **/
export function apiUpdateResource(query) {
  return request({
    url: '/admin/resource/updateResource',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         删除配置
 **/
export function apiDeleteResource(query) {
  return request({
    url: '/admin/resource/deleteResource',
    method: 'post',
    data: query
  })
}
/**
 *     系统管理
 *         修改查询配置
 **/
export function apiQueryResourceById(query) {
  return request({
    url: '/admin/resource/queryResourceById',
    method: 'post',
    data: query
  })
}
