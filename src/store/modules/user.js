// 导入api
import {Login,GetUserInfo,GetMenu} from '@/api/user'
// 导入工具
import {getRoutes} from '@/utils'
// 导入提示组件
import { Message } from 'element-ui';
// 导入路由
import $router from '@/router/index'
export default {
    // 存储数据
    state:{
        userInfo:{},//用户信息
        fullUserInfo:{},//全用户信息
        token:"",//token
        menu:[],//菜单
    },
    // 改变数据
    mutations:{
        // 设置菜单
        SET_MENU(state,data){
            state.menu = data;
        },
        // 设置用户信息
        SET_USERINFO(state,data){
            // 更新Vuex state中的userInfo
            state.userInfo = data;
            // 更新本地存储
            localStorage.setItem("userInfo",JSON.stringify(data))
        },
        // 设置全用户信息
        SET_FULL_USERINFO(state,data){
            state.fullUserInfo = data;
        },
        // 存储token
        SET_TOKEN(state,data){
            state.token = data;
            localStorage.setItem("token",data);
        },
        // 退出
        LOGIN_OUT(state){
            state.token = "";
            state.userInfo = {}
            state.fullUserInfo = {};
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            // 如果当前页面不是首页，跳转到首页
        //    console.log($router);
            // 如果当前页面不是首页就跳转到首页
           if($router.history.current.fullPath!="/"){
                $router.push("/")
           }
           
        }
    },
    // 异步操作与接口
    actions:{
        // 获取菜单的接口
        getMenu(context){
            GetMenu()
            .then(res=>{
                if(res.data&&res.data.code===0){
                    context.commit("SET_MENU",res.data.list)
                    // admin的路由
                    var admin =  {
                        path:"/admin",                     
                        meta:{requireAuth:true},
                        name:"admin",
                        component:()=>import('@/views/admin/AdminView.vue'),
                        children:[                          
                          {path:'',redirect:'dash'}
                        ]
                    };
                    // 通过res.data.list 映射路由
                  
                    // 计算出路由配置
                    var list = getRoutes(res.data.list);
                    // 把admin的children和 返回的数组合并                  
                    admin.children =  admin.children.concat(list)
                    // 更新路由(动态添加路由)
                    $router.addRoute(admin);
                    console.log($router,"$router");

                }
            })
        },

        // 登录 
        // context 上下文： 包含commit 和dispatch方法 state数据
        login(context,data){
            Login(data)
            .then(res=>{
                if(res.data&&res.data.code==200){
                    // 提示登录成功
                    Message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    // 执行commit 存用户信息
                    context.commit("SET_USERINFO",res.data.user)
                    // 执行 commit 存储token
                    context.commit("SET_TOKEN",res.data.token)
                    // 跳转到 /admin管理页面(about)
                    $router.push("/admin")
                    // 获取用户的全信息 dispatch 发送动作  commit提交数据
                    // dispatch执行actions的中的方法
                    // commit是执行mutations中的方法
                    // 根据现有简单用户信息，获取全部用户信息
                    context.dispatch("getFullUserInfo",res.data.user)
                    context.dispatch("getMenu");
                }
            })
        },
        // 获取用户的全信息
        getFullUserInfo(context,data){
            GetUserInfo(data)
            .then(res=>{
                if(res.data&&res.data.code===0){
                    // 执行commit存储用户的全信息
                    context.commit("SET_FULL_USERINFO",res.data.data[0])
                }else{
                    context.commit("LOGIN_OUT") 
                }
            })
        }
    }
}