import { apolloClient } from "../../../vue-apollo"
import USER from "@/graphql/queries/UserByPk";

const initialState = () => ({
  user: {},
  employee: {},
})

const getters = {}

const actions = {
  async fetchUser ({ state, commit }) {
    if (localStorage.getItem('token') !== undefined) {
      const { data } = await apolloClient.query({ query: USER, variables: { id: state.user.id }})
      commit('set_user', data.users_by_pk)
    }
  },
}

const mutations = {
  sign_in(state, payload) {
    state.user = payload;
  },
  sign_out(state) {
    state.user = initialState.user
  },
  set_user(state, payload) {
    state.user = payload
  },
  add_employee(state, payload) {
    state.employee = payload
  }
}

const state = {
  ...initialState()
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
