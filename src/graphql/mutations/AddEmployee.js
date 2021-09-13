import gql from "graphql-tag"

const ADD_EMPLOYEE = gql`
mutation AddEmployee (
  $email: String!,
  $first_name: String!,
  $last_name: String!,
  $middle_name: String!,
  $department_id: uuid,
  $position_id: uuid,
  $phone: String!
) {
  insert_employees_one(object: {
    email: $email,
    first_name: $first_name,
    last_name: $last_name,
    middle_name: $middle_name,
    department_id: $department_id,
    position_id: $position_id,
    phone: $phone,
  }) {
    id
    first_name
    last_name
  }
}
`

export default ADD_EMPLOYEE
