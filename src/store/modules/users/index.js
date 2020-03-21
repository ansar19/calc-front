/* eslint-disable */
import Vue from 'vue';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    csrf: '',
    signedIn: false,
    user: null,
    company: null,
    companies: [],
  },
  mutations: {
    sign_out(state) {
      state.csrf = '';
      state.user = null;
      state.signedIn = false;
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    sign_in(state, csrf, user) {
      state.csrf = csrf;
      state.user = user;
      state.signedIn = true;
      localStorage.csrf = csrf;
      localStorage.signedIn = true;
    },
    set_company(state, company) {
      state.company = company;
    },
  },
  // action: {
  //   sign_out({ state }) {
  //
  //   },
  //   sign_in({ state, csrf, user }) {
  //     state.csrf = csrf;
  //     state.user = user;
  //   },
  //   set_company({ state, company }){
  //     state.company = company;
  //     localStorage.company_id = company.id;
  //   },
  // },
});
window.store = store;
export default store;
