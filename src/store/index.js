import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import releaseStore from './modules/releaseStore';
import calcStore from './modules/calcStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    releaseStore,
    calcStore,
  },
  plugins: [createPersistedState()],
});

