<template>
  <el-menu class="top-bar" mode="horizontal" router>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/postvideo">视频投稿</el-menu-item>
    <el-menu-item index="/about">关于我们</el-menu-item>
    <el-menu-item index="/user">我的</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.top-bar {
  margin-bottom: 30px;
}
</style>
