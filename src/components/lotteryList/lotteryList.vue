<template>
  <div class="lotteryList">
   
   
    <!-- 分页设置 -->
    <el-pagination background layout="prev, pager, next" :total="key"  @current-change="loadData"></el-pagination>

    <table class="tableList">
      <tr>
        <th>日期</th>
        <th v-for="item in 33" :key="item">{{item | filterData}}</th>
        <th v-for="index in 16" :key="index+50">{{index | filterData}}</th>
      </tr>
      <tr v-for="(item,index) in lotteryList" :key="item+index+10">
        <td>{{item.period}}</td>
        <td v-for="(general,index) in  item.missNumber.general"
        :key="item+' '+index"
        :class="general>0?'general':index<33?'ball_red':'ball_blue'"
        :ref = "general>0?{}:index<33?'ball_red':'ball_blue'"
        >{{
            general>0?general:index<33?(index+1)>9?(index+1):index+1:(index-32)>9?(index-32):index-32
         }}
      </td>
         <!-- <td v-for="(item,index) in  numArr(item)" :key="item+' '+index">{{item}}</td> -->
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  beforeRouteUpdate(to,from,next){
        this.loadData(1);
        next();
    },

  data() {
    return {
      lotteryList: [],
      key:0,
    };
  },

  mounted() {
    var gameName = this.$route.params.lotteryName; 
    this.$http
      .get(this.$apis.findByGameName, {
        gameName: gameName,
        pageNo: 1,
        pageSize: 20
      })
      .then(resp => {
        this.lotteryList = resp.data.data.data;
        this.key= resp.data.total/2;
      });

    
  },
  methods:{
     loadData(pageNo){
        var gameName = this.$route.params.lotteryName; 
    this.$http
      .get(this.$apis.findByGameName, {
        gameName: gameName,
        pageNo: pageNo,
        pageSize: 20
      })
      .then(resp => {
        this.lotteryList = resp.data.data.data;
        this.key= resp.data.total/2;
      });
  },
  },
    filters:{
    filterData(value){
        if(value<10){
          value='0'+value;
        }
        return value;
    }
  }
}
  // numArr(item){
  //   var arr1=item.missNumber.general;
  //   var arr2=item.winnerNumber;
  //      var j=0;
  //   for(var i=0;i<arr1.length;i++){
   
  //     if(arr1[i]==0 || arr1[i]==-1){        
  //         arr1[i]=arr2[j]; 
  //             j++;
  //        }
  //     }
  //     return arr1;
  //   }

  // },

  

</script>

<style lang="scss" scoped>
.lotteryList {
  width: 100%;
  height: 500px;
  overflow-y: auto;
}
.tableList {
  border: 1px solid gray;
th {
    background:greenyellow;
    width: 30px;
    border: 1px solid gray;
    font-size:18px;

  }
}

td {
  width: 30px;
  border: 1px solid gray;
  text-align: center;
  vertical-align: middle;
   font-size:18px;
}

.ball_red{
  background:red;
}
.ball_blue{
  background:blue;
}
</style>