import gql from "graphql-tag"

const POLLS_AND_GROUPS = gql`
query {
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
  air_pollutant_groups {
    id
    label
    name
  }
}
`

export default POLLS_AND_GROUPS
