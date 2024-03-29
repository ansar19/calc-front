import gql from "graphql-tag"

const POLL_BY_ID = gql`
query PolByPk($id: uuid!) {
  air_pollutants_by_pk(id: $id) {
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
`

export default POLL_BY_ID
