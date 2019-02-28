<template>
  <el-dialog title="发送短信" :visible.sync="dialogVisible" width="50%">
    <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-form">
      <el-form-item label="短信收件人" prop="userNames">
        <el-input type="textarea" v-model="form.userNames"></el-input>
      </el-form-item>
      <el-form-item label="短信内容" prop="message">
        <el-input type="textarea" v-model="form.message" placeholder></el-input>
      </el-form-item>
      <el-form-item label="称呼" prop="name">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="text" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item label="发送时间">
        <el-form-item prop="sendTime">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="form.sendTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSendMessage('form')">发 送</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiSendMessage } from "@/api/user";
export default {
  data() {
    return {
      form: {
        userNames: "",
        message: "",
        name: "",
        remark: "",
        sendTime: null
      },
      dialogVisible: false,
      rules: {
        message: [
          { required: true, message: "请输入短信内容", trigger: "blur" }
        ],
        userNames: [
          { required: true, message: "请输入短信收件人", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(val) {
      this.dialogVisible = true;
      this.form.userNames = val;
    },
    handleSendMessage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiSendMessage(this.form).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
              this.$emit('refSendMessage')
              this.$message({
                message: "发送成功",
                type: "success",
                duration: 1500
              });
            }else{
             this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500
            });
          }
          });
        }
      });
    }
  }
};
</script>
<style>
</style>
