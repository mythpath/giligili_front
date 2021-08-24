<template>
  <div class="post-video">
    <el-row :gutter="20">
      <el-col :span="15">
        <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions">
        </video-player>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import * as API from '@/api/video/';

export default {
  name: 'ShowVideo',
  data() {
    return {
      video: {},
      playerOptions: {
        fluid: true,
        type: 'video/mp4',
        source: this.video.url,
      },
    };
  },
  methods: {
    load() {
      API.getVideo(this.$router.params.videoID).then((res) => {
        this.videos = res.data;
        this.playerOptions.source[0].src = this.video.url;
      });
    },
  },
  components() {
    // eslint-disable-next-line no-unused-expressions
    videoPlayer;
  },
  beforeMount() {
    // eslint-disable-next-line no-unused-expressions
    this.load;
  },
};
</script>

<style>
.video-player-box {
  max-width: 100%;
}
</style>
