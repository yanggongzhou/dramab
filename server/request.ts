import axios, { AxiosError, CreateAxiosDefaults } from 'axios'

// 取消重复请求
const Service = axios.create({
  baseURL: process.env.BaseUrl,
  timeout: 10 * 1000,
} as CreateAxiosDefaults);

// 添加请求拦截器
Service.interceptors.request.use(
  (request) => {
    if (request.headers) {
      Reflect.set(request.headers, 'pline', "WEBFIC") // DRAMABOX
    }
    return request
  },
  error => Promise.reject(error)
);

// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    // return response.data;

    if (response.status === 200) {
      if (response.data.status === 0) {
        return response.data.data
      }
      // if (response.data.status === 404 || response.data.status === 12000) {
      //   return Promise.resolve('BadRequest_404')
      // }
      // return Promise.resolve('BadRequest_500')
      console.warn(`\n >>> Response Error ${response.data.status} <<< \n` +
        `Request Url: ${ response.config.url } \n` +
        `Request Data: ${ response.config.data || '' } \n` +
        `Request Params: ${ response.config.params || '' } \n` +
        `Response Data: ${ JSON.stringify(response.data) } \n`
      );
      return 'BadRequest_404'
    }
    if (response.status === 404) {
      console.warn(`\n >>> Response Error 404 <<< \n` +
        `Request Url: ${ response.config.url } \n` +
        `Request Data: ${ response.config.data || '' } \n` +
        `Request Params: ${ response.config.params || '' } \n` +
        `Response Data: ${ JSON.stringify(response.data) } \n`
      );
      return 'BadRequest_404'
    }
    console.warn(`\n >>> Response Error 500 <<< \n` +
      `Request Url: ${ response.config.url } \n` +
      `Request Data: ${ response.config.data || '' } \n` +
      `Request Params: ${ response.config.params || '' } \n` +
      `Response Data: ${ JSON.stringify(response.data) } \n`
    );
    return 'BadRequest_500'
  },
  (err: AxiosError) => {
    // [AxiosError: timeout of xxx ms exceeded]
    if (err.code === "ECONNABORTED") {
      console.error(`\n >>> Timeout of ${err.config?.timeout}ms exceeded <<< \n` +
        `URL: ${ err.config?.url } \n` +
        `Request Data: ${ err.config?.data || '' } \n` +
        `Request Params: ${ err.config?.params || '' }`);
    }
    // [AxiosError: Request failed with status code 404]
    if (err.code === "ERR_BAD_REQUEST") {
      console.error(`\n >>> Request failed with status code 404 <<< \n` +
        `URL: ${ err.config?.url } \n` +
        `Request Data: ${ err.config?.data || '' } \n` +
        `Request Params: ${ err.config?.params || '' }`);
    }
    console.error(`\n >>> Request failed <<< \n` +
      `URL: ${ err.config?.url } \n` +
      `Request Data: ${ err.config?.data } \n` +
      `Request Params: ${ err.config?.params || '' }`);
    return 'BadRequest_500'
  }
);

export default Service
