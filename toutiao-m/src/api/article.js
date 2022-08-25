import axios from './index.js'

// 获取文章搜索结果
export const getArticles = params => {
  return axios({
    url: '/v1_0/articles',
    // url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}
// 获取每个结果的详情
export const articleInfo = articleId => {
  return axios({
    // url: "'/v1_0/articles/'" + articleId, 怎么拼？？？
    url: `/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}
