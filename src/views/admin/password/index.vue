<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="旧密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="newpassword1">
      <el-input v-model="ruleForm.newpassword1"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newpassword2">
      <el-input v-model="ruleForm.newpassword2"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修 改</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { apiUpdateAdminPassWord } from "@/api/admin";
export default {
  data() {
    return {
      ruleForm: {
        newpassword2: "",
        newpassword1: "",
        password: ""
      },

      rules: {
        password: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        newpassword1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        newpassword2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiUpdateAdminPassWord(this.ruleForm).then(res => {
            if (res.status == 200 && res.data.code == 0) {
              this.$refs[formName].resetFields();
              this.$message({
                message: "修改成功",
                type: "success",
                duration: 1500
              });
            } else {
              this.$refs[formName].resetFields();
              this.$message({
                message: res.data.msg,
                type: "warning",
                duration: 1500
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>
<style scoped lang="scss">
.el-form {
  .el-form-item {
    .el-input {
      width: 500px;
    }
  }
}
</style>
