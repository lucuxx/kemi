<template>
  <div class="navBar">
    <!-- <ul v-for="(item,index) in navList" :key="index">
      <li>{{item.permissionDesc}}</li>
    </ul>-->

       <el-col>
          <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="key+''" v-for="(item,key) in navList" :key="key._id">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item.permissionDesc}}</span>
        </template>
          <el-menu-item :index="key+'-'+index" v-for='(item,index) in item.children' :key="index._id" @click="pushView(item)">
            {{item.permissionDesc}}
          </el-menu-item>
   
      </el-submenu> 
    </el-menu>
  </el-col>

  </div>
</template>

<script>
import {mapState,mapGetters} from "vuex"
export default {
  computed:{    
     ...mapGetters(["navList"])
  },
  data() {
    return {
     
    }
  },
  created() {
 
  },

  methods: {
      pushView(item){
            this.$router.push({name:item.permissionDesc})
      }
  }
}

</script>

<style lang="scss" scoped>
.navBar {
  height: 100%;
  width: 100%;
}

</style>