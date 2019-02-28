<template>
  <div class="box">
    <div class="header">
      <div class="title">用户搜索</div>
      <div class="serch">
        <el-form :inline="true" ref="from" :model="formInline">
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item>
                  <label>类型</label>
                  <el-select v-model="formInline.secType" placeholder="请选择">
                    <el-option
                      v-for="item in types"
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
                  <label>跳转类型</label>
                  <el-select v-model="formInline.value1" placeholder="请选择">
                    <el-option
                      v-for="item in values"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div classcls="grid-content bg-purple">
                <el-form-item label>
                  <label>跳转内容</label>
                  <el-input v-model="formInline.value2" placeholder="审批人"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-button type="primary" @click="handleAddorUpdate()">新增</el-button>
                  <el-button type="primary" @click="handleGetHomeList(1)">搜索</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="content">
      <div class="title">配置搜索</div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">
            <router-link to="/moment/schemedetails?id=1" style="color:#17b3a3">{{scope.row.id}}</router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" label="类型">
          <template slot-scope="scope">{{scope.row.secType =='HOME_BANNER'?'首页轮播':'公告资讯' }}</template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.value" alt>
          </template>
        </el-table-column>
        <el-table-column align="center" label="跳转类型">
          <template slot-scope="scope">
            <template v-if="scope.row.value1 =='1'">url链接</template>
            <template v-if="scope.row.value1 =='2'">资讯id</template>
            <template v-if="scope.row.value1 =='3'">彩种id</template>
            <template v-if="scope.row.value1 =='4'">纯文案</template>
          </template>
        </el-table-column>
        <el-table-column prop="value2" align="center" label="内容"></el-table-column>
        <!-- <el-table-column prop="name" align="center" label="状态">
          <template slot-scope="scope">{{scope.row.isDelete == 1?'删除':'有效'}}</template>
        </el-table-column>-->
        <el-table-column prop="sort" align="center" label="排序"></el-table-column>
        <el-table-column prop="name" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handelDeleteHomePage(scope.row.id)">删除</el-button>
            <el-button type="text" @click="handleAddorUpdate(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="text-algin:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="formInline.pageNo"
        :page-sizes="[10, 20, 30]"
        :page-size="formInline.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="类型" prop="secType">
          <el-select v-model="form.secType" @change="handleChange" placeholder="请选择">
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="file" v-if="isUpload">
          <el-upload
            class="upload-demo"
            action="/uploadImage"
            :before-remove="beforeRemove"
            :limit="1"
            :http-request="handleUploadImage"
            :on-exceed="handleExceed"
            :file-list="fileList"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item v-else label="文案" prop="value">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="跳转类型" prop="value1">
          <el-select v-model="form.value1" placeholder="请选择" @change="handleChangeUrl">
            <el-option
              v-for="item in valueS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="value2" v-if="isContent">
          <el-input v-model="form.value2"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态">
          <el-radio-group v-model="form.isDelete">
            <el-radio :label="0">有效</el-radio>
            <el-radio :label="1">无效</el-radio>
          </el-radio-group>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAddorUpdateHomePage('form')"
        >{{dialogTitle=='新增'?'新 增':'修 改'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  apiGetHomeList,
  apiDeleteHomePage,
  apiAddHomePage,
  apiUpdateHomePage,
  apiGetHomePage,
  apiUploadImage
} from "@/api/content";
export default {
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogTitle: "",
      isUpload: true,
      isContent: true,
      form: {
        secType: "",
        value: "",
        value1: "",
        value2: "",
        sort: 0,
        // isDelete: 0,
        imgName: "",
        id: ""
      },
      rules: {
        secType: [{ required: true, message: "请选择类型", trigger: "change" }],
        value: [{ required: true, message: "请输入文案", trigger: "blur" }],

        value1: [
          { required: true, message: "请选择跳转类型", trigger: "change" }
        ],
        value2: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      values: [
        {
          value: "1",
          label: "url链接"
        },
        {
          value: "2",
          label: "资讯链接"
        },
        {
          value: "3",
          label: "彩种id"
        }
      ],
      valueS: [
        {
          value: "1",
          label: "url链接"
        },
        {
          value: "2",
          label: "资讯链接"
        },
        {
          value: "3",
          label: "彩种id"
        },
        {
          value: "4",
          label: "纯文案"
        }
      ],
      types: [
        {
          value: "HOME_BANNER",
          label: "首页轮播"
        },
        {
          value: "HOME_NOTICE",
          label: "公共资讯"
        }
      ],

      formInline: {
        secType: "HOME_BANNER",
        value1: "",
        value2: "",
        pageNo: 1,
        pageSize: 10
      },
      totalCount: 0,

      list: []
    };
  },
  created() {
    this.handleGetHomeList();
  },
  methods: {
    handleGetHomeList(pageNo) {
      //查询首页列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetHomeList(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
          this.formInline.pageNo = res.data.data.currPage;
          this.formInline.pageSize = res.data.data.pageSize;
        }
      });
    },
    handelDeleteHomePage(id) {
      //配置删除
      this.$confirm(`确定对id为${id}的配置删除么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDeleteHomePage({ id: id }).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetHomeList();
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
    handleAddorUpdate(id) {
      //配置新增和编辑
      this.dialogVisible = true;
      this.isUpload = true;
      this.fileList = [];

      if (id) {
        this.dialogTitle = "编辑";
        this.form.id = id;
        apiGetHomePage({ id: id }).then(res => {
          if (res.status == 200) {
            this.form.secType = res.data.data.secType;
            this.form.value = res.data.data.value;
            this.form.value1 = res.data.data.value1;
            this.form.value2 = res.data.data.value2;
            this.form.sort = res.data.data.sort;
            this.form.isDelete = res.data.data.isDelete;
            if (this.form.secType == "HOME_BANNER") {
              this.form.imgName = res.data.data.imgName;
              this.fileList.push({ name: this.form.imgName });
            } else {
              this.isUpload = false;
            }
          }
        });
      } else {
        this.dialogTitle = "新增";
        this.$refs["form"].resetFields();
      }
    },
    handleAddorUpdateHomePage(formName) {
      //配置新增

      if (this.fileList.length > 0) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.dialogTitle == "新增") {
              apiAddHomePage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetHomeList();
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
              apiUpdateHomePage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetHomeList();
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
      } else if (!this.isUpload) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.dialogTitle == "新增") {
              apiAddHomePage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetHomeList();
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
              apiUpdateHomePage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetHomeList();
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
      } else {
        this.$message({
          message: "请上传图片",
          type: "warning",
          duration: 1500
        });
      }
    },
    // 自定义上传方法
    handleUploadImage(file) {
      this.fileList = [];
      const _file = file.file;
      var formData = new FormData();
      formData.append("file", _file);
      apiUploadImage(formData).then(res => {
        if (res.status == 200 && res.data.code == 1) {
          this.form.value = res.data.data.url;
          this.form.imgName = res.data.data.fileMd5;
          this.fileList.push({ name: this.form.imgName });
          this.$message({
            message: "上传成功",
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
      });
    },
    handleChange(val) {
      // 选择类型
      if (val == "HOME_NOTICE") {
        this.isUpload = false;
      } else {
        this.isUpload = true;
      }
    },
    handleChangeUrl(val) {
      // 选择跳转类型
      if (val == "4") {
        this.isContent = false;
      } else {
        this.isContent = true;
      }
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetHomeList();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetHomeList();
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).then(res => {
        this.fileList = [];
        this.form.value = "";
      });
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
    .el-pagination {
      margin: 20px 0;
      text-align: right;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
