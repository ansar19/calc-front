import gql from "graphql-tag"

const POLL_GROUPS_LIST = gql`
query {
        air_pollutant_groups {
          id
          label
          children: pollutants {
            id
            label
            hazard_class
            solid
            voc
            hydrocarbon
          }
        }
      }
`

export default POLL_GROUPS_LIST
