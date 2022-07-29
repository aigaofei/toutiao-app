import axios from './index.js'

export const login = (data) => {
  return axios({
    // url: 'http://toutiao.itheima.net/v1_0/authorizations',
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}
export const sendCode = (params) => {
  return axios({
    url: `/v1_0/sms/codes/${params}`,
    // Path： /v1_0/sms/codes/:mobile
    // url: '/v1_0/sms/codes/:+"params"+',
    method: 'get'
  })
}
