import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/localStorage'

Vue.use(Vuex)

const userCode = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(userCode)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(userCode, state.user)
    },
    removeUser (state, data) {
      state.user = data
      removeItem(userCode)
    }
  },
  actions: {
  },
  modules: {
  }
})
