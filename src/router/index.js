import Vue from 'vue'
import Router from 'vue-router'
import Goods from './../views/Goods'
import UserRegister from './../views/UserRegister'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart'
import Address from './../views/Address'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/UserRegister',
      name: 'UserRegister',
      component: UserRegister
    },
     {
      path: '/GoodsList',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    }

  ]
})
