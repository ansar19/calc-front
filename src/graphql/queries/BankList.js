import gql from "graphql-tag"

const BANKS = gql`
query Banks {
  banks {
    id
    name
  }
}
`
export default BANKS
