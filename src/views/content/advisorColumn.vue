<template>
  <div class="box">
    <div class="title">栏目</div>
    <el-table :data="tableData3" height="250" border style="width: 100%">
      <el-table-column prop="date" label="栏目名" align="center"></el-table-column>
      <el-table-column prop="name" label="类型" align="center" width="180"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="dialogVisible=true">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑栏目" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="栏目名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上一级">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="资讯"></el-radio>
            <el-radio label="公共"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="SEO标题">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="SEO关键字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="SEO描述">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {

      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  
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
  }
}
</style>
