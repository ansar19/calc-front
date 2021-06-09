const initialState = () => ({
  id: '',
  company_name: '',
  iin_bin: '',
  company_type: '',
  company_email: '',
  company_phone: '',
  company_description: '',
  working_company: {},
});

const getters = {

};

const actions = {

};

const mutations = {
  SET_WORKING_COMPANY(state, payload) {
    Object.assign(state.working_company, payload)
  },
  SET_COMPANY_id(state, id) {
    state.id = id
  },
  SET_COMPANY_NAME(state, name) {
    state.company_name = name
  },
  SET_IIN_BIN(state, num) {
    state.iin_bin = num
  },
  SET_COMPANY_TYPE(state, type) {
    state.company_type = type
  },
  SET_COMPANY_EMAIL(state, email) {
    state.email = email
  },
  SET_COMPANY_PHONE(state, phone) {
    state.phone = phone
  },
  SET_COMPANY_DESCRIPTION(state, description) {
    state.description = description
  },
  SET_COMPANY_type(state, type) {
    state.type = type
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
