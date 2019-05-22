import Vue from "vue"

var apis={
    signin:"/signin",
    id:"/system/permission/findPermissionById", //get
    findAllRoles:"/system/role/findAllRoles",  //get 获取所有角色信息
    showAllPermission:"/system/permission/showAllPermission", //get 查询所有权限
    addNewRole:"/system/role/addNewRole", // post 新增角色
    deleteRole:"/system/role/deleteRole",

}

Vue.prototype.$apis=apis;

export default apis;