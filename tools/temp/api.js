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

const path = '{{path}}';
export function getList(query) {
  return request({
    url: `${path}/page`,
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: `${path}`,
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: `${path}/${id}`,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: `${path}`,
    method: 'put',
    data: obj
  })
}
