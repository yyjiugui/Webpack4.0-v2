/*
什么是babel Babel 是一个 JavaScript 编译器。
可以使用下一代语法编程
*/

// babel转换箭头函数和class类  使用babel的预设 @babel/preset-env
setTimeout(function() {
  console.log('没用箭头函数')
}, 1000)
// 执行npm run build 查看dist打包后的代码 发现webpack没有帮我们转换把 箭头函数转化为普通函数
setTimeout(() => {
  console.log('箭头函数')
}, 100)
// 执行npm run build 发现webpack没有帮我们把Person类转换为Person构造函数
class Person {
  static gender = '男'
  constructor(name) {
    this.name = name
  }
}

/*
使用babel来帮webpack
为什么需要babel 有些老版本浏览器不认识 es的高级语法 例如: 箭头函数 Promise(大部分浏览器支持了)
配置好babel-loader后发现代码全部转化为了浏览器能运行的语法 箭头函数转化为了普通function了

 {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
*/

// 使用babel转化更高级的语法(Generator) 使用插件 plugins: ['@babel/plugin-proposal-class-properties']
// class的static关键字
// 浏览器本身支持的Generator 经过babel转化为 该方法返回了一个函数调用 regeneratorRuntime.wrap(function funGenerator$(_context) {})
// 默认会报错 因为内部没有实现 regeneratorRuntime 使用插件 plugin-transform-runtime
function* funGenerator() {
  yield 1
  yield 2
  return 3
}

const iterator = funGenerator()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 处理js文件之高版本的原型方法转义 例如: includes() forEach()
import '@babel/polyfill'
const str = '123'
str.includes('1')

const arr = [1, 2, 3, 4, 5]
arr.forEach(item => {
  console.log(item)
})

// @babel/polyfill
