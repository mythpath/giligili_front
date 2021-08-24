import axios from 'axios'

// 创建film记录
const postFilm = form => axios.post("/api/v1/film", form).then(res => res.data)

// 获取film详情
const getFilm = id => axios.get(`/api/v1/film/${id}`).then(res => res.data)

// film列表
const getFilms = (start, limit) =>
  axios.get("/api/v1/films", {
    params: {
      start,
      limit
    }
  })
  .then(res => res.data);

export {
  getFilms,
  getFilm,
  postFilm
}
