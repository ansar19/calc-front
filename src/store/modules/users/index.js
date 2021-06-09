const initialState = () => ({
  user: {}
})

const getters = {}

const actions = {
}

const mutations = {
  sign_in(state, user) {
    state.user = user;
  },
  sign_out(state) {
    state.user = initialState.user
  },
  add_employee(state, payload) {
    Object.assign(state.employee, payload)
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
