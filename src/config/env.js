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

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 老项目域名地址
 * khglUrl: 客户管理域名地址
 * dicUrl : 字典服务器地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * welUrl :默认欢迎页
 *
 */


let baseUrl = '';
let iconfontVersion = ['567566_r22zi6t8noas8aor', '599693_0b5sleso3f1j1yvi', '667895_xte3dcfrvbo6r','966097_1vlbmfpeomn','966097_59alo327fu','966097_bv1i6dnt4ur','966097_zt2tbau9iq'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let DEBUG = false;
let routerMode = 'history';
let cancleHTTP = [];//取消请求头设置；
let codeUrl = `/admin/code`
/*
if (process.env.NODE_ENV == 'development') {
  baseUrl = `http://127.0.0.1:9999/`;
} else if (process.env.NODE_ENV == 'production') {
  baseUrl = `http://218.70.11.118`;
}*/

if (process.env.NODE_ENV == 'development') { //生产环境走的地址
  baseUrl = `http://127.0.0.1:9999/`;
  DEBUG = true;
} else if (process.env.NODE_ENV == 'production') {  //测试环境地址
  baseUrl = `https://erpmonitor.sinopec.com/travel-app-web/GetTravelMethod` ;  //测试地址
  DEBUG = false;
} else if (process.env.NODE_ENV == 'testing') {  //测试环境地址
  baseUrl = `http://172.16.158.132:9999/` ;  //测试地址
  DEBUG = false;
}

export {
  DEBUG,
  baseUrl,
  routerMode,
  iconfontUrl,
  iconfontVersion,
  codeUrl,
  cancleHTTP
}
