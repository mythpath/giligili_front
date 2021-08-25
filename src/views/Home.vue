<template>
  <div class="home">
    <div class>
      <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <h2>视频列表</h2>
        </el-col>
        <el-col :span="9" :offset="18">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            @keyup.enter.native="search"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" v-for="video in videos" v-bind:key="video.id">
          <el-card class="video-card" @click.native="goVideo(video)">
            <img src="../assets/avatar.jpeg" class="video-avatar" />
            <div>
              <div class="video-title">{{ video.title }}</div>
              <div class="video-bottom clearfix">
                <span class="video-info">{{ video.info }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[6, 12]"
          :page-size="6"
          layout="->,total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page=true
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api/video/";

export default {
  name: "home",
  data() {
    return {
      videos: [],
      start: 0,
      limit: 6,
      total: 0,
      currentPage: 0,
      searchItem: "",
      input: "",
    };
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val;
      this.load();
    },
    handleCurrentChange(val) {
      this.start = this.limit * (val - 1);
      this.load();
    },
    load() {
      API.getVideos(this.start, this.limit, this.searchItem).then((res) => {
        this.videos = res.data.items.data;
        this.total = res.data.total;
      });
    },
    goVideo(video) {
      this.$router.push({ name: "showVideo", params: { videoID: video.ID } });
    },
    search() {
      this.searchItem = this.input;
      this.$message({
        showClose: true,
        center: true,
        message: '模糊搜索：'+this.searchItem,
      });
      this.load()
    },
  },
  components: {},
  beforeMount() {
    this.load();
  },
};
</script>

<style>
.video-avatar {
  width: 100%;
}

.video-title {
  margin: 4px 0 4px 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.video-bottom {
  margin-top: 4px;
}

.video-info {
  color: #909399;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.video-card {
  cursor: pointer;
}

.block{
  margin:10px 0px 0px 0px;
}
</style>