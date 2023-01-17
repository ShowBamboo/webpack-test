"use strict";
const path = require("path");
const webpackBase = require('./webpack.base.config.js');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = webpackMerge(webpackBase, {
  // production:生产模式，打包比较慢，会开启 tree-shaking 和 压缩代码;
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(), // 在打包输出前清空文件夹
    new webpack.optimize.SplitChunksPlugin({
      chunks: "async", // 只提取异步加载的模块出来打包到一个文件中
      minSize: 20000, // 生成 chunk 的最小体积（≈ 20kb)，大于才会被提取
      minChunks: 2, // 拆分前必须共享模块的最小被引用次数。 只要使用两次就提取出来
      maxAsyncRequests: 5, // 最大的按需 (异步) 加载次数，默认为 6；
      maxInitialRequests: 3, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）默认为 4。
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    })
  ]
})