<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="彩票:">
        <el-select v-model="ruleForm.lotteryId" placeholder="超级大乐透" :disabled="true">
          <el-option v-for="item in lotterys" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="期号:" prop="issue">
        <el-input v-model="ruleForm.issue"></el-input>
      </el-form-item>
      <el-form-item label="销售:" prop="name">
        <el-radio-group v-model="ruleForm.isSell" v-if="dialogTitle == '新建奖期' ">
          <el-radio :label="1">销售中</el-radio>
        </el-radio-group>
        <el-radio-group v-model="ruleForm.isSell" v-else>
          <el-radio :label="1">销售中</el-radio>
          <el-radio :label="0">停售中</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="销售开始时间:" prop="sellStartTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="ruleForm.sellStartTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="销售截止时间:" prop="sellEndTime">
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="ruleForm.sellEndTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="handleAddorUpdateIssue('ruleForm')"
      >{{dialogTitle =='新建奖期'?'新 建':'修 改' }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  apiAddorUpdateIssue,
  apiGetListLottery,
  apiGetIssueInfo
} from "@/api/lottery";
export default {
  data() {
    return {
      dialogVisible: true,
      dialogTitle: "",
      lotterys: [],
      ruleForm: {
        id: "",
        lotteryId: 0,
        issue: "",
        isSell: 1,
        sellStartTime: null,
        sellEndTime: null
      },
      rules: {
        issue: [{ required: true, message: "请输入期号", trigger: "change" }],
        sellStartTime: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        sellEndTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      },
      data: {}
    };
  },
  props: ["lotteryId"],
  created() {
    this.handleGetListLottery();
  },
  methods: {
    handleAddorUpdateIssue(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          apiAddorUpdateIssue(this.ruleForm).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
              this.$emit("refissuseList");
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
        } else {
          return false;
        }
      });
    },
    handleGetListLottery() {
      apiGetListLottery({}).then(res => {
        if (res.status == 200) {
          this.lotterys = res.data;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init(id) {
      this.dialogVisible = true;
      if (id) {
        apiGetIssueInfo({ id: id }).then(res => {
          if (res.status == 200) {
            this.ruleForm.id = res.data.id;
            this.ruleForm.lotteryId = res.data.lotteryId;
            this.ruleForm.issue = res.data.issue;
            this.ruleForm.isSell = res.data.isSell;
            this.ruleForm.sellStartTime = res.data.sellStartTime;
            this.ruleForm.sellEndTime = res.data.sellEndTime;
          }
        });

        this.dialogTitle = "修改奖期";
      } else {
        this.ruleForm.lotteryId = this.lotteryId;
        this.ruleForm.issue = "";
        this.ruleForm.sellStartTime = null;
        this.ruleForm.sellEndTime = null;
        this.dialogTitle = "新建奖期";
      }
    }
  }
};
</script>
<style scoped lang="scss">
.title {
  color: rgb(51, 51, 51);
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  background: rgb(233, 233, 233);
  padding-left: 8px;
}
</style>

