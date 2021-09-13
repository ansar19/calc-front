import gql from "graphql-tag"

const FACILITIES = gql`
query Facilities {
  facilities {
    id
    name
  }
}
`

export default FACILITIES
