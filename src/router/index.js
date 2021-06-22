import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/login/Login"
import Register from "../components/register/Register"

Vue.use(Router)
let router =  new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title:"登入"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        title:"注册"
      }
    },
    {
      path: '/index',
      name: 'index',
      component: ()=>import("../views/Index"),
      meta:{
        title:"首页"
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import("../views/Result"),
      meta: {
        title: "查询结果"
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import("../views/OrderPage"),
      meta: {
        title: "预订"
      }
    },
    {
      path: '/order2',
      name: 'order2',
      component: () => import("../views/OrderPage2"),
      meta: {
        title: "中转预订"
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import("../views/History"),
      meta: {
        title: "订单历史"
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import("../views/User_info"),
      meta: {
        title: "个人信息"
      }
    },
  ],
  mode:"history",
})

router.beforeEach((to,from,next)=>{
  if((to.name === "order" || to.name === "history" || to.name==="profile" || to.name === "order2") &&
    (!window.sessionStorage.getItem("login_state") || window.sessionStorage.getItem("login_state") !== "yes")){
    next({name:"login"})
  }
  else{
    document.title = to.meta.title
    next()
  }
  // document.title = to.meta.title
  // next()
})

export default router
