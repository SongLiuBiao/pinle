/*
 *    Copyright (c) 2018-2025, songfayuan All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
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

// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var baseUrl = 'http://pltest.hzlinxi.com'
// var baseUrl = 'http://172.16.158.149:9999';
// var baseUrl = 'http://10.0.0.65:9999';
// var url = 'http://10.0.0.180:4000'
// var url = 'http://10.0.0.223:4000'
// var url = 'http://10.0.1.172:4000'


module.exports = {
  build: {
    prodEnv: require('./prod.env'),
    testEnv: require('./test.env'),
    index: path.resolve(__dirname, '../dist/pladmin/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/pladmin/'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/pladmin/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8000,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    host: 'localhost',
    assetsPublicPath: '/',
    proxyTable: {
      '/auth': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/daemon': {
        target: baseUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/daemon': '/daemon'
        }
      },
     
      
    },
    cssSourceMap: false
  }
}
