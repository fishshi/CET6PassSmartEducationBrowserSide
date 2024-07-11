import axios from 'axios';
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js'
import router from '@/router'

// 定义一个变量,记录公共的前缀
const baseURL = '/api';

// 定制请求的实例
const instance = axios.create({ baseURL })

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // 请求前的回调
        // 添加token
        const tokenStore = useTokenStore();
        // 判断有没有token
        if (tokenStore.token)
            config.headers.token = tokenStore.token
        return config;
    },
    err => {
        // 请求错误的回调
        return Promise.reject(err)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    result => {
        // 判断业务状态码
        if (result.data.code === 1)
            return result.data;
        // 操作失败
        ElMessage.error(result.data.msg ? result.data.msg : '服务异常')
        // 异步操作的状态转换为失败
        return Promise.reject(result.data)
    },
    err => {
        let status = err.response ? err.response.status : 500;
        if (status === 401) {
            //token失效
            ElMessage.error('登录失效，请重新登录')
            //跳转到登录页面
            router.push('/login')
        }
        else
            ElMessage.error('服务异常')
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;