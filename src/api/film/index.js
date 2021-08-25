import axios from 'axios'

// 创建film记录
const postFilm = form => axios.post("/api/objs/film", form).then(res => res.data)

// 获取film详情
const getFilm = id => axios.get(`/api/objs/film/${id}`).then(res => res.data)

// film列表
const getFilms = (start, limit, search) =>
    axios.get("/api/objs/films", {
    params: {
      start,
      limit,
      search
    }
  })
  .then(res => res.data);

export {
  getFilms,
  getFilm,
  postFilm
}
