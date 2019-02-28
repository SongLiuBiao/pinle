/*
 *    Copyright (c) 2018-2025, songfayuan All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the 霖梓控股 developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: songfayuan (1414798079@qq.com)
 */

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/user/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}
/**
 *     用户管理
 *         用户列表
 **/
export function apiGetListConsumer(query) {
  return request({
    url: '/admin/consumer/listConsumer',
    method: 'post',
    data: query
  })
}
/**
 *     用户管理
 *         用户导出
 **/
export function apiExportConsumer(query) {
  return request({
    url: '/admin/export/consumer',
    method: 'post',
    data: query,
    responseType: 'blob'
  })
}
/**
 *     用户管理
 *         用户详情
 **/
export function apiGetConsumerInfo(query) {
  return request({
    url: '/admin/consumer/getConsumerInfo',
    method: 'post',
    data: query
  })
}
/**
 *     用户管理
 *         用户详情-历史信息变动
 **/
export function apiGetConsumerChangeInfo(query) {
  return request({
    url: '/admin/consumer/consumerChangeInfo',
    method: 'post',
    data: query
  })
}
/**
 *     用户管理
 *         用户详情-设置密码
 **/
export function apiConsumerChangePassword(query) {
  return request({
    url: '/admin/consumer/consumerChangePassword',
    method: 'post',
    data: query
  })
}
/**
 *     用户管理
 *         修改用户
 **/
export function apiUpdateConsumerInfo(query) {
  return request({
    url: '/admin/consumer/updateConsumerInfo',
    method: 'post',
    data: query
  })
}
/**
 *     用户管理
 *         银行列表
 **/
export function apiGetBankList(query) {
  return request({
    url: '/admin/consumer/getBankList',
    method: 'post',
    data: query
  })
}

/**
 *     用户管理
 *         发送短信
 **/
export function apiSendMessage(query) {
  return request({
    url: '/admin/consumer/sendMessage',
    method: 'post',
    data: query
  })
}

/**
 *     用户管理
 *         用户账号充值
 **/
export function apiCapitalRecharge(query) {
  return request({
    url: '/admin/capital/capitalRecharge ',
    method: 'post',
    data: query
  })
}
