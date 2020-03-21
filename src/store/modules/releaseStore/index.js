/* eslint-disable no-param-reassign */
import releaseSourceService from '@/services/releaseSourceService';

const initialState = () => ({
  releaseSourceList: [],
  releaseSource: {},
  worksite: {},
  facility: {},
  facilityLocation: {},
  emissionSource: {},
  pollutantFilter: {},
  releaseSources: [],
  worksites: [],
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
  // getFilteredPollutants(state, id) {
  //   return state.filteredPollutants.filter(el => el.pollutantFilterId === id);
  // },
};

const actions = {

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
  postWorksite({ state, commit }) {
    if (!state.releaseSource.worksiteId) {
      releaseSourceService
        .postResource('worksites', { ...state.worksite, companyId: 1 })
        .then((res) => {
          commit('setWorksite', res);
          commit('setReleaseWorksiteId', res.id);
        });
    } else {
      releaseSourceService
        .putResource('worksites', { ...state.worksite, companyId: 1 })
        .then((res) => {
          commit('setWorksite', res);
        });
    }
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
  setReleseSource(state, payload) {
    state.releaseSource = payload;
  },
  setWorksite(state, payload) {
    state.worksite = payload;
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
    state.releaseSource.releaseSourceName = payload;
  },
  setReleaseNumber(state, payload) {
    state.releaseSource.releaseSourceNumber = payload;
  },
  setReleaseAssetNumber(state, payload) {
    state.releaseSource.assetNumber = payload;
  },
  setReleaseGhgSource(state, payload) {
    state.releaseSource.ghgSource = payload;
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

  // worksite
  setWorksiteName(state, payload) {
    state.worksite.workSiteName = payload;
  },
  setNatureUserCategory(state, payload) {
    state.worksite.natureUserCategory = payload;
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
