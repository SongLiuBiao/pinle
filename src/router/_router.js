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

const _import = require('./_import');
import Layout from '@/page/index/'
export default [{
  path: '/',
  name: '主页',
  redirect: '/wel'
}, {
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
      path: 'index',
      name: '首页',
      component: _import('wel')
    },
    {
      path: '/moment/schemedetails',
      name: '方案详情',
      component: () => import("../views/moment/schemeDetails")

    },
    {
      path: '/moment/userdetails',
      name: '用户详情',
      component: () => import("../views/moment/userDetails")

    },
    {
      path: '/moment/lotterydetails',
      name: "彩种详情",
      component: () => import("../views/moment/lotteryDetails")

    },
    {
      path: '/moment/issuedetails',
      name: "奖期详情",
      component: () => import("../views/moment/issueDetails")

    },
    {
      path: '/moment/loglist',
      name: "日志列表",
      component: () => import("../views/moment/loglist")
    },

    {
      path: '/moment/userFund',
      name: '用户取款审核',
      component: () => import("../views/moment/userFund")
    },
    {
      path: '/moment/turnoverdetail',
      name: '进出明细',
      component: () => import("../views/moment/turnoverDetail")
    }

  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}, {
  path: '/login',
  name: '登录页',
  component: _import('login/index')
}, {
  path: '/lock',
  name: '锁屏页',
  component: _import('lock/index')
}, {
  path: '/crud',
  component: Layout,
  redirect: '/crud/index',
  children: [{
    path: 'index',
    name: 'crud实例',
    component: _import('crud/index', 'views')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '修改信息',
    component: _import('admin/user/info', 'views')
  }]
}, {
  path: '/404',
  component: _import('error-page/404', 'components'),
  name: '404'
}, {
  path: '/403',
  component: _import('error-page/403', 'components'),
  name: '403'
}, {
  path: '/500',
  component: _import('error-page/500', 'components'),
  name: '500'
}, {
  path: '/myiframe',
  component: Layout,
  redirect: '/myiframe',
  meta: {
    keepAlive: true
  },
  children: [{
    path: ':routerPath',
    name: 'iframe',
    component: _import('iframe/main', 'components'),
    props: true
  }]
}]
