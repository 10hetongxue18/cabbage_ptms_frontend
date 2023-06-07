import axios from "axios";
import router from "../config/router.js";

const myAxios = axios.create({
    baseURL: 'http://localhost:1018/api/',
    // responseType:'blob',
});

//允许跨域携带cookie
myAxios.defaults.AxiosInstance=true; //设置为true


// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['authorization']=localStorage.getItem('authorization')   //全局设置接口请求header带token
    // console.log(config.headers['authorization'])
    // console.log("我要发请求了",config)
    // console.log(config.headers)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log("我收到你的响应了",response)
    let token=response.headers['authorization'];
    if(token){
        localStorage.setItem('authorization',token)
    }
    // console.log(localStorage.getItem('authorization'))
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});


export default myAxios


