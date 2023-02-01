// 导入store
import $store from '@/store'
// 导入进度条组件与css
import NProgress from "nprogress"
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示（隐藏）

// 导入提示组件
import { Message } from 'element-ui';
// 导入axios
import axios from 'axios'
// 创建axios的实例
const request = axios.create({
    // baseURL:"http://localhost:8888",
    baseURL:"http://dida100.com:8888", //请求的基础地址(如果请求的地址省略了域名，就使用该域名)
    timeout:5000,//请求超时时间5000
})

// 请求拦截
// 1 添加加载提示 2 添加token
request.interceptors.request.use(function(config){
    // 显示加载提示
    NProgress.start();
    // 添加token
    config.headers.Authorization = "Bearer "+localStorage.getItem("token");
    return config;
})

// 拦截响应
// 1 移除加载提示  2错误反馈
request.interceptors.response.use(
    function(response){
        // 移除加载提示
        NProgress.done();
        // 如果code为1代表错误
        if(response.data.code===1){
            Message({
                message:response.data.msg,
                type: 'warning'
            });  
        }
        // 返回成功的数据
       
        return response;
    },
    function(err){
        
         // 移除加载提示
        NProgress.done();
        console.log(err,"err");
        if(err.response&&err.response.status==401){
            $store.commit("LOGIN_OUT")
            Message({
                message: '当前用户状态没有权限，请先登录',
                type: 'warning'
            });
            // 提示没有权限
        }else if(err.response&&err.response.status==404){
            Message({
                message: '请求地址找不到，请稍后在试',
                type: 'warning'
            });
            // 提示找不到请求地址
        }else if(err.response&&err.response.status==500||err.response&&err.response.status==505){
            Message({
                message: '服务器正忙请稍后再试！',
                type: 'warning'
            });
            // 提示找不到请求地址
        }        
        else if(err.response&&err.response.status===0){
            Message({
                message: '当前离线状态，请检查网络',
                type: 'warning'
            });
            // 提示没有网络
        }else{
            Message({
                message: '网络请求发送错误',
                type: 'warning'
            });
            // 请求网络失败
        }
        // 返回错误
        
        return err;
    })

    // 导出
    export default request;