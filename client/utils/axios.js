import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9001",
  timeout: 10000,
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
});

instance.interceptors.request.use(
  function (request) {
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 重定向
    if (error.response && error.response.status === 301) {
      const redirect = error.response.data.data.redirect;
      return (window.location.href = redirect);
    }
    // 重新登录
    if (error.response && error.response.status === 401) {
      return (window.location.href = "http://localhost:9001/index.html/#/login");
    }
    return Promise.reject(error.stack);
  }
);

export default instance;
