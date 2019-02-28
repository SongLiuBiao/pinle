<!--
  -    Copyright (c) 2018-2025, songfayuan All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the 霖梓控股 developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: songfayuan (1414798079@qq.com)
  -->

<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名" v-model="listQuery.username">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button v-if="sys_user_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>


  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj, delObj } from "@/api/user";
  import { deptRoleList, fetchDeptTree } from "@/api/role";
  import waves from "@/directive/waves/index.js"; // 水波纹指令
  // import { parseTime } from '@/utils'
  import { mapGetters } from "vuex";
  import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
  import ElOption from "element-ui/packages/select/src/option";

  export default {
    components: {
      ElOption,
      ElRadioGroup
    },
    name: "table_user",
    directives: {
      waves
    },
    data() {
      return {
        treeDeptData: [],
        checkedKeys: [],
        defaultProps: {
          children: "children",
          label: "name"
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        role: [],
        form: {
          username: undefined,
          newpassword1: undefined,
          delFlag: undefined,
          deptId: undefined,
          phone: undefined
        },
        rules: {
          username: [
            {
              required: true,
              message: "请输入账户",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            }
          ],
          newpassword1: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 6,
              max: 20,
              message: "长度在 6 到 20 个字符",
              trigger: "blur"
            }
          ],
          deptId: [
            {
              required: true,
              message: "请选择部门",
              trigger: "blur"
            }
          ],
          role: [
            {
              required: true,
              message: "请选择角色",
              trigger: "blur"
            }
          ],
          phone: [
            {
              required: true,
              message: "手机号",
              trigger: "blur"
            },
            {
              min: 11,
              max: 11,
              message: "长度在11 个字符",
              trigger: "blur"
            }
          ]
        },
        statusOptions: ["0", "1"],
        rolesOptions: [],
        dialogFormVisible: false,
        dialogDeptVisible: false,
        userAdd: false,
        userUpd: false,
        userDel: false,
        dialogStatus: "",
        textMap: {
          update: "编辑",
          create: "创建"
        },
        isDisabled: {
          0: false,
          1: true
        },
        tableKey: 0
      };
    },
    computed: {
      ...mapGetters(["permissions"])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: "有效",
          1: "无效",
          9: "锁定"
        };
        return statusMap[status];
      }
    },
    created() {
      this.getList();
      this.sys_user_add = this.permissions["sys_user_add"];
      this.sys_user_upd = this.permissions["sys_user_upd"];
      this.sys_user_del = this.permissions["sys_user_del"];
    },
    methods: {
      getList() {
        this.listLoading = true;
        this.listQuery.isAsc = false;
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records;
          this.total = response.data.total;
          this.listLoading = false;
        });
      },
      getNodeData(data) {
        this.dialogDeptVisible = false;
        this.form.deptId = data.id;
        this.form.deptName = data.name;
        deptRoleList(data.id).then(response => {
          this.rolesOptions = response.data;
        });
      },
      handleDept() {
        fetchDeptTree().then(response => {
          this.treeDeptData = response.data;
          this.dialogDeptVisible = true;
        });
      },
      handleFilter() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        getObj(row.userId).then(response => {
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = "update";
          this.role = [];
          for (var i = 0; i < row.roleList.length; i++) {
            this.role[i] = row.roleList[i].roleId;
          }
          deptRoleList(response.data.deptId).then(response => {
            this.rolesOptions = response.data;
          });
        });
      },
      create(formName) {
        const set = this.$refs;
        this.form.role = this.role;
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
      },
      update(formName) {
        const set = this.$refs;
        this.form.role = this.role;
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false;
            this.form.password = undefined;
            putObj(this.form).then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success",
                duration: 2000
              });
            });
          } else {
            return false;
          }
        });
      },
      deletes(row) {
        this.$confirm(
          "此操作将永久删除该用户(用户名:" + row.username + "), 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          delObj(row.userId)
            .then(() => {
              this.getList();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
            })
            .cache(() => {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
                duration: 2000
              });
            });
        });
      },
      resetTemp() {
        this.form = {
          id: undefined,
          username: "",
          password: "",
          role: [],
          delFlag: "",
          deptId: "",
          phone: ""
        };
      }
    }
  };
</script>
