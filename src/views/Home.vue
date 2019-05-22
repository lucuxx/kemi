<template>
  <div class="home">
    <div class="headerBar">
        <el-button type="danger" round @click="closeBtn">
          <i class="el-icon-warning-outline"></i> 注 销
          </el-button>
    </div>
    <div class="container">
      <div class="leftNav">
        <navBar/>
      </div>
      <div class="rightMain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";

export default {
  components: {
    navBar
  },
  methods:{
    closeBtn(){
      this.$router.push({name:"login"});
      localStorage.clear();
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.headerBar {
  display:flex;
  justify-content: flex-end;
  align-items:center;
  width: 100%;
  height: 15%;
  padding-right:60px;
  box-sizing:border-box;
  background:linear-gradient(45deg,skyblue,pink);

}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height:85%;
}
.leftNav {
  width: 20%;
  height: 100%;
  background: #545c64;
  box-sizing:border-box;
}
.rightMain {
  width: 79.9%;
  height: 100%;
  background: gainsboro;
  padding:15px;
  box-sizing:border-box;
}
</style>
