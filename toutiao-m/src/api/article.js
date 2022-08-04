import axios from './index.js'

export const getArticles = params => {
  return axios({
    url: '/v1_0/articles',
    // url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}
