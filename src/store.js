import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import apis from "./apis"  //引入apis

Vue.use(Vuex)

// 用函数对数据进行处理
  const navData = (item) =>{
    var obj ={};
    var length=item.length;
    for(let i=0;i<length;i++){
      var permission=item[i];
      if(!permission.parentid){
        permission.children=[];
        obj[permission._id]=permission;
      }
    }
    for(let i=0;i<length;i++){
      var permission=item[i];
      for(var key in obj){
        if(permission.parentid==key){
          obj[key].children.push(permission)
        }
      }
    }

    var arr=[];
    for(let key in obj){
      arr.push(obj[key])
    }
    return arr;
  }



export default new Vuex.Store({
  state: {
    navList: [], //获取当前用户的权限(导航)
    navRoles: [], //获取当前的用户类型
    allPermissions:[], //获取所有的权限
    allUser:[], //获取所有的用户

  },

  getters:{
    navList(){
      return  navData(JSON.parse(localStorage.getItem("response")).permissions)
  
    },
    navRoles(){
      return  JSON.parse(localStorage.getItem("response")).roles
    },
    allUser(state){
      return state.allUser
    },
    allPermissions(state){
      return navData(state.allPermissions)
    }
   
    
  },
  mutations: {
    ALLUSER(state,payload){
      state.allUser=payload.allRoles
    },
    ALLPERMISSIONS(state,payload){
      state.allPermissions=payload.allPermission;
    }


  },
  actions: {
    allUser(context,payload){
      axios.get(apis.findAllRoles)
      .then((resp)=>{
        context.commit("ALLUSER",resp.data)
      })
    },
    allPermissions(context,payload){
      axios.get(apis.showAllPermission)
        .then((resp)=>{
          context.commit("ALLPERMISSIONS",resp.data)
        })

    }
    

  }
})
