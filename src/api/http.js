import axios from 'axios'
// import vueAxios from 'vue-axios';
import qs from 'qs'
import store from '../store'
// 响应时间
axios.defaults.timeout = 50 * 1000
// 配置cookie
axios.defaults.withCredentials = false
// 配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.defaults.headers.common['Cache-Control'] = 'no-cache'

//设置请求拦截器
// axios.interceptors.request.use(
//   config => {
//     // 在发送请求前做些什么
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   err => {
//     // 在请求错误的时候的逻辑处理
//     return Promise.reject(err);
//   }
// );


//设置响应拦截器
// axios.interceptors.response.use(
//   data => {
//     if (data.status && data.status == 200 && data.data.status == "error") {
//       Message.error({ message: data.data.msg });
//       return;
//     }
//     return data;
//   },
//   err => {
//     console.log("响应拦截", err.response);
//     if (err.response.status == 504 || err.response.status == 404) {
//       Message.error({ message: "服务器错误" });
//     } else if (err.response.status == 403) {
//       Message.error({ message: "权限不足,请联系管理员!" });
//     } else if (err.response.status == 401) {
//       Message.error({
//         message: "登录失效，请重新登录。3s后将自动跳转到登录页"
//       });
//     } else {
//       Message.error({ message: "未知错误!" });
//     }
//     return Promise.reject(err);
//   }
// );


// 配置接口地址（路径处理函数）考虑跨域情况下
let filterUrl = url =>{
    let baseUrl;
    if(process.env.NODE_ENV === "development"){
        baseUrl = "/api";
    }else{
        baseUrl = "http://localhost:3000"
    }
    if (url && url.startsWith("http")) {
    return url;
  }
  return baseUrl + url;
}
export default axios;

// 发送请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
      axios({
        method: 'post',
          url:url,
          data: params,
          paramsSerializer: function (params) {
            // return qs.stringify(params, {arrayFormat: 'repeat'})
            return params
          },
      }).then(
        res=>{
          resolve(res.data)
        },err=>{
          reject(err.data)
        }
      ).catch(err=>{
        reject(err.data)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        paramsSerializer: function (params) {
          // return qs.stringify(params, {arrayFormat: 'repeat'})
          return params
        },
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);

      })
  })
}
