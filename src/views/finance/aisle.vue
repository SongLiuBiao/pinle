<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="name" align="center" label="通道名称" width="180"></el-table-column>
      <el-table-column align="center" label="类型" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.type == 0">支付宝</template>
          <template v-if="scope.row.type == 1">微信</template>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.statusDesc" placeholder="请选择">
            <el-option
              v-for="item in statusS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="排序">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sort"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="address" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleUpdatePayment(scope.row.id,scope.row.statusDesc,scope.row.sort)"
          >修改</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="datetime" align="center" label="操作时间"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { apiGetlistPayment, apiUpdatePayment } from "@/api/finance";
export default {
  data() {
    return {
      list: [],
      status: 0,
      statusS: [
        {
          value: "0",
          label: "开启"
        },
        {
          value: "1",
          label: "关闭"
        }
      ]
    };
  },
  created() {
    this.handelGetlistPayment();
  },
  methods: {
    handelGetlistPayment() {
      //通道列表
      apiGetlistPayment({}).then(res => {
        if (res.status == 200) {
          this.list = res.data;
        }
      });
    },
    handleUpdatePayment(id, statusDesc, sort) {
      //修改支付通道
      if (statusDesc == "开启") {
        this.status = 0;
      } else if (statusDesc == "关闭") {
        this.status = 1;
      } else {
        this.status = statusDesc;
      }
      apiUpdatePayment({ id: id, status: this.status, sort: sort }).then(
        res => {
          if (res.status == 200 && res.data.code == 1000) {
            this.handelGetlistPayment();
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
        }
      );
    }
  }
};
</script>

