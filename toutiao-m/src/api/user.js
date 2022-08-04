import axios from './index.js'

export const login = (data) => {
  return axios({
    // url: 'http://toutiao.itheima.net/v1_0/authorizations',
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 发送验证码
export const sendCode = (params) => {
  return axios({
    url: `/v1_0/sms/codes/${params}`,
    // Path： /v1_0/sms/codes/:mobile
    // url: '/v1_0/sms/codes/:+"params"+',
    method: 'GET'
  })
}
// 获取个人用户资料
export const getSinglePersons = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user'
  })
}
// 获取频道列表
export const getUserChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
