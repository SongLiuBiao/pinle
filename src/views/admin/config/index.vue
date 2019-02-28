<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="type">
        <el-input v-model="formInline.type"></el-input>
      </el-form-item>
      <el-form-item label="secType">
        <el-input v-model="formInline.secType"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleGetListResource(1)">查询</el-button>
        <el-button type="primary" @click="handelAddorUpdate()">增加</el-button>
        <!-- <el-button type="danger" @click="handleDeleteResource()">批量删除</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="list" @selection-change="handleSelectionChange" border style="width: 100%">
      <!-- <el-table-column type="selection" align="center" width="55"></el-table-column> -->
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="isDelete" label="isDelete" align="center"></el-table-column>
      <el-table-column prop="gmtModified" label="gmtModified" align="center"></el-table-column>
      <el-table-column prop="creator" label="creator" align="center"></el-table-column>
      <el-table-column prop="dataType" label="dataType" align="center">
        <template slot-scope="scope">{{scope.row.dataType=="S"?'系统配置':'业务配置'}}</template>
      </el-table-column>
      <el-table-column prop="type" label="type" align="center"></el-table-column>
      <el-table-column prop="secType" label="secType" align="center"></el-table-column>
      <el-table-column prop="typeDesc" label="typeDesc" align="center"></el-table-column>
      <el-table-column prop="name" label="name" align="center"></el-table-column>
      <el-table-column prop="value" label="value" align="center"></el-table-column>
      <el-table-column prop="description" label="description" align="center"></el-table-column>
      <el-table-column prop="value1" label="value1" align="center"></el-table-column>
      <el-table-column prop="value2" label="value2" align="center"></el-table-column>
      <el-table-column prop="value3" label="value3" align="center"></el-table-column>
      <el-table-column prop="value4" label="value4" align="center"></el-table-column>
      <el-table-column prop="sort" label="value5" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handelAddorUpdate(scope.row.id)">修改</el-button>
          <el-button type="text" @click="handleDeleteResource(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formInline.pageNo"
      :page-sizes="[10, 20, 30]"
      :page-size="formInline.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="type" prop="type">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="secType" prop="secType">
          <el-input v-model="form.secType"></el-input>
        </el-form-item>
        <el-form-item label="typeDesc" prop="typeDesc">
          <el-input v-model="form.typeDesc"></el-input>
        </el-form-item>
        <el-form-item label="name" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="value" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="description" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="value1" prop="value1">
          <el-input v-model="form.value1"></el-input>
        </el-form-item>
        <el-form-item label="value2" prop="value2">
          <el-input v-model="form.value2"></el-input>
        </el-form-item>
        <el-form-item label="value3" prop="value3">
          <el-input v-model="form.value3"></el-input>
        </el-form-item>
        <el-form-item label="value4" prop="value4">
          <el-input v-model="form.value4"></el-input>
        </el-form-item>
        <el-form-item label="sort" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="dataType" prop="dataType">
          <el-radio-group v-model="form.dataType">
            <el-radio :label="'S'">系统配置</el-radio>
            <el-radio :label="'B'">业务配置</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOnSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  apiGetListResource,
  apiAddResource,
  apiUpdateResource,
  apiDeleteResource,
  apiQueryResourceById
} from "@/api/admin";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      multipleSelection: [],
      totalCount: 0,
      formInline: {
        type: "",
        secType: "",
        pageSize: 10,
        pageNo: 1
      },
      form: {
        dataType: "S",
        type: "",
        secType: "",
        typeDesc: "",
        name: "",
        value: "",
        description: "",
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        sort: ""
      },
      rules: {
        type: [{ required: true, message: "请输入type", trigger: "blur" }],
        secType: [
          { required: true, message: "请输入secType", trigger: "blur" }
        ],
        typeDesc: [
          { required: true, message: "请输入typeDesc", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
        value: [{ required: true, message: "请输入value", trigger: "blur" }],
        description: [
          { required: true, message: "请输入description", trigger: "blur" }
        ]
      },
      list: []
    };
  },
  created() {
    this.handleGetListResource();
  },
  methods: {
    handleGetListResource(pageNo) {
      // 获取配置列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListResource(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
        }
      });
    },
    handelAddorUpdate(id) {
      // 新增和修改
      this.dialogVisible = true;
      if (id) {
        this.dialogTitle = "修改";
        apiQueryResourceById({ id: id }).then(res => {
          if (res.status == 200) {
            this.form = res.data.data;
          }
        });
      } else {
        this.dialogTitle = "新增";
        this.$refs["form"].resetFields();
      }
    },
    handleOnSubmit(formName) {
      // 新增和修改提交
      this.$refs[formName].validate(vaild => {
        if (vaild) {
          if (this.dialogTitle == "新增") {
            apiAddResource(this.form).then(res => {
              if (res.status == 200 && res.data.code == 1) {
                this.dialogVisible = false;
                this.handleGetListResource(1);
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
            apiUpdateResource(this.form).then(res => {
              if (res.status == 200 && res.data.code == 1) {
                this.dialogVisible = false;
                this.handleGetListResource(1);
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
    handleDeleteResource(id) {
      this.$confirm(`确定对id为${id}的配置删除么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDeleteResource({ id: id }).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetListResource(1);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListResource();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListResource();
    }
  }
};
</script>
<style scoped lang="scss">
</style>
