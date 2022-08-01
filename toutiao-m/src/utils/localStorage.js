// 持久化本地存储的数据
// 1 创建本地存储
export const setItem = (item, data) => {
  let dataInfo = ''
  if (typeof data === 'object') {
    dataInfo = JSON.stringify(data)
  }
  window.localStorage.setItem(item, dataInfo)
}
// 2 获取本地存储
export const getItem = item => {
  const data = window.localStorage.getItem(item)
  return JSON.parse(data)
}
// 3 删除本地存储
export const removeItem = item => {
  window.localStorage.removeItem(item)
}
