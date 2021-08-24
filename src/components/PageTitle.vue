<template>
  <el-row type="flex" class="row-bg">
    <el-col :span="12">
      <h2>name</h2>
    </el-col>
    <el-col :span="9" :offset="18">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        @keyup.enter.native="inputFunction"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "pageTitle",
  inputFunction: "search",
  data() {
    return {};
  },
  setInputFunction(func){
      this.inputFunction =func
  }
};
</script>