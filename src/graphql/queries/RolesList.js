import gql from "graphql-tag"

const ROLES = gql`
query Roles {
  roles {
    id
    name
    value
    description
  }
}
`

export default ROLES
