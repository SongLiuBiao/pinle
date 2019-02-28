<template>
  <el-form label-width="70px">
    <el-form-item label="电话">
      <el-input type="textarea" v-model="value"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleUpdateWithdrawNotice()">保 存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { apiGetWithdrawNotice, apiUpdateWithdrawNotice } from "@/api/finance";
export default {
  data() {
    return {
      value: "",
      id: ""
    };
  },
  created() {
    apiGetWithdrawNotice({}).then(res => {
      if (res.status == 200) {
        this.id = res.data.id;
        this.value = res.data.value;
      }
    });
  },
  methods: {
    handleUpdateWithdrawNotice() {
      // 修改
      this.$confirm(`确定要修改提现通知吗`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiUpdateWithdrawNotice({
          id: this.id,
          value: this.value,
          value1: this.value1
        }).then(res => {
          if (res.status == 200 && res.data.code == 1000) {
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
  }
};
</script>
<style lang="scss" scoped>
.el-input,
.el-textarea {
  width: 50% !important;
}
</style>