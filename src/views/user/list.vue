<template>
  <div class="box">
    <div class="header">
      <div class="title">用户搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="userId">
                  <label>用户id</label>
                  <el-input v-model="formInline.userId"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="username">
                  <label>用户名</label>
                  <el-input v-model="formInline.username"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="name">
                  <label>姓名</label>
                  <el-input v-model="formInline.name"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="phone">
                  <label>电话/手机</label>
                  <el-input v-model="formInline.phone"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="identityNumber">
                  <label>身份证</label>
                  <el-input v-model="formInline.identityNumber"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="lastLoginIp">
                  <label>登录IP</label>
                  <el-input v-model="formInline.lastLoginIp"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="address">
                  <label>地址</label>
                  <el-input v-model="formInline.address"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="order">
                  <label>排序</label>
                  <el-select v-model="formInline.order" placeholder="请选择">
                    <el-option
                      v-for="item in orders"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="registerTimeStart">
                  <label>注册时间</label>
                  <el-date-picker
                    v-model="formInline.registerTimeStart"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="registerTimeEnd">
                  <label>到</label>
                  <el-date-picker
                    v-model="formInline.registerTimeEnd"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="lastLoginTimeStart">
                  <label>最后登录</label>
                  <el-date-picker
                    v-model="formInline.lastLoginTimeStart"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="lastLoginTimeEnd">
                  <label>到</label>
                  <el-date-picker
                    v-model="formInline.lastLoginTimeEnd"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="consumeStart">
                  <label>消费金额</label>
                  <el-input v-model="formInline.consumeStart"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="consumeEnd">
                  <label>到</label>
                  <el-input v-model="formInline.consumeEnd"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="exitStart">
                  <label>离开天数</label>
                  <el-input v-model="formInline.exitStart"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="exitEnd">
                  <label>到</label>
                  <el-input v-model="formInline.exitEnd"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <label>用户分类</label>
                  <el-select v-model="formInline.source" placeholder="请选择">
                    <el-option
                      v-for="item in sources"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <!-- <el-form-item prop="userId">
                  <label>用户ID</label>
                  <el-input v-model="formInline.userId"></el-input>
                </el-form-item>-->
                <el-form-item label prop="order">
                  <label>排序</label>
                  <el-select v-model="formInline.order" placeholder="请选择">
                    <el-option
                      v-for="item in orders"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-checkbox v-model="formInline.blurry">模糊检索</el-checkbox>
                <el-button type="primary" @click="handleGetListConsumer(1)">搜索</el-button>
                <el-button type="primary" @click="resetForm('from')">重置</el-button>
                <el-button type="primary" @click="handleExportConsumer()">导出</el-button>
                <el-button
                  type="primary"
                  @click="handleSendMessage()"
                  :disabled="multipleSelection.length <= 0"
                >发送短信</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">用户</div>
      <el-table
        :data="userList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="id" label="用户id" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/userdetails?id='+scope.row.id">
              <el-button type="text">{{scope.row.username}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="realName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="mobile" align="center" label="手机号"></el-table-column>
        <el-table-column prop="address" align="center" label="消费额/余额">
          <template slot-scope="scope">{{scope.row.capitalConsume}}/{{scope.row.capitalBalance}}</template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="存入额/取出额">
          <template slot-scope="scope">{{scope.row.capitalIn}}/{{scope.row.capitalOut}}</template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="登录次数/登录失败次数">
          <template slot-scope="scope">{{scope.row.loginDegree}}/{{scope.row.loginErrorDegree}}</template>
        </el-table-column>
        <el-table-column prop="lastLoginTime" align="center" label="上次登录时间"></el-table-column>
        <el-table-column prop="registerTime" align="center" label="注册时间"></el-table-column>
        <el-table-column prop="leaveDays" align="center" label="离开天数"></el-table-column>
      </el-table>
      <el-row>
        本页用户消费额 {{totalMoney}} 元; 本页用户余额 {{totalBalanceAmount}}元 ; 全部用户消费额 {{sumMoney}} 元; 全部用户余额 {{sumBalanceAmount}} 元;
        <br>
        本页用户存入额 {{totalInMoney}} 元; 本页用户取出额 {{totalOutMoney}}元 ; 全部用户存入额 {{sumInMoney}} 元; 全部用户取出额 {{sumOutMoney}} 元;
        <br>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.pageNo"
          :page-sizes="[10, 20, 30]"
          :page-size="formInline.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </el-row>
    </div>
    <send-message-dialog
      ref="sendMessage"
      @refSendMessage="handleGetListConsumer"
      v-if="sendMessageDialogVisible"
    ></send-message-dialog>
  </div>
</template>

<script>
import { apiGetListConsumer, apiExportConsumer } from "@/api/user";
import { handleDownload } from "@/util/util";
import sendMessageDialog from "../moment/send-message-dialog";
export default {
  components: {
    sendMessageDialog
  },
  data() {
    return {
      sendMessageDialogVisible: false,
      multipleSelection: [],
      totalMoney: "",
      totalBalanceAmount: "",
      sumMoney: "",
      sumBalanceAmount: "",
      totalCount: 0,
      totalInMoney: 0,
      totalOutMoney: 0,
      sumInMoney: 0,
      sumOutMoney: 0,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      sources: [
        {
          value: "1",
          label: "安卓"
        },
        {
          value: "2",
          label: "IOS"
        },
        {
          value: "3",
          label: "H5"
        }
      ],

      orders: [
        {
          label: "注册时间",
          value: "u.gmt_create"
        },
        {
          label: "最后一次登录时间",
          value: "u.last_login_time"
        },
        {
          label: "登录次数",
          value: "u.login_degree"
        },
        {
          label: "登录错误次数",
          value: "u.login_error_degree"
        },
        {
          label: "资金余额",
          value: "u.balance_amount"
        },
        {
          label: "资金可用余额",
          value: "u.available_amount"
        },
        {
          label: "资金冻结",
          value: "u.frozen_amount"
        },
        {
          label: "累计资金存入金额",
          value: "u.sum_in_amount"
        },
        {
          label: "累计资金取出金额",
          value: "u.sum_out_amount"
        },
        {
          label: "累计奖金",
          value: "u.sum_prize_amount"
        },
        {
          label: "累计消费",
          value: "u.sum_consume_amount"
        }
      ],
      formInline: {
        userId: "",

        username: "",
        name: "",
        phone: "",
        // identityNumber: "",
        // lastLoginIp: "",
        // address: "",
        registerTimeStart: null,
        registerTimeEnd: null,
        lastLoginTimeStart: null,
        lastLoginTimeEnd: null,
        consumeStart: "",
        consumeEnd: "",
        exitStart: "",
        exitEnd: "",
        order: "u.gmt_create",
        source: "",
        blurry: false,
        pageNo: 1,
        pageSize: 10
      },
      userList: []
    };
  },
  created() {
    this.handleGetListConsumer();
  },
  methods: {
    handleGetListConsumer(pageNo) {
      //获取用户列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      if (this.formInline.blurry) {
        this.formInline.blurry = "1";
      } else {
        this.formInline.blurry = "";
      }
      apiGetListConsumer(this.formInline).then(res => {
        if (res.status == 200) {
          this.userList = res.data.listUser;
          this.totalCount = res.data.totalCount;
          this.totalMoney = res.data.totalMoney;
          this.totalBalanceAmount = res.data.totalBalanceAmount;
          this.sumMoney = res.data.sumMoney;
          this.sumBalanceAmount = res.data.sumBalanceAmount;
          this.totalInMoney = res.data.totalInMoney;
          this.totalOutMoney = res.data.totalOutMoney;
          this.sumInMoney = res.data.sumInMoney;
          this.sumOutMoney = res.data.sumOutMoney;
        }
      });
    },
    handleExportConsumer() {
      //用户导出
      apiExportConsumer(this.formInline).then(res => {
        if (res.status == 200) {
          handleDownload(res.data);
        }
      });
    },
    handleSendMessage() {
      //发送短信
      this.sendMessageDialogVisible = true;
      let userNames = this.multipleSelection.map(i => {
        return i.mobile;
      });

      this.$nextTick(() => {
        this.$refs["sendMessage"].init(userNames.join(","));
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListConsumer();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListConsumer();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped   lang="scss">
.box {
  .title {
    color: rgb(51, 51, 51);
    height: 40px;
    line-height: 40px;
    font-weight: 400;
    background: rgb(233, 233, 233);
    padding-left: 8px;
  }
  .header {
    .serch {
      border: 1px solid #eaeaea;
      .el-row {
        border-bottom: 1px solid#eaeaea;
        .el-col {
          border-left: 1px solid #eaeaea;
          padding-top: 8px;
        }
        .el-form-item {
          margin: 0 0 8px 8px;
          .el-input {
            width: 70% !important;
          }
          .el-select {
            width: 66% !important;
          }
          .el-radio-group {
            margin-right: 20px;
          }
          label {
            width: 25%;
            display: inline-block;
          }
          .el-checkbox {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .content {
    margin-top: 50px;
    .el-row {
      color: rgb(51, 51, 51);
      padding-top: 10px;
      border: 1px solid #eaeaea;
      border-top: none;
      text-align: center;
      .el-pagination {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
}
</style>
