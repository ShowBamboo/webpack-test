"use strict";

const webpackMerge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config')


module.exports = webpackMerge(baseConfig, {
  // development:开发模式，打包更加快速，省了代码优化步骤
  mode: 'development',
  // 利用 gzips 压缩 public/ (默认是) 目录当中的所有内容并提供一个本地服务 (serve)
  devServer: {
    // 提供静态文件的选项
    static: {
      directory: path.resolve(__dirname, '../src'),
    },
    compress: true,  //启用 gzip 压缩
    port: 9000,  // 端口号
    open: true, // 自动打开浏览器
    hot: true, //热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  }
})
