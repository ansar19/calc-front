import gql from "graphql-tag"

const POLLS_LIST = gql`
query fetchPollutants {
  air_pollutants {
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

export default POLLS_LIST
