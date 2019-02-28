<template>
  <div class="box">
    <div class="header">
      <div class="title">中奖方案搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="userName">
                  <label>用户</label>
                  <el-input v-model="formInline.userName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="issue">
                  <label>奖期ID</label>
                  <el-input v-model="formInline.issue"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item prop="value">
                  <label>彩票</label>
                  <el-select v-model="formInline.lotteryId" placeholder="请选择">
                    <el-option
                      v-for="item in lotterys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="status">
                  <label>状态</label>
                  <el-select v-model="formInline.status" placeholder="请选择">
                    <el-option
                      v-for="item in statusS"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <label>类型</label>
                  <el-select v-model="formInline.prizeType" placeholder="请选择">
                    <el-option
                      v-for="item in prizeTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple myCustom">
                <el-form-item prop="gmtCreateStart">
                  <label>时间</label>
                  <el-date-picker
                    v-model="formInline.gmtCreateStart"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple myCustom">
                <el-form-item label prop="gmtCreateEnd">
                  <label>到</label>
                  <el-date-picker
                    v-model="formInline.gmtCreateEnd"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="moneyStart">
                  <label>金额</label>
                  <el-input v-model="formInline.moneyStart"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="moneyEnd">
                  <label>到&nbsp;&nbsp;&nbsp;</label>
                  <el-input v-model="formInline.moneyEnd"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-button type="primary" @click="handleGetListPrize(1)">搜索</el-button>
                  <el-button type="primary" @click="handleExportPrize()">导出</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">中奖方案</div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="方案ID" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/schemedetails?id='+scope.row.schemeId">
              <el-button type="text">{{scope.row.schemeId}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户">
          <template slot-scope="scope">
            <router-link :to="'/moment/userdetails?id='+scope.row.userId">
              <el-button type="text">{{scope.row.userName}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="issue" align="center" label="奖期">
          <template slot-scope="scope">
            <router-link :to="'/moment/issueDetails?id='+scope.row.issueId">
              <el-button type="text">{{scope.row.issue}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">{{scope.row.prizeType == 1?'小奖':"大奖"}}</template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">待领取
              <el-button
                type="primary"
                size="mini"
                @click="handleDealCapitalPrize(scope.row.id)"
              >兑奖</el-button>
            </span>
            <span v-if="scope.row.status == 2">已兑奖</span>
          </template>
        </el-table-column>

        <el-table-column prop="prizeAmount" align="center" label="中奖金额"></el-table-column>
        <el-table-column prop="preTaxPrizeAmount" align="center" label="税前中奖金额"></el-table-column>
        <el-table-column prop="phone" align="center" label="联系人"></el-table-column>
        <el-table-column prop="gmtModified" align="center" label="变动时间"></el-table-column>
        <el-table-column prop="gmtCreate" align="center" width="180" label="时间"></el-table-column>
      </el-table>
      <el-row>
        <el-col :span="12">本页总金额 {{totalMoney}} 元;全部总金额 {{sumMoney}} 元;</el-col>
        <el-col :span="12">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formInline.pageNo"
            :page-sizes="[10,20,30]"
            :page-size="formInline.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  apiGetListPrize,
  apiExportPrize,
  apiDealCapitalPrize
} from "@/api/finance";
import { apiGetListLottery } from "@/api/lottery";
import { handleDownload } from "@/util/util";
export default {
  data() {
    return {
      list: [],
      totalMoney: "",
      sumMoney: "",
      totalCount: 0,
      formInline: {
        userName: "",
        status: "1",
        prizeType: "1",
        minMoney: "",
        maxMoney: "",
        beginTime: null,
        endTime: null,
        lotteryId: "",
        issueId: "",
        pageNo: 1,
        pageSize: 10
      },
      statusS: [
        {
          value: "1",
          label: "待领取"
        },
        {
          value: "2",
          label: "已兑奖"
        }
      ],
      prizeTypes: [
        {
          value: "1",
          label: "小奖"
        },
        {
          value: "2",
          label: "大奖"
        }
      ],
      lotterys: []
    };
  },
  created() {
    this.handleGetLotterys();
    this.handleGetListPrize();
  },

  methods: {
    handleGetLotterys() {
      // 获取彩票种类
      apiGetListLottery({}).then(res => {
        if (res.status == 200) {
          this.lotterys = res.data;
          this.lotterys.unshift({ name: "全部", id: "" });
        }
      });
    },
    handleGetListPrize(pageNo) {
      // 获取中奖列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListPrize(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.list;
          this.totalMoney = res.data.totalMoney;
          this.sumMoney = res.data.sumMoney;
          this.totalCount = res.data.totalCount;
          this.totalPage = res.data.totalPage;
          this.pageNo = res.data.pageNo;
        }
      });
    },
    handleDealCapitalPrize(id) {
      // 兑奖
      this.$confirm(`确定要兑奖id为${id}的用户么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDealCapitalPrize({ id: id }).then(res => {
          if (res.status == 200 && res.data.code === 1000) {
            this.handleGetListPrize();
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
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.formInline.pageSize = val;
      this.handleGetListPrize();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.formInline.pageNo = val;
      this.handleGetListPrize();
    },
    handleExportPrize() {
      // 中奖列表导出
      apiExportPrize(this.formInline).then(res => {
        handleDownload(res.data);
      });
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
        line-height: 32px;
        margin: 0 !important;
        .el-col {
          border-right: 1px solid #eaeaea;
          padding-top: 8px;
        }

        .el-form-item {
          margin: 0 0 8px 8px;
          .el-input {
            width: 70% !important ;
          }
          .el-select {
            width: 70% !important;
          }
          .el-radio-group {
            margin-right: 80px;
          }
          label {
            width: 25%;
            display: inline-block;
          }
        }
        .myCustom {
          .el-form-item {
            .el-input {
              width: 80% !important ;
            }
            label {
              width: 18%;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .content {
    margin-top: 50px;
    .el-row {
      color: rgb(51, 51, 51);
      padding: 10px 0;
      border: 1px solid #eaeaea;
      border-top: none;
      text-align: center;
    }
  }
}
</style>
