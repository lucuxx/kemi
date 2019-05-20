<template>
  <div class="home">
    <div class="headerBar"></div>
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
  }
};
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
  width: 100%;
  height: 15%;
  background: skyblue;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:85%;
}
.leftNav {
  width: 20%;
  height: 100%;
  background: greenyellow;
}
.rightMain {
  width: 80%;
  height: 100%;
  background: gainsboro;
}
</style>
