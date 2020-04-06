import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Default from '../../src/layout/Default.vue'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'

export default new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    {
      path: '',
      component: Default,
      name: 'Default',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/product',
          name: '产品列表',
          component: Product
        }
      ],
      redirect: '/home'
    }
  ]
})
