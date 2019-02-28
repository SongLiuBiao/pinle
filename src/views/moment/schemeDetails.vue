<template>
  <div class="box">
    <div class="title">方案</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">方案ID</el-col>
        <el-col :span="20">{{data.id}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">用户</el-col>
        <el-col :span="20">
          <router-link :to="'/moment/userDetails?id='+data.userId">
            <el-button type="text">{{data.username}}</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">彩票</el-col>
        <el-col :span="20">
          <router-link :to="'/moment/lotteryDetails?id='+data.lotteryId">
            <el-button type="text">{{data.lotteryName}}</el-button>
          </router-link>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案类型</el-col>
        <el-col :span="20">{{data.playTypeDesc}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案状态</el-col>
        <el-col :span="20">{{data.statusDesc}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案描述</el-col>
        <el-col :span="20">{{data.description}}</el-col>
      </el-row>
      <template v-if="data.lotteryName == '竞彩足球'">
        <el-row :gutter="30">
          <el-col :span="4">方案号码</el-col>
          <el-col :span="20">
            <el-row>
              <p>类型:{{data.playTypeDesc}}&nbsp;&nbsp;倍数:{{data.multiple}}&nbsp;&nbsp;注数:{{data.unit}}</p>
              <p>
                过关方式:
                <span v-for="(item,index) in this.data.passType" :key="index">{{item}}</span>
              </p>
            </el-row>
            <el-row :gutter="30">
              <el-table :data="this.data.schemeContent.match" border style="width: 100%">
                <el-table-column label="场次" align="center">
                  <template slot-scope="scope">{{scope.row.weekDay}}&nbsp;&nbsp;{{scope.row.teamId}}</template>
                </el-table-column>
                <el-table-column label="主队" prop="hostName" align="center"></el-table-column>
                <el-table-column label="客队" prop="guestName" align="center"></el-table-column>
                <el-table-column label="投注" prop="oddsDesc" align="center"></el-table-column>
                <el-table-column label="时间" prop="matchTime" align="center"></el-table-column>
                <el-table-column label="赛果" prop="bingos" align="center">
                  <template slot-scope="scope" v-if="scope.row.bingos">
                    <pre>{{scope.row.bingos.replace(/,/g, " \n ")}}</pre>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row :gutter="30">
          <el-col :span="4">方案号码</el-col>
          <el-col :span="20">
            <p>类型:{{data.playTypeDesc}}&nbsp;&nbsp;倍数:{{data.multiple}}&nbsp;&nbsp;注数:{{data.unit}}</p>

            <p
              v-for="(item,index) in data.schemeContent.numbers"
              :key="index"
            >{{item.typeDesc}}:{{item.number}},</p>
          </el-col>
        </el-row>
      </template>
      <el-row :gutter="30">
        <el-col :span="4">是否追加</el-col>
        <el-col :span="20">{{data.isAddition == 0?'不追加':'追加'}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">公开情况</el-col>
        <el-col :span="20">
          <p v-if="data.openType == 0">不公开</p>
          <p v-if="data.openType == 1">公开</p>
          <p v-if="data.openType == 2">参与后公开</p>
          <p v-if="data.openType == 3">截止后公开</p>
          <p v-if="data.openType == 4">开奖后公开</p>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案金额</el-col>
        <el-col :span="20">{{data.money}}元</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">中奖明细</el-col>
        <el-col :span="20" v-html="data.prizeDetail"></el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">发起时间</el-col>
        <el-col :span="20">{{data.gmtCreate}}</el-col>
      </el-row>
    </div>
    <div class="title">购买安排</div>
    <el-table :data="data.listSchemeTicket" border style="width: 100%">
      <el-table-column label="票号" prop="id" align="center"></el-table-column>
      <el-table-column label="奖期" align="center">
        <template slot-scope="scope">
          <router-link :to="'/moment/issuedetails?id='+scope.row.issueId">
            <el-button type="text">{{scope.row.issue}}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="开奖时间" prop="drawTime" align="center"></el-table-column>
      <el-table-column label="倍数" prop="multiple" align="center"></el-table-column>
      <el-table-column label="金额" prop="money" align="center"></el-table-column>
      <el-table-column label="奖金" prop="prizeSubjoin" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.statusTitle}}
          <template v-if="scope.row.status == 0">
            <a href @click.prevent="dialogVisible=true;id=scope.row.id">⊙</a>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="兑奖号码" prop="drawNumber" align="center"></el-table-column>
      <!-- <el-table-column label="票信息" prop="date" align="center">
        <template slot-scope="scope">
          {{scope.row.schemeExtendId}}
          <el-button type="text" style="color:#17b3a3">传票管理</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="20%">
      <el-row>
        <el-button type="primary" style="float:left" @click="handleTicketDrawBill()">出票</el-button>
        <el-button type="primary" style="float:right" @click="handleReversal()">撤单</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  apiGetSchemeInfo,
  apiReversal,
  apiTicketDrawBill
} from "@/api/lottery";
export default {
  data() {
    return {
      data: {},
      dialogVisible: false,
      id: "",

      formInline: {
        id: ""
      }
    };
  },
  created() {
    this.handleGetSchemeInfo();
  },
  methods: {
    handleGetSchemeInfo() {
      // 获取方案详情
      apiGetSchemeInfo({ id: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.data = res.data;
          this.data.passType = this.data.passType.split(",");
          for (var i = 0; i < this.data.passType.length; i++) {
            switch (this.data.passType[i]) {
              case "1":
                this.data.passType[i] = "单关,";
                break;
              case "2":
                this.data.passType[i] = "2串1,";
                break;
              case "3":
                this.data.passType[i] = "3串1,";
                break;
              case "4":
                this.data.passType[i] = "4串1,";
                break;
              case "5":
                this.data.passType[i] = "5串1,";
                break;
              case "6":
                this.data.passType[i] = "6串1,";
                break;
              case "7":
                this.data.passType[i] = "7串1,";
                break;
              case "8":
                this.data.passType[i] = "8串1,";
                break;
              default:
            }
          }
        }
      });
    },
    handleReversal() {
      // 手动撤单
      apiReversal({ id: this.data.id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.handleGetSchemeInfo();
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
    },
    handleTicketDrawBill() {
      // 手动出票
      apiTicketDrawBill({ id: this.id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.dialogVisible = false;
          this.handleGetSchemeInfo();
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
  },
  computed: {
    evenNumbers: function() {
      return this.data.passType.filter(function(number) {
        if (number == 2) {
          return "胆管";
        }
      });
    }
  },

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
  }
  .content {
    padding-left: 8px;
    margin-bottom: 20px;
    border: 1px solid #eaeaea;
    .el-row {
      margin: 0 0 0 -8px !important;
      border-bottom: 1px solid #eaeaea;
      .el-col {
        border-right: 1px solid #eaeaea;
      }
    }
  }
}
</style>
