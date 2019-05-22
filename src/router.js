import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/home"},
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
        {path:"RoleManage",
        name:"角色管理",
        component: () => import(/* webpackChunkName: "RoleManage" */ '@/components/RoleManage'),
      },
      {path:"PermissionManage",
      name:"权限管理",
      component: () => import(/* webpackChunkName: "PermissionManage" */ '@/components/PermissionManage'),
      },
      {path:"accountManager",
      name:"用户管理",
      component: () => import(/* webpackChunkName: "accountManager" */ '@/components/accountManager'),
      },
      {path:"LotteryManage",
      name:"彩票列表",
      component: () => import(/* webpackChunkName: "LotteryManage" */ '@/components/LotteryManage'),
      }
      ]
    },
   
  ]
})
