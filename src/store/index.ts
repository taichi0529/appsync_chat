import Vue from 'vue'
import Vuex from 'vuex'
import { CognitoUser } from 'amazon-cognito-identity-js'

Vue.use(Vuex)

interface State {
  currentUser: CognitoUser | null
}

export default new Vuex.Store({
  state: {
    currentUser: null,
  } as State,
  getters: {
    currentUser: state => {
      return state.currentUser
    },
  },
  mutations: {
    login: (state, { currentUser }) => {
      state.currentUser = currentUser
    },
    logout: state => {
      state.currentUser = null
    },
  },
  actions: {},
  modules: {},
})
