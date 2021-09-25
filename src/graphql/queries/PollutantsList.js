import gql from "graphql-tag"

const POLLS_LIST = gql`
query fetchPollutants($offset: Int!, $limit: Int!, $sort: air_pollutants_order_by!, $where: air_pollutants_bool_exp!) {
  air_pollutants_aggregate {
    aggregate {
      count
    }
  }
  air_pollutants(offset: $offset, limit: $limit, order_by: [$sort], where: $where) {
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
