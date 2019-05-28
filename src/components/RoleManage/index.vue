<template>
  <div class="RoleManage">
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="角色名称" prop="data"></el-table-column>
      <el-table-column label="角色描述" prop="name"></el-table-column>
      <el-table-column label="详情" prop="more"></el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button type="primary" @click="addUser">新增角色</el-button>
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
    <!-- 遮罩层 -->

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="userInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="userInfo.roleDesc"></el-input>
        </el-form-item>

        <el-tree
          :data="allPermissions"
          show-checkbox
          node-key="_id"
          :props="defaultProps"
          ref="tree"
        ></el-tree>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelCommit">取 消</el-button>
        <el-button type="primary" @click="commitData">确 定</el-button>
      </span>
    
    </el-dialog>
    

  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"

export default {


  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'permissionDesc'
      },

      userInfo: {
          roleName:"",
          roleDesc:"",
          permissions:[],
      },
     
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描叙不能为空", trigger: "blur" },
         
        ],
      }
    };
  },

  computed: {
    userList() {
      var arr = [];
      for (var i = 0; i < this.allUser.length; i++) {
        arr.push({
          data: this.allUser[i].roleName,
          name: this.allUser[i].roleDesc
        });
      }
      return arr;
    },
    //从getters获取数据
     ...mapGetters(["allUser"]),
     ...mapGetters(["allPermissions"]),
   
  },

  mounted(){
    this.$store.dispatch("allUser"),
    this.$store.dispatch("allPermissions")
    
  },

  methods: {

    // 编辑角色
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除角色
    handleDelete(index, row) {
      var roleName=row.data;
      var id="";
      // console.log(this.allUser)
      for(var i=0;i<this.allUser.length;i++){
        if(this.allUser[i].roleName==roleName){
            id=this.allUser[i]._id;
        }
      }
      this.$http.post(this.$apis.deleteRole,{_id:id})
      .then((resp)=>{
        // 根据点击提交结果,触发提示弹框
         this.$message({
          message: resp.data.message,
          type: resp.data.success?"success":"error"
        });
        // 新增用户后,再次触发异步请求,跟新页面数据
       this.$store.dispatch("allUser")

      })
    },
    // 关闭弹窗
    handleClose(){
         this.dialogVisible = false;
        this.userInfo={};
    },
    // 新增角色
    addUser() {
      this.dialogVisible = true;

    },
    // 新增角色提交数据
    commitData(){
        this.userInfo.permissions=this.$refs.tree.getCheckedKeys();

        this.$http.post(this.$apis.addNewRole,this.userInfo)
      .then((resp)=>{
        // 根据点击提交结果,触发提示弹框
         this.$message({
          message: resp.data.message,
          type: resp.data.success?"success":"error"
        });
        // 新增用户后,再次触发异步请求,跟新页面数据
       this.$store.dispatch("allUser")
     
      })
       this.dialogVisible = false;
       this.userInfo={};
     },
     cancelCommit(){
        this.dialogVisible = false;
        this.userInfo={};
     }
  },
}
</script>

<style lang="scss" scoped>

</style>