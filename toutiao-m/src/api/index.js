import axios from 'axios'
import store from '@/store/index.js'
import jsonBigInt from 'json-bigint'
// 原来的基础地址是: http://ttapi.research.itcast.cn
// 这是更新后的最新能用的接口基础地址
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    try {
      // 发送请求前对请求数据路径中超大值--保持原值的操作
      return jsonBigInt.parse(data)
      // 请求前对路径中超大值得保持--此时vue的浏览器插件
      // 得到的是Object对象类型
    } catch (err) {
      return data
    }
  }]
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
