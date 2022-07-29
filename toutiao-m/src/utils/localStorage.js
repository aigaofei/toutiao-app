// 持久化本地存储的数据
// 1 创建本地存储
export const setItem = (item, data) => {
  const dataInfo = JSON.stringify(data)
  window.localStorage.setItem(item, dataInfo)
}
// 2 获取本地存储
export const getItem = item => {
  const data = window.localStorage.getItem(item)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 3 删除本地存储
export const remove = item => window.localStroage.removeItem(item)
