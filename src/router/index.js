import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/login.vue'
import index from '@/page/index/index.vue'
import userlist from '@/page/index/userList.vue'
import banner from '@/page/index/banner.vue'
import classtify from '@/page/index/classtify.vue'
import good from '@/page/index/good.vue'
import home from '@/page/index/home'
import setting from '@/page/index/setting'
import order from '@/page/index/order'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      // name:'index',
      redirect:{
        name:'home'
      }
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path:'/home',
          name:'home',
          component:home
        },
        {
          path:'/userlist',
          name:'userlist',
          component:userlist
        },
        {
          path:'/banner',
          name:'banner',
          component:banner
        },
        {
          path:'/classtify',
          name:'classify',
          component:classtify
        },
        {
          path:'/good',
          name:'good',
          component:good
        },
        {
          path:'/setting',
          name:'setting',
          component:setting
        },
        {
          path:'/order',
          name:'order',
          component:order
        }
    ]
    },
    {
      path:'/login',
      name:'Login',
      component:login
    },
  ]
})
