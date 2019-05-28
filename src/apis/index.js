import Vue from "vue"

var apis={
    signin:"/signin",
    id:"/system/permission/findPermissionById", //get
    findAllRoles:"/system/role/findAllRoles",  //get 获取所有角色信息
    showAllPermission:"/system/permission/showAllPermission", //get 查询所有权限
    addNewRole:"/system/role/addNewRole", // post 新增角色
    deleteRole:"/system/role/deleteRole", //post 删除角色
    findAllUsers:"/system/user/findAllUsers", //get 获取所有用户
    addNewUser:"/system/user/addNewUser", //post 新增用户
    deleteUser:"/system/user/deleteUser", //post 删除用户
    updateUserInfo:"/system/user/updateUserInfo", //post 更新用户
    addNewPersmission:"/system/permission/addNewPersmission", //新增权限
    findAllGames:"/gameManage/games/findAllGames", // get 获取所有的彩种
    findByGameName:"/gameManage/games/findByGameName", //获取相应的彩种信息
    addNewGame:"/gameManage/games/addNewGame", // post增加游戏种类

}

Vue.prototype.$apis=apis;

export default apis;