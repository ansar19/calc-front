import axios from 'axios';
import { apolloClient } from '@/vue-apollo'
import RS_LIST from '@/graphql/queries/ReleaseSourcesListByCompanyId'
import RELEASE_SOURCE_BY_PK from '@/graphql/queries/ReleaseSourceByPk'
import UPDATE_RELEASE_SOURCE_BY_PK from '@/graphql/mutations/ReleaseSourceUpdate'
import ADD_RELEASE_SOURCE_BY_PK from '@/graphql/mutations/AddReleaseSource'
import RELEASE_SOURCES_LIST_CALC from '@/graphql/queries/ReleaseSourcesCalcList'
import POLLS_LIST from '@/graphql/queries/PollutantsList'
import POLL_GROUPS_LIST from '@/graphql/queries/PollGroupsList'
import POLL_BY_ID from '@/graphql/queries/PollutantById'
import ADD_POL_TO_GROUP from '@/graphql/mutations/AddPolToGroup'

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

export async function addPolToGroup(pollutant_id, pollutant_group_id) {
  const { data, loading } = await apolloClient.mutate({
    mutation: ADD_POL_TO_GROUP,
    variables: {
      pollutant_id: pollutant_id,
      pollutant_group_id: pollutant_group_id
    },

    update: (cache, { data: { insert_air_pollutants_groups } }) => {
      const [newPolGroup] = insert_air_pollutants_groups.returning;
      const data = cache.readQuery({ query: POLLS_LIST });
      const poll = cache.readQuery({ query: POLL_BY_ID, variables: { id: newPolGroup.pollutant_id } })
      console.log('data', data);
      console.log('poll', poll);
      // async function getPol(id) {
      //   return await fetchPolById(id)
      // }
      // const uPoll = getPol(newPolGroup.pollutant_id)
      // console.log('uPoll', uPoll);
      // data.air_pollutants.unshift(uPoll);
      // data.air_pollutants.pop();
      // cache.writeQuery({ query: POLLS_LIST, data})
    },
    // optimisticResponse: {
    //   __typename: "Mutation",
    //   insert_users: {
    //     __typename: "air_pollutants_mutation_response",
    //     returning: [
    //       {
    //         __typename: "users",
    //         id: -1,
    //         name,
    //         twitter,
    //         rocket
    //       }
    //     ]
    //   }
    // }
  })
    .then(data => {
      console.log("User added: ", data)
    })
    .catch(error => {
      console.error(error)
    })
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
