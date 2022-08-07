import axios from './index.js'
// 获取所有的频道内容
export const allChannelContent = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
