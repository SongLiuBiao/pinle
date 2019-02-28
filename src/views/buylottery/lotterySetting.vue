<template>
  <div class="box">
    <el-table :data="lotterys" border style="width: 100%">
      <el-table-column label="彩种ID" align="center">
        <template slot-scope="scope">
          <router-link :to="'/moment/lotterydetails?id='+scope.row.id">
            <el-button type="text">{{scope.row.id}}</el-button>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="彩种名称" align="center"></el-table-column>
      <el-table-column prop="maxSell" label="销售最大期数" align="center"></el-table-column>
      <el-table-column prop="maxCp2ySafeguard" label="网站最大保底" align="center"></el-table-column>
      <el-table-column prop="maxRemuneration" label="盈利佣金限制" align="center"></el-table-column>
      <el-table-column prop="minBuy" label="发起人购买比" align="center"></el-table-column>
      <el-table-column prop="minParticipant" label="最少参与金额" align="center"></el-table-column>
      <el-table-column prop="minSafeguard" label="发起人最少保底比例" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { apiGetlistLottery } from "@/api/lottery";
export default {
  data() {
    return {
      lotterys: []
    };
  },
  methods: {
    handleGetlistLottery() {
      // 获取彩种设置列表
      apiGetlistLottery({}).then(res => {
        if (res.status == 200) {
          this.lotterys = res.data;
        }
      });
    }
  },
  created() {
    this.handleGetlistLottery();
  }
};
</script>
<style scoped lang="scss">
</style>

