<template>
  <div class="box">
    <el-button type="primary" @click="handleUpdateOrHistory(userData.id,'history')">信息历史</el-button>
    <el-button type="primary" @click="handleUpdateOrHistory(userData.id,'password')">设置密码</el-button>
    <el-button type="primary" @click="handleUpdateOrHistory(userData.id,'update')">修改</el-button>
    <div class="title">用户信息 (开奖{{userData.rewardCount}}次，买彩{{userData.totalSchemeCount}}次)</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">用户ID</el-col>
        <el-col :span="8">{{userData.id}}</el-col>
        <el-col :span="4">账号金额</el-col>
        <el-col :span="8">{{userData.balanceAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">用户名</el-col>
        <el-col :span="8">
          {{userData.username}}
          <router-link to="/buylottery/all">
            <el-button type="text">买彩</el-button>
          </router-link>
          <!-- <router-link to="/maintain/leaveword">
            <el-button type="text">留言</el-button>
          </router-link> -->
        </el-col>
        <el-col :span="4">可提现金额</el-col>
        <el-col :span="8">{{userData.availableAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">账号状态</el-col>
        <el-col :span="8">{{userData.status ==0?'正常':'冻结'}}</el-col>
        <el-col :span="4">不可提现金额</el-col>
        <el-col :span="8">{{userData.unwithdrawAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">登录/失败</el-col>
        <el-col :span="8">{{userData.loginDegree}}/{{userData.loginErrorDegree}}</el-col>
        <el-col :span="4">冻结金额</el-col>
        <el-col :span="8">{{userData.frozenAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最后登录时间</el-col>
        <el-col :span="8">{{userData.lastLoginTime}}</el-col>
        <el-col :span="4">资金转入</el-col>
        <el-col :span="8">{{userData.sumInAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最后登录IP</el-col>
        <el-col :span="8">{{userData.lastLoginIp}}</el-col>
        <el-col :span="4">资金取出</el-col>
        <el-col :span="8">{{userData.sumOutAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">注册时间</el-col>
        <el-col :span="8">{{userData.gmtCreate}}</el-col>
        <el-col :span="4">累计金额</el-col>
        <el-col :span="8">{{userData.frozenAmount }}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">注册IP</el-col>
        <el-col :span="8">{{userData.registerIp}}</el-col>
        <el-col :span="4">累计税前奖金</el-col>
        <el-col :span="8">{{userData.sumPrizePtAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">姓名</el-col>
        <el-col :span="8">{{userData.realName}}&nbsp;</el-col>
        <el-col :span="4">累计消费</el-col>
        <el-col :span="8">{{userData.sumConsumeAmount}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">身份证件</el-col>
        <el-col :span="8">{{userData.identityNumber}}&nbsp;</el-col>
        <el-col :span="4">银行信息</el-col>
        <el-col
          :span="8"
        >{{userData.province}}&nbsp;&nbsp;{{userData.city}}&nbsp;&nbsp;{{userData.region}}&nbsp;&nbsp;{{userData.bankName}}&nbsp;&nbsp;{{userData.bankSubbranch}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">手机号码</el-col>
        <el-col :span="8">
          {{userData.mobile}}
          <el-button type="text" @click="handleSendMessage(userData.mobile)">发送短信</el-button>
        </el-col>
        <el-col :span="4">银行账号</el-col>
        <el-col :span="8">{{userData.bankCard}}&nbsp;&nbsp;{{userData.bankBind ==0?'未绑卡':'已绑卡'}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">支付宝号</el-col>
        <el-col :span="8">
          {{userData.alipay}}
          {{userData.alipayBind == 1?'已绑定':'未绑定'}}
        </el-col>
      </el-row>
    </div>
    <div class="title">登录日志</div>
    <div class="content">
      <el-row
        v-for="(item,index) in logList"
        :key="index"
      >{{item.gmtCreate}} {{item.phoneType}} {{item.loginIp}}</el-row>
    </div>
    <el-pagination
      style="text-algin:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30,]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
    <update-or-history
      v-if="UpdateOrHistoryVisble"
      @refGetConsumerInfo="handleGetConsumerInfo"
      ref="UpdateOrHistory"
    ></update-or-history>
    <send-message-dialog v-if="sendMessageDialogVisible" ref="sendMessage"></send-message-dialog>
  </div>
</template>
<script>
import { apiGetConsumerInfo } from "@/api/user";
import UpdateOrHistory from "./user-update-or-history";
import sendMessageDialog from "./send-message-dialog";
export default {
  components: {
    UpdateOrHistory,
    sendMessageDialog
  },
  data() {
    return {
      UpdateOrHistoryVisble: false,
      sendMessageDialogVisible: false,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      userData: {},
      logList: []
    };
  },
  created() {
    this.handleGetConsumerInfo();
  },
  methods: {
    handleGetConsumerInfo() {
      //获取用户详情
      apiGetConsumerInfo({
        id: this.$route.query.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then(res => {
        if (res.status == 200) {
          this.userData = res.data;
          this.logList = res.data.listLoginLog;
          this.totalCount = res.data.totalCount;
          this.pageNo = res.data.pageNo;
        }
      });
    },
    handleSendMessage(val) {
      //发送短信
      this.sendMessageDialogVisible = true;
      this.$nextTick(() => {
        this.$refs["sendMessage"].init(val);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleGetConsumerInfo();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.handleGetConsumerInfo();
    },
    handleUpdateOrHistory(id, type) {
      this.UpdateOrHistoryVisble = true;
      this.$nextTick(() => {
        this.$refs.UpdateOrHistory.init(id, type);
      });
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
    .el-row {
      height: 40px;
      margin: 0 0 0 -8px !important;
      line-height: 40px;
      border-bottom: 1px solid #eaeaea;
      .el-col {
        border-right: 1px solid #eaeaea;
      }
    }
  }
}
</style>
