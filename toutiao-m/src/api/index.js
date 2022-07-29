import router from '@/router'
import store from '@/store'
import axios from 'axios'

const request = axios.create({
  // 原来的基础地址是: http://ttapi.research.itcast.cn
  // 这是更新后的最新能用的接口基础地址
  baseURL: 'http://toutiao.itheima.net'
})
// 请求拦截器
axios.interceptors.request.use(config => {
  const user = this.$store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(response => {
  // 正常的响应通过
  return response
},
async error => {
  // 判断响应码是否是401，和判断是否有刷新的token值--
  // 说明token码 过期，获取新token值
  const user = this.$store.state.user
  if (!user || !user.refresh_token) {
    return router.push('/login') // 没有就跳到首页
  }
  // 如果有refresh_token--则再次带着它作为许可条件去获取新token
  try {
    const res = await axios({
      method: 'GET',
      url: '/v1_0/authorizations',
      headers: {
        Authorization: `Bearer ${user.refresh_token}`
      }
    })
    // 如果获取成功，则把新的 token 更新到容器中
    console.log('刷新 token  成功', res)
    store.commit('setUser', {
      token: res.data.data.token,
      refresh_token: user.refresh_token
    })
    // 把之前失败的用户信息再次也都发出去
    // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
    // return 把 request 的请求结果继续返回给发请求的具体位置
    // 这里的request 是头顶那里对axios创建对象的别名
    return request(error.config)
  } catch (err) {
    router.push('/login')
  }
  return Promise.reject(error)
}
)

export default request
