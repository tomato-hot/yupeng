import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NProgress from "nprogress"
import 'nprogress/nprogress.css' //这个样式必须引入
 
NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示（隐藏）

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:"/admin",
    // 定义页面是否需要权限
    meta:{requireAuth:true},
    name:"admin",
    component:()=>import('../views/admin/AdminView.vue'),
    children:[
      {path:'dash',component:()=>import('../views/admin/DashView.vue')},
      // 重定向：如果为空跳转到 dash子路由
      {path:'',redirect:'dash'}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

// 每个页面进入前执行的回调函数
router.beforeEach((to,from,next)=>{
  // 开启进度条
  NProgress.start();
  console.log(to,"to");
  // 如果去的页面匹配路由的第0个需要权限则进行判断
  if(to.matched[0]&&to.matched[0].meta.requireAuth){
    // 判断是否登录
    if(localStorage.getItem("token")){
      next();
    }else{
      // 如果没有登录跳转到首页
      next("/");
    }

  }else{
    // 直接放行
    next();
  }
})
router.afterEach(()=>{
  // 进入页面移除进度条
  NProgress.done();
})

export default router
