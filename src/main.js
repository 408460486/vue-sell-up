import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import Singleton from './singleton.js'
// import VueRouter from 'vue-router'
// import Goods from './components/goods/goods'
// import Ratings from './components/ratings/ratings'
// import Seller from './components/seller/seller'

import './common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(Singleton, {
  debug: false
})

// Vue.use(VueRouter)
//
// const routes = [{
//     path: '/goods',
//     component: Goods
//   },
//   {
//     path: '/ratings',
//     component: Ratings
//   },
//   {
//     path: '/seller',
//     component: Seller
//   }
// ]
//
// const router = new VueRouter({
//   routes,
//   linkActiveClass: 'active'
// })

new Vue({
  render: h => h(App)
  // router
}).$mount('#app')

// router.push('/goods')
