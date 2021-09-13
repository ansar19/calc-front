import gql from "graphql-tag"

const ADD_USER = gql`
mutation AddUser ($email: String!, $password: String!, $roleId: Int!) {
  insert_users_one(object: { email: $email, password: $password, roleId: $roleId }) {
    id
    email
  }
}
`

export default ADD_USER
