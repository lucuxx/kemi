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
    navList: [], //获取当前角色的权限(导航)
    navRoles: [], //获取当前的角色类型
    allPermissions:[], //获取所有的权限
    allUser:[], //获取所有的角色
    allAccount:[], //获取所有的用户信息(username,password)
    findAllGames:[], //获取所有的彩种玩法
    // findByGameName:[], //获取所有的彩票信息
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
    },
    allAccount(state){
      return state.allAccount
    },
    findAllGames(state){
      return state.findAllGames;
    },
    // findByGameName(state){
    //   return state.findByGameName;
    // }
   
    
  },
  mutations: {
    ALLUSER(state,payload){
      state.allUser=payload.allRoles
    },
    ALLPERMISSIONS(state,payload){
      state.allPermissions=payload.allPermission;
    },
    ALLACCOUNT(state,payload){
      state.allAccount=payload.allUsers;
    },
    FINDALLGAMES(state,payload){  
      state.findAllGames=payload.data[0].games;
    },
    // FINDBYGAMENAME(state,payload){
    //   state.findByGameName=payload.data;
    // }


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
    },
    allAccount({commit},payload){
      axios.get(apis.findAllUsers)
      .then((resp)=>{
        commit("ALLACCOUNT",resp.data)
      })
    },
    findAllGames({commit},payload){
      axios.get(apis.findAllGames)
      .then((resp)=>{
        commit("FINDALLGAMES",resp.data)
      })
    },
    // findByGameName(context,payload){
    //   axios.get(apis.findByGameName,{params:payload})
    //   .then((resp)=>{
    //     context.commit("FINDBYGAMENAME",resp.data)
    //   })
    // }
  }
})
