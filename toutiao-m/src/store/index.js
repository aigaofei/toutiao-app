import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/localStorage'

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
      setItem(userCode, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
