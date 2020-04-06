// 从零构建vue-cli工程项目
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './styles/index.less'
import './assets/font/iconfont.css'
import './assets/index.json'
import './testbabel/index.js'

// 定义环境变量区分开发环境和生产环境
console.log(process.env)
console.log(testenv)

// import { hotmodule } from './hotmodule'
// console.log(hotmodule)

// 模块热替换: hotmodule文件修改代码 浏览器不刷新, 作用: 实现页面局部更新。
if (module.hot) {
  module.hot.accept('./hotmodule.js', function() {
    console.log('hotmodule模块被更新了')
  })
}

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
