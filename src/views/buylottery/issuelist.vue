<template>
  <div class="box">
    <div class="header">
      <el-form :inline="true" :model="formInline" ref="fromInline" class="demo-form-inline">
        <el-row>
          <el-col :span="6">
            <el-form-item label="类型" prop="lotteryId">
              <el-select v-model="formInline.lotteryId" placeholder="超级大乐透">
                <el-option
                  v-for="item in lotterys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="奖期ID" prop="id">
              <el-input v-model="formInline.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="期号" prop="startIssue">
              <el-input v-model="formInline.startIssue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到" prop="endIssue">
              <el-input v-model="formInline.endIssue"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="handleAddIssue()">新建</el-button>
            <el-button
              type="danger"
              :disabled="multipleSelection.length <= 0"
              @click="handleDeleteIssue()"
            >批量删除</el-button>
            <el-button
              type="primary"
              @click="handleGetListIssue(1);formInline.isSevenDayIssue =1"
            >7天奖期</el-button>
            <el-button
              type="primary"
              @click="handleGetListIssue(1);formInline.isSevenDayIssue =''"
            >查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <div class="title">奖期({{issTypeDesc}})</div>
      <el-table
        ref="multipleTable"
        :data="issueList"
        tooltip-effect="dark"
        border
        style="width:100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="奖期ID" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/issuedetails?id='+scope.row.id">
              <el-button type="text">{{scope.row.id}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="issue" label="期号" align="center"></el-table-column>
        <el-table-column prop="drawNumber" label="开奖号码" align="center"></el-table-column>
        <el-table-column label="兑奖" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.encashProcess ==0">未兑奖</template>
            <template v-if="scope.row.encashProcess ==1">已兑奖</template>
            <template v-if="scope.row.encashProcess ==2">处理中</template>
          </template>
        </el-table-column>
        <el-table-column label="开奖" align="center">
          <template slot-scope="scope">{{scope.row.drawStatus == 0?'未开奖':'已开奖'}}</template>
        </el-table-column>
        <el-table-column label="销售" align="center">
          <template slot-scope="scope">{{scope.row.isSell == 1?'是':'否'}}</template>
        </el-table-column>
        <el-table-column label="最后处理" align="center">
          <template slot-scope="scope">{{scope.row.lastProcess == 0?'未处理':'已处理'}}</template>
        </el-table-column>
        <el-table-column prop="sellStartTime" label="销售开始时间" align="center"></el-table-column>
        <el-table-column prop="sellEndTime" label="销售截止时间" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pageNo"
        :page-sizes="[10, 20,30]"
        :page-size="formInline.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <add-or-update
      ref="addorUpdate"
      v-if="addorUpdateVisible"
      :lotteryId="formInline.lotteryId"
      @refissuseList="handleGetListIssue()"
    ></add-or-update>
  </div>
</template>
<script>
import AddOrUpdate from "../moment/issue-add-or-update";
import {
  apiGetListIssue,
  apiGetListLottery,
  apiDeleteIssue
} from "@/api/lottery";

export default {
  data() {
    return {
      multipleSelection: [],
      addorUpdateVisible: false,
      dialogVisible2: false,
      totalCount: 0,
      issTypeDesc: "",
      lotterys: [],
      issueList: [],
      formInline: {
        isSevenDayIssue: "",
        lotteryId: 3,
        id: "",
        startIssue: "",
        endIssue: "",
        pageSize: 10,
        pageNo: 1
      }
    };
  },
  created() {
    this.handleGetListIssue();
    this.handleGetLotterys();
  },
  methods: {
    handleGetListIssue(pageNo) {
      // 获取奖期列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListIssue(this.formInline).then(res => {
        if (res.status == 200) {
          this.totalCount = res.data.totalCount;
          this.issTypeDesc = res.data.issTypeDesc;
          this.issueList = res.data.list;
        }
      });
    },
    handleGetLotterys() {
      // 获取彩票种类
      apiGetListLottery({}).then(res => {
        if (res.status == 200) {
          this.lotterys = res.data;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleAddIssue() {
      // 新增奖期
      this.addorUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addorUpdate.init();
      });
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListIssue();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListIssue();
    },
    handleDeleteIssue() {
      // 删除奖期
      let ids = this.multipleSelection.map(i => {
        return i.id;
      });
      this.$confirm(`确定对id为[${ids.join(",")}]的奖期删除么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDeleteIssue({ ids: ids }).then(res => {
          if (res.status == 200 && res.data.code == 1000) {
            this.handleGetListIssue();
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
    }
  },
  components: {
    AddOrUpdate
  }
};
</script>

<style scoped lang="scss">
.box {
  .el-input {
  }
  .content {
    .title {
      color: rgb(51, 51, 51);
      height: 40px;
      line-height: 40px;
      font-weight: 400;
      background: rgb(233, 233, 233);
      padding-left: 8px;
    }

    .el-pagination {
      text-align: right;
      padding: 8px;
    }
  }
}
</style>

