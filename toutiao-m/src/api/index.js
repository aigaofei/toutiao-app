import axios from 'axios'

// 原来的基础地址是: http://ttapi.research.itcast.cn
// 这是更新后的最新能用的接口基础地址
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// request.interceptors.request.use(config => {
// const user = this.$store.user
// console.log(config)
// if (config.path.includes('./my')) {
//   if (user) {
//     config.headers.Authorization = `Bearer ${this.$store.user}`
//   }
//   return $router.push('/login')
// } else {
//   return config
// }
// })
export default request
