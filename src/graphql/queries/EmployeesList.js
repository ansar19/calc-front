import gql from "graphql-tag"

const EMPLOYEES = gql`
query Employees {
  employees {
    id
    first_name
    last_name
    middle_name
    email
    phone
    department {
      name
    }
    position {
      name
    }
    user {
      role {
        name
      }
    }
  }
}
`

export default EMPLOYEES
