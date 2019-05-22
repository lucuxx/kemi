<template>
    <div class="accountManage">
           <el-table :data="allAccounts" style="width: 100%">
      <el-table-column label="账户名" prop="username"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="角色" prop="roles"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 遮罩层>>>>>新增用户 -->

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked">admin</el-checkbox>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData">{{flag?"确 定":"更 新"}}</el-button>
      </span>   
    </el-dialog>

    <router-view/>

     <!-- 遮罩层>>>>>编辑用户 -->

     <!-- <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
      <el-form :model="userInfo2" :rules="rules2" ref="userInfo2" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo2.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo2.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="checked2">admin</el-checkbox>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit2">取 消</el-button>
        <el-button type="primary" @click="commitData2">确 定</el-button>
      </span>   
    </el-dialog> -->
    </div>
</template>

<script>
import {mapGetters} from "vuex"
    export default {
        mounted(){
            this.$store.dispatch("allAccount")
        },
        computed:{
            ...mapGetters(["allAccount"]),
            allAccounts(){
                var arr=[];
                for(var i=0;i<this.allAccount.length;i++){
                     arr.push({
                        username: this.allAccount[i].username,
                        password: this.allAccount[i].password,
                        roles: this.allAccount[i].roles,
                        "_id":this.allAccount[i]._id
                        });
                }
                return arr;
            },
          
        },
         data() {
                return {
                dialogVisible: false,
                checked: true,
                flag: true,
                // dialogVisible2: false,
                // checked2: true,

                userInfo: {
                    username:"",
                    password:"",
                    roles:"",
                    _id:"",
                },
                //  userInfo2: {
                //     username:"",
                //     password:"",
                //     roles:"",
                //     _id:"",
                // },
                
                rules: {
                    username: [
                    { required: true, message: "用户名不能为空", trigger: "blur" }
                    ],
                    password: [
                    { required: true, message: "密码不能为空", trigger: "blur" }
                    
                    ],
                },
                //  rules2: {
                //     username: [
                //     { required: true, message: "用户名不能为空", trigger: "blur" }
                //     ],
                //     password: [
                //     { required: true, message: "密码不能为空", trigger: "blur" },
                    
                //     ],
                // },

                };
            },
   methods: {

    // 编辑角色
    handleEdit(index, row) {
        this.flag=false;
        this.userInfo=row;
        this.dialogVisible=true;
    },
    // 删除角色
    handleDelete(index, row) {
      this.$http.post(this.$apis.deleteUser,row)
      .then((resp)=>{
        // 根据点击提交结果,触发提示弹框
         this.$message({
          message: resp.data.message,
          type: resp.data.success?"success":"error"
        });
        // 新增用户后,再次触发异步请求,跟新页面数据
       this.$store.dispatch("allAccount")

      })
    },
    // 关闭弹窗
    handleClose(){
        this.dialogVisible = false;
   
    },
    //  handleClose2(){
    //     this.dialogVisible2 = false;
   
    // },
    // 新增角色
    addUser() {
      this.flag=true;
      this.dialogVisible = true;

    },
    // 新增角色提交数据
    commitData(){
        if(this.checked){
            this.userInfo.roles="5bb96087722a107c9c3931ca"
        }else{
             this.userInfo.roles="";
        }
        if(this.flag){
             this.$http.post(this.$apis.addNewUser,this.userInfo)
             .then((resp)=>{
                // 根据点击提交结果,触发提示弹框
                this.$message({
                message: resp.data.message,
                type: resp.data.success?"success":"error"
                });
                 this.dialogVisible = false;
                 this.userInfo={};
                 // 新增用户后,再次触发异步请求,跟新页面数据
                  this.$store.dispatch("allAccount")
                })
        }else{
            this.$http.post(this.$apis.updateUserInfo,this.userInfo)
            .then((resp)=>{
                // console.log("test")
                // 根据点击提交结果,触发提示弹框
                console.log("resp".resp)
                this.$message({
                message: resp.data.message,
                type: resp.data.success?"success":"error"
                });  
                this.dialogVisible = false;
                // this.userInfo={};
                // 新增用户后,再次触发异步请求,跟新页面数据
                this.$store.dispatch("allAccount")           
            }).catch((err)=>{
                console.log(err)
            }) 
                         
            } 
        },
        cancelCommit(){
        this.dialogVisible = false;
        this.userInfo={};
        },
       
     },

    //  编辑修改数据后再次提交
    //   commitData2(){   
    //     if(this.checked2){
    //     this.userInfo2.roles="5bb96087722a107c9c3931ca"
    //     }else{
    //         this.userInfo2.roles=null
    //     }
        
    //     this.$http.post(this.$apis.updateUserInfo,this.userInfo2)
    //   .then((resp)=>{
    //       console.log("test")
    //     // 根据点击提交结果,触发提示弹框
    //      this.$message({
    //       message: resp.data.message,
    //       type: resp.data.success?"success":"error"
    //     });
    //     // 新增用户后,再次触发异步请求,跟新页面数据
    //    this.$store.dispatch("allAccount")
     
    //   })
    //    this.dialogVisible2 = false;
    //    this.userInfo2={};
    //  },

    //  点击退出弹框
   
    //   cancelCommit2(){
    //     this.dialogVisible2 = false;
    //     this.userInfo2={};
    
    //  }
  
}
        

</script>

<style lang="scss" scoped>

</style>