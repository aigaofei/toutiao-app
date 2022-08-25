import axios from './index.js'
// 个人资料编辑
export const editMyInfo = data => {
  return axios({
    url: '',
    method: 'POST',
    data
  })
}
