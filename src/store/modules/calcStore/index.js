/* eslint-disable no-param-reassign */

const initialState = () => ({
  releaseSources: [],
  releaseSourceId: null,
  calcMethodId: null,
  gsecTotal: null,
  tyearTotal: null,
  period: {
    from: null,
    to: null,
  },
});

const getters = {};

const actions = {};

const mutations = {
  setReleaseSources(state, payload) {
    state.releaseSources = payload;
  },
  setReleaseSourceId(state, payload) {
    state.releaseSourceId = payload;
  },
  setCalcMethodId(state, payload) {
    state.calcMethodId = payload;
  },
  setPeriod(state, payload) {
    state.period = payload;
  },
  setGsecTotal(state, payload) {
    state.gsecTotal = payload;
  },
  setTyearTotal(state, payload) {
    state.tyearTotal = payload;
  },
};

const state = {
  ...initialState(),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
