import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login'
import layout from '@/views/layout'
import qa from '@/views/qa'
import my from '@/views/my'
import video from '@/views/video'
import home from '@/views/home'
import search from '@/views/components/search'
import articleInfo from '@/views/components/articleInfo'
import editMyInfo from '@/views/my/editMyInfo'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  // 下面是登录路由
  {
    path: '/login',
    name: 'login',
    component: login
  },
  // 分页功能路由
  {
    path: '/layout',
    name: 'layoutIndex',
    component: layout,
    redirect: '/layout/home',
    children: [
      {
        // 默认子路由只能有一个
        path: 'home', // 默认不写就是父级下默认的子级路由
        name: 'homeIndex',
        component: home
      },
      {
        path: 'qa',
        name: 'qaIndex',
        component: qa
      },
      {
        path: 'video',
        name: 'videoIndex',
        component: video
      },
      {
        path: 'my',
        name: 'myIndex',
        component: my
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/articleInfo/:id', // 动态路由
    name: 'articleInfo',
    component: articleInfo,
    props: true // 在此组件里props直接使用对应的参数id
  },
  {
    name: 'editMyInfo',
    path: '/layout/my/editMyInfo',
    component: editMyInfo
  }
]

const router = new VueRouter({
  routes
})

export default router
