import axios from "axios";

// 读视频详情
const postUploadToken = fileName => axios.post('/api/objs/upload/token', {
    filename: fileName
}).then(res => res.data);

export default postUploadToken;
