<template>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="充值方式">
        <el-radio-group v-model="form.resource">
          <el-radio label="彩金充值"></el-radio>
          <el-radio label="平台活动充值"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="摘要说明">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认充值</el-button>
      </el-form-item>
    </el-form>
   
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
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
