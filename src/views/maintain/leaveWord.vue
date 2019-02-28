<template>
  <div class="box">
    <div class="header">
      <div class="title">方案搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="id">
                  <label>留言ID</label>
                  <el-input v-model="formInline.id" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item prop="userName">
                  <label>用户</label>
                  <el-input v-model="formInline.userName" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div classcls="grid-content bg-purple">
                <el-form-item prop="commentTimeStart">
                  <label>留言时间</label>
                  <el-date-picker
                    v-model="formInline.commentTimeStart"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="commentTimeEnd">
                  <label>到</label>
                  <el-date-picker
                    v-model="formInline.commentTimeEnd"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label prop="content">
                  <label>内容</label>
                  <el-input v-model="formInline.content" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="18">
              <el-form-item>
                <el-button type="primary" @click="handleGetListComment(1)">查询</el-button>
                <el-button type="primary" @click="resetForm('from')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">用户</div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="留言id" prop="id" align="center"></el-table-column>
        <el-table-column label="用户名字" align="center">
          <template slot-scope="scope">
            <router-link :to="'/moment/userdetails?id='+scope.row.userId">
              <el-button type="text">{{scope.row.username}}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="内容" prop="content" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
        <el-table-column label="留言时间" prop="commentTime" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDeleteComment(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-algin:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pageNo"
        :page-sizes="[10, 20, 30 ]"
        :page-size="formInline.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { apiGetListComment, apiDeleteComment } from "@/api/maintain";
export default {
  data() {
    return {
      totalCount: 0,
      list: [],
      formInline: {
        pageNo: 1,
        pageSize: 10,
        id: "",
        userName: "",
        content: "",
        commentTimeStart: "",
        commentTimeEnd: ""
      }
    };
  },
  created() {
    this.handleGetListComment();
  },
  methods: {
    handleGetListComment(pageNo) {
      // 获取用户留言列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListComment(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.list;
          this.totalCount = res.data.totalCount;
        }
      });
    },
    handleDeleteComment(id) {
      // 删除用户留言
      apiDeleteComment({ id: id }).then(res => {
        if (res.status == 200 && res.data.code == 1000) {
          this.handleGetListComment();
          this.$message({
            massage: "操作成功",
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListComment();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListComment();
    }
  }
};
</script>

<style scoped   lang="scss">
.box {
  .el-form-item {
    margin: 0;
  }
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
    .el-pagination {
      text-align: right;
      margin: 20px 0;
    }
  }
}
</style>
