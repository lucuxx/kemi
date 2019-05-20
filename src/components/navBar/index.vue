<template>
  <div class="navBar">
    <!-- <ul v-for="(item,index) in navList" :key="index">
      <li>{{item.permissionDesc}}</li>
    </ul>-->

       <el-col>
          <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="(index+1)+''" v-for="(item,index) in navName" :key="index">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item}}</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="1-1"  @click="pushView(item)">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> 
    </el-menu>
  </el-col>

  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [],
      navName: []
    };
  },
  created() {
    var navlist = JSON.parse(localStorage.getItem("permissions"));
    this.navList = navlist;
    for (let i = 0; i < navlist.length; i++) {
      if (navlist[i].parentid == 0) {
        this.navName.push(navlist[i].permissionDesc);
      }
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    pushView(item){
      this.$router.push({name:"jueseguanli"});
    }
  }
};
</script>

<style lang="scss" scoped>
.navBar {
  height: 100%;
  width: 100%;
}

</style>