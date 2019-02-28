<template>
  <div class="box">
    <div class="title">用户信息</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">用户ID</el-col>
        <el-col :span="8">
          <router-link style="color:#17b3a3" to="/moment/userDetails">34123213</router-link>
        </el-col>
        <el-col :span="4">姓名</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">身份证</el-col>
        <el-col :span="8">18338797571</el-col>
        <el-col :span="4">联系电话</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">支付宝账号</el-col>
        <el-col :span="8">1</el-col>
        <el-col :span="4">电子邮件</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">银行信息</el-col>
        <el-col :span="8">汉口银行|湖南省|长沙市|-1
          <el-button type="primary" size="mini" @click="dialogVisible=true">修改</el-button>
        </el-col>
        <el-col :span="4">银行账户</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">消费/余额</el-col>
        <el-col :span="8">1</el-col>
        <el-col :span="4">存入/取出</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">注册时间</el-col>
        <el-col :span="8">1</el-col>
        <el-col :span="4">注册IP</el-col>
        <el-col :span="8">2</el-col>
      </el-row>
    </div>
    <div class="title">进出明细</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">进出ID</el-col>
        <el-col :span="20">1</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">用户</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">类型</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">详细说明</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">备注信息</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">金额</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">手续费</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">状态</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">时间</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">处理时间</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">处理管理员</el-col>
        <el-col :span="20">2</el-col>
      </el-row>
    </div>

    <el-dialog title="修改银行信息" :visible.sync="dialogVisible" width="30%" >
      <el-form  :model="formInline" class="demo-form-inline" label-width="150px">
        <el-form-item label="开户银行所在省份：">
               <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市：">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="银行：">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
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
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      value: "",
      formInline: {
        user: "",
        region: "",
        value: "",
        options: [
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
        }
      ]
    };
  },
  created() {
    console.log(this.$route.query.id);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
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
</style>
