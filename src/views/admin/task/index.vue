<template>
  <div class="box">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="bean 名称">
        <el-input v-model="beanName"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleAddorUpdate()">增加</el-button>
        <el-button type="primary" @click="handleGetScheduleList(1)">查询</el-button>
        <el-button type="primary" @click="handleTaskList()">定时任务错误信息列表</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" align="center" label="id"></el-table-column>
      <el-table-column prop="beanName" align="center" label="名称"></el-table-column>
      <el-table-column prop="params" align="center" label="参数"></el-table-column>
      <el-table-column prop="profile" align="center" label="执行环境"></el-table-column>
      <el-table-column prop="cronExpression" align="center" label="表达式"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <template v-if="scope.row.status == 0">可用</template>
          <template v-if="scope.row.status == 1">暂停</template>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="times" label="创建时间"></el-table-column>
      <el-table-column align="center" prop="gmtModified" label="修改时间"></el-table-column>-->
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDeleteSchedule(scope.row.id)">删除</el-button>
          <el-button type="text" @click="handleAddorUpdate(scope.row.id)">编辑</el-button>
          <el-button
            type="text"
            v-if="scope.row.status ==0"
            @click="handlePauseSchedule(scope.row.id)"
          >暂停</el-button>
          <el-button
            type="text"
            v-if="scope.row.status ==1"
            @click="handleResumeSchedule(scope.row.id)"
          >恢复</el-button>
          <el-button type="text" @click="handleRunSchedule(scope.row.id)">触发</el-button>
          <el-button type="text" @click="handleTaskList(scope.row.id)">错误信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
    <!-- 新增和编辑 -->
    <el-dialog :title="AddorUpdateDialogTitle" :visible.sync="AddorUpdateDialog" width="50%">
      <el-form
        label-width="100px"
        :rules="rules"
        ref="formInline"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="bean 名称" prop="beanName">
          <el-input v-model="formInline.beanName"></el-input>
        </el-form-item>
        <el-form-item label="方法名称" prop="methodName">
          <el-input v-model="formInline.methodName"></el-input>
        </el-form-item>
        <el-form-item label="参数名称" prop="params">
          <el-input v-model="formInline.params"></el-input>
        </el-form-item>
        <el-form-item label="执行环境" prop="profile">
          <el-select v-model="formInline.profile" placeholder="请选择">
            <el-option
              v-for="item in profiles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表达式" prop="cronExpression">
          <el-input v-model="formInline.cronExpression"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formInline.remark"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formInline.status">
            <el-radio :label="0">可用</el-radio>
            <el-radio :label="1">暂停</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddorUpdateDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOnSubmit('formInline')"
        >{{AddorUpdateDialogTitle=="新增"?'新 增':'修改'}}</el-button>
      </span>
    </el-dialog>
    <!-- 定时任务和任务错误信息列表 -->
    <el-dialog :title="TaskListDialogTitle" :visible.sync="TaskListDialog" width="70%">
      <el-form :inline="true" v-if="TaskListDialogTitle=='全部定时任务错误信息列表'">
        <el-form-item label="任务id:">
          <el-input v-model="jobId"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleGetScheduleLogList()">查询</el-button>
      </el-form>
      <el-table :data="TackErrorList" border style="width: 100%">
        <el-table-column prop="jobId" align="center" label="任务id"></el-table-column>
        <el-table-column prop="beanName" align="center" label="bean名称"></el-table-column>
        <el-table-column prop="methodName" align="center" label="方法名"></el-table-column>
        <el-table-column prop="params" align="center" label="参数名"></el-table-column>
        <el-table-column prop="error" align="center" label="错误信息"></el-table-column>
        <el-table-column prop="times" align="center" label="耗时"></el-table-column>
        <el-table-column align="center" label="创建时间" prop="gmtCreate"></el-table-column>
        <el-table-column align="center" prop="gmtModified" label="修改时间"></el-table-column>
      </el-table>
      <el-pagination
        v-if="TaskListDialogTitle=='全部定时任务错误信息列表'"
        @size-change="handleErrorSizeChange"
        @current-change="handleErrorCurrentChange"
        :current-page="ErrorPageNo"
        :page-sizes="[10, 20, 30]"
        :page-size="ErrorPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ErrorTotalCount"
      ></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import {
  apiGetScheduleList,
  apiAddSchedule,
  apiGetScheduleInfo,
  apiGetScheduleLogList,
  apiUpdateSchedule,
  apiRunSchedule,
  apiResumeSchedule,
  apiPauseSchedule,
  apiDeleteSchedule
} from "@/api/admin";
export default {
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      beanName: "",
      jobId: "",
      list: [],
      TackErrorList: [],
      totalCount: 0,
      AddorUpdateDialog: false,
      AddorUpdateDialogTitle: "",
      TaskListDialog: false,
      TaskListDialogTitle: "",
      profiles: [
        {
          value: "DEV",
          label: "DEV"
        },
        {
          value: "TEST",
          label: "TEST"
        },
        {
          value: "PREISSUE",
          label: "PREISSUE"
        },
        {
          value: "ONLINE",
          label: "ONLINE"
        }
      ],
      formInline: {
        beanName: "",
        methodName: "",
        params: "",
        cronExpression: "",
        status: 0,
        remark: "",
        profile: ""
      },
      rules: {
        beanName: [
          { required: true, message: "请输入Bean名称", trigger: "blur" }
        ],
        methodName: [
          { required: true, message: "请输入方法名称", trigger: "blur" }
        ],

        cronExpression: [
          { required: true, message: "请输入表达式", trigger: "blur" }
        ],
        profile: [
          { required: true, message: "请选择执行环境", trigger: "change" }
        ]
      },
      ErrorTotalCount: 0,
      ErrorPageSize: 10,
      ErrorPageNo: 1,
      isTaskDialog: false
    };
  },
  created() {
    this.handleGetScheduleList();
  },
  methods: {
    handleGetScheduleList(pageNo) {
      // 获取任务列表
      if (pageNo) {
        this.pageNo = pageNo;
      }
      apiGetScheduleList({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        beanName: this.beanName
      }).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.page.list;
          this.totalCount = res.data.data.page.totalCount;
        }
      });
    },
    handleAddorUpdate(id) {
      //新增和编辑
      this.AddorUpdateDialog = true;
      if (id) {
        this.AddorUpdateDialogTitle = "编辑";
        this.formInline.id = id;
        apiGetScheduleInfo(id).then(res => {
          if (res.status == 200) {
            this.formInline.beanName = res.data.data.schedule.beanName;
            this.formInline.methodName = res.data.data.schedule.methodName;
            this.formInline.params = res.data.data.schedule.params;
            this.formInline.cronExpression =
              res.data.data.schedule.cronExpression;
            this.formInline.status = res.data.data.schedule.status;
            this.formInline.remark = res.data.data.schedule.remark;
            this.formInline.profile = res.data.data.schedule.profile;
          }
        });
      } else {
        this.AddorUpdateDialogTitle = "新增";
        this.$refs["formInline"].resetFields();
      }
    },
    handleOnSubmit(formName) {
      //提交新增和修改
      this.$refs[formName].validate(valid => {
        if (valid) {
          //新增
          if (this.AddorUpdateDialogTitle == "新增") {
            apiAddSchedule(this.formInline).then(res => {
              if (res.status == 200 && res.data.code == 1) {
                this.AddorUpdateDialog = false;
                this.handleGetScheduleList();
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
          } else {
            //修改
            apiUpdateSchedule(this.formInline).then(res => {
              if (res.status == 200 && res.data.code == 1) {
                this.AddorUpdateDialog = false;
                this.handleGetScheduleList();
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
          }
        }
      });
    },
    handleTaskList(id) {
      // 定时任务错误信息列表
      this.TaskListDialog = true;
      if (id) {
        this.TaskListDialogTitle = `id为${id}的任务错误信息`;
        this.jobId = id;
      } else {
        this.TaskListDialogTitle = `全部定时任务错误信息列表`;
        this.jobId = "";
      }
      this.handleGetScheduleLogList();
    },
    handleGetScheduleLogList() {
      apiGetScheduleLogList({
        jobId: this.jobId,
        pageNo: this.ErrorPageNo,
        pageSize: this.ErrorPageSize
      }).then(res => {
        if (res.status == 200) {
          this.TackErrorList = res.data.data.page.list;
          this.ErrorTotalCount = res.data.data.page.totalCount;
        }
      });
    },

    handleRunSchedule(id) {
      // 运行任务

      apiRunSchedule([id]).then(res => {
        if (res.status == 200 && res.data.code == 1) {
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
    handlePauseSchedule(id) {
      // 暂停任务
      this.$confirm(`确定要暂停ID为${id}的任务么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiPauseSchedule([id]).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetScheduleList();
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
    },
    handleResumeSchedule(id) {
      //恢复任务
      this.$confirm(`确定要恢复ID为${id}的任务么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiResumeSchedule([id]).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetScheduleList();
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
    },
    handleDeleteSchedule(id) {
      // 删除任务
      this.$confirm(`确定要删除ID为${id}的任务么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDeleteSchedule([id]).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetScheduleList();
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
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handleGetScheduleList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.handleGetScheduleList();
    },
    handleErrorSizeChange(val) {
      this.ErrorPageSize = val;
      this.handleGetScheduleLogList();
    },
    handleErrorCurrentChange(val) {
      this.ErrorPageNo = val;
      this.handleGetScheduleLogList();
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  .el-pagination {
    text-align: right;
    margin: 20px 0;
  }
}
</style>
