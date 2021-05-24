const initialState = () => ({
  user: {
    id: '',
    email: '',
    role: ''
  },
})

const getters = {}

const actions = {}

const mutations = {
  sign_in(state, user) {
    state.user = user;
  },
  sign_out(state) {
    state.user = initialState.user
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
