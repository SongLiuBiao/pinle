<template>
  <div class="box">
    <div class="header">
      <div class="title">提现申请搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="value">
                  <label>进出ID</label>
                  <el-input v-model="formInline.id"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <label>用户</label>
                  <el-input v-model="formInline.userName" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <label>时间</label>
                  <el-date-picker
                    v-model="formInline.beginTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="user">
                  <label>到</label>
                  <el-date-picker
                    v-model="formInline.endTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="value">
                  <label>金额</label>
                  <el-input v-model="formInline.minMoney" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <label>到</label>
                  <el-input v-model="formInline.maxMoney" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="value">
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
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <div class="grid-content bg-purple">
                    <el-button type="primary" @click="handleGetlistCapitalWithdraw(1)">搜素</el-button>
                    <el-button type="primary" @click="handleExportwithdraw()">导出</el-button>
                  </div>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="进出ID" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/turnoverdetail?id='+scope.row.id">
              <el-button type="text">{{scope.row.id}}</el-button>
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
        <el-table-column prop="amount" align="center" label="金额"></el-table-column>
        <el-table-column prop="statusDesc" align="center" label="状态"></el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话"></el-table-column>
        <el-table-column prop="gmtCreate" align="center" label="时间" width="170"></el-table-column>
      </el-table>
      <div class="aggregate">
        本页总计{{totalMoney}}元;全部合计{{sumMoney}}元
        <el-row>
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="12">
            <el-pagination
              style="text-algin:right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.pageNo"
              :page-sizes="[10, 20, 30]"
              :page-size="formInline.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetListCapitalWithdraw, apiExportWithdraw } from "@/api/finance";
import { handleDownload } from "@/util/util";
export default {
  data() {
    return {
      dialogVisible: false,
      statusS: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "申请提现",
          value: "1"
        },
        {
          label: "审核通过",
          value: "2"
        },
        {
          label: "审核拒绝",
          value: "3"
        }
      ],
      totalMoney: 0,
      sumMoney: 0,
      totalCount: 0,

      formInline: {
        id: "",
        userName: "",
        status: "",
        minMoney: "",
        maxMoney: "",
        beginTime: null,
        endTime: null,
        pageNo: 1,
        pageSize: 10
      },
      list: []
    };
  },
  created() {
    this.handleGetlistCapitalWithdraw();
  },
  methods: {
    handleGetlistCapitalWithdraw(pageNo) {
      //获取提现列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListCapitalWithdraw(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.list;
          this.totalMoney = res.data.totalMoney;
          this.sumMoney = res.data.sumMoney;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    handleExportwithdraw() {
      apiExportWithdraw(this.formInline).then(res => {
        handleDownload(res.data);
      });
    },

    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetlistCapitalWithdraw();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetlistCapitalWithdraw();
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
            width: 75% !important;
          }
          .el-select {
            width: 75% !important;
          }
          .el-radio-group {
            margin-right: 20px;
          }
          label {
            width: 22%;
            display: inline-block;
          }
        }
      }
    }
  }
  .content {
    margin-top: 50px;
    .aggregate {
      color: rgb(51, 51, 51);
      margin-top: 20px;
      border: 1px solid #eaeaea;
      border-top: none;
      text-align: center;
     
    }
  }
}
</style>
