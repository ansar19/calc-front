import gql from "graphql-tag"

const COUNTRIES = gql`
query Countries {
  countries {
    id
    name
    states {
      id
      name
      cities {
        id
        name
      }
    }
  }
}
`

export default COUNTRIES
