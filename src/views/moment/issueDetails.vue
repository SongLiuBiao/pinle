<template>
  <div class="box">
    <el-button type="primary" @click="dialogVisible=true">开奖号码</el-button>
    <el-button type="primary" @click="handleProcssIssueLost()">掉期处理</el-button>
    <el-button type="primary" @click="handleReversal()">一键撤单</el-button>
    <el-button type="primary" @click="handleRedeemRestore()">兑奖还原</el-button>
    <el-button type="primary" @click="handleUpdate(data.id)">修改</el-button>
    <div class="title">奖期</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">奖期ID</el-col>
        <el-col :span="20">{{data.id}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">彩票</el-col>
        <el-col :span="20">{{data.lotteryName}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">期号</el-col>
        <el-col :span="20">{{data.issue}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">开奖号码</el-col>
        <el-col :span="20">{{data.drawNumber}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">开奖时间</el-col>
        <el-col :span="20">{{data.drawTime}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">销售</el-col>
        <el-col :span="20">{{data.isSell == 1?'是':'否'}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">销售开始时间</el-col>
        <el-col :span="20">{{data.sellStartTime}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">销售截止时间</el-col>
        <el-col :span="20">{{data.sellEndTime}}</el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :span="4">方案最后处理</el-col>
        <el-col :span="20">{{data.lastProcess == 0?'未处理':'已处理'}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案最后处理时间</el-col>
        <el-col :span="20">{{data.lastProcessTime}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案兑奖处理</el-col>
        <el-col :span="20" v-if="data.encashProcess == 0">未兑奖</el-col>
        <el-col :span="20" v-if="data.encashProcess == 1">已兑奖</el-col>
        <el-col :span="20" v-if="data.encashProcess == 2">处理中</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">方案兑奖处理时间</el-col>
        <el-col :span="20">{{data.encashProcessTime }}</el-col>
      </el-row>
    </div>
    <template v-if="data.lotteryId == 4">
      <div class="title">单关比赛代号修改（如果取消比赛，兑奖将按照全对处理，赔率为1）</div>
      <el-table :data="data.ListFootballMatch1" border style="width: 100%">
        <el-table-column prop="matchCode" label="代号" align="center"></el-table-column>
        <el-table-column prop="season" label="场次" align="center"></el-table-column>
        <el-table-column prop="leagueName" label="联赛" align="center"></el-table-column>
        <el-table-column prop="hostName" label="主队" align="center"></el-table-column>
        <el-table-column prop="guestName" label="客队" align="center"></el-table-column>
        <el-table-column prop="matchTime" label="比赛时间" align="center"></el-table-column>
        <el-table-column label="胜平负投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.spfSingleStatus == 0">销售中</span>
            <span v-if="scope.row.spfSingleStatus == 1">停止销售</span>
            <span v-if="scope.row.spfSingleStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.spfSingleStatus == 3">奖金处理完</span>
            <span v-if="scope.row.spfSingleStatus == 4">取消</span>
            <span v-if="scope.row.spfSingleStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="让球胜平负投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.rqSpfSingleStatus == 0">销售中</span>
            <span v-if="scope.row.rqSpfSingleStatus == 1">停止销售</span>
            <span v-if="scope.row.rqSpfSingleStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.rqSpfSingleStatus == 3">奖金处理完</span>
            <span v-if="scope.row.rqSpfSingleStatus == 4">取消</span>
            <span v-if="scope.row.rqSpfSingleStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="总进球投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.zjqSingleStatus == 0">销售中</span>
            <span v-if="scope.row.zjqSingleStatus == 1">停止销售</span>
            <span v-if="scope.row.zjqSingleStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.zjqSingleStatus == 3">奖金处理完</span>
            <span v-if="scope.row.zjqSingleStatus == 4">取消</span>
            <span v-if="scope.row.zjqSingleStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="比分投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.bfSingleStatus == 0">销售中</span>
            <span v-if="scope.row.bfSingleStatus == 1">停止销售</span>
            <span v-if="scope.row.bfSingleStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.bfSingleStatus == 3">奖金处理完</span>
            <span v-if="scope.row.bfSingleStatus == 4">取消</span>
            <span v-if="scope.row.bfSingleStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="半全场投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.bqcSingleStatus == 0">销售中</span>
            <span v-if="scope.row.bqcSingleStatus == 1">停止销售</span>
            <span v-if="scope.row.bqcSingleStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.bqcSingleStatus == 3">奖金处理完</span>
            <span v-if="scope.row.bqcSingleStatus == 4">取消</span>
            <span v-if="scope.row.bqcSingleStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdateFootOrGetInfoballMatch(scope.row.id,1)">编辑</el-button>
            <el-button type="text" @click="handleUpdateFootOrGetInfoballMatch(scope.row.id,2)">足球开奖</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="title">过关比赛代号修改（如果取消比赛，兑奖将按照全对处理，赔率为1）</div>
      <el-table :data="data.ListFootballMatch2" border style="width: 100%">
        <el-table-column prop="matchCode" label="代号" align="center"></el-table-column>
        <el-table-column prop="season" label="场次" align="center"></el-table-column>
        <el-table-column prop="leagueName" label="联赛" align="center"></el-table-column>
        <el-table-column prop="hostName" label="主队" align="center"></el-table-column>
        <el-table-column prop="guestName" label="客队" align="center"></el-table-column>
        <el-table-column prop="matchTime" label="比赛时间" align="center"></el-table-column>
        <el-table-column label="胜平负投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.spfPassStatus == 0">销售中</span>
            <span v-if="scope.row.spfPassStatus == 1">停止销售</span>
            <span v-if="scope.row.spfPassStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.spfPassStatus == 3">奖金处理完</span>
            <span v-if="scope.row.spfPassStatus == 4">取消</span>
            <span v-if="scope.row.spfPassStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="让球胜平负投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.rqSpfPassStatus == 0">销售中</span>
            <span v-if="scope.row.rqSpfPassStatus == 1">停止销售</span>
            <span v-if="scope.row.rqSpfPassStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.rqSpfPassStatus == 3">奖金处理完</span>
            <span v-if="scope.row.rqSpfPassStatus == 4">取消</span>
            <span v-if="scope.row.rqSpfPassStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="总进球投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.zjqPassStatus == 0">销售中</span>
            <span v-if="scope.row.zjqPassStatus == 1">停止销售</span>
            <span v-if="scope.row.zjqPassStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.zjqPassStatus == 3">奖金处理完</span>
            <span v-if="scope.row.zjqPassStatus == 4">取消</span>
            <span v-if="scope.row.zjqPassStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="比分投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.bfPassStatus == 0">销售中</span>
            <span v-if="scope.row.bfPassStatus == 1">停止销售</span>
            <span v-if="scope.row.bfPassStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.bfPassStatus == 3">奖金处理完</span>
            <span v-if="scope.row.bfPassStatus == 4">取消</span>
            <span v-if="scope.row.bfPassStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="半全场投注状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.bqcPassStatus == 0">销售中</span>
            <span v-if="scope.row.bqcPassStatus == 1">停止销售</span>
            <span v-if="scope.row.bqcPassStatus == 2">已开奖,奖金处理中</span>
            <span v-if="scope.row.bqcPassStatus == 3">奖金处理完</span>
            <span v-if="scope.row.bqcPassStatus == 4">取消</span>
            <span v-if="scope.row.bqcPassStatus == 5">未开玩法</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdateFootOrGetInfoballMatch(scope.row.id,1)">编辑</el-button>
            <el-button type="text" @click="handleUpdateFootOrGetInfoballMatch(scope.row.id,2)">足球开奖</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <add-or-update v-if="addOrUpdateVisible" @refissuseList="getIssueInfo()" ref="addOrUpdate"></add-or-update>
    <el-dialog title="开奖号码" :visible.sync="dialogVisible" width="30%">
      <el-form ref="from" label-width="80px">
        <el-form-item label="彩票">
          <el-input disabled="true" :value="data.lotteryName"></el-input>
        </el-form-item>
        <el-form-item label="奖期">
          <el-input disabled="true" :value="data.issue"></el-input>
        </el-form-item>
        <el-form-item label="开奖号码">
          <el-input v-model="drawNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleAddIssueDrawNumber()">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="FootballDialogVisibleTitle"
      :visible.sync="FootballDialogVisible"
      width="50%"
    >
      <template v-if="FootballDialogVisibleTitle=='足球开奖'">
        <el-form ref="from" label-width="120px">
          <el-form-item label="代号">
            <el-input v-model="formInline.matchCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="主队名">
            <el-input v-model="formInline.hostName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="客队名">
            <el-input v-model="formInline.guestName" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="上半场比分">
            <el-input v-model="formInline.oneScore" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="全场比分">
            <el-input v-model="formInline.lastScore" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="胜平负赛果">
            <el-select v-model="formInline.spfResult" :disabled="true" placeholder>
              <el-option
                v-for="item in spfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="让球胜平负赛果">
            <el-select v-model="formInline.rqSpfResult" :disabled="true" placeholder>
              <el-option
                v-for="item in rqSpfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总进球数赛果">
            <el-input v-model="formInline.zjqResult" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="比分赛果">
            <el-select v-model="formInline.bfResult" :disabled="true" placeholder>
              <el-option
                v-for="item in bfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="半全场赛果">
            <el-select v-model="formInline.bqcResult" :disabled="true" placeholder>
              <el-option
                v-for="item in bqcResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCancelFootballMatch()">取消比赛</el-button>
          <el-button type="primary" @click="FootballDialogVisible=false">确定</el-button>
        </span>
      </template>
      <template v-else>
        <el-form ref="from" label-width="120px">
          <el-form-item label="上半场比分">
            <el-input v-model="formInline.oneScore" placeholder="格式为2:3,1:2"></el-input>
          </el-form-item>
          <el-form-item label="全场比分">
            <el-input v-model="formInline.lastScore" placeholder="格式为2:3,1:2"></el-input>
          </el-form-item>
          <el-form-item label="胜平负赛果">
            <el-select v-model="formInline.spfResult" placeholder="请选择">
              <el-option
                v-for="item in spfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="让球胜平负赛果">
            <el-select v-model="formInline.rqSpfResult" placeholder="请选择">
              <el-option
                v-for="item in rqSpfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="总进球数赛果">
            <el-input v-model="formInline.zjqResult"></el-input>
          </el-form-item>
          <el-form-item label="比分赛果">
            <el-select v-model="formInline.bfResult" placeholder="请选择">
              <el-option
                v-for="item in bfResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="半全场赛果">
            <el-select v-model="formInline.bqcResult" placeholder="请选择">
              <el-option
                v-for="item in bqcResults"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="FootballDialogVisible=false">取消</el-button>
          <el-button type="primary" @click="handleUpdateFootballMatch()">修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import AddOrUpdate from "./issue-add-or-update";
import {
  apiGetIssueInfo,
  apiAddIssueDrawNumber,
  apiProcssIssueLost,
  apiAllReversal,
  apiRedeemRestore,
  apiGetFootballMatchInfo,
  apiUpdateFootballMatchInfo,
  apiCancelFootballMatch
} from "@/api/lottery";

export default {
  data() {
    return {
      addOrUpdateVisible: false,
      dialogVisible: false,
      data: {},
      drawNumber: "",
      spfResults: [
        {
          value: "3",
          label: "胜"
        },
        {
          value: "1",
          label: "平"
        },
        {
          value: "0",
          label: "负"
        },
        {
          value: "其他",
          label: "未开玩法"
        }
      ],
      rqSpfResults: [
        {
          value: "3",
          label: "胜"
        },
        {
          value: "1",
          label: "平"
        },
        {
          value: "0",
          label: "负"
        }
      ],

      bfResults: [
        {
          value: "01",
          label: "0:1"
        },
        {
          value: "02",
          label: "0:2"
        },
        {
          value: "03",
          label: "0:3"
        },
        {
          value: "04",
          label: "0:4"
        },
        {
          value: "05",
          label: "0:5"
        },
        {
          value: "12",
          label: "1:2"
        },
        {
          value: "13",
          label: "1:3"
        },
        {
          value: "14",
          label: "1:4"
        },
        {
          value: "15",
          label: "1:5"
        },
        {
          value: "23",
          label: "2:3"
        },
        {
          value: "24",
          label: "2:4"
        },
        {
          value: "25",
          label: "2:5"
        },
        {
          value: "fother",
          label: "负其他"
        },
        {
          value: "00",
          label: "0:0"
        },
        {
          value: "11",
          label: "1:1"
        },
        {
          value: "22",
          label: "2:2"
        },
        {
          value: "33",
          label: "3:3"
        },
        {
          value: "pother",
          label: "平其他"
        },
        {
          value: "10",
          label: "1:0"
        },
        {
          value: "20",
          label: "2:0"
        },
        {
          value: "30",
          label: "3:0"
        },
        {
          value: "40",
          label: "4:0"
        },
        {
          value: "50",
          label: "5:0"
        },
        {
          value: "21",
          label: "2:1"
        },
        {
          value: "31",
          label: "3:1"
        },
        {
          value: "41",
          label: "4:1"
        },
        {
          value: "51",
          label: "5:1"
        },
        {
          value: "32",
          label: "3:2"
        },
        {
          value: "42",
          label: "4:2"
        },
        {
          value: "52",
          label: "5:2"
        },
        {
          value: "sother",
          label: "胜其他"
        },
        {
          value: "oo",
          label: "其他其他"
        }
      ],
      bqcResults: [
        {
          value: "00",
          label: "负负"
        },
        {
          value: "01",
          label: "负平"
        },
        {
          value: "03",
          label: "负胜"
        },
        {
          value: "10",
          label: "平负"
        },
        {
          value: "11",
          label: "平平"
        },
        {
          value: "13",
          label: "平胜"
        },
        {
          value: "30",
          label: "胜负"
        },
        {
          value: "31",
          label: "胜平"
        },
        {
          value: "33",
          label: "胜胜"
        }
      ],
      FootballDialogVisible: false,
      FootballDialogVisibleTitle: "",
      formInline: {
        id: "",
        oneScore: "",
        lastScore: "",
        spfResult: "",
        rqSpfResult: "",
        zjqResult: "",
        bfResult: "",
        bqcResult: ""
      }
    };
  },
  created() {
    this.handleGetIssueInfo();
  },
  methods: {
    handleUpdate(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    handleProcssIssueLost() {
      // 掉期处理
      this.$confirm(`确定要掉期处理ID为${this.data.id}的么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiProcssIssueLost({ id: this.$route.query.id }).then(res => {
          if (res.status == 200 && res.data.code == 1000) {
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
      });
    },
    handleAddIssueDrawNumber() {
      //添加兑奖号码
      apiAddIssueDrawNumber({
        id: this.$route.query.id,
        drawNumber: this.drawNumber
      }).then(res => {
        if (res.status && res.data.code == 1000) {
          this.dialogVisible = false;
          this.handleGetIssueInfo();
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
    handleUpdateFootOrGetInfoballMatch(id, type) {
      // 获取足球开奖详情
      this.FootballDialogVisible = true;
      apiGetFootballMatchInfo({ id: id }).then(res => {
        if (res.status == 200) {
          this.formInline = res.data;
        }
      });
      if (type == 1) {
        this.formInline.id = id;
        this.FootballDialogVisibleTitle = "修改足球开奖";
      } else {
        this.FootballDialogVisibleTitle = "足球开奖";
      }
    },
    handleUpdateFootballMatch() {
      // 修改足球开奖
      apiUpdateFootballMatchInfo(this.formInline).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.FootballDialogVisible = false;
          this.handleGetIssueInfo();
          this.$message({
            message: "修改成功",
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
    handleCancelFootballMatch() {
      // 取消比赛
      this.$confirm(`确定要取消比赛吗`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiCancelFootballMatch({ id: this.formInline.id }).then(res => {
          if (res.status == 200 && res.data.code == 1000) {
            this.FootballDialogVisible = false;
            this.handleGetIssueInfo();
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500
            });
          }
        });
      });
    },
    handleReversal() {
      // 一键撤单
      this.$confirm(`确定要撤单ID为${this.data.id}的么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiAllReversal({
          id: this.$route.query.id
        }).then(res => {
          if ((res.status = 200 && res.data.code == 1000)) {
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
      });
    },
    handleGetIssueInfo() {
      // 获取奖期详情
      apiGetIssueInfo({ id: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.data = res.data;
          this.drawNumber = this.data.drawNumber;
        }
      });
    },
    handleRedeemRestore() {
      // 兑奖还原

      this.$confirm(`确定要兑奖还原ID为${this.data.id}的么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiRedeemRestore({ id: this.$route.query.id }).then(res => {
          if ((res.status = 200 && res.data.code == 1000)) {
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
      margin: 0 0 0 -8px !important;
      border-bottom: 1px solid #eaeaea;
      .el-col {
        border-right: 1px solid #eaeaea;
      }
    }
  }
}
</style>
