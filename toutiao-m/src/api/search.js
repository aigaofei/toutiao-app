import axios from './index.js'
export const getSearchSuggestion = q => {
  return axios({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
export const getSearchResult = params => {
  return axios({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
