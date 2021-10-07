import gql from "graphql-tag"

const ADD_POL_TO_GROUP = gql`
mutation insert_polls_group($input: air_pollutants_groups_insert_input!) {
  insert_air_pollutants_groups(
    objects: $input
    on_conflict: {
      constraint: air_pollutants_groups_pkey
      update_columns: pollutant_group_id
    }
  ) {
    returning {
      air_pollutant {
        id
        label
        code
        hazard_class
        solid
        voc
        hydrocarbon
        group {
          id
          label
        }
      }
    }
  }
}
`

export default ADD_POL_TO_GROUP
