<template>
  <div class="box">
    <div class="header">
      <div class="title">日志搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="value">
                  <label>维护计划</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
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
                <el-form-item label>
                  <label>管理员</label>
                  <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div classcls="grid-content bg-purple">
                <el-form-item label prop="value">
                  <label>用户</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
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
                <el-form-item label prop="value">
                  <label>内容</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="value">
                  <label>维护类型</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
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
                <el-form-item prop="value">
                  <label>维护途径</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
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
                <el-form-item prop="value">
                  <label>用户态度</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options"
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
                <el-form-item prop="value">
                  <label>花费时间</label>
                  <el-select v-model="formInline.value" placeholder="请选择">
                    <el-option
                      v-for="item in formInline.options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="user">
                  <label>维护时间</label>
                  <el-date-picker v-model="formInline.value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <label>到&nbsp;&nbsp;&nbsp;</label>
                  <el-date-picker v-model="formInline.value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <el-radio-group v-model="radio2">
                    <el-radio :label="3">奖励维护</el-radio>
                  </el-radio-group>
                  <el-button type="primary" @click="onSubmit">搜索</el-button>
                  <el-button type="primary" @click="resetForm('from')">重置</el-button>
                  <el-button type="primary" @click="dialogVisible=true">新增</el-button>
                  <el-button type="primary" @click="resetForm('from')">删除</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">方案</div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="日志ID" prop="date" align="center" width="180">          
        </el-table-column>
        <el-table-column prop="name" align="center" label="维护计划" width="180"></el-table-column>
        <el-table-column prop="address" align="center" label="管理员">
        </el-table-column>
        <el-table-column prop="name" align="center" label="用户" width="180">

        </el-table-column>
        <el-table-column prop="name" align="center" label="内容" width="180">

        </el-table-column>
        <el-table-column prop="name" align="center" label="类型" width="180">
        </el-table-column>
        <el-table-column prop="name" align="center" label="途径" width="180"></el-table-column>
        <el-table-column prop="name" align="center" label="态度" width="180"></el-table-column>
        <el-table-column prop="name" align="center" label="花费时间" width="180"></el-table-column>
        <el-table-column prop="name" align="center" label="时间" width="180"></el-table-column>
        <el-table-column prop="name" align="center" label="操作" width="180">
            <template slot-scope="scope">
                <el-button class="el-button el-button--text el-button--small">编辑</el-button>
            </template>
        </el-table-column>
      </el-table>
      <div
        class="aggregate"
      >本页总投注 5437.00 元; 中奖总计 0.00; 全部投注总计 5557.00 元; 全部中奖总计 0.00 元; 本页 30 条记录; 共有 36 条记录;</div>
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
    <el-dialog title="添加日志" :visible.sync="dialogVisible" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="维护类型" prop="region">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in formInline.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维护途径" prop="region">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in formInline.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户态度" prop="region">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in formInline.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="花费时间" prop="value">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in formInline.options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维护时间" required>
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="跟用户交流的内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="获得有价值的信息" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            placeholder="(通过交流从用户那里获得对网站有价值的信息，没有可为空)"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
            <label >11</label>
          <el-input type="textarea" v-model="ruleForm.desc" placeholder="(维护人自己提醒、标记等其他信息，没有可为空)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
import axios from "axios";
export default {
  data() {
    return {
        value:'',
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      schemeDialog: false, //方案弹窗
      userDialog: false, //用户弹窗
      lotteryDialog: false, //彩种弹窗
      dialogVisible: false, //
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      radio2: "",
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
        ],
        options1: [
          {
            value: "1分钟以内",
            label: "1分钟以内"
          },
          {
            value: "1-3分钟",
            label: "1-3分钟"
          },
          {
            value: "3-6分钟",
            label: "3-6分钟"
          },
          {
            value: "6-10分钟",
            label: "6-10分钟"
          },
          {
            value: "10-15分钟",
            label: "10-15分钟"
          },
          {
            value: "20-25分钟",
            label: "20-25分钟"
          },
          {
            value: "25-30分钟",
            label: "25-30分钟"
          },
          {
            value: "30-40分钟",
            label: "30-40分钟"
          },
          {
            value: "40-50分钟",
            label: "40-50分钟"
          },
          {
            value: "50-60分钟",
            label: "50-60分钟"
          },
          {
            value: "60-90分钟",
            label: "60-90分钟"
          },
          {
            value: "90-120分钟",
            label: "90-120分钟"
          },
          {
            value: "2-3小时",
            label: "2-3小时"
          },
          {
            value: "3-4小时",
            label: "3-4小时"
          },
          {
            value: "4-5小时",
            label: "4-5小时"
          },
          {
            value: "5-6小时",
            label: "5-6小时"
          },
          {
            value: "6小时以上",
            label: "6小时以上"
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

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
            width: 70% !important;
          }
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
