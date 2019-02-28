<template>
  <div class="box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="取出金额">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="充值方式">
        <el-radio-group v-model="form.resource">
          <el-radio label="转账取出"></el-radio>
          <el-radio label="误充取出"></el-radio>
          <el-radio label="内部取出"></el-radio>
          <el-radio label="其他取出"></el-radio>
          <el-radio label="资金冻结"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="摘要说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认充值</el-button>
            提示：1） 请查看用户的“可提现金额”，取出金额不可大于此数值。
             2） 资金冻结操作之后，用户余额将减少，冻结金额增加。冻结金额不可用。
      </el-form-item>
    </el-form>
    <div class="title">资金取款搜索</div>
    <div class="serch">
      <el-form :inline="true" ref="form" :model="form">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item prop="value">
                <label>进出ID</label>
                <el-input v-model="form.user" placeholder="审批人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <label>用户</label>
                <el-input v-model="form.user" class="inp" placeholder="审批人"></el-input>
                <el-checkbox>VIP</el-checkbox>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label prop="value">
                <label>状态</label>
                <el-select v-model="form.value" placeholder="请选择">
                  <el-option
                    v-for="item in form.options"
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
                <label>详细说明</label>
                  <el-input v-model="form.user" placeholder="审批人"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item prop="value">
                <label>金额</label>
                 <el-input v-model="form.user" placeholder="审批人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label>
                <label>到</label>
                <el-input v-model="form.user" placeholder="审批人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label prop="value1">
                <label>时间</label>
                <el-date-picker v-model="form.value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
            <el-form-item label prop="value1">
                <label>到</label>
                <el-date-picker v-model="form.value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      
   
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label prop="user">
                <label>类型</label>
               <el-select v-model="form.value" placeholder="请选择">
                  <el-option
                    v-for="item in form.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="primary" @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
       <div class="title">方案</div>
      <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              label="进出ID"
              prop="date"
              align="center"
              width="180">
            <template slot-scope="scope">
              <router-link to="/moment/userFund" style="color:#17b3a3">{{scope.row.date}}</router-link>
            </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="用户"
              width="180">
                  <template slot-scope="scope">
            <router-link to="/moment/userdetails" style="color:#17b3a3">{{scope.row.date}}</router-link>
            </template>
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="姓名">
            
            </el-table-column>
             <el-table-column
              prop="name"
              align="center"
              label="类型"
              width="180">
            
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="详情"
              width="180">
              
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="备注"
              width="180">
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="金额"
              width="180">
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="手续费"
              width="180">
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="状态"
              width="180">
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="银行"
              width="180">
            </el-table-column>
              <el-table-column
              prop="name"
              align="center"
              label="时间"
              width="180">
            </el-table-column>
             
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
       tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
        .inp {
          width: 50% !important;
        }
        .el-select {
          width: 66% !important;
        }
        .el-radio-group {
          margin-right: 20px;
        }
        label {
          width: 60px;
          display: inline-block;
        }
      }
    }
  }
}
</style>
