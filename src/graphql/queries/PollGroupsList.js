import gql from "graphql-tag"

const POLL_GROUPS_LIST = gql`
query {
  air_pollutant_groups {
    id
    label
    name
  }
}
`

export default POLL_GROUPS_LIST
