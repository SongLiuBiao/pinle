<template>
  <div class="box">
    <div class="title">用户信息</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">用户ID</el-col>
        <el-col :span="8">
          <router-link  to="/moment/userDetails"><el-button type="text">{{data.userId}}</el-button></router-link>
        </el-col>
        <el-col :span="4">姓名</el-col>
        <el-col :span="8">{{data.realName}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">身份证</el-col>
        <el-col :span="8">{{data.identityNumber}}</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">{{data.phone}}</el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4">银行信息</el-col>
        <el-col :span="8">
          {{data.bankInfo.bankName}}|{{data.bankInfo.province}}|{{data.bankInfo.city}}
          <el-button type="primary" size="mini" @click="handleGetBankList()">修改</el-button>
        </el-col>
        <el-col :span="4">银行账户</el-col>
        <el-col :span="8">{{data.bankInfo.bankCard}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">消费/余额</el-col>
        <el-col :span="8">{{data.sumConsumeAmount}}/{{data.balanceAmount}}</el-col>
        <el-col :span="4">存入/取出</el-col>
        <el-col :span="8">{{data.sumInAmount}}/{{data.sumOutAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">注册时间</el-col>
        <el-col :span="8">{{data.registerTime}}</el-col>
        <el-col :span="4">注册IP</el-col>
        <el-col :span="8">{{data.registerIp}}</el-col>
      </el-row>
    </div>
    <div class="title">进出明细</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">进出ID</el-col>
        <el-col :span="20">{{data.id}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">用户</el-col>
        <el-col :span="20">{{data.userName}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">金额</el-col>
        <el-col :span="20">{{data.amount}}</el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4">状态</el-col>
        <el-col :span="20" v-if="data.status == 1">申请提现
          <el-button type="primary" size="mini" @click="dialogStatus=true">修改</el-button>
        </el-col>
        <el-col :span="20" v-if="data.status == 2">审核通过</el-col>
        <el-col :span="20" v-if="data.status == 3">审核拒绝</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">操作人</el-col>
        <el-col :span="20">{{data.checkAdminName}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">审核备注</el-col>
        <el-col :span="20">{{data.checkRemark}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">处理时间</el-col>
        <el-col :span="20">{{data.checkTime}}</el-col>
      </el-row>
    </div>

    <el-dialog title="修改银行信息" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="formInline"
        ref="formInline"
        :rules="rules"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="城市：">
          <v-distpicker
            :province="formInline.province"
            :city="formInline.city"
            hide-area
            @selected="handleSelect"
          ></v-distpicker>
        </el-form-item>

        <el-form-item label="银行：" prop="bankCode">
          <el-select v-model="formInline.bankCode" placeholder="请选择">
            <el-option
              v-for="item in bankList"
              :key="item.bankCode"
              :label="item.bankName"
              :value="item.bankCode"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateBankInfo('formInline')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改状态" :visible.sync="dialogStatus" width="30%">
      <el-form
        :model="formInline"
        ref="formInline"
        :rules="rules"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="备注说明	">
          <el-input v-model="remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleUpdateStatus(2)">通 过</el-button>
        <el-button type="primary" @click="handleUpdateStatus(3)">拒 绝</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  apiGetCapitalWithdrawInfo,
  apiUpdateBankInfo,
  apiUpdateDealWithDrawStatus
} from "@/api/finance";
import { apiGetBankList } from "@/api/user";
import VDistpicker from "v-distpicker";
export default {
  data() {
    return {
      bankList: [],
      rules: {
        bankCode: [{ required: true, message: "请选择银行", trigger: "change" }]
      },
      dialogVisible: false,
      dialogStatus: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      remark: "",
      formInline: {
        userId: "",
        province: "",
        city: "",
        bankName: "",
        bankCode: ""
      },

      data: {}
    };
  },
  created() {
    this.handleGetCapitalWithdrawInfo();
  },
  methods: {
    handleGetCapitalWithdrawInfo() {
      // 获取提现详情信息
      apiGetCapitalWithdrawInfo({ id: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.data = res.data;
          this.formInline.province = res.data.bankInfo.province;
          this.formInline.city = res.data.bankInfo.city;
          this.formInline.bankCode = res.data.bankInfo.bankCode;
      
        }
      });
    },
    handleGetBankList() {
      this.dialogVisible = true;

      // 获取银行列表
      apiGetBankList({}).then(res => {
        if (res.status == 200) {
          this.bankList = res.data;
        }
      });
    },
    handleUpdateBankInfo(formName) {
      //修改银行信息
      this.$refs[formName].validate(vaild => {
        if (vaild) {
          if (this.formInline.province == "" || this.formInline.city == "") {
            this.$message({
              message: "请选择城市",
              type: "warning"
            });
            return;
          }
          let item = this.bankList.find(i => {
            return i.bankCode == this.formInline.bankCode;
          });
          this.formInline.bankName = item.bankName;
          this.formInline.userId = this.data.userId;
          apiUpdateBankInfo(this.formInline).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
              this.handleGetCapitalWithdrawInfo();
              this.$message({
                message: "操作成功",
                type: "success"
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
    },
    handleUpdateStatus(status) {
      //修改提现状态
      apiUpdateDealWithDrawStatus({
        status: status,
        remark: this.remark,
        id: this.data.id
      }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.dialogStatus = false;
          this.handleGetCapitalWithdrawInfo();
          this.$message({
            message: "修改成功",
            type: "success"
          });
        }else{
             this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500
            });
          }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSelect(data) {
      //修改地址
      // this.formInline.province = data.province.value;
      // this.formInline.city = data.city.value;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  .title {
    color: rgb(51, 51, 51);
    height: 40px;
    line-height: 40px;
    font-weight: 400;
    background: rgb(233, 233, 233);
    padding-left: 8px;
    margin-top: 20px;
  }

  .content {
    padding-left: 8px;
    margin-bottom: 20px;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    .el-row {
      height: 40px;
      line-height: 40px;
      margin: 0 0 0 -8px !important;
      border-bottom: 1px solid #eaeaea;
      .el-col {
        border-right: 1px solid #eaeaea;
      }
    }
  }
}
</style>
