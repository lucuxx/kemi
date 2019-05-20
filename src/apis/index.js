import Vue from "vue"

var apis={
    signin:"/signin",
    id:"/system/permission/findPermissionById", //get

}

Vue.prototype.$apis=apis;

export default apis;