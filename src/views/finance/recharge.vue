<template>
  <div class="box">
    <div class="header">
      <div class="title">充值明细搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="id">
                  <label>进出ID</label>
                  <el-input v-model="formInline.id"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="userName">
                  <label>用户</label>
                  <el-input v-model="formInline.userName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="type">
                  <label>类型</label>
                  <el-select v-model="formInline.type" placeholder="请选择">
                    <el-option
                      v-for="item in types"
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
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="minMoney">
                  <label>金额</label>
                  <el-input v-model="formInline.minMoney"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="maxMoney">
                  <label>到</label>
                  <el-input v-model="formInline.maxMoney"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="beginTime">
                  <label>时间</label>
                  <el-date-picker
                    v-model="formInline.beginTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="endTime">
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
                <el-form-item label prop="payNo">
                  <label>支付订单号</label>
                  <el-input v-model="formInline.payNo"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="detail">
                  <label>详细说明</label>
                  <el-input v-model="formInline.detail"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <div class="grid-content bg-purple">
                  <el-button type="primary" @click="handleGetRechargeList(1)">查询</el-button>
                  <el-button type="primary" @click="resetForm('from')">重置</el-button>
                  <el-button type="primary" @click="handelExportRecharge()">导出</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="进出ID" align="center">
          <template slot-scope="scope">
            <a
              href
              @click.prevent="handelGetRechargeInfo(scope.row.id)"
              style="color:#17b3a3"
            >{{scope.row.id}}</a>
          </template>
        </el-table-column>

        <el-table-column prop="payNo" align="center" width="220" label="支付订单号"></el-table-column>
        <el-table-column align="center" label="用户">
          <template slot-scope="scope">
            <router-link
              :to="'/moment/userdetails?id='+scope.row.userId"
              style="color:#17b3a3"
            >{{scope.row.userName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">
            <template v-if="scope.row.type == 1">支付宝充值</template>
            <template v-if="scope.row.type == 2">微信充值</template>
            <template v-if="scope.row.type == 3">后台充值</template>
          </template>
        </el-table-column>
        <el-table-column prop="detail" align="center" label="详细说明"></el-table-column>
        <el-table-column prop="amount" align="center" label="金额"></el-table-column>
        <el-table-column prop="name" align="center" label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.status == -1">未成功</template>
            <template v-if="scope.row.status == 0">充值中</template>
            <template v-if="scope.row.status == 1">成功</template>
          </template>
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系电话"></el-table-column>
        <el-table-column prop="gmtCreate" align="center" label="时间"></el-table-column>
      </el-table>
      <div class="aggregate">
        本页总计 {{totalMoney}} 元; 全部合计 {{sumMoney}} 元;
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

    <el-dialog class="Dialog" title="进出明细" :visible.sync="dialogVisible" width="50%">
      <div class="Dialog-content">
        <el-row :gutter="30">
          <el-col :span="4">进出ID</el-col>
          <el-col :span="20">{{data.id}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">用户</el-col>
          <el-col :span="20">{{data.userName}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">类型</el-col>
          <el-col :span="20" v-if="data.type == 1">支付宝充值</el-col>
          <el-col :span="20" v-if="data.type == 2">微信充值</el-col>
          <el-col :span="20" v-if="data.type == 3">后台充值</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">详细说明</el-col>
          <el-col :span="20">{{data.detail}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">联系电话</el-col>
          <el-col :span="20">{{data.phone}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">金额</el-col>
          <el-col :span="20">{{data.amount}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">状态</el-col>
          <el-col :span="20" v-if="data.status ==-1">未成功</el-col>
          <el-col :span="20" v-if="data.status == 0">充值中&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button size="mini" type="primary" @click="handleUpdateStatus(1)">补单</el-button>
            <el-button size="mini" type="primary" @click="handleUpdateStatus(2)">失败</el-button>
          </el-col>
          <el-col :span="20" v-if="data.status == 1">成功</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">时间</el-col>
          <el-col :span="20">{{data.gmtCreate}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">处理时间</el-col>
          <el-col :span="20">{{data.gmtModified}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">处理管理员</el-col>
          <el-col :span="20">{{data.adminName}}</el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="4">支付ID(网上支付)</el-col>
          <el-col :span="20">{{data.payNo}}</el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="4">订单号(网上支付)</el-col>
          <el-col :span="20">{{data.tradeNo}}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiGetRechargeList,
  apiGetRechargeInfo,
  apiUpdateStatus,
  apiExportRecharge
} from "@/api/finance";
import { handleDownload } from "@/util/util";
export default {
  data() {
    return {
      dialogVisible: false,
      sumMoney: 0,
      totalMoney: 0,
      totalCount: 0,
      data: {},

      types: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "支付宝充值"
        },
        {
          value: "2",
          label: "微信充值"
        },
        {
          value: "3",
          label: "后台充值"
        }
      ],
      statusS: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "-1",
          label: "未成功"
        },
        {
          value: "0",
          label: "充值中"
        },
        {
          value: "1",
          label: "成功"
        }
      ],
      formInline: {
        pageNo: 1,
        pageSize: 10,
        id: "",
        userName: "",
        type: "",
        status: "",
        minMoney: "",
        maxMoney: "",
        beginTime: null,
        endTime: null,
        payNo: "",
        detail: ""
      },
      list: []
    };
  },
  created() {
    this.handleGetRechargeList();
  },
  methods: {
    handleGetRechargeList(pageNo) {
      //充值列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetRechargeList(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.list;
          this.totalMoney = res.data.totalMoney;
          this.sumMoney = res.data.sumMoney;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    handelGetRechargeInfo(id) {
      //充值详情
      this.dialogVisible = true;
      apiGetRechargeInfo({ id: id }).then(res => {
        if (res.status == 200) {
          this.data = res.data;
        }
      });
    },

    handleUpdateStatus(type) {
      //修改充值状态
      apiUpdateStatus({ type: type, id: this.data.id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.dialogVisible = false;
          this.handleGetRechargeList();
          this.$message({
            message: "操作成功",
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
    },
    handelExportRecharge() {
      //充值列表导出
      apiExportRecharge(this.formInline).then(res => {
        handleDownload(res.data);
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetRechargeList();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetRechargeList();
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
            width: 80px;
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
  .Dialog {
    .Dialog-content {
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
}
</style>
