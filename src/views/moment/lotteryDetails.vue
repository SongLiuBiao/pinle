<template>
  <div class="box">
    <div class="title">彩票</div>
    <div class="content">
      <el-row :gutter="30">
        <el-col :span="4">操作</el-col>
        <el-col :span="20">
          <el-button type="primary" size="mini" @click="handleUpdateLottery()">修改</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">彩票ID</el-col>
        <el-col :span="20">{{data.id}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">彩票名称</el-col>
        <el-col :span="20">{{data.name}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">销售状态</el-col>
        <el-col :span="20">{{data.status==0?'不销售':'销售'}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">销售最大期数</el-col>
        <el-col :span="20">{{data.maxSell}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">网站最大保底</el-col>
        <el-col :span="20">{{data.maxSafeguardPercentage}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">盈利佣金限制</el-col>
        <el-col :span="20">{{data.maxRemunerationPercentage}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">发起人购买比</el-col>
        <el-col :span="20">{{data.minBuyPercentage}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最少参与金额</el-col>
        <el-col :span="20">{{data.minSafeguardPercentage}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最少保底比例</el-col>
        <el-col :span="20">{{data.minParticipantPercentage }}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最多合买限制</el-col>
        <el-col :span="20">{{data.schemeCancelPercentage}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">排序</el-col>
        <el-col :span="20">{{data.sort}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">图片</el-col>
        <el-col :span="20">{{data.image}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最后处理</el-col>
        <el-col :span="20">{{data.lastProcess}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">下一奖期的跨度</el-col>
        <el-col :span="20">{{data.span}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最后奖期</el-col>
        <el-col :span="20">{{data.issue}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最小购买金额</el-col>
        <el-col :span="20">{{data.minPurchase}}</el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="4">最大购买金额</el-col>
        <el-col :span="20">{{data.maxPurchase}}</el-col>
      </el-row>
    </div>

    <el-dialog title="彩票修改" :visible.sync="dialogVisible" width="50%">
      <el-form label-width="200px" :rules="rules" ref="formInline" :model="formInline">
        <el-form-item label="彩票名称" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="销售最大期数" prop="maxSell">
          <el-input v-model="formInline.maxSell"></el-input>
        </el-form-item>
        <el-form-item label="最多网站保底百分比" prop="maxSafeguardPercentage">
          <el-input v-model="formInline.maxSafeguardPercentage"></el-input>
        </el-form-item>
        <el-form-item label="最多盈利佣金百分比" prop="maxRemunerationPercentage">
          <el-input v-model="formInline.maxRemunerationPercentage"></el-input>
        </el-form-item>
        <el-form-item label="最少认购百分比" prop="minBuyPercentage">
          <el-input v-model="formInline.minBuyPercentage"></el-input>
        </el-form-item>
        <el-form-item label="最少保底百分比	" prop="minSafeguardPercentage">
          <el-input v-model="formInline.minSafeguardPercentage"></el-input>
        </el-form-item>
        <el-form-item label="最少参与金额百分比" prop="minParticipantPercentage">
          <el-input v-model="formInline.minParticipantPercentage"></el-input>
        </el-form-item>
        <el-form-item label="合买方案撤销最多进度百分比" prop="schemeCancelPercentage">
          <el-input v-model="formInline.schemeCancelPercentage"></el-input>
        </el-form-item>
        <el-form-item label="最后处理" prop="lastProcess">
          <el-input v-model="formInline.lastProcess"></el-input>
        </el-form-item>
        <el-form-item label="下一期奖期的跨度" prop="span">
          <el-input v-model="formInline.span"></el-input>
        </el-form-item>
        <el-form-item label="最后奖期" prop="issue">
          <el-input v-model="formInline.issue"></el-input>
        </el-form-item>
        <el-form-item label="最小购买金额" prop="minPurchase">
          <el-input v-model="formInline.minPurchase"></el-input>
        </el-form-item>
        <el-form-item label="最大购买金额" prop="maxPurchase">
          <el-input v-model="formInline.maxPurchase"></el-input>
        </el-form-item>
        <el-form-item label="彩票排序" prop="sort">
          <el-input v-model="formInline.sort"></el-input>
        </el-form-item>
        <el-form-item label="图片">
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
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formInline.status">
            <el-radio label="0">不销售</el-radio>
            <el-radio label="1">销售</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOnSubmit('formInline')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apiGetLotteryInfo, apiUpdateLottery } from "@/api/lottery";
import { apiUploadImage } from "@/api/content";
export default {
  data() {
    return {
      dialogVisible: false,
      value: "",
      input: "",
      data: {},
      fileList: [],
      formInline: {
        id: "",
        name: "",
        status: "1",
        maxSell: "",
        maxSafeguardPercentage: "",
        maxRemunerationPercentage: "",
        minBuyPercentage: "",
        minSafeguardPercentage: "",
        minParticipantPercentage: "",
        schemeCancelPercentage: "",
        lastProcess: "",
        span: "",
        issue: "",
        minPurchase: "",
        maxPurchase: "",
        sort: "",
        image: ""
      },
      rules: {
        name: [{ required: true, message: "请输入彩票名称", trigger: "blur" }],
        maxSell: [
          { required: true, message: "请输入销售最大期数", trigger: "blur" }
        ],
        maxSafeguardPercentage: [
          {
            required: true,
            message: "请输入最多网站保底百分比",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.handleGetLotteryInfo();
  },
  methods: {
    handleGetLotteryInfo() {
      // 获取彩种详情
      apiGetLotteryInfo({ id: this.$route.query.id }).then(res => {
        if (res.status == 200) {
          this.data = res.data;
          this.formInline.name = res.data.name;
          this.formInline.status = String(res.data.status);
          this.formInline.maxSell = res.data.maxSell;
          this.formInline.maxSafeguardPercentage =
            res.data.maxSafeguardPercentage;
          this.formInline.maxRemunerationPercentage =
            res.data.maxRemunerationPercentage;
          this.formInline.minBuyPercentage = res.data.minBuyPercentage;
          this.formInline.minSafeguardPercentage =
            res.data.minSafeguardPercentage;
          this.formInline.minParticipantPercentage =
            res.data.minParticipantPercentage;
          this.formInline.schemeCancelPercentage =
            res.data.schemeCancelPercentage;
          this.formInline.lastProcess = res.data.lastProcess;
          this.formInline.span = res.data.span;
          this.formInline.issue = res.data.issue;
          this.formInline.minPurchase = res.data.minPurchase;
          this.formInline.maxPurchase = res.data.maxPurchase;
          this.formInline.sort = res.data.sort;
        }
      });
    },
    handleUpdateLottery(formName) {
      //修改彩种
      this.dialogVisible = true;
      this.fileList = [];
      this.handleGetLotteryInfo();
    },
    handleOnSubmit(formName) {
      //提交修改
      this.$refs[formName].validate(vaild => {
        if (vaild) {
          this.formInline.id = this.data.id;
          apiUpdateLottery(this.formInline).then(res => {
            if (res.status == 200 && res.data.code == 1000) {
              this.dialogVisible = false;
              this.handleGetLotteryInfo();
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
          this.fileList.push({ name: res.data.data.fileMd5 });
          this.formInline.image = res.data.data.url;
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
  .content {
    padding-left: 8px;
    margin-bottom: 20px;
    border: 1px solid #eaeaea;
    .el-row {
      margin: 0 0 0 -8px !important;
      border-bottom: 1px solid #eaeaea;

      .el-col {
        padding: 10px 0;
        border-right: 1px solid #eaeaea;
      }
    }
  }
}
</style>
