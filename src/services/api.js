import axios from 'axios';
import { apolloClient } from '@/vue-apollo'
import RELEASE_SOURCE_BY_PK from '@/graphql/ReleaseSourceByPk.gql'
import UPDATE_RELEASE_SOURCE_BY_PK from '@/graphql/ReleaseSourceUpdate.gql'

const api = axios.create({
  baseURL: 'https://ecoapikz.herokuapp.com/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export async function fetchReleaseSourceByPk(id) {
  const { data } = await apolloClient.query({ query: RELEASE_SOURCE_BY_PK, variables: { id: id } })
  return data.release_sources_by_pk
}

export async function updateReleaseSourceByPk(rs) {
  const { data } = await apolloClient.mutate({ mutation: UPDATE_RELEASE_SOURCE_BY_PK, variables: {
    id: rs.id,
    name: rs.name,
    number: rs.number,
    inventory_number: rs.inventory_number,
    ghg_source: rs.ghg_source,
    emission_src_id: rs.emission_src_id
  } })
  return data.update_release_sources_by_pk
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
