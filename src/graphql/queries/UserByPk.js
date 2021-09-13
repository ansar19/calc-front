import gql from "graphql-tag"

const USER = gql`
query UserByPk ($id: Int!) {
  users_by_pk(id: $id) {
    id
    email
    role {
      id
      name
    }
    employee {
      id
      first_name
      last_name
    }
  }
}
`

export default USER
