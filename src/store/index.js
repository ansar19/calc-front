import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import releaseStore from './modules/releaseStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    releaseStore,
  },
  plugins: [createPersistedState()],
});

