<template>
  <div class="post-video">
    <h2>欢迎投稿</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="视频地址">
        <el-input type="url" v-model="form.url"></el-input>
      </el-form-item>

      <el-form-item label="视频简介">
        <el-input type="textarea" v-model="form.info"></el-input>
      </el-form-item>

      <el-form-item label="视频封面">
        <el-upload
          class="avatar-upload"
          label="描述"
          action
          ref="upload"
          :before-upload="fnBeforeUpload"
          :http-request="fnUploadRequest"
          :show-file-list="false"
        >
          <img v-if="imageUrl" src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">只能上传png文件，且不能超过500KB</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/api/video/";
import uploadAPI from "@/api/upload/";

export default {
  class: "PostVideo",
  data() {
    return {
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisable: false,
      form: {
        title: "",
        info: "",
        url: "",
        avatar: ""
      }
    };
  },
  methods: {
    fnBeforeUpload(file) {
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        this.$message.error("上传头像图片只能是 PNG 格式！");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB！");
      }
      return isPNG && isLt2M;
    },
    fnUploadRequest(option) {
      uploadAPI(option.file.name)
        .then(res => {
          const oReq = new XMLHttpRequest();
          oReq.open("PUT", res.data.put, true);
          oReq.onload = () => {
            this.imageUrl = res.data.get;
            this.form.avatar = res.data.key;
          };
          oReq.send(option.file);
        })
        .catch(error => {
          this.$notify.error({
            title: "网络错误，或者服务器宕机",
            message: error
          });
        });
    },
    onSubmit() {
      API.postVideo(this.form)
        .then(res => {
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
        .catch(error => {
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  max-width: 178px;
  max-height: 178px;
  display: block;
}
</style>