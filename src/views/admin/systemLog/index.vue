<template>
  <div class="box">
    <div class="header">
      <div class="title">系统日志搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item prop="value" label="操作员">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="操作时间">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div classcls="grid-content bg-purple">
                <el-form-item label="到" prop="value">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-form-item label="关键字" prop="value">
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">
                <el-form-item label prop="value">
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" prop="date" align="center" width="180">
          <template slot-scope="scope">
            <router-link to="/moment/schemedetails?id=1" style="color:#17b3a3">{{scope.row.date}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="操作员" width="180"></el-table-column>
        <el-table-column prop="address" align="center" label="操作时间">
          <template slot-scope="scope">
            <router-link to="/moment/userdetails" style="color:#17b3a3">{{scope.row.date}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="IP" width="180">
          <template slot-scope="scope">
            <router-link to="/moment/lotterydetails" style="color:#17b3a3">{{scope.row.date}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="动作" width="180">
          <template slot-scope="scope">
            <router-link to="/moment/awardPerioddetails" style="color:#17b3a3">{{scope.row.date}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="内容" width="180"></el-table-column>
      </el-table>
      <el-pagination
        style="text-algin:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
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
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      radio2: "",
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
      formInline: {
        user: "",
        region: "",
        value: "",
        options: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ]
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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

          .el-select {
            width: 66% !important;
          }
          .el-radio-group {
            margin-right: 80px;
          }
          label {
            width: 25%;
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
      height: 60px;
      line-height: 60px;
      border: 1px solid #eaeaea;
      border-top: none;
      text-align: center;
    }
  }
}
</style>
