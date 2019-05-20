import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:  () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component:  () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
      children:[
        {path:"jueseguanli",
        name:"jueseguanli",
        component: () => import(/* webpackChunkName: "jueseguanli" */ '@/components/jueseguanli'),
      }
      ]
    },
   
  ]
})
