import gql from "graphql-tag"

const POLL_BY_ID_AND_GROUPS = gql`
query PolByPk($id: uuid!) {
  air_pollutants_by_pk(id: $id) {
    id
    label
    code
    group {
      id
      label
    }
  }
  air_pollutant_groups {
    id
    label
    name
  }
}
`

export default POLL_BY_ID_AND_GROUPS
