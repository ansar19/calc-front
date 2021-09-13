/* eslint-disable no-param-reassign */
import releaseSourceService from '@/services/releaseSourceService';
import { apolloClient } from '@/vue-apollo'
import WORKSITES_LIST from '@/graphql/queries/WorksitesList'
import RS_LIST from '@/graphql/queries/ReleaseSourcesListByCompanyId'
import RELEASE_SOURCE_BY_PK from '@/graphql/queries/ReleaseSourceByPk'
import UPDATE_WORKSITE from '@/graphql/mutations/UpdateWorksite'
import INSERT_WORKSITE from '@/graphql/mutations/InsertWorksite'



const initialState = () => ({
  fetchedReleaseSources: null,
  worksite: {},
  worksites: [],
  releaseSourceList: [],
  releaseSource: {},
  facility: {},
  facilityLocation: {},
  emissionSource: {},
  pollutantFilter: {},
  natureUserCategory: {},
  releaseSources: [],
  facilities: [],
  facilityLocations: [],
  emissionSources: [],
  pollutantFilters: [],
  filteredPollutants: [],
  errorMessage: '',
});

const getters = {
  getAvaibleFacilities(state) {
    return state.worksite ? state.facilities
      .filter(el => el.worksiteId === state.worksite.id) : [];
  },
  getAvaibleFacilityLocations(state) {
    return state.facility ? state.facilityLocations
      .filter(el => el.facilityId === state.facility.id) : [];
  },
  getAvaibleEmissions(state) {
    return state.facilityLocation ? state.emissionSources
      .filter(el => el.facilityLocationId === state.facilityLocation.id) : [];
  },
  getPollutantFilters(state) {
    let filters;
    if (state.emissionSource && state.emissionSource.pollutantFilter) {
      filters = state.pollutantFilters
        .filter(el => el.emissionSourceId === state.emissionSource.id);
    }
    return filters;
  },
};

const actions = {
  async upsertWorksite({ dispatch, commit, state, rootState }, name) {
    const worksite = { name, category_id: state.worksite.category.id, company_id: rootState.company.working_company.id }
    if (state.worksite.id) worksite.id = state.worksite.id
    const { data } = await apolloClient.mutate({ mutation: state.worksite.id ? UPDATE_WORKSITE : INSERT_WORKSITE, variables: { ...worksite }, })
    commit('setWorksite', data[Object.keys(data)[0]])
    // console.log(data[Object.keys(data)[0]]);
    dispatch('fetchWorksites')
  },

  async fetchReleaseSources({ commit, rootState }) {
    const { data } = await apolloClient.query({ query: RS_LIST, variables: { company_id: rootState.company.working_company.id } })
    commit('fetchReleaseSources', data.release_sources)
  },

  async getEmissionSourcesList({ commit }, facility_loc_id) {
    const { data } = await apolloClient.query({ query: ES_LIST, variables: { facility_loc_id: facility_loc_id } })
    commit('setReleaseSources', data.emission_sources)
  },

  async fetchReleaseSourceByPk({ commit }, id) {
    const { data } = await apolloClient.query({ query: RELEASE_SOURCE_BY_PK, variables: { id: id } })
    const { emission_source, ...releaseSource } = data.release_sources_by_pk
    const { facility_location, ...emissionSource } = emission_source
    const { facility, ...facilityLocation } = facility_location
    const { worksite, ...fac } = facility
    commit('setReleseSource', releaseSource)
    commit('setEmissionSource', emissionSource)
    commit('setFacilityLocation', facilityLocation)
    commit('setFacility', fac)
    commit('setWorksite', worksite)
  },

  async fetchWorksites({ commit, rootState }) {
    const { data } = await apolloClient.query({ query: WORKSITES_LIST, variables: { company_id: rootState.company.working_company.id } })
    commit('setWorksites', data.worksites)
  },

  async getReleaseSourceList({ state, commit }) {
    try {
      commit('setReleaseSources', await releaseSourceService.getResource('releaseSources'));
      commit('setWorksites', await releaseSourceService.getResource('worksites'));
      commit('setFacilities', await releaseSourceService.getResource('facilities'));
      commit('setFacilityLocations', await releaseSourceService.getResource('facilityLocations'));
      commit('setEmissionSources', await releaseSourceService.getResource('emissionSources'));
    } finally {
      const sources = [];
      for (let i = 0; i < state.releaseSources.length; i += 1) {
        const releaseSource = state.releaseSources[i];
        const emissionSource = state.emissionSources
          .find(el => el.id === releaseSource.emissionSourceId);
        const facilityLocation = state.facilityLocations
          .find(el => el.id === releaseSource.facilityLocationId);
        const facility = state.facilities.find(el => el.id === releaseSource.facilityId);
        const worksite = state.worksites.find(el => el.id === releaseSource.worksiteId);
        sources.push({
          releaseSource, emissionSource, facilityLocation, facility, worksite,
        });
        commit('setReleaseSourceList', sources);
      }
    }
  },

  getWorksite({ commit }, id) {
    return releaseSourceService.getResource(`worksites/${id}`)
      .then(res => commit('setWorksite', res));
  },
  getFacility({ commit }, id) {
    return releaseSourceService.getResource(`facilities/${id}`)
      .then(res => commit('setFacility', res));
  },
  getFacilityLocation({ commit }, id) {
    return releaseSourceService.getResource(`facilityLocations/${id}`)
      .then(res => commit('setFacilityLocation', res));
  },
  getEmissionSource({ commit }, id) {
    return releaseSourceService.getResource(`emissionSources/${id}`)
      .then(res => commit('setEmissionSource', res));
  },
  setWorksiteAction({ commit }, payload) {
    commit('setWorksite', payload || {});
    if (payload) commit('setReleaseWorksiteId', payload.id);
    if (!payload) commit('setReleaseWorksiteId', null);
  },
  setFacilityAction({ commit }, payload) {
    commit('setFacility', payload || {});
    if (payload) commit('setReleaseFacilityId', payload.id);
    if (!payload) commit('setReleaseFacilityId', null);
  },
  setFacilityLocationAction({ commit }, payload) {
    commit('setFacilityLocation', payload || {});
    if (payload) commit('setReleaseFacilityLocationId', payload.id);
    if (!payload) commit('setReleaseFacilityLocationId', null);
  },
  setEmissionAction({ commit }, payload) {
    commit('setEmissionSource', payload || {});
    if (payload) commit('setReleaseEmissionSourceId', payload.id);
    if (!payload) commit('setReleaseEmissionSourceId', null);
  },

  putReleaseSource({ state }) {
    releaseSourceService.patchResource('releaseSources', state.releaseSource);
  },

  postFacility({ state, commit }) {
    if (!state.releaseSource.facilityId) {
      releaseSourceService
        .postResource('facilities', { ...state.facility, worksiteId: state.worksite.id })
        .then((res) => {
          commit('setFacility', res);
          commit('setReleaseFacilityId', res.id);
        });
    } else {
      releaseSourceService
        .putResource('facilities', { ...state.facility, worksiteId: state.worksite.id })
        .then((res) => {
          commit('setFacility', res);
        });
    }
  },
  postFacilityLocation({ state, commit }) {
    if (!state.releaseSource.facilityLocationId) {
      releaseSourceService
        .postResource('facilityLocations', { ...state.facilityLocation, facilityId: state.facility.id, worksiteId: state.worksite.id })
        .then((res) => {
          commit('setFacilityLocation', res);
          commit('setReleaseFacilityLocationId', res.id);
        });
    } else {
      releaseSourceService
        .putResource('facilityLocations', { ...state.facilityLocation, facilityId: state.facility.id, worksiteId: state.worksite.id })
        .then((res) => {
          commit('setFacilityLocation', res);
        });
    }
  },
  postEmissionSource({ state, commit }) {
    if (!state.releaseSource.emissionSourceId) {
      releaseSourceService
        .postResource(
          'emissionSources',
          {
            ...state.emissionSource,
            facilityLocationId: state.facilityLocation.id,
            facilityId: state.facility.id,
            worksiteId: state.worksite.id,
          },
        )
        .then((res) => {
          commit('setEmissionSource', res);
          commit('setReleaseEmissionSourceId', res.id);
        });
    } else {
      releaseSourceService
        .putResource(
          'emissionSources',
          {
            ...state.emissionSource,
            facilityLocationId: state.facilityLocation.id,
            facilityId: state.facility.id,
            worksiteId: state.worksite.id,
          },
        )
        .then((res) => {
          commit('setEmissionSource', res);
        });
    }
  },

  getPollutantFilters({ commit }) {
    releaseSourceService.getResource('pollutantFilters')
      .then((res) => {
        commit('setPollutantFilters', res);
      });
  },
  postPollutantFilter({ dispatch, state }) {
    releaseSourceService.postResource(
      'pollutantFilters',
      { ...state.pollutantFilter, emissionSourceId: state.emissionSource.id },
    ).then(() => dispatch('getPollutantFilters'));
  },
  putPollutantFilter({ dispatch, state }) {
    releaseSourceService.putResource('pollutantFilters', state.pollutantFilter)
      .then(() => dispatch('getPollutantFilters'));
  },

  postPollutant({ commit }, payload) {
    releaseSourceService.postResource('filteredPollutants', payload)
      .then(res => commit('addPollutant', res));
  },
  deletePollutant({ commit }, id) {
    releaseSourceService.deleteResource('filteredPollutants', id);
    releaseSourceService.getResource('filteredPollutants')
      .then(res => commit('setFilteredPollutants', res));
  },

  clearAll({ commit }) {
    commit('setReleseSource', {});
    commit('setWorksite', {});
    commit('setFacility', {});
    commit('setFacilityLocation', {});
    commit('setEmissionSource', {});
  },
};

const mutations = {
  fetchReleaseSources(state, payload) {
    state.fetchedReleaseSources = payload
  },
  setReleseSource(state, payload) {
    state.releaseSource = payload;
  },
  setWorksite(state, payload) {
    if (payload === null) {
      const category = Object.assign({}, state.worksite.category)
      state.worksite.name = ''
      state.worksite.category = category
    } else {
      state.worksite = payload;
    }
  },
  setNatureUserCategory(state, payload) {
    state.worksite.category_id = payload.id
    state.worksite.category = payload
  },

  setFacility(state, payload) {
    state.facility = payload;
  },
  setFacilityLocation(state, payload) {
    state.facilityLocation = payload;
  },
  setEmissionSource(state, payload) {
    state.emissionSource = payload;
  },
  setReleaseSources(state, payload) {
    state.releaseSources = payload;
  },
  setReleaseSourceList(state, payload) {
    state.releaseSourceList = payload;
  },
  setWorksites(state, payload) {
    state.worksites = payload;
  },
  setFacilities(state, payload) {
    state.facilities = payload;
  },
  setFacilityLocations(state, payload) {
    state.facilityLocations = payload;
  },
  setEmissionSources(state, payload) {
    state.emissionSources = payload;
  },
  setPollutantFilters(state, payload) {
    state.pollutantFilters = payload;
  },
  setFilteredPollutants(state, payload) {
    state.filteredPollutants = payload;
  },

  // release-source
  setReleaseName(state, payload) {
    state.releaseSource.name = payload;
  },
  setReleaseNumber(state, payload) {
    state.releaseSource.number = payload;
  },
  setReleaseAssetNumber(state, payload) {
    state.releaseSource.inventory_number = payload;
  },
  setReleaseGhgSource(state, payload) {
    state.releaseSource.ghg_source = payload;
  },
  setReleaseWorksiteId(state, id) {
    state.releaseSource.worksiteId = id;
  },
  setReleaseFacilityId(state, id) {
    state.releaseSource.facilityId = id;
  },
  setReleaseFacilityLocationId(state, id) {
    state.releaseSource.facilityLocationId = id;
  },
  setReleaseEmissionSourceId(state, id) {
    state.releaseSource.emissionSourceId = id;
  },

  // facility
  setFacilityName(state, payload) {
    state.facility.facilityName = payload;
  },

  // faclityLocation
  setFacilityLocationName(state, payload) {
    state.facilityLocation.facilityLocationName = payload;
  },

  // emission source
  setEmissionName(state, payload) {
    state.emissionSource.emissionSourceName = payload;
  },
  setEmissionType(state, payload) {
    state.emissionSource.emissionSourceOrganized = payload;
  },
  setEmissionNumber(state, payload) {
    state.emissionSource.emissionSourceNumber = payload;
  },
  setEmissionInventoryNumber(state, payload) {
    state.emissionSource.emissionSourceInventoryNumber = payload;
  },
  setEmissionProduct(state, payload) {
    state.emissionSource.emissionSourceProductName = payload;
  },
  setEmissionCalcId(state, payload) {
    state.emissionSource.calcMethodId = payload;
  },
  setEmissionComment(state, payload) {
    state.emissionSource.emissionSourceComments = payload;
  },
  setEmissionFilterBool(state, payload) {
    state.emissionSource.pollutantFilter = payload;
  },

  // pollutant filter

  setPollutantFilter(state, payload) {
    state.pollutantFilter = payload;
  },
  setPollutantFilterName(state, payload) {
    state.pollutantFilter.pollutanFilterName = payload;
  },
  setPollutantFilterComment(state, payload) {
    state.pollutantFilter.pollutantFilterComment = payload;
  },

  // pollutant

  addPollutant(state, payload) {
    state.filteredPollutants.push(payload);
  },

  setError(state, msg) {
    state.errorMessage = msg;
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
