import axios from 'axios'
import store from '@/store/index.js'
// 原来的基础地址是: http://ttapi.research.itcast.cn
// 这是更新后的最新能用的接口基础地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// const users = this.$store.state.user   错误获取vuex方法
// const users = $store.state.user   错误获取vuex方法，会报错
// console.log(this)  ---> undefined
// console.log(users) ----> 会报错
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // console.log(config)
  // console.log(config.baseURL)
  // console.log(config.url) 这里是获取即将请求的路径，非当前页的
  // if (config.url.indexOf('/user') !== -1) {
  //   console.log('判断路径成功.....')
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default request
