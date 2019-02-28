<template>
  <div class="box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="版本号">
        <el-input v-model="formInline.versionName" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option
            v-for="item in statusS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option
            v-for="item in typeS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddorUpdateApp()">增加</el-button>
        <el-button type="primary" @click="handleGetListApp(1)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.status == 0">新建</template>
          <template v-if="scope.row.status == 1">开启</template>
          <template v-if="scope.row.status == -1">关闭</template>
        </template>
      </el-table-column>
      <el-table-column prop="versionCode" align="center" label="版本号"></el-table-column>
      <el-table-column prop="apkUrl" align="center" label="下载地址"></el-table-column>
      <el-table-column align="center" label="升级范围">
        <template slot-scope="scope">
          <template v-if="scope.row.upgradeRange == 0">所有版本</template>
          <template v-if="scope.row.upgradeRange == 1">部分版本</template>
          <template v-if="scope.row.upgradeRange == 2">按账号</template>
          <template v-if="scope.row.upgradeRange == 3">按时间段</template>
          <template v-if="scope.row.upgradeRange == 4">按启动次数</template>
          <template v-if="scope.row.upgradeRange == 5">按借钱次数</template>
        </template>
      </el-table-column>
      <el-table-column prop="upgradeRange" align="center" label="强制升级">
        <template slot-scope="scope" v-if="scope.row.isForce">{{scope.isForce==1?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="upgradeRange" align="center" label="静默升级">
        <template slot-scope="scope" v-if="scope.row.isSilence">{{scope.isSilence==1?'是':'否'}}</template>
      </el-table-column>
      <el-table-column prop="minVersion" align="center" label="最小版本"></el-table-column>
      <el-table-column prop="maxVersion" align="center" label="最大版本"></el-table-column>
      <el-table-column prop="type" align="center" label="类型">
        <template slot-scope="scope" v-if="scope.row.type">{{scope.row.type=='I'?'ios':'安卓'}}</template>
      </el-table-column>
      <el-table-column prop="appChannel" align="center" label="渠道"></el-table-column>
      <el-table-column prop="appCode" align="center" label="渠道码"></el-table-column>
      <el-table-column prop="accounts" align="center" label="账号"></el-table-column>
      <el-table-column prop="startCount" align="center" label="启动次数"></el-table-column>
      <el-table-column prop="gmtStart" align="center" label="开始时间"></el-table-column>
      <el-table-column prop="gmtEnd" align="center" label="结束时间"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleAddorUpdateApp(scope.row.id)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本号" prop="versionCode">
          <el-input v-model="form.versionCode"></el-input>
        </el-form-item>
        <el-form-item label="版本名" prop="versionName">
          <el-input v-model="form.versionName"></el-input>
        </el-form-item>
        <el-form-item label="版本描述" prop="versionDesc">
          <el-input v-model="form.versionDesc"></el-input>
        </el-form-item>
        <el-form-item label="apk包下载地址" prop="apkUrl">
          <el-input v-model="form.apkUrl"></el-input>
        </el-form-item>
        <el-form-item label="升级范围" prop="upgradeRange">
          <el-select v-model="form.upgradeRange" placeholder="请选择">
            <el-option
              v-for="item in upgradeRangeS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="升级最小版本" prop="minVersion">
          <el-input v-model="form.minVersion"></el-input>
        </el-form-item>
        <el-form-item label="升级最大版本" prop="maxVersion">
          <el-input v-model="form.maxVersion"></el-input>
        </el-form-item>

        <el-form-item label="下载包md5" prop="apkMd5">
          <el-input v-model="form.apkMd5"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in typeS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道" prop="appChannel">
          <el-input v-model="form.appChannel"></el-input>
        </el-form-item>
        <el-form-item label="渠道吗" prop="appCode">
          <el-input v-model="form.appCode"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="accounts">
          <el-input v-model="form.accounts"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="gmtStart">
          <el-date-picker
            v-model="form.gmtStart"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="gmtEnd">
          <el-date-picker
            v-model="form.gmtEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="强制升级" prop="isForce">
          <el-radio-group v-model="form.isForce">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="静默升级" prop="isSilence">
          <el-radio-group v-model="form.isSilence">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOnsubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { apiListApp, apiGetApp, apiAddApp, apiUpdateApp } from "@/api/admin";
export default {
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      totalCount: 0,
      list: [],
      upgradeRangeS: [
        {
          label: "针对所有版本",
          value: "0"
        },
        {
          label: "针对部分版本",
          value: "1"
        },
        {
          label: "按账号",
          value: "2"
        },
        {
          label: "按时间段",
          value: "3"
        },
        {
          label: "按启动次数",
          value: "4"
        },
        {
          label: "按借钱次数",
          value: "5"
        }
      ],
      statusS: [
        {
          label: "新建",
          value: 0
        },
        {
          label: "开启",
          value: 1
        },
        {
          label: "关闭",
          value: -1
        }
      ],
      typeS: [
        {
          label: "IOS",
          value: "I"
        },
        {
          label: "安卓",
          value: "A"
        }
      ],
      formInline: {
        versionName: "",
        status: "",
        type: "",
        pageSize: 10,
        pageNo: 1
      },
      form: {
        id: "",
        status: "",
        versionCode: "",
        versionName: "",
        versionDesc: "",
        apkUrl: "",
        upgradeRange: "",
        isForce: 1,
        isSilence: 1,
        minVersion: "",
        maxVersion: "",
        apkMd5: "",
        type: "",
        appChannel: "",
        appCode: "",
        accounts: "",
        gmtStart: null,
        gmtEnd: null
      },
      rules: {
        status: [{ required: true, message: "请选择类型", trigger: "change" }],
        versionCode: [
          { required: true, message: "请输入版本号", trigger: "blur" }
        ],
        versionDesc: [
          { required: true, message: "请输入版本描述", trigger: "blur" }
        ],

        apkUrl: [
          { required: true, message: "请输入api包下载地址", trigger: "blur" }
        ],
        // upgradeRange: [
        //   { required: true, message: "请选择升级范围", trigger: "change" }
        // ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
        // appChannel: [
        //   { required: true, message: "请输入渠道", trigger: "blur" }
        // ],
        // appCode: [{ required: true, message: "请输入渠道码", trigger: "blur" }],
        // gmtStart: [
        //   { required: true, message: "请选择开始时间", trigger: "change" }
        // ],
        // gmtEnd: [
        //   { required: true, message: "请选择结束时间", trigger: "change" }
        // ]
      }
    };
  },
  created() {
    this.handleGetListApp();
  },
  methods: {
    handleGetListApp(pageNo) {
      //获取App版本列表
      if (pageNo) {
        this.formInline.pageNo = pageNo;
      }
      apiListApp(this.formInline).then(res => {
        if (res.status == 200) {
          this.list = res.data.data.page.list;
          this.totalCount = res.data.data.page.totalCount;
        }
      });
    },
    handleAddorUpdateApp(id) {
      //新增和编辑
      this.dialogVisible = true;
      if (id) {
        this.dialogTitle = "修改";
        this.form.id = id;
        apiGetApp({ id: id }).then(res => {
          if (res.status == 200) {
            this.form.status = res.data.data.appUpgrade.status;
            this.form.versionCode = res.data.data.appUpgrade.versionCode;
            this.form.versionName = res.data.data.appUpgrade.versionName;
            this.form.versionDesc = res.data.data.appUpgrade.versionDesc;
            this.form.apkUrl = res.data.data.appUpgrade.apkUrl;
            this.form.upgradeRange = res.data.data.appUpgrade.upgradeRange;
            this.form.isForce = res.data.data.appUpgrade.isForce;
            this.form.isSilence = res.data.data.appUpgrade.isSilence;
            this.form.minVersion = res.data.data.appUpgrade.minVersion;
            this.form.maxVersion = res.data.data.appUpgrade.maxVersion;
            this.form.apkMd5 = res.data.data.appUpgrade.apkMd5;
            this.form.type = res.data.data.appUpgrade.type;
            this.form.appChannel = res.data.data.appUpgrade.appChannel;
            this.form.appCode = res.data.data.appUpgrade.appCode;
            this.form.accounts = res.data.data.appUpgrade.accounts;
            this.form.gmtStart = res.data.data.appUpgrade.gmtStart;
            this.form.gmtEnd = res.data.data.appUpgrade.gmtEnd;
            console.log(this.form.gmtStart);
          }
        });
      } else {
        this.dialogTitle = "新增";
        this.$refs["form"].resetFields();
      }
    },
    handleOnsubmit(formName) {
      //新增和修改提交
      this.$refs[formName].validate(valid => {
        if (this.dialogTitle == "新增") {
          apiAddApp(this.form).then(res => {
            if (res.data.code == 1) {
              this.dialogVisible = false;
              this.handleGetListApp();
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500
              });
            }
          });
        } else {
          apiUpdateApp(this.form).then(res => {
            if (res.data.code == 1) {
              this.dialogVisible = false;
              this.handleGetListApp();
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500
              });
            }
          });
        }
      });
    },
    handleSizeChange(val) {
      this.formInline.pageSize = val;
      this.handleGetListApp();
    },
    handleCurrentChange(val) {
      this.formInline.pageNo = val;
      this.handleGetListApp();
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
