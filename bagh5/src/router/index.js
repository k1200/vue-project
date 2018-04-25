import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Home from '../page/home/home'
import Center from '../page/mycenter/mycenter'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/mycenter',
          component: Center
        }
      ]
    }
  ]
})
