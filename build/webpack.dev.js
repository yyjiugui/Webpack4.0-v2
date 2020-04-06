const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack')

// 生产环境配置
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    // 配置文件中配置dev-server
    // contentBase: './public', // 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 public/index.html文件，作为可访问文件。
    // 默认访问public目录下的index.html 使用HtmlWebpackPlugin插件后把index.html文件也放进了内存 所以不需要这个配置了 只为webpack-dev-server学习使用
    hot: true, // 开启 模块热替换
    port: 3000, //指定端口号
    open: true,
    compress: true // 开启zip压缩服务
  },
  devtool: 'inline-source-map',
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      testenv: '"我是开发环境"'
    })
  ]
})
