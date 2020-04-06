const path = require('path')
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// VueLoader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// CopyWebpackPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpack = require('webpack')

// 使用配置 指定入口和出口;
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      // webpack只理解JavaScript文件
      {
        test: /\.css$/, // webpack在读取loader时 从右到左以管道的方式链式调用
        use: ['style-loader', 'css-loader'] // css-loader解析css文件 style-loader将解析后的结果 放到html中 使其生效
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
        // 通过less-loader转化为css文件 ---> css-loader再处理less-loader转化为的css文件 --> 然后style-loader将解析后的结果 放到html中
      },
      {
        // 处理图片 url路径形式引入的图片 *** url-loader封装了file-loader 具有比file-loader更高级的功能 ***
        test: /\.(png|jgp|gif)$/,
        use: [
          {
            loader: 'url-loader', // 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。
            options: {
              // limit表示如果图片大于 5kb 就以路径形式 (开发环境 把图片也放进了内存 localhost:8080/xxxxx.png展示 所以默认 使用file-loader采用了hash算法处理生成唯一标识 避免图片重名)
              // 否则就用base64编码 缺点: 占用空间 比原图片多30%空间 优点: 少发一次图片资源请求 所以图片小的话就是 base64编码
              limit: 2 * 1024, // 建议5kb为边界
              // 执行 npm run build默认打包出来的资源文件缺点: 1、打包在了项目根目录中 2、文件名字是哈希值
              outputPath: 'img', // 解决打包目录: 参考vue-cli打包出来的目录
              name: '[name]-[hash:5].[ext]' // 解决打包之后的文件名全部是hash值
              /*
							name: 保留原来的文件名字
							hash：使用hash算法生成5位hash值
							ext: 保留原来的后缀名字
							-: name与hash中间用短 - 线间隔开
							*/
            }
          }
        ]
      },
      {
        // 处理字体图标
        test: /\.(woff|woff2|ttf|svg|eot)$/,
        use: [
          {
            loader: 'file-loader', // 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。
            options: {
              outputPath: 'fonts',
              name: '[name]-[hash:5].[ext]'
            }
          }
        ]
      }, // 处理单文件组件
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
          // options: { // 把babel的配置放到单独的配置文件中
          //   presets: ['@babel/preset-env'],
          //   plugins: [
          //     '@babel/plugin-proposal-class-properties',
          //     '@babel/plugin-transform-runtime'
          //   ]
          // }
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        // 处理html，支持直接在html中使用img标签加载图片
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      }
      // {
      //   /*expose-loader的使用
      // 	require.resolve() 用来获取模块的绝对路径 将jquery用$符号挂载到全局window对象上;
      // 	这样每个模块的闭包空间都能使用到$了。
      // 	*/
      //   test: require.resolve('jquery'),
      //   use: {
      //     loader: 'expose-loader',
      //     options: '$',
      //   },
      // },
    ]
  },
  plugins: [
    // 这个插件默认生成一个全新html文件(在内存中存在 或者执行npm run build  就是打包之后的index.html文件)，public/index/html文件是一个会被html-webpack-plugin 处理的模板(Vue-cli内容)
    // https://www.webpackjs.com/guides/output-management/#%E8%AE%BE%E5%AE%9A-htmlwebpackplugin webpack该插件详细解释
    new HtmlWebpackPlugin({
      // 现在用户打开浏览器默认访问的就是这个html文件,而且自动的引入了打包好的js文件
      title: 'webpack',
      filename: 'index.html',
      template: './public/index.html'
    }),
    new VueLoaderPlugin(),
    // 该插件的作用是拷贝目录到指定目录
    new CopyWebpackPlugin([
      // 把public下面的assets图片资源 拷贝到打包后dist下assets目录 (html文件中引入的资源默认不会经过webpack打包处理)
      // 对于视频和音频资源 如果不使用对应的loader 可以使用这个插件拷贝到dist目录下
      { from: path.resolve(__dirname, '../public/assets'), to: 'assets' }
    ]), // 将库自动加载到每个模块
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jQuerytest: 'jquery'
    })
  ]
}
