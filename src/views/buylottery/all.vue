<template>
  <div class="box">
    <div class="header">
      <div class="title">方案搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="formInline" :model="formInline">
          <el-row>
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
                <el-form-item label prop="issue">
                  <label>奖期</label>
                  <el-input v-model="formInline.issue"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="status">
                  <label>状态</label>
                  <el-select v-model="formInline.status" placeholder="请选择">
                    <el-option
                      v-for="item in status"
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
                <el-form-item prop="id">
                  <label>方案ID</label>
                  <el-input v-model="formInline.id"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="schemeNo">
                  <label>编号</label>
                  <el-input v-model="formInline.schemeNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
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
            <el-col :span="4">
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
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="prizeStart">
                  <label>奖金</label>
                  <el-input v-model="formInline.prizeStart"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label prop="prizeEnd">
                  <label>到</label>
                  <el-input v-model="formInline.prizeEnd"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-button type="primary" @click="handleGetlistScheme(1)">搜索</el-button>
                  <el-button type="primary" @click="resetForm('formInline')">重置</el-button>
                  <el-button type="primary" @click="handleExportListScheme()">导出</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">方案</div>
      <el-table :data="list" v-if="list.length>0" border style="width: 100%">
        <el-table-column label="方案ID" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/schemedetails?id='+scope.row.id">
              <el-button type="text">{{scope.row.id}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="schemeNo" align="center" label="方案编号"></el-table-column>
        <el-table-column align="center" label="用户">
          <template slot-scope="scope">
            <router-link :to="'/moment/userdetails?id='+scope.row.userId">
              <el-button type="text">{{scope.row.userName}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop align="center" label="彩种">
          <template slot-scope="scope">
            <router-link :to="'/moment/lotterydetails?id='+scope.row.lotteryId">
              <el-button type="text">{{scope.row.lotteryName}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="issue" align="center" label="奖期"></el-table-column>
        <el-table-column prop="playTypeDesc" align="center" label="玩法"></el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            {{scope.row.statusDesc}}
            <template v-if="scope.row.status == 2">
              <a href @click.prevent="dialogVisible=true;id=scope.row.id">⊙</a>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="multiple" align="center" label="倍数"></el-table-column>
        <el-table-column prop="money" align="center" label="投注金额"></el-table-column>
        <el-table-column prop="prize" align="center" label="中奖金额"></el-table-column>
        <el-table-column prop="gmtCreate" align="center" width="180" label="时间">
          <template slot-scope="scope">{{scope.row.gmtCreate}}</template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col
          :span="12"
        >本页总投注 {{totalMoney}} 元; 中奖总计 {{totalHittedMoney}}元; 全部投注总计 {{sumMoney}} 元; 全部中奖总计 {{sumHittedMoney}} 元;</el-col>
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

    <el-dialog :visible.sync="dialogVisible" width="20%" top="40vh">
      <el-row>
        <el-button type="primary" style="float:left" @click="handleBuyIntoCompulsory()">出票</el-button>
        <el-button type="primary" style="float:right" @click="handleReversal()">撤单</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiGetListLottery,
  apiGetListScheme,
  apiReversal,
  apiBuyIntoCompulsory,
  apiExportListScheme
} from "@/api/lottery";
import { handleDownload } from "@/util/util";
export default {
  data() {
    return {
      dialogVisible: false,
      list: [],
      totalMoney: "",
      totalHittedMoney: "",
      sumMoney: "",
      sumHittedMoney: "",
      totalCount: 0,
      id: "",
      status: [
        { label: "全部", value: "" },
        { label: "认购中", value: "1" },
        { label: "委托中", value: "2" },
        { label: "成功", value: "3" },
        { label: "追号中", value: "4" },
        { label: "中奖", value: "5" },
        { label: "未中奖", value: "6" },
        { label: "撤单", value: "7" },
        { label: "待领取", value: "8" },
        { label: "已出票", value: "-2" }
      ],
      formInline: {
        lotteryId: "",
        issue: "",
        status: "",
        id: "",
        schemeNo: "",
        gmtCreateStart: null,
        gmtCreateEnd: null,
        moneyStart: null,
        moneyEnd: null,
        prizeStart: "",
        prizeEnd: "",
        pageNo: 1,
        pageSize: 10
      },

      lotterys: []
    };
  },
  created() {
    this.handleGetLotterys();
    this.handleGetlistScheme();
  },

  methods: {
    handleGetLotterys() {
      //获取彩票种类
      apiGetListLottery({}).then(res => {
        if (res.status == 200) {
          this.lotterys = res.data;
          this.lotterys.unshift({ name: "全部", id: "" });
        }
      });
    },
    handleGetlistScheme(pageNo) {
      // 获取全部订单列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListScheme(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.listScheme;
          this.totalMoney = res.data.totalMoney;
          this.totalHittedMoney = res.data.totalHittedMoney;
          this.sumMoney = res.data.sumMoney;
          this.sumHittedMoney = res.data.sumHittedMoney;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    handleReversal() {
      // 手动撤单
      apiReversal({ id: this.id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.dialogVisible = false;
          this.handleGetlistScheme();
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
    handleBuyIntoCompulsory() {
      // 方案出票
      apiBuyIntoCompulsory({ id: this.id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.dialogVisible = false;
          this.handleGetlistScheme();
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1500
          });
        } else
          this.$message({
            message: res.data.msg,
            type: "warning",
            duration: 1500
          });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetlistScheme();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetlistScheme();
    },
    handleExportListScheme() {
      // 导出全都订单列表
      apiExportListScheme(this.formInline).then(res => {
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
