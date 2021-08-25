import axios from "axios";

// 创建视频
const postVideo = form => axios.post("/api/objs/video", form).then(res => res.data);

// 读视频详情
const getVideo = id => axios.get(`/api/objs/video/${id}`).then(res => res.data);

// 读取视频列表
const getVideos = (start, limit, search) =>
  axios
  .get("/api/objs/video", {
    params: {
      start,
      limit,
      search
    }
  })
  .then(res => res.data);

export {
  getVideos,
  getVideo,
  postVideo
};
