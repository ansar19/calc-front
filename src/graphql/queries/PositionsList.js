import gql from "graphql-tag"

const POSITIONS = gql`
query EmployeePositions {
  employee_positions {
    id
    name
  }
}
`

export default POSITIONS
