<template>
  <div class="post-video">
    <h2>欢迎投稿</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="视频简介">
        <el-input type="textarea" v-model="form.info"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/api/video/";

export default {
  class: "PostVideo",
  data() {
    return {
      form: {
        title: '',
        info: '',
      }
    };
  },
  methods: {
    onSubmit() {
      API.postVideo(this.form)
        .then((res) => {
          if (res.status > 0) {
            this.$notify.error({
              title: "投稿失败",
              message: res.msg
            });
          } else {
            this.$notify({
              title: "投稿成功",
              message: `您投稿视频ID为${res.data.id}`,
              type: "success"
            });
          }
        })
        .catch((error) => {
          this.$notify.error({
            title: "网络错误或服务器宕机。",
            message: error
          });
        });
    }
  },
  components: {}
};
</script>