<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="50%">
    <template v-if="isHistory">
      <div class="title">信息变动历史</div>
      <el-table :data="historyList" border style="width: 100%">
        <el-table-column prop="gmtCreate" align="center" label="变动时间" width="180"></el-table-column>
        <el-table-column prop="realName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="identityNumber" label="身份证号" width="180"></el-table-column>
        <el-table-column prop="mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="bankInfo" align="center" label="银行信息"></el-table-column>
        <el-table-column prop="bankAccounts" align="center" label="银行账号"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </template>
    <template v-else-if="isUpdata">
      <el-form
        :model="formInline"
        :rules="rules"
        ref="formInline"
        label-width="150px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="用户ID">{{formInline.id}}</el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账号状态" prop="status">
          <el-radio-group v-model="formInline.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">冻结</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="formInline.realName"></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="identityNumber">
          <el-input type="text" v-model="formInline.identityNumber"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input type="text" v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="银行信息" prop="bankCode">
          <el-select v-model="formInline.bankCode" placeholder="请选择">
            <el-option
              v-for="item in bankList"
              :key="item.bankCode"
              :label="item.bankName"
              :value="item.bankCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支行名称" prop="bankSubbranch">
          <el-input type="text" v-model="formInline.bankSubbranch"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="bankCard">
          <el-input type="text" v-model="formInline.bankCard"></el-input>
        </el-form-item>
        <el-form-item label="银行信息绑定" prop="bankBind">
          <el-radio-group v-model="formInline.bankBind">
            <el-radio label="0">未绑卡</el-radio>
            <el-radio label="1">已绑卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付宝号" prop="alipay">
          <el-input type="text" v-model="formInline.alipay"></el-input>
        </el-form-item>
        <el-form-item label="支付宝绑定" prop="alipayBind">
          <el-radio-group v-model="formInline.alipayBind">
            <el-radio label="0">未绑定</el-radio>
            <el-radio label="1">已绑定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市">
          <v-distpicker
            :province="formInline.province"
            :city="formInline.city"
            :area="formInline.region"
            @selected="handleSelect"
          ></v-distpicker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateConsumerInfo('formInline')">修 改</el-button>
      </span>
    </template>
    <template v-else>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="150px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="密码设置" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" prop="passwordAgain">
          <el-input type="password" v-model="form.passwordAgain"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdatePassword('form')">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {
  apiGetConsumerChangeInfo,
  apiConsumerChangePassword,
  apiGetConsumerInfo,
  apiUpdateConsumerInfo,
  apiGetBankList
} from "@/api/user";

import VDistpicker from "v-distpicker";
export default {
  components: {
    VDistpicker
  },
  data() {
    return {
      title: "",
      dialogVisible: true,
      isHistory: false,
      isUpdata: false,
      userName: "",
      rules: {
        realName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        identityNumber: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        bankSubbranch: [
          { required: true, message: "请输入支行名称", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        realName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        passwordAgain: [
          { required: true, message: "请输入确认新密码", trigger: "blur" }
        ]
      },
      form: {
        password: "",
        passwordAgain: "",
        id: this.$route.query.id
      },
      formInline: {
        id: "",
        realName: "",
        status: "0",
        identityNumber: "",
        mobile: "",
        bankBind: "0",
        bankCard: "",
        bankCode: "",
        bankName: "",
        bankSubbranch: "",
        province: "",
        city: "",
        region: "",
        alipayBind: 0,
        alipay: ""
      },
      historyList: [],
      bankList: []
    };
  },
  methods: {
    init(id, type) {
      this.dialogVisible = true;

      if (type == "history") {
        this.title = "信息历史";
        this.isHistory = true;
        this.isUpdata = false;
        this.handleGetHistory(id);
      } else if (type == "update") {
        this.isHistory = false;
        this.isUpdata = true;
        this.title = "修改用户";
        this.handleGetBankList();
        this.handleGetConsumerInfo();
      } else {
        this.isUpdata = false;
        this.isHistory = false;
        this.title = "密码设置";
        this.$refs["form"].resetFields();
      }
    },
    handleGetHistory(id) {
      //获取用户历史信息变动
      apiGetConsumerChangeInfo({ id: id }).then(res => {
        if (res.status == 200) {
          this.historyList = res.data;
        }
      });
    },
    handleGetBankList() {
      // 获取银行列表
      apiGetBankList({}).then(res => {
        if (res.status == 200) {
          this.bankList = res.data;
        }
      });
    },
    handleGetConsumerInfo() {
      //获取用户编辑信息
      apiGetConsumerInfo({ id: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.formInline.id = res.data.id;
          this.formInline.realName = res.data.realName;
          this.formInline.status = res.data.status.toString();
          this.formInline.identityNumber = res.data.identityNumber;
          this.formInline.mobile = res.data.mobile;
          this.formInline.bankBind = res.data.bankBind.toString();
          this.formInline.bankCard = res.data.bankCard;
          this.formInline.bankCode = res.data.bankCode;
          this.formInline.bankName = res.data.bankName;
          this.formInline.province = res.data.province;
          this.formInline.city = res.data.city;
          this.formInline.region = res.data.region;
          this.formInline.bankSubbranch = res.data.bankSubbranch;
          this.formInline.alipayBind = res.data.alipayBind.toString();
          this.formInline.alipay = res.data.alipay;
          this.userName = res.data.username;
        }
      });
    },
    handleUpdatePassword(fromName) {
      //设置密码
      this.$refs[fromName].validate(valid => {
        if (valid) {
          apiConsumerChangePassword(this.form).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
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
        }
      });
    },
    handleUpdateConsumerInfo(formName) {
      //修改用户信息
      this.$refs[formName].validate(valid => {
        if (valid) {
          let item = this.bankList.find(i => {
            return i.bankCode == this.formInline.bankCode;
          });
          this.formInline.bankName = item.bankName;
          apiUpdateConsumerInfo(this.formInline).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
              this.$emit("refGetConsumerInfo");
              this.$message({
                message: "操作成功",
                type: "success",
                druation: 1500
              });
            } else {
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
    handleSelect(data) {
      //修改地址
      this.formInline.province = data.province.value;
      this.formInline.city = data.city.value;
      this.formInline.region = data.area.value;
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
  margin-top: 20px;
}

.el-table {
  padding: 1px;
}
</style>
