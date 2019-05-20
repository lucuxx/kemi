<template>
    <div id="login">
      <div id="hideTop">
          <ul class="box">
              <li>彩票分析</li>
              <li>近期开奖</li>
              <li>业务分析</li>
              <li>数据图表</li>
              <li>彩票资讯</li>
              <li>开奖管理</li>
          </ul>
       <div id="container">
       <h3 style="color:white;">Kemi 登录</h3>
        <el-form label-width="80px" :model="userInfo" :rules="rules" ref="userInfo">
            <el-form-item  label="用户名:" prop="accountName">
                <el-input v-model="userInfo.accountName"></el-input>
            </el-form-item>
            <el-form-item  label="密码:" prop="password">
                <el-input type="password" v-model="userInfo.password"></el-input>
            </el-form-item>   
        </el-form> 
        <el-button type="primary" @click="login">登 录</el-button>
       </div>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userInfo:{
                accountName:"",
                password:""
            },
            rules:{
                accountName:[
                     { required:true,message: "用户名不能为空", trigger: 'blur' }
                ],
                password:[
                     { required:true,message: "密码不能为空", trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
         login(){

         this.$refs["userInfo"].validate((valid) => {
          if (valid) {
            this.$http.post(this.$apis.signin,this.userInfo)
            .then((resp)=>{
              console.log(resp)
                var token=resp.data.token;
                var success=resp.data.success;
                var permissions=resp.data.response.permissions;
              
                // 如果登录成功
                if(success){
                     // 保存token
                    localStorage.setItem("token",token);
                    localStorage.setItem("permissions",JSON.stringify(permissions));
                    
                    var query = this.$route.query;
                    
                    // 判断是否需要重定向,如果不需要,直接跳转home下的article组件
                    if(!query.redirect){
                        this.$router.push({name:'home'})
                    }else{
                        this.$router.push({path:query.redirect})
                    }

                }else{
                    this.$message.error("登录失败,请检查用户名和密码")
                }

            }).catch((err)=>{
                console.log(err)
            })
          } else {
            console.log('验证失败');
            return false;
          }
        })
    },

    }


}

</script>

<style lang="scss" scoped>
#login{
    width:100%;
    height:100%;
    min-width:1000px;
    background:url("https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=209241522,2459742048&fm=26&gp=0.jpg") no-repeat;
    background-size:cover;
    background-attachment:fixed;

}
#hideTop{
    position:absolute;
    display:flex;
    justify-content:space-between;
    align-items:center;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(247, 244, 244, .2);
}

#container{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:350px;
    height:100%;
    background:rgba(201, 199, 199, 0.5);
}
h3{
    margin-bottom:30px;
    font-size:30px;
    font-weight:bold;
}

.box {
  display: block;
  width: 200px;
  height: 200px;
  margin-left:200px;
  position: relative;
  transform-style: preserve-3d;
  animation:an 10s infinite;
  transform-origin: 50% 50%;
}

 


@keyframes an{
  0% {transform: rotateX(0deg) rotateY(0deg); }
  20%{transform: rotateX(90deg) rotateY(60deg) rotateZ(90deg);}
  40%{transform: rotateX(180deg) rotateY(180deg) rotateZ(270deg);}
  60%{transform: rotateX(360deg) rotateY(270deg) rotateZ(180deg);}
  80%{transform: rotateX(180deg) rotateY(60deg) rotateZ(90deg);}
  100%{transform: rotateX(0deg) rotateY(0deg);}
}

.box li {
list-style: none;
position: absolute;
top: 0;
left: 0;
width: 200px;
height: 200px;
text-align:center;
line-height:200px;
font-size:24px;
font-weight:bold;
}

/*正*/
.box li:nth-child(1){
transform: translateZ(100px);
background: rgb(212, 238, 247);
}

/*上*/
.box li:nth-child(2){
transform: translateZ(-100px);
background: rgb(168, 206, 127);
}

/*后*/
.box li:nth-child(3){
transform: translateY(100px) rotateX(90deg) ;
background: rgb(104, 204, 230);
}

/*底*/
.box li:nth-child(4){
transform: translateY(-100px) rotateX(-90deg);
background: rgb(238, 171, 220);
}

/*左*/
.box li:nth-child(5){
transform: translateX(100px) rotateY(-90deg);
background: rgb(88, 90, 89);
}

/*右*/
.box li:nth-child(6){
transform:translateX(-100px) rotateY(-90deg);
background: rgb(144, 212, 203);
}


</style>
