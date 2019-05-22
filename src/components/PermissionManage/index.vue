<template>
  <div class="PermissionManage">
    <el-button type="primary" @click="addPermission">添加权限</el-button>
    <el-tree :data="allPermissions" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>

    <!-- 新增权限 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="Permission" :rules="rules" ref="userInfo" label-width="100px">
        <el-form-item label="权限等级" prop="permissionLeve">
          <el-input v-model="Permission.permissionLeve"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="permissionDesc">
          <el-input v-model="Permission.permissionDesc"></el-input>
        </el-form-item>
        <el-form-item label="权限排序" prop="sortNum">
          <el-input v-model="Permission.sortNum"></el-input>
        </el-form-item>
        <el-form-item label="父级权限" prop="parentid">
          <el-input v-model="Permission.parentid"></el-input>
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
import { mapGetters } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("allPermissions");
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "permissionDesc"
      },
      dialogVisible:false,
      Permission:{
          permissionLeve:"",
          permissionDesc:"",
          sortNum:"",
          parentid:"",
      },
    rules: {
        permissionLeve: [
        { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        permissionDesc: [
        { required: true, message: "内容不能为空", trigger: "blur" }
        
        ],
         sortNum: [
        { required: true, message: "内容不能为空", trigger: "blur" }
        
        ],
         parentid: [
        { required: true, message: "内容不能为空", trigger: "blur" }
        
        ],
    },
    };
  },
  computed: {
    ...mapGetters(["allPermissions"])
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },
    handleClose(){
        this.dialogVisible=false;
    },
    addPermission(){
        this.dialogVisible=true;
    },
    cancelCommit(){
        this.dialogVisible=false;
        this.Permission={};
    },
    commitData(){

    }
  }
};
</script>

<style lang="scss" >

</style>