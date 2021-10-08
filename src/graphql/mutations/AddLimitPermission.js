import gql from "graphql-tag"

const ADD_LIMIT_PERMISSION = gql`
mutation AddLimitPermission($input: limit_permissions_insert_input!) {
  insert_limit_permissions_one(object: $input) {
    id
  }
}
`

export default ADD_LIMIT_PERMISSION
