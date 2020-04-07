// 从零构建vue-cli工程项目
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/font/iconfont.css'
import './styles/index.less'
import './assets/index.json'
import './testbabel/index.js'

// 定义环境变量区分开发环境和生产环境
console.log(process.env)
console.log(testenv)

/*
	测试production模式打包自带优化
*/
// 一、 tree-shaking
import { addTestMath } from './util/tree-shaking'
// console.log(addTestMath(10, 5))

const module = require('./util/tree-shaking')
// console.log(module.addTestMath(10, 5))

// 二、scope hoisting
import { scope } from './util/scope-hoisting'
console.log(scope(1, 2, 3))
// 通过npm run build 打包后查看结果: --> console.log(1+2+3)
// 作用: 相当于代码预执行了, 不会创建不必要的变量,而是直接把变量里面的值取出来进行运算，直接消费运算出来的结果。

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
