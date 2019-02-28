<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="formInline.startTime"
          type="datetime"
          value-format="timestamp"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="到">
        <el-date-picker
          v-model="formInline.endTime"
          type="datetime"
          value-format="timestamp"
          placeholder="选择日期时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddorUpdateMessage()">增加</el-button>
        <el-button type="primary" @click="handleGetListMessage(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="title">资讯</div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img">
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.status == 0">启用</template>
          <template v-if="scope.row.status == 1">禁用</template>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center"></el-table-column>
      <el-table-column prop="jumpContent" align="center" label="链接"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleAddorUpdateMessage(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="handleDeleteMessage(scope.row.id)">删除</el-button>
          <el-button type="text" @click="commentVisible=true">查看评论</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="'upload-demo'"
            action="/admin/uploadImage"
            :before-remove="beforeRemove"
            :http-request="handleUploadImage"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            accept="image/jpeg, image/gif, image/png, image/bmp"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOnsumit('form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="资讯评论" :visible.sync="commentVisible" width="60%">
      <div class="title">评论</div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="date" label="内容" align="center"></el-table-column>
        <el-table-column prop="name" label="评论人" align="center"></el-table-column>
        <el-table-column prop="name" label="评论时间" align="center"></el-table-column>
        <el-table-column prop="name" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false">取 消</el-button>
        <el-button type="primary" @click="commentVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import {
  apiGetListMessage,
  apiAddMessage,
  apiGetMessage,
  apiUpdateMessage,
  apiDeleteMessage,
  apiUploadImage
} from "@/api/content";
export default {
  data() {
    return {
      fileList: [],
      content: "Hello word",
      editorOption: {
        // some quill options
      },
      dialogVisible: false,
      dialogTitle: "",
      commentVisible: false,
      totalCount: 0,
      formInline: {
        pageNo: 1,
        pageSize: 10,
        title: "",
        startTime: null,
        endTime: null
      },
      form: {
        content: "",
        img: "",
        sort: 0,
        title: "",
        author: "",
        status: 0,
        id: "",
        imgName: ""
      },
      rules: {
        title: [{ required: true, message: "请输人标题", trigger: "blur" }],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }]
      },

      list: []
    };
  },
  methods: {
    onSubmit() {
      console.log(this.content);
      console.log("submit!");
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
      console.log(this.editor);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },

    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListMessage();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListMessage();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleGetListMessage(pageNo) {
      //获取资讯列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiGetListMessage(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
          this.formInline.pageNo = res.data.data.currPage;
        }
      });
    },
    handleAddorUpdateMessage(id) {
      this.fileList = [];
      //新增和编辑资讯
      this.dialogVisible = true;
      if (id) {
        this.dialogTitle = "编辑";
        apiGetMessage({ id: id }).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.form.id = res.data.data.id;
            this.form.content = res.data.data.content;
            this.form.img = res.data.data.img;
            this.form.title = res.data.data.title;
            this.form.author = res.data.data.author;
            this.form.status = res.data.data.status;
            this.form.imgName = res.data.data.imgName;
            this.fileList.push({ name: this.form.imgName });
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              duration: 1500
            });
          }
        });
      } else {
        this.dialogTitle = "新增";
        this.$refs["form"].resetFields();
      }
    },
    handleOnsumit(formName) {
      //表单提交
      if (this.fileList.length > 0) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.dialogTitle == "新增") {
              apiAddMessage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetListMessage();
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
              apiUpdateMessage(this.form).then(res => {
                if (res.status == 200 && res.data.code == 1) {
                  this.dialogVisible = false;
                  this.handleGetListMessage();
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
    handleDeleteMessage(id) {
      this.$confirm(`确定对id为${id}的资讯删除么`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        apiDeleteMessage({ id: id }).then(res => {
          if (res.status == 200 && res.data.code == 1) {
            this.handleGetListMessage();
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
    // 自定义上传方法
    handleUploadImage(file) {
      this.fileList = [];
      const _file = file.file;
      var formData = new FormData();
      formData.append("file", _file);
      apiUploadImage(formData).then(res => {
        if (res.status == 200 && res.data.code == 1) {
          this.form.img = res.data.data.url;
          this.form.imgName = res.data.data.fileMd5;
          this.fileList.push({ name: this.form.imgName });
          this.$message({
            message: "上传成功",
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
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },

  created() {
    this.handleGetListMessage();
  }
};
</script>
<style scoped lang="scss">
.box {
  img {
    width: 100%;
    height: 100%;
  }
  .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
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
