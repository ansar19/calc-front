import axios from 'axios';
import { apolloClient } from '@/vue-apollo'
import RS_LIST from '@/graphql/ReleaseSourcesListByCompanyId.gql'
import RELEASE_SOURCE_BY_PK from '@/graphql/ReleaseSourceByPk.gql'
import UPDATE_RELEASE_SOURCE_BY_PK from '@/graphql/ReleaseSourceUpdate.gql'
import ADD_RELEASE_SOURCE_BY_PK from '@/graphql/AddReleaseSource.gql'
import RELEASE_SOURCES_LIST_CALC from '@/graphql/ReleaseSourcesCalcList.gql'
import POLLS_LIST from '@/graphql/PollutantsList.gql'
import POLL_GROUPS_LIST from '@/graphql/PollGroupsList.gql'
import POLL_BY_ID from '@/graphql/PollutantById.gql'
import ADD_POL_TO_GROUP from '@/graphql/AddPolToGroup.gql'

const api = axios.create({
  baseURL: 'https://ecoapikz.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function fetchPollutants() {
  return await apolloClient.query({ query: POLLS_LIST })
}

export async function fetchPollsGroups() {
  const { data } = await apolloClient.query({ query: POLL_GROUPS_LIST })
  return data.air_pollutant_groups
}

export async function fetchPolById(id) {
  const { data } = await apolloClient.query({
    query: POLL_BY_ID,
    variables: {
      id: id,
    },
  });
  return data.air_pollutants_by_pk
}

export async function addPolToGrouo(pollutant_id, pollutant_group_id) {
  const { data, loading } = await apolloClient.mutate({
    mutation: ADD_POL_TO_GROUP,
    variables: {
      pollutant_id: pollutant_id,
      pollutant_group_id: pollutant_group_id
    },
  });

  return { data, loading }
}

export async function fetchReleaseSources(id) {
  const { data } = await apolloClient.query({ query: RS_LIST, variables: { company_id: id } })
  return data.release_sources
}

export async function fetchReleaseSourceByPk(id) {
  const { data } = await apolloClient.query({ query: RELEASE_SOURCE_BY_PK, variables: { id: id } })
  return data.release_sources_by_pk
}

export async function fetchReleaseSourcesByCompanyId(id) {
  const { data } = await apolloClient.query({ query: RELEASE_SOURCES_LIST_CALC, variables: { company_id: id } })
  return data.release_sources
}

export async function updateReleaseSourceByPk(rs) {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_RELEASE_SOURCE_BY_PK, variables: {
      id: rs.id,
      name: rs.name,
      number: rs.number,
      inventory_number: rs.inventory_number,
      ghg_source: rs.ghg_source,
      emission_src_id: rs.emission_src_id
    }
  })
  return data.update_release_sources_by_pk
}

export async function addReleaseSource(rs) {
  const { data } = await apolloClient.mutate({
    mutation: ADD_RELEASE_SOURCE_BY_PK, variables: {
      name: rs.name,
      number: rs.number,
      inventory_number: rs.inventory_number,
      ghg_source: rs.ghg_source,
      emission_src_id: rs.emission_src_id
    }
  })
  return data.insert_release_sources_one
}

export default {
  getResource(url) {
    return api.get(url)
      .then(res => res.data)
      .catch((err) => {
        this.handleError(err);
      });
  },

  postResource(url, payload) {
    return api.post(url, payload)
      .then(res => res.data)
      .catch((err) => {
        this.handleError(err);
      });
  },

  putResource(url, payload) {
    return api.put(`${url}/${payload.id}`, payload)
      .then(res => res.data)
      .catch(err => this.handleError(err));
  },

  patchResource(url, id, payload) {
    return api.patch(`${url}/${id}`, payload)
      .then(res => res.data)
      .catch(err => this.handleError(err));
  },

  deleteResource(url, id) {
    return api.delete(`${url}/${id}`)
      .catch((err) => {
        this.handleError(err);
      });
  },

  handleError(error) {
    throw new Error(`API ${error}`);
  },
};
