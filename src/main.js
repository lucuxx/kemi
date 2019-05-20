import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./utils/myaxios"    //引入myaxios
import "./apis"  //引入apis

Vue.config.productionTip = false

// reset-css 引入使用
import "reset-css"

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 设置全局路由守卫

router.beforeEach((to,from,next)=>{
  if(to.path==="/login"){
    next();
  }else{
    var token = localStorage.getItem("token");
    if(token){
      next();
    }else{
      next({path:"/login",query:{redirect:to.path}})
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
