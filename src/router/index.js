import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Home.vue'
import ProductMultiple from '../components/ProductMultiple.vue'
import ProductSingle from '../components/ProductSingle.vue'
import FlyCart from '../components/SOTFlyCart.vue'
import About from '../components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '',
        name: 'Login',
        component: Login
      },
      {
        path: '/store/:category',
        name: 'ProductMultiple',
        props: true,
        component: ProductMultiple
      },
      {
        path: '/product/:product',
        name: 'ProductSingle',
        props: true,
        component: ProductSingle,
      },
      {
        path: '/cart',
        name: 'FlyCart',
        component: FlyCart,
      },
      {
          path: '/about',
          name: 'About',
          component: About,
      },
      { path: '*',
        component: { template: '<h1>Page is not Found!</h1>'}
      },

  ]
})