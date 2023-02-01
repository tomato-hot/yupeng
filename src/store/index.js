import Vue from 'vue'
import Vuex from 'vuex'
// 导入user子模块
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 注册user子模块
    user
  }
})
