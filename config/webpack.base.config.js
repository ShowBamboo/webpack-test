"use strict";

const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 引入分析打包结果插件



module.exports = {
  // 单入口
  entry: path.resolve(__dirname, '../src/index.js'),
  // // 多入口
  // entry: {
  //     app: path.resolve(__dirname,'../src/index.js'),  
  //     font: path.resolve(__dirname,'../src/font.js'), 
  // },
  output: {
    path: path.resolve(__dirname, '../dist'),   // 打包后的目录
    filename: "[name].[hash:8].js",  // 打包后的文件名称   哈希值，避免打包后的文件名重复，缓存
  },
  // resolve: {
  //     extensions: ['.js', '.jsx', '.json', ".ts", ".tsx"]
  // },
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          // 'style-loader',  //style-loader 将处理好的 css 通过 style 标签的形式添加到页面上
          MiniCssExtractPlugin.loader,  //分离样式文件 通过 CSS 文件的形式引入到页面上
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true // 启用缓存
            }
          },
        ],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src'),
      },
      // {
      //   test: /\.html$/i,  //https://webpack.docschina.org/loaders/html-loader/
      //   loader: "html-loader",
      // },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            name: '[name].[hash:4].[ext]',
            limit: 86400,
            outputPath: 'static/img',
            esModule: false
          }
        }],
        type: 'javascript/auto' //https://webpack.docschina.org/guides/asset-modules/
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 添加插件
      filename: '[name].[hash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    //打包后的资源文件，可以自动引入到html中，
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, ('../src/index.html'))
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    })
  ]
}
