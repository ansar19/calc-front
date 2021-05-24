import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import users from './modules/users'
import releaseStore from './modules/releaseStore';
import calcStore from './modules/calcStore';
import company from './modules/company';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    releaseStore,
    calcStore,
    company,
  },
  plugins: [createPersistedState()],
});
