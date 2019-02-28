<template>
  <el-form ref="form" :model="form" :rules="rule" label-width="80px">
    <el-form-item label="用户名称" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="充值金额" prop="amount">
      <el-input v-model="form.amount"></el-input>
    </el-form-item>
    <el-form-item label="摘要说明" prop="remark">
      <el-input type="textarea" v-model="form.remark"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleCapitalRecharge('form')">确认充值</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { apiCapitalRecharge } from "@/api/user";
export default {
  data() {
    return {
      form: {
        username: "",
        amount: "",
        remark: ""
      },
      rule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "请输入充值金额", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入摘要说明", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleCapitalRecharge(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm(`确定要为${this.form.username}用户充值吗`, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            apiCapitalRecharge(this.form).then(res => {
              if (res.status == 200 && res.data.code == 1000) {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500
                });
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                  duration: 1500
                });
              }
            });
          });
        }
      });
    }
  }
};
</script>