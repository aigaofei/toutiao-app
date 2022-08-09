import axios from './index.js'
// 获取所有的频道内容
export const allChannelContent = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
// 提交登录--用户直接添加已选频道内容
export const postChannelContent = (channel) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
// 提交登陆--用户删除后确定留下来的频道内容
export const postDeleteChannelContent = (channel) => {
  return axios({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: [channel]
    }
  })
}
