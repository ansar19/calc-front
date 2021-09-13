import gql from "graphql-tag"

const ADD_POL_TO_GROUP = gql`
mutation insert_polls_group($pollutant_id: uuid!, $pollutant_group_id: uuid!) {
  insert_air_pollutants_groups(
    objects: {
      pollutant_id: $pollutant_id
      pollutant_group_id: $pollutant_group_id
    }
    on_conflict: {
      constraint: air_pollutants_groups_pkey
      update_columns: pollutant_group_id
    }
  ) {
    returning {
      pollutant_id
      pollutant_group_id
    }
  }
}
`

export default ADD_POL_TO_GROUP
