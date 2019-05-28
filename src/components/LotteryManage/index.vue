<template>
  <div>
    <ul class="Lottery">
      <li v-for="(item,index) in findAllGames" :key="index" @click="lotteryView(item)">
        <!-- <router-link :to="{path:'lotteryList/'+item.en,query:{data:item}}"> -->
        <img :src="`${beasUrl}`+item.icon2">
        <p>{{item.cn}}</p>
        <!-- </router-link> -->
      </li>
      <li>
        <div class="addGame" @click="addGame">+</div>
      </li>
    </ul>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="42%" :before-close="handleClose">
      <el-form :model="gameInfo"  ref="gameInfo" :rules="rules" label-width="80px">
        <el-form-item label="英文名" prop="en">
          <el-input v-model="gameInfo.en"></el-input>
        </el-form-item>
        <el-form-item label="中文名" prop="cn">
          <el-input v-model="gameInfo.cn"></el-input>
        </el-form-item>
        <el-form-item label="小图" >

          <el-upload
            action=""
            :on-change="getFile1"
            class="avatar-uploader1"
            list-type="picture"
            :show-file-list="false"
            :file-list="filelist1"

            :auto-upload=false    
          >
            <img v-if="imageUrl1" :src="imageUrl1" class="avatar1">
            <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="大图" >

            <el-upload
            action=""
            :on-change="getFile2"
            class="avatar-uploader2"
            list-type="picture"
            :show-file-list="false"
            :file-list="filelist2"
            :auto-upload=false 

          >
            <img v-if="imageUrl2" :src="imageUrl2" class="avatar2">
            <i v-else class="el-icon-plus avatar-uploader-icon2"></i>
          </el-upload>


        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"
export default {
  data() {
    return {
      beasUrl: "",
      dialogVisible: false,
      dialogImageUrl: "",
      // dialogVisible: false,
      gameInfo:{
        en: "",
        cn: ""
      },
     imageUrl1:'',
     imageUrl2:'',
     filelist1:[],
     filelist2:[],
      rules: {
        en: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        cn: [{ required: true, message: "名字不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$store.dispatch("findAllGames");
    this.beasUrl = process.env.VUE_APP_BaseURL;
  },
  computed: {
    ...mapGetters(["findAllGames"])
  },
  methods: {
    lotteryView(item) {
      this.$router.push({
        path: "lotteryList/" + item.en,
        query: { data: item }
      });
    },
    addGame() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    cancelCommit() {
      this.dialogVisible = false;
      gameInfo = {};
    },
    getFile1(file,filelist){
           this.filelist1=filelist.slice(-1);
           this.imageUrl1=file.url
    },
    getFile2(file,filelist){
            this.filelist2=filelist.slice(-1);
             this.imageUrl2=file.url
    },
    
    commitData(){
        this.$refs["gameInfo"].validate((valid)=>{
            if(valid){
             
                var fd = new FormData();
             fd.append("file",this.filelist1[0].raw);
             fd.append("file",this.filelist2[0].raw);
              fd.append("en",this.gameInfo.en);
              fd.append("cn",this.gameInfo.cn);

              let config={
                  headers:{"Content-Type":"multipart/form-data"}
              };
                axios.post(this.$apis.addNewGame,fd,config)
                .then((resp)=>{
                    this.$message({
                        message:resp.data.message,
                        type:resp.data.success?"success":"error"
                    });
                    if(resp.data.success){
                        this.$store.dispatch("findAllGames");
                        this.handleClose();
                    }
                   
                }).catch((error)=>{
                    console.log(error)
                })
            }else{
                console.log('验证失败');
                 return false;
            }
        })
       
     }
    }
}
</script>


<style lang="scss" scoped>
.Lottery {
  // position:absolute;
  width: 100%;
  height: 500px;
  background: white;
  padding: 10px;
  box-sizing: border-box;
  li {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100px;
    height: 100px;

    .addGame {
      width: 100px;
      height: 100px;
      margin-left: 50px;
      border: 1px dashed black;
      border-radius: 10px;
      text-align: center;
      line-height: 100px;
      font-size: 60px;
    }
  }
}
li:hover {
  cursor: pointer;
}
.icon {
  width: 40px;
  height: 40px;
  border: 1px dashed black;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  font-size: 25px;
}

.icon2 {
  width: 90px;
  height: 90px;
  border: 1px dashed black;
  border-radius: 5px;
  text-align: center;
  line-height: 90px;
  font-size: 25px;
}
 .avatar-uploader1 {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    width: 40px;
    height: 40px;

  }
  .avatar-uploader :hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon1 {
    font-size: 20px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar1 {
    width: 40px;
    height: 40px;
    display: block;
  }
  .avatar-uploader2 {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    width: 90px;
    height: 90px;

  }
   .avatar-uploader-icon2 {
    font-size: 20px;
    color: #8c939d;
    width: 90px;
    height:90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar2 {
    width: 90px;
    height: 90px;
    display: block;
  }
</style>